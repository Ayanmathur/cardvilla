import { ConfigSchema } from '../../types';
import { festivalFields, invitationCTAFields } from '../../invitation-fields';

export const festivalNewYearSchema: ConfigSchema = [
  ...festivalFields,
  ...invitationCTAFields,
];
