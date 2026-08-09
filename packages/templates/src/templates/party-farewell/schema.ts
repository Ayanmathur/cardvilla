import { ConfigSchema } from '../../types';
import { partyFields, invitationCTAFields } from '../../invitation-fields';

export const partyFarewellSchema: ConfigSchema = [
  ...partyFields,
  ...invitationCTAFields,
];
