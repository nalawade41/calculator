import { z } from 'zod';

export const SimpleSIPValidation = z.object({
  monthlyInvestment: z.number().int().positive().min(500),
  investmentPeriod: z.number().int().positive(),
  expectedAnnualReturn: z.number().int().positive().min(1),
});
