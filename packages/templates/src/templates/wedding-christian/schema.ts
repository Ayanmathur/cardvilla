import { ConfigSchema } from '../../types';
import { weddingFields, invitationCTAFields } from '../../invitation-fields';

export const weddingChristianSchema: ConfigSchema = [
  ...weddingFields,
  ...invitationCTAFields,
];
