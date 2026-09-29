import { Link, useForm } from '@inertiajs/react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import Field from './Field';

import { type ParentStepData, type ParentStepProps } from '@/types/onboarding';

export default function ParentStep({ defaultData }: ParentStepProps) {
  const { data, setData, post, processing, errors } = useForm<{ data: ParentStepData }>({
    data: {
      ...defaultData,
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    post(route('onboarding.scenario.step.submit', { scenario: 'family', step: 'two', nextStep: 'three' }));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold">Hvem udfylder onboarding?</h2>

        <div className="grid gap-4 md:grid-cols-1">
            <Field label="Navn" inputId="name" error={errors['data.name']}>
                <Input id="name" value={data.data.name} onChange={(event) => setData('data', { ...data.data, name: event.target.value })} />
            </Field>

            <Field label="Alder" inputId="age" error={errors['data.age']}>
                <Input id="age" value={data.data.age} onChange={(event) => setData('data', { ...data.data, age: event.target.value })} />
            </Field>

            <Field label="Familietitel" inputId="familyTitle" error={errors['data.familyTitle']}>
                <Input
                    id="familyTitle"
                    value={data.data.familyTitle}
                    onChange={(event) => setData('data', { ...data.data, familyTitle: event.target.value })}
                    placeholder="Fx Mor, Far, Omsorgsfar"
                />
            </Field>
        </div>

        <div className="space-y-2">
            <Label>Har du en partner?</Label>
            <div className="flex gap-4">
                <Button
                    type="button"
                    variant={data.data.hasPartner ? 'default' : 'outline'}
                    onClick={() => setData('data', { ...data.data, hasPartner: true })}
                    className="cursor-pointer bg-blue-900 text-white hover:bg-blue-800 hover:text-white"
                >
                    Ja
                </Button>
                <Button
                    type="button"
                    variant={!data.data.hasPartner ? 'default' : 'outline'}
                    className="cursor-pointer bg-red-900 text-white hover:bg-red-800 hover:text-white"
                    onClick={() =>
                        setData('data', {
                            ...data.data,
                            hasPartner: false,
                            partnerNeedsUser: false,
                            partnerName: '',
                            partnerAge: '',
                            partnerFamilyTitle: '',
                            partnerUserName: '',
                            partnerUserEmail: '',
                        })
                    }
                >
                    Nej
                </Button>
            </div>
            {errors['data.hasPartner'] ? <p className="text-sm text-red-600">{errors['data.hasPartner']}</p> : null}
        </div>

        {data.data.hasPartner ? (
            <div className="space-y-4 rounded border p-4">
                <h3 className="text-lg font-semibold">Partner information</h3>
                <div className="grid gap-4 md:grid-cols-1">
                    <Field label="Partner navn" inputId="partnerName" error={errors['data.partnerName']}>
                        <Input
                            id="partnerName"
                            value={data.data.partnerName}
                            onChange={(event) => setData('data', { ...data.data, partnerName: event.target.value })}
                        />
                    </Field>

                    <Field label="Partner alder" inputId="partnerAge" error={errors['data.partnerAge']}>
                        <Input
                            id="partnerAge"
                            value={data.data.partnerAge}
                            onChange={(event) => setData('data', { ...data.data, partnerAge: event.target.value })}
                        />
                    </Field>

                    <Field label="Partner familietitel" inputId="partnerFamilyTitle" error={errors['data.partnerFamilyTitle']}>
                        <Input
                            id="partnerFamilyTitle"
                            value={data.data.partnerFamilyTitle}
                            onChange={(event) => setData('data', { ...data.data, partnerFamilyTitle: event.target.value })}
                        />
                    </Field>
                </div>

                <div className="space-y-2">
                    <Label>Skal din partner have en bruger?</Label>
                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant={data.data.partnerNeedsUser ? 'default' : 'outline'}
                            onClick={() => setData('data', { ...data.data, partnerNeedsUser: true })}
                            className="cursor-pointer bg-blue-900 text-white hover:bg-blue-800 hover:text-white"
                        >
                            Ja
                        </Button>
                        <Button
                            type="button"
                            variant={!data.data.partnerNeedsUser ? 'default' : 'outline'}
                            onClick={() => setData('data', { ...data.data, partnerNeedsUser: false, partnerUserName: '', partnerUserEmail: '' })}
                            className="cursor-pointer bg-red-900 text-white hover:bg-red-800 hover:text-white"
                        >
                            Nej
                        </Button>
                    </div>
                </div>

                {data.data.partnerNeedsUser ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Partner bruger navn" inputId="partnerUserName" error={errors['data.partnerUserName']}>
                            <Input
                                id="partnerUserName"
                                value={data.data.partnerUserName}
                                onChange={(event) => setData('data', { ...data.data, partnerUserName: event.target.value })}
                            />
                        </Field>

                        <Field label="Partner email" inputId="partnerUserEmail" error={errors['data.partnerUserEmail']}>
                            <Input
                                id="partnerUserEmail"
                                type="email"
                                className="bg-blue-900 text-white hover:bg-blue-800 hover:text-white"
                                value={data.data.partnerUserEmail}
                                onChange={(event) => setData('data', { ...data.data, partnerUserEmail: event.target.value })}
                            />
                        </Field>
                    </div>
                ) : null}
            </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
            <Button asChild type="button" variant="outline" className="cursor-pointer bg-red-900 text-white hover:bg-red-800 hover:text-white">
                <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'one' })}>Tilbage</Link>
            </Button>
            <Button disabled={processing} type="submit" className="cursor-pointer bg-blue-900 text-white hover:bg-blue-800 hover:text-white">
                Næste
            </Button>
        </div>
    </form>
  );
}
