import { ConfigSchema } from '../../types';
import { devotionalFields, invitationCTAFields } from '../../invitation-fields';

export const devotionalShraddhSchema: ConfigSchema = [
  ...devotionalFields,
  ...invitationCTAFields,
];
