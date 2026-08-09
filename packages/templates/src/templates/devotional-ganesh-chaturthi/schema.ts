import { ConfigSchema } from '../../types';
import { devotionalFields, invitationCTAFields } from '../../invitation-fields';

export const devotionalGaneshChaturthiSchema: ConfigSchema = [
  ...devotionalFields,
  ...invitationCTAFields,
];
