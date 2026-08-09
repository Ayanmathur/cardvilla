import { ConfigSchema } from '../../types';
import { devotionalFields, invitationCTAFields } from '../../invitation-fields';

export const devotionalSatsangSchema: ConfigSchema = [
  ...devotionalFields,
  ...invitationCTAFields,
];
