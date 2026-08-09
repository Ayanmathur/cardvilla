import { ConfigSchema } from '../../types';
import { devotionalFields, invitationCTAFields } from '../../invitation-fields';

export const devotionalSaiSandhyaSchema: ConfigSchema = [
  ...devotionalFields,
  ...invitationCTAFields,
];
