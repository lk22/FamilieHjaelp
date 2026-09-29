import {useForm} from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

import {type FamilyNameStepProps } from '@/types/onboarding';

export default function FamilyNameStep({
  defaultFamilyName,
  translate,
}: FamilyNameStepProps) {
  const { data, setData, post, processing, errors } = useForm<{data: {familyName: string}}>({
    data: {
      familyName: defaultFamilyName,
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    post(route('onboarding.scenario.step.submit', {
      scenario: 'family', step: 'one', nextStep: 'two'
    }));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold">{translate('app.getting_started.family_name.heading')}</h2>
        <div className="space-y-2">
            <Label htmlFor="familyName">{translate('app.getting_started.family_name.form_field.label')}</Label>
            <Input
              data-testid="family-name-input"
              id="familyName"
              value={data.data.familyName}
              onChange={(event) => setData('data', { familyName: event.target.value })}
            />
            {errors['data.familyName'] ? <p className="text-sm text-red-600">{errors['data.familyName']}</p> : null}
        </div>

        <Button disabled={processing} type="submit" className="bg-blue-700 text-white hover:bg-blue-600">
            {translate('app.getting_started.family_name.form_field.next_step_label')}
        </Button>
    </form>
  );
}