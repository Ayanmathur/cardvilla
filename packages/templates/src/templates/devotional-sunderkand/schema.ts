import { ConfigSchema } from '../../types';
import { devotionalFields, invitationCTAFields } from '../../invitation-fields';

export const devotionalSunderkandSchema: ConfigSchema = [
  ...devotionalFields,
  ...invitationCTAFields,
];
