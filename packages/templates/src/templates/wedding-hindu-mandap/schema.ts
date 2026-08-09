import { ConfigSchema } from '../../types';
import { weddingFields, invitationCTAFields } from '../../invitation-fields';

export const weddingHinduMandapSchema: ConfigSchema = [
  ...weddingFields,
  ...invitationCTAFields,
];
