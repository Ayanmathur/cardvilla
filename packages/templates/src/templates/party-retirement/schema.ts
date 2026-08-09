import { ConfigSchema } from '../../types';
import { partyFields, invitationCTAFields } from '../../invitation-fields';

export const partyRetirementSchema: ConfigSchema = [
  ...partyFields,
  ...invitationCTAFields,
];
