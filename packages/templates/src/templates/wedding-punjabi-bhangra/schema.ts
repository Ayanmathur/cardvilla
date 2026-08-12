import { ConfigSchema } from '../../types';
import { weddingFields, weddingSectionedSchema } from '../../invitation-fields';
import type { SectionedConfigSchema } from '../../types';

export const weddingPunjabiBhangraSchema: ConfigSchema = [...weddingFields];
export const weddingPunjabiBhangraSectionedSchema: SectionedConfigSchema = weddingSectionedSchema;
