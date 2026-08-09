import { ConfigSchema } from '../../types';
import { weddingFields, invitationCTAFields } from '../../invitation-fields';

export const weddingBengaliSchema: ConfigSchema = [
  ...weddingFields,
  ...invitationCTAFields,
];
