import { ConfigSchema } from '../../types';
import { festivalFields, invitationCTAFields } from '../../invitation-fields';

export const festivalRakhiSchema: ConfigSchema = [
  ...festivalFields,
  ...invitationCTAFields,
];
