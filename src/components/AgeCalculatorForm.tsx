'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { AgeValidation } from '@/validations/AgeValidation';

export const AgeCalculatorForm = () => {
  const [age, setAge] = useState<number | null>(null);

  const t = useTranslations('AgeForm');
  const form = useForm<z.infer<typeof AgeValidation>>({
    resolver: zodResolver(AgeValidation),
    defaultValues: {
      dateOfBirth: new Date(),
    },
  });

  const router = useRouter();

  const handleIncrement = form.handleSubmit(async (data: z.infer<typeof AgeValidation>) => {
    // TODO: API Call if required

    // TODO: Calculate the new age

    // Use the date of birth to calculate the age
    const dateOfBirth = new Date(data.dateOfBirth);
    const today = new Date();
    setAge(today.getFullYear() - dateOfBirth.getFullYear());
    form.reset();
    router.refresh();
  });

  return (
    <form onSubmit={handleIncrement}>
      <p>{t('presentation')}</p>
      <div>
        <label className="text-sm font-bold text-gray-700" htmlFor="age">
          {t('label_date_of_birth')}
          <input
            id="age"
            type="date"
            className="ml-2 w-32 appearance-none rounded border px-2 py-1 text-sm leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
            {...form.register('dateOfBirth')}
          />
        </label>

        {form.formState.errors.dateOfBirth?.message && (
          <div className="my-2 text-xs italic text-red-500">{form.formState.errors.dateOfBirth?.message}</div>
        )}
      </div>

      <div className="mt-2">
        <button
          className="rounded bg-blue-500 px-5 py-1 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300/50 disabled:pointer-events-none disabled:opacity-50"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {t('button_get_age')}
        </button>
      </div>

      <div className={age ? 'mt-2' : 'hidden'}>
        <p>
          {t('label_age')}
          {' '}
          :
          {' '}
          {age}
        </p>
      </div>
    </form>
  );
};
