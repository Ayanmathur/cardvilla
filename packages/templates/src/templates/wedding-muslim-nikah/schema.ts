import { ConfigSchema } from '../../types';
import { weddingFields, invitationCTAFields } from '../../invitation-fields';

export const weddingMuslimNikahSchema: ConfigSchema = [
  ...weddingFields,
  ...invitationCTAFields,
];
