import { ConfigSchema } from '../../types';
import { festivalFields, invitationCTAFields } from '../../invitation-fields';

export const festivalGurpurabSchema: ConfigSchema = [
  ...festivalFields,
  ...invitationCTAFields,
];
