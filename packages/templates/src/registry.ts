import { TemplateRegistryEntry } from './types';

// Template registry - maps component_key to component + schema + meta
const registry: Record<string, TemplateRegistryEntry> = {};

// Register function used by each template
export function registerTemplate(entry: TemplateRegistryEntry) {
  registry[entry.meta.componentKey] = entry;
}

// Get all registered templates
export function getRegistry(): Record<string, TemplateRegistryEntry> {
  return { ...registry };
}

// Get single template by key
export function getTemplate(componentKey: string): TemplateRegistryEntry | undefined {
  return registry[componentKey];
}

// List all available component keys
export function getComponentKeys(): string[] {
  return Object.keys(registry);
}

export default registry;
