const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '..', 'src', 'templates');
const indexTsPath = path.join(__dirname, '..', 'src', 'index.ts');
const registryMetaPath = path.join(__dirname, '..', 'src', 'registry-meta.ts');

const dirs = fs.readdirSync(templatesDir).filter((name) => {
  return fs.statSync(path.join(templatesDir, name)).isDirectory();
});

console.log(`🔍 Found ${dirs.length} template folders.`);

// Parse each directory for index.tsx / schema.ts metadata
const entries = [];

dirs.forEach((dirName) => {
  const dirPath = path.join(templatesDir, dirName);
  const indexPath = path.join(dirPath, 'index.tsx');
  const schemaPath = path.join(dirPath, 'schema.ts');

  if (!fs.existsSync(indexPath) || !fs.existsSync(schemaPath)) {
    console.warn(`⚠️ Skipping ${dirName} (missing index.tsx or schema.ts)`);
    return;
  }

  const indexContent = fs.readFileSync(indexPath, 'utf-8');
  const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

  // Extract meta export from index.tsx
  const metaMatch = indexContent.match(/export const meta: TemplateMeta = (\{[\s\S]*?\});/);
  // Extract schema export name from schema.ts
  const schemaMatch = schemaContent.match(/export const (\w+Schema): ConfigSchema/);

  if (!schemaMatch) {
    console.warn(`⚠️ Skipping ${dirName} (schema export name not found)`);
    return;
  }

  const schemaName = schemaMatch[1];
  let metaObj = {};
  if (metaMatch) {
    try {
      // Evaluate meta object safely
      metaObj = eval(`(${metaMatch[1]})`);
    } catch (e) {
      console.warn(`⚠️ Failed to parse meta for ${dirName}: ${e.message}`);
    }
  }

  entries.push({
    dirName,
    schemaName,
    meta: metaObj,
    key: metaObj.componentKey || dirName.replace(/-/g, '_'),
  });
});

console.log(`✅ Loaded ${entries.length} valid templates.`);

// 1. Generate index.ts
const indexTsCode = `export * from './types';
export * from './registry';
export * from './animations';
export * from './invitation-fields';
export * from './invitation-layout';

// Auto-generated template registrations
${entries.map((e) => `import './templates/${e.dirName}';`).join('\n')}
`;

fs.writeFileSync(indexTsPath, indexTsCode);
console.log(`📝 Updated ${indexTsPath}`);

// 2. Generate registry-meta.ts
const metaImports = entries
  .map((e) => `import { ${e.schemaName} } from './templates/${e.dirName}/schema';`)
  .join('\n');

const registryObjectEntries = entries
  .map((e) => {
    return `  ${JSON.stringify(e.key)}: {
    meta: ${JSON.stringify(e.meta, null, 6)},
    schema: ${e.schemaName},
  },`;
  })
  .join('\n');

const registryMetaCode = `/**
 * Static template metadata — safe to import in server-only contexts.
 * Does NOT import React components, so it can be used in Next.js API routes.
 */

import type { ConfigSchema, TemplateMeta } from './types';

// Import schemas directly (no React component dependencies)
${metaImports}

export interface RegistryMetaEntry {
  meta: TemplateMeta;
  schema: ConfigSchema;
}

export const registryMeta: Record<string, RegistryMetaEntry> = {
${registryObjectEntries}
};

export default registryMeta;
`;

fs.writeFileSync(registryMetaPath, registryMetaCode);
console.log(`📝 Updated ${registryMetaPath}`);
