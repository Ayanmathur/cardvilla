import { ConfigSchema } from '../../types';
import { festivalFields, invitationCTAFields } from '../../invitation-fields';

export const festivalEidSchema: ConfigSchema = [
  ...festivalFields,
  ...invitationCTAFields,
];
