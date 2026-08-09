import { ConfigSchema } from '../../types';
import { partyFields, invitationCTAFields } from '../../invitation-fields';

export const partyNewYearSchema: ConfigSchema = [
  ...partyFields,
  ...invitationCTAFields,
];
