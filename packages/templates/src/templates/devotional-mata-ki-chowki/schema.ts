import { ConfigSchema } from '../../types';
import { devotionalFields, invitationCTAFields } from '../../invitation-fields';

export const devotionalMataKiChowkiSchema: ConfigSchema = [
  ...devotionalFields,
  ...invitationCTAFields,
];
