import { ConfigSchema } from '../../types';
import { partyFields, invitationCTAFields } from '../../invitation-fields';

export const partyHousewarmingSchema: ConfigSchema = [
  ...partyFields,
  ...invitationCTAFields,
];
