import { ConfigSchema } from '../../types';
import { festivalFields, invitationCTAFields } from '../../invitation-fields';

export const festivalChristmasSchema: ConfigSchema = [
  ...festivalFields,
  ...invitationCTAFields,
];
