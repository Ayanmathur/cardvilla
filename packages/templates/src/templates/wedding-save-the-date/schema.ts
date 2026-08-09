import { ConfigSchema } from '../../types';
import { weddingFields, invitationCTAFields } from '../../invitation-fields';

export const weddingSaveTheDateSchema: ConfigSchema = [
  ...weddingFields,
  ...invitationCTAFields,
];
