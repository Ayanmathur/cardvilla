import { ConfigSchema } from '../../types';
import { weddingFields, invitationCTAFields } from '../../invitation-fields';

export const weddingModernMinimalSchema: ConfigSchema = [
  ...weddingFields,
  ...invitationCTAFields,
];
