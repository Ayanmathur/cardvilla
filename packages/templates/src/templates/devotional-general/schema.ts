import { ConfigSchema } from '../../types';
import { devotionalFields, invitationCTAFields } from '../../invitation-fields';

export const devotionalGeneralSchema: ConfigSchema = [
  ...devotionalFields,
  ...invitationCTAFields,
];
