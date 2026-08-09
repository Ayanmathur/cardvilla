import { ConfigSchema } from '../../types';
import { partyFields, invitationCTAFields } from '../../invitation-fields';

export const partyKittySchema: ConfigSchema = [
  ...partyFields,
  ...invitationCTAFields,
];
