import { z } from 'zod';

export const LumpsumValidation = z.object({
  totalInvestment: z.number().int().positive().min(500),
  investmentPeriod: z.number().int().positive(),
  expectedAnnualReturn: z.number().int().positive().min(1),
});
