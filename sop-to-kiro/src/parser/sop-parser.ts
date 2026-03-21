import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import type { Root, Heading, Text, Paragraph, List, ListItem, Strong } from 'mdast';
import type { SOPDocument, SOPParameter, SOPStep, SOPSubStep, SOPConstraint, Rfc2119Keyword } from './types.js';

const RFC2119_PATTERN = /\b(MUST NOT|MUST|SHALL NOT|SHALL|SHOULD NOT|SHOULD|MAY|REQUIRED|OPTIONAL)\b/g;

const KEYWORD_MAP: Record<string, Rfc2119Keyword> = {
  'MUST': 'MUST',
  'REQUIRED': 'MUST',
  'SHALL': 'MUST',
  'MUST NOT': 'MUST_NOT',
  'SHALL NOT': 'MUST_NOT',
  'SHOULD': 'SHOULD',
  'SHOULD NOT': 'SHOULD_NOT',
  'MAY': 'MAY',
  'OPTIONAL': 'MAY',
};

function extractText(node: any): string {
  const parts: string[] = [];
  visit(node, 'text', (textNode: Text) => {
    parts.push(textNode.value);
  });
  visit(node, 'inlineCode', (codeNode: any) => {
    parts.push(codeNode.value);
  });
  return parts.join('');
}

function extractConstraints(text: string, context: string): SOPConstraint[] {
  const constraints: SOPConstraint[] = [];
  const matches = text.matchAll(RFC2119_PATTERN);

  for (const match of matches) {
    const keyword = KEYWORD_MAP[match[0]];
    if (keyword) {
      constraints.push({
        keyword,
        text: text.trim(),
        context,
        toolReference: inferToolReference(text),
      });
    }
  }

  return constraints;
}

const TOOL_PATTERNS: Array<[RegExp, string]> = [
  [/\b(write|create|modify|edit|save)\s+(file|code|output)/i, 'fs_write'],
  [/\b(read|open|load|parse)\s+(file|input)/i, 'fs_read'],
  [/\b(run|execute|command|shell|terminal|bash|script)\b/i, 'execute_bash'],
  [/\b(deploy|aws|cloud|lambda|s3)\b/i, 'use_aws'],
  [/\b(git|commit|push|pull|merge|branch)\b/i, 'execute_bash'],
  [/\b(install|npm|yarn|pip|package)\b/i, 'execute_bash'],
  [/\b(test|lint|format|check)\b/i, 'execute_bash'],
  [/\b(delete|remove)\s+(file|directory|folder)/i, 'fs_write'],
];

function inferToolReference(text: string): string | undefined {
  for (const [pattern, tool] of TOOL_PATTERNS) {
    if (pattern.test(text)) {
      return tool;
    }
  }
  return undefined;
}

function parseParameters(node: any): SOPParameter[] {
  const params: SOPParameter[] = [];
  const PARAM_REGEX = /\*\*(\w+)\*\*\s*\((required|optional)(?:,\s*default:\s*"?([^")\n]+)"?)?\):\s*(.+)/;

  visit(node, 'listItem', (item: ListItem) => {
    const text = extractText(item);
    const match = text.match(PARAM_REGEX);
    if (match) {
      params.push({
        name: match[1],
        required: match[2].toLowerCase() === 'required',
        default: match[3] || undefined,
        description: match[4].trim(),
      });
    } else {
      // Try simpler pattern: **name**: description
      const simpleMatch = text.match(/\*?\*?(\w+)\*?\*?\s*[-:]\s*(.+)/);
      if (simpleMatch) {
        params.push({
          name: simpleMatch[1],
          required: true,
          description: simpleMatch[2].trim(),
        });
      }
    }
  });

  // Also check paragraphs for inline parameter definitions
  if (params.length === 0) {
    visit(node, 'paragraph', (para: Paragraph) => {
      const text = extractText(para);
      const match = text.match(PARAM_REGEX);
      if (match) {
        params.push({
          name: match[1],
          required: match[2].toLowerCase() === 'required',
          default: match[3] || undefined,
          description: match[4].trim(),
        });
      }
    });
  }

  return params;
}

interface Section {
  heading: string;
  level: number;
  nodes: any[];
}

function splitIntoSections(tree: Root): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;

  for (const node of tree.children) {
    if (node.type === 'heading') {
      const heading = node as Heading;
      const text = extractText(heading);
      current = { heading: text, level: heading.depth, nodes: [] };
      sections.push(current);
    } else if (current) {
      current.nodes.push(node);
    }
  }

  return sections;
}

function parseStep(section: Section, stepNumber: number): SOPStep {
  const titleMatch = section.heading.match(/(?:Step\s+)?(\d+)[.:)]\s*(.*)/i);
  const title = titleMatch ? titleMatch[2].trim() : section.heading;
  const number = titleMatch ? parseInt(titleMatch[1]) : stepNumber;

  const substeps: SOPSubStep[] = [];
  const constraints: SOPConstraint[] = [];
  const descParts: string[] = [];

  for (const node of section.nodes) {
    const text = extractText(node);

    if (node.type === 'list') {
      visit(node, 'listItem', (item: ListItem) => {
        const itemText = extractText(item);
        const itemConstraints = extractConstraints(itemText, title);
        if (itemConstraints.length > 0) {
          constraints.push(...itemConstraints);
        }
        substeps.push({
          content: itemText.trim(),
          constraints: itemConstraints,
        });
      });
    } else if (node.type === 'paragraph') {
      descParts.push(text);
      const paraConstraints = extractConstraints(text, title);
      constraints.push(...paraConstraints);
    }
  }

  return {
    number,
    title,
    description: descParts.join('\n'),
    substeps,
    constraints,
  };
}

export function parseSOPMarkdown(markdown: string): SOPDocument {
  const tree = unified().use(remarkParse).parse(markdown) as Root;
  const sections = splitIntoSections(tree);

  let title = '';
  let overview = '';
  const parameters: SOPParameter[] = [];
  const steps: SOPStep[] = [];
  const topConstraints: SOPConstraint[] = [];

  let stepCounter = 1;

  for (const section of sections) {
    const headingLower = section.heading.toLowerCase();

    if (section.level === 1) {
      title = section.heading;
      // Check for overview content directly under h1
      const text = section.nodes.map(n => extractText(n)).join('\n').trim();
      if (text && !overview) {
        overview = text;
      }
    } else if (headingLower.includes('overview') || headingLower.includes('description') || headingLower.includes('purpose')) {
      overview = section.nodes.map(n => extractText(n)).join('\n').trim();
    } else if (headingLower.includes('parameter') || headingLower.includes('input')) {
      const fakeRoot: Root = { type: 'root', children: section.nodes };
      parameters.push(...parseParameters(fakeRoot));
    } else if (headingLower.includes('constraint') && section.level === 2) {
      // Top-level constraints section
      for (const node of section.nodes) {
        const text = extractText(node);
        topConstraints.push(...extractConstraints(text, 'global'));
      }
    } else if (
      headingLower.includes('step') ||
      /^\d+[.:)]/.test(section.heading) ||
      (section.level >= 3 && !headingLower.includes('overview') && !headingLower.includes('parameter'))
    ) {
      steps.push(parseStep(section, stepCounter++));
    } else if (section.level === 2 && headingLower.includes('steps')) {
      // "## Steps" umbrella section - content between this and next subsections
      for (const node of section.nodes) {
        const text = extractText(node);
        if (text.trim()) {
          topConstraints.push(...extractConstraints(text, 'steps'));
        }
      }
    }
  }

  // If no explicit title from h1, use first section heading
  if (!title && sections.length > 0) {
    title = sections[0].heading;
  }

  return {
    title,
    overview,
    parameters,
    steps,
    constraints: topConstraints,
  };
}
