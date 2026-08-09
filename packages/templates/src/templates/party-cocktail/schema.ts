import { ConfigSchema } from '../../types';
import { partyFields, invitationCTAFields } from '../../invitation-fields';

export const partyCocktailSchema: ConfigSchema = [
  ...partyFields,
  ...invitationCTAFields,
];
