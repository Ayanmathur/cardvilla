import { ConfigSchema } from '../../types';
import { weddingFields, invitationCTAFields } from '../../invitation-fields';

export const weddingPunjabiBhangraSchema: ConfigSchema = [
  ...weddingFields,
  ...invitationCTAFields,
];
