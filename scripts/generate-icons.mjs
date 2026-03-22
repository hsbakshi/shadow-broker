// Generates PNG icons from public/icon.svg using sharp
// Run: node scripts/generate-icons.mjs

import sharp from 'sharp'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const svgBuffer = readFileSync(resolve(root, 'public/icon.svg'))

const icons = [
  { size: 192,  name: 'icon-192.png' },
  { size: 512,  name: 'icon-512.png' },
  { size: 180,  name: 'apple-touch-icon.png' },
  { size: 180,  name: 'icon-180.png' },
]

for (const { size, name } of icons) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(resolve(root, 'public', name))
  console.log(`✓ public/${name}`)
}
