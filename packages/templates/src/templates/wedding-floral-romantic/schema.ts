import { ConfigSchema } from '../../types';
import { weddingFields, invitationCTAFields } from '../../invitation-fields';

export const weddingFloralRomanticSchema: ConfigSchema = [
  ...weddingFields,
  ...invitationCTAFields,
];
