import { ConfigSchema } from '../../types';
import { devotionalFields, invitationCTAFields } from '../../invitation-fields';

export const devotionalAkhandPathSchema: ConfigSchema = [
  ...devotionalFields,
  ...invitationCTAFields,
];
