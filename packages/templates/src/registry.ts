import { TemplateRegistryEntry } from './types';

// Template registry - maps component_key to component + schema + meta
const registry: Record<string, TemplateRegistryEntry> = {};

// Register function used by each template
export function registerTemplate(entry: TemplateRegistryEntry) {
  const key = entry.meta.componentKey;
  registry[key] = entry;
  registry[key.replace(/_/g, '-')] = entry;
  registry[key.replace(/-/g, '_')] = entry;
}

// Get all registered templates
export function getRegistry(): Record<string, TemplateRegistryEntry> {
  return { ...registry };
}

// Get single template by key
export function getTemplate(componentKey: string): TemplateRegistryEntry | undefined {
  if (!componentKey) return undefined;
  return (
    registry[componentKey] ||
    registry[componentKey.replace(/-/g, '_')] ||
    registry[componentKey.replace(/_/g, '-')]
  );
}

// List all available component keys
export function getComponentKeys(): string[] {
  return Object.keys(registry);
}

export default registry;
