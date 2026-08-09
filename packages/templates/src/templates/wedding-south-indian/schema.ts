import { ConfigSchema } from '../../types';
import { weddingFields, invitationCTAFields } from '../../invitation-fields';

export const weddingSouthIndianSchema: ConfigSchema = [
  ...weddingFields,
  ...invitationCTAFields,
];
