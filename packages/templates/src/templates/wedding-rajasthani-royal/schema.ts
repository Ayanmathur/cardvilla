import { ConfigSchema } from '../../types';
import { weddingFields, invitationCTAFields } from '../../invitation-fields';

export const weddingRajasthaniRoyalSchema: ConfigSchema = [
  ...weddingFields,
  ...invitationCTAFields,
];
