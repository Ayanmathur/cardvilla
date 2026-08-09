import { ConfigSchema } from '../../types';
import { devotionalFields, invitationCTAFields } from '../../invitation-fields';

export const devotionalBhagwatKathaSchema: ConfigSchema = [
  ...devotionalFields,
  ...invitationCTAFields,
];
