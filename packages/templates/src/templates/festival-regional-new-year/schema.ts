import { ConfigSchema } from '../../types';
import { festivalFields, invitationCTAFields } from '../../invitation-fields';

export const festivalRegionalNewYearSchema: ConfigSchema = [
  ...festivalFields,
  ...invitationCTAFields,
];
