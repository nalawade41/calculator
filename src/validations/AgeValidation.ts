import { z } from 'zod';

export const AgeValidation = z.object({
  dateOfBirth: z.coerce.date().min(new Date('1900-01-01')).max(new Date()),
});
