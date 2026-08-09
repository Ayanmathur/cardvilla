import { ConfigSchema } from '../../types';
import { weddingFields, invitationCTAFields } from '../../invitation-fields';

export const weddingEngagementRingSchema: ConfigSchema = [
  ...weddingFields,
  ...invitationCTAFields,
];
