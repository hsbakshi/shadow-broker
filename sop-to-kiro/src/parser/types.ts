export type Rfc2119Keyword = 'MUST' | 'MUST_NOT' | 'SHOULD' | 'SHOULD_NOT' | 'MAY';

export interface SOPConstraint {
  keyword: Rfc2119Keyword;
  text: string;
  context: string;
  toolReference?: string;
}

export interface SOPParameter {
  name: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface SOPSubStep {
  content: string;
  constraints: SOPConstraint[];
}

export interface SOPStep {
  number: number;
  title: string;
  description: string;
  substeps: SOPSubStep[];
  constraints: SOPConstraint[];
}

export interface SOPDocument {
  title: string;
  overview: string;
  parameters: SOPParameter[];
  steps: SOPStep[];
  constraints: SOPConstraint[];
}

export interface KiroSteeringFile {
  filename: string;
  frontmatter: {
    title: string;
    inclusion: 'always' | 'fileMatch' | 'manual';
    fileMatchPattern?: string;
  };
  body: string;
  sourceStep?: number;
}

export interface KiroHookEntry {
  matcher?: string;
  command: string;
}

export interface KiroHookFile {
  filename: string;
  config: {
    enabled: boolean;
    name: string;
    hooks: {
      preToolUse?: KiroHookEntry[];
      postToolUse?: KiroHookEntry[];
    };
  };
  scripts: KiroHookScript[];
  sourceConstraints: SOPConstraint[];
}

export interface KiroHookScript {
  filename: string;
  content: string;
}

export interface KiroOutput {
  steeringFiles: KiroSteeringFile[];
  hookFiles: KiroHookFile[];
}
