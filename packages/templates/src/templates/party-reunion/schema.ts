import { ConfigSchema } from '../../types';
import { partyFields, invitationCTAFields } from '../../invitation-fields';

export const partyReunionSchema: ConfigSchema = [
  ...partyFields,
  ...invitationCTAFields,
];
