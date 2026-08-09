import { ConfigSchema } from '../../types';
import { devotionalFields, invitationCTAFields } from '../../invitation-fields';

export const devotionalGrihaPraveshSchema: ConfigSchema = [
  ...devotionalFields,
  ...invitationCTAFields,
];
