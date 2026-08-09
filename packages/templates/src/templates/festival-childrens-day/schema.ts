import { ConfigSchema } from '../../types';
import { festivalFields, invitationCTAFields } from '../../invitation-fields';

export const festivalChildrensDaySchema: ConfigSchema = [
  ...festivalFields,
  ...invitationCTAFields,
];
