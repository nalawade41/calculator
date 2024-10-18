'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import type { SimpleSIPResult } from '@/types/simpleSIP';
import { SimpleSIPValidation } from '@/validations/SimpleSIPValidation';

export const SimpleSIPCalculatorForm = () => {
  const [simpleSIPReturns, setSimpleSIPReturns] = useState<SimpleSIPResult>();
  const t = useTranslations('SimpleSipForm');
  const form = useForm<z.infer<typeof SimpleSIPValidation>>({
    resolver: zodResolver(SimpleSIPValidation),
    defaultValues: {
      monthlyInvestment: 500,
      investmentPeriod: 5,
      expectedAnnualReturn: 8,
    },
  });

  const router = useRouter();

  const simpleSipCalculator = (monthlyInvestment: number, investmentPeriod: number, expectedAnnualReturn: number): SimpleSIPResult => {
    const investmentPeriodInMonths = investmentPeriod * 12;
    const monthlyReturnRate = expectedAnnualReturn / 100 / 12; // Monthly return rate from annual percentage

    let totalInvestment = 0;
    let totalReturns = 0;

    for (let i = 1; i <= investmentPeriodInMonths; i++) {
      totalInvestment += monthlyInvestment; // Add monthly investment to the total invested amount
      totalReturns = (totalReturns + monthlyInvestment) * (1 + monthlyReturnRate); // Apply the monthly compounding rate
    }

    const estimatedReturns = totalReturns - totalInvestment;

    return {
      EstimatedReturns: estimatedReturns,
      TotalInvestment: totalInvestment,
      TotalReturns: totalReturns,
    } as SimpleSIPResult;
  };

  const handleIncrement = form.handleSubmit(async (data: z.infer<typeof SimpleSIPValidation>) => {
    // TODO: API Call if required

    const { monthlyInvestment, investmentPeriod, expectedAnnualReturn } = data;
    setSimpleSIPReturns(simpleSipCalculator(monthlyInvestment, investmentPeriod, expectedAnnualReturn));
    router.refresh();
  });
  return (
    <form onSubmit={handleIncrement} className="mx-auto mt-8 max-w-lg space-y-6 rounded-lg bg-white p-4 shadow-md">
      <p className="text-lg font-semibold">{t('presentation')}</p>

      <div className="flex items-center justify-between">
        <label
          className="text-sm font-semibold text-gray-700"
          htmlFor="monthlyInvestment"
        >
          {t('label_monthly_investment')}
        </label>
        <input
          id="monthlyInvestment"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="e.g., 5000"
          className="w-1/3 rounded-lg border p-1 text-right transition duration-150 ease-in-out [appearance:textfield] focus:outline-none focus:ring focus:ring-blue-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          {...form.register('monthlyInvestment', { valueAsNumber: true })}
        />
        {form.formState.errors.monthlyInvestment?.message && (
          <div className="mt-1 text-xs text-red-500">{form.formState.errors.monthlyInvestment?.message}</div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label
          className="text-sm font-semibold text-gray-700"
          htmlFor="expectedAnnualReturn"
        >
          {t('label_expected_return_rate')}
        </label>
        <div className="relative ml-auto w-1/3">
          <input
            id="expectedAnnualReturn"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="e.g., 8"
            className="w-full rounded-lg border p-1 pr-10 text-right transition duration-150 ease-in-out [appearance:textfield] focus:outline-none focus:ring focus:ring-blue-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            {...form.register('expectedAnnualReturn', { valueAsNumber: true })}
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 font-semibold text-gray-400">%</span>
        </div>
        {form.formState.errors.expectedAnnualReturn?.message && (
          <div className="mt-1 text-xs text-red-500">{form.formState.errors.expectedAnnualReturn?.message}</div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label
          className="text-sm font-semibold text-gray-700"
          htmlFor="investmentPeriod"
        >
          {t('label_time_period')}
        </label>
        <div className="relative ml-auto w-1/3">
          <input
            id="investmentPeriod"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="e.g., 5"
            className="w-full rounded-lg border p-1 pr-10 text-right transition duration-150 ease-in-out [appearance:textfield] focus:outline-none focus:ring focus:ring-blue-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            {...form.register('investmentPeriod', { valueAsNumber: true })}
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 font-semibold text-gray-400">yrs</span>
        </div>
        {form.formState.errors.investmentPeriod?.message && (
          <div className="mt-1 text-xs text-red-500">{form.formState.errors.investmentPeriod?.message}</div>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? t('button_calculate') : t('button_calculate')}
      </button>

      {simpleSIPReturns && (
        <div className="mt-4 rounded-lg bg-blue-50 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-base font-bold">{t('label_result_estimated_returns')}</span>
            <div className="text-right font-bold">{simpleSIPReturns?.EstimatedReturns.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base font-bold">{t('label_result_invested_amount')}</span>
            <div className="text-right font-bold">{simpleSIPReturns?.TotalInvestment.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base font-bold">{t('label_result_total_value')}</span>
            <div className="text-right font-bold">{simpleSIPReturns?.TotalReturns.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
          </div>
        </div>
      )}
    </form>
  );
};
