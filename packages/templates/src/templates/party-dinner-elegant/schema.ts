import { ConfigSchema } from '../../types';
import { partyFields, invitationCTAFields } from '../../invitation-fields';

export const partyDinnerElegantSchema: ConfigSchema = [
  ...partyFields,
  ...invitationCTAFields,
];
