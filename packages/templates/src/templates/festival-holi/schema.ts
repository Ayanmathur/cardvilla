import { ConfigSchema } from '../../types';
import { festivalFields, invitationCTAFields } from '../../invitation-fields';

export const festivalHoliSchema: ConfigSchema = [
  ...festivalFields,
  ...invitationCTAFields,
];
