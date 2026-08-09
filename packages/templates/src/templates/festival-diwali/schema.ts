import { ConfigSchema } from '../../types';
import { festivalFields, invitationCTAFields } from '../../invitation-fields';

export const festivalDiwaliSchema: ConfigSchema = [
  ...festivalFields,
  ...invitationCTAFields,
];
