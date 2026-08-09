import { ConfigSchema } from '../../types';
import { festivalFields, invitationCTAFields } from '../../invitation-fields';

export const festivalValentinesSchema: ConfigSchema = [
  ...festivalFields,
  ...invitationCTAFields,
];
