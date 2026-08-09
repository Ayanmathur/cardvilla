import { ConfigSchema } from '../../types';
import { devotionalFields, invitationCTAFields } from '../../invitation-fields';

export const devotionalChurchPrayerSchema: ConfigSchema = [
  ...devotionalFields,
  ...invitationCTAFields,
];
