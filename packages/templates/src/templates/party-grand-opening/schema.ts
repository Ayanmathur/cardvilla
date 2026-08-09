import { ConfigSchema } from '../../types';
import { partyFields, invitationCTAFields } from '../../invitation-fields';

export const partyGrandOpeningSchema: ConfigSchema = [
  ...partyFields,
  ...invitationCTAFields,
];
