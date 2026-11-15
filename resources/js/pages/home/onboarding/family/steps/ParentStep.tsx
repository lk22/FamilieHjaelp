import { Link, useForm } from '@inertiajs/react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import Field from './Field';

import { type ParentStepData, type ParentStepProps } from '@/types/onboarding';

interface ParentStepFormData extends ParentStepProps {
    translate: (key: string) => string;
}

export default function ParentStep({ defaultData, translate }: ParentStepFormData) {
  const { data, setData, post, processing, errors } = useForm<{ data: ParentStepData }>({
    data: {
      ...defaultData,
    },
  });

  console.log({ translate });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    post(route('onboarding.scenario.step.submit', { scenario: 'family', step: 'two', nextStep: 'three' }));
  };

  const step_heading = translate('app.getting_started.parent_step.heading');
  const firstname_label = translate('app.getting_started.parent_step.firstname_label');
  const middle_name_label = translate('app.getting_started.parent_step.middle_name_label');
  const last_name_label = translate('app.getting_started.parent_step.last_name_label');
  const age_label = translate('app.getting_started.parent_step.age_label');
  const family_title_label = translate('app.getting_started.parent_step.family_title_label');
  const family_title_placeholder = translate('app.getting_started.parent_step.family_title_placeholder');
  const has_partner_label = translate('app.getting_started.parent_step.has_partner_question');
  const has_partner_no = translate('app.getting_started.parent_step.has_partner_no');
  const has_partner_yes = translate('app.getting_started.parent_step.has_partner_yes');
  const partner_age_label = translate('app.getting_started.parent_step.partner_age_label');
  const partner_family_title_label = translate('app.getting_started.parent_step.partner_family_title_label');
  const partner_needs_user_login_label = translate('app.getting_started.parent_step.partner_needs_user_login_label');
  const partner_first_name_label = translate('app.getting_started.parent_step.partner_first_name_label');
  const partner_middle_name_label = translate('app.getting_started.parent_step.partner_middle_name_label');
  const partner_last_name_label = translate('app.getting_started.parent_step.partner_last_name_label');
  const partner_email_label = translate('app.getting_started.parent_step.partner_email_label');
  const next_step_label = translate('app.getting_started.parent_step.next_step_label');
  const previous_step_label = translate('app.getting_started.parent_step.previous_step_label');
  const parent_email_label = translate('app.getting_started.parent_step.parent_email_label');
  const parent_email_placeholder = translate('app.getting_started.parent_step.parent_email_placeholder');

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold">
            {step_heading}
        </h2>

        <div className="grid gap-4 md:grid-cols-1">
            <div className="grid gap-4 md:grid-cols-3">
                <Field label={firstname_label} inputId="firstName" error={errors['data.firstName']}>
                    <Input id="firstName" value={data.data.firstName} onChange={(event) => setData('data', { ...data.data, firstName: event.target.value })} />
                </Field>

                <Field label={middle_name_label} inputId="middleName" error={errors['data.middleName']}>
                    <Input id="middleName" value={data.data.middleName} onChange={(event) => setData('data', { ...data.data, middleName: event.target.value })} />
                </Field>

                <Field label={last_name_label} inputId="lastName" error={errors['data.lastName']}>
                    <Input id="lastName" value={data.data.lastName} onChange={(event) => setData('data', { ...data.data, lastName: event.target.value })} />
                </Field>
            </div>

            <Field label={age_label} inputId="age" error={errors['data.age']}>
                <div className="flex gap-2 items-center">
                    <Input id="age" value={data.data.age} onChange={(event) => setData('data', { ...data.data, age: event.target.value })} />
                    <label>År</label>
                </div>
                <span>{errors['data.age']}</span>
            </Field>
            <Field label={family_title_label} inputId="familyTitle" error={errors['data.familyTitle']}>
                <Input
                    id="familyTitle"
                    value={data.data.familyTitle}
                    onChange={(event) => setData('data', { ...data.data, familyTitle: event.target.value })}
                    placeholder={family_title_placeholder}
                />
            </Field>
            <Field label={parent_email_label} inputId="parentEmail" error={errors['data.parentEmail']}>
                <Input
                    id="parentEmail"
                    value={data.data.parentEmail}
                    onChange={(event) => setData('data', { ...data.data, parentEmail: event.target.value })}
                    placeholder={parent_email_placeholder}
                />
            </Field>
        </div>

        <div className="space-y-2">
            <Label>{has_partner_label}</Label>
            <div className="flex gap-4">
                <Button
                    type="button"
                    variant={data.data.hasPartner ? 'default' : 'outline'}
                    onClick={() => setData('data', { ...data.data, hasPartner: true })}
                    className="cursor-pointer bg-blue-900 text-white hover:bg-blue-800 hover:text-white"
                >
                    {has_partner_yes}
                </Button>
                <Button
                    type="button"
                    variant={!data.data.hasPartner ? 'default' : 'outline'}
                    className="cursor-pointer bg-blue-900 text-white hover:bg-blue-800 hover:text-white"
                    onClick={() =>
                        setData('data', {
                            ...data.data,
                            hasPartner: false,
                            partnerNeedsUser: false,
                            partnerFirstName: '',
                            partnerMiddleName: '',
                            partnerLastName: '',
                            partnerAge: '',
                            partnerFamilyTitle: '',
                            partnerUserName: '',
                            partnerUserEmail: '',
                        })
                    }
                >
                    {has_partner_no}
                </Button>
            </div>
            {errors['data.hasPartner'] ? <p className="text-sm text-red-600">{errors['data.hasPartner']}</p> : null}
        </div>

        {data.data.hasPartner ? (
            <div className="space-y-4 rounded border p-4">
                <h3 className="text-lg font-semibold">Partner information</h3>
                <div className="grid gap-4 md:grid-cols-1">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Field label={partner_first_name_label} inputId="partnerFirstName" error={errors['data.partnerFirstName']}>
                            <Input
                                id="partnerFirstName"
                                value={data.data.partnerFirstName}
                                onChange={(event) => setData('data', { ...data.data, partnerFirstName: event.target.value })}
                            />
                        </Field>

                        <Field label={partner_middle_name_label} inputId="partnerMiddleName" error={errors['data.partnerMiddleName']}>
                            <Input
                                id="partnerMiddleName"
                                value={data.data.partnerMiddleName}
                                onChange={(event) => setData('data', { ...data.data, partnerMiddleName: event.target.value })}
                            />
                        </Field>

                        <Field label={partner_last_name_label} inputId="partnerLastName" error={errors['data.partnerLastName']}>
                            <Input
                                id="partnerLastName"
                                value={data.data.partnerLastName}
                                onChange={(event) => setData('data', { ...data.data, partnerLastName: event.target.value })}
                            />
                        </Field>
                    </div>
                    <Field label={partner_age_label} inputId="partnerAge" error={errors['data.partnerAge']}>
                        <Input
                            id="partnerAge"
                            value={data.data.partnerAge}
                            onChange={(event) => setData('data', { ...data.data, partnerAge: event.target.value })}
                        />
                    </Field>

                    <Field label={partner_family_title_label} inputId="partnerFamilyTitle" error={errors['data.partnerFamilyTitle']}>
                        <Input
                            id="partnerFamilyTitle"
                            value={data.data.partnerFamilyTitle}
                            onChange={(event) => setData('data', { ...data.data, partnerFamilyTitle: event.target.value })}
                        />
                    </Field>
                </div>

                <div className="space-y-2">
                    <Label>{partner_needs_user_login_label}</Label>
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
                        <Field label={partner_email_label} inputId="partnerUserEmail" error={errors['data.partnerUserEmail']}>
                            <Input
                                id="partnerUserEmail"
                                type="email"
                                className="my-0 h-[10px] text-blue-900"
                                value={data.data.partnerUserEmail}
                                onChange={(event) => setData('data', { ...data.data, partnerUserEmail: event.target.value })}
                            />
                        </Field>
                        <p>Din partner vil få tilsendt mulighed for at oprette sin egen bruger på FamilieHjælp platformen.</p>
                    </div>
                ) : null}
            </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
            <Button asChild type="button" variant="outline" className="cursor-pointer bg-blue-900 text-white hover:bg-red-800 hover:text-white">
                <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'one' })}>{previous_step_label}</Link>
            </Button>
            <Button disabled={processing} type="submit" className="cursor-pointer bg-blue-900 text-white hover:bg-blue-800 hover:text-white">
                {next_step_label}
            </Button>
        </div>
    </form>
  );
}
