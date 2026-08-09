import { ConfigSchema } from '../../types';
import { weddingFields, invitationCTAFields } from '../../invitation-fields';

export const weddingBeachDestinationSchema: ConfigSchema = [
  ...weddingFields,
  ...invitationCTAFields,
];
