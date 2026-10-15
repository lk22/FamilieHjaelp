import { Link, useForm } from '@inertiajs/react';
import React from 'react';

import { Button } from '@/components/ui/button';

import { type CompleteStepProps } from '@/types/onboarding';

interface TranslateCompleteStepProps extends CompleteStepProps {
    translate: (key: string) => string;
    locale: string;
}

export default function CompleteStep({
    token,
    familyName,
    parentData,
    kidsData,
    translate,
    locale
}: TranslateCompleteStepProps) {
  const kids = kidsData.kids;
  const { post, processing } = useForm<{
    data: {
        session_token: string | null
    }
}>({
    data: {
      session_token: token,
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    post(route('onboarding.completed'));
  };

  const hasPartner = parentData.hasPartner;
  console.log({parentData})

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold">{translate('app.getting_started.confirmation_step.heading')}</h2>

        <h3>Familienavn</h3>
        <div className="rounded border border-1 border-blue-900 p-4">
            <p>
                <strong>{translate('app.getting_started.confirmation_step.family_name_label')}:</strong> {familyName}
            </p>
        </div>
        <h3>Onboarder</h3>
        <div className="rounded border border-1 border-blue-900 p-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="onboarder-name">
                    <p>
                        <strong>{translate('app.getting_started.confirmation_step.onboarder_name_label')}:</strong> {String(parentData.firstName ?? '')} {String(parentData.middleName ?? '')} {String(parentData.lastName ?? '')} ({String(parentData.familyTitle ?? '')})
                    </p>
                </div>
                <div className="onboarder-age">
                    <p>
                        <strong>{translate('app.getting_started.confirmation_step.onboarder_age_label')}:</strong> {String(parentData.age ?? '')}
                    </p>
                </div>
                <p>
                    <strong>{translate('app.getting_started.confirmation_step.has_partner_label')}:</strong> {parentData.hasPartner ? translate('app.getting_started.confirmation_step.has_partner_yes') : translate('app.getting_started.confirmation_step.has_partner_no')}
                </p>
            </div>
        </div>
        <h3>Partner</h3>
            {parentData.hasPartner ? (
                <div className="rounded border border-1 border-blue-900 p-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="partner-name">
                            <p>
                                <strong>{translate('app.getting_started.confirmation_step.partner_name_label')}:</strong> {String(parentData.partnerFirstName ?? '') + ' ' + String(parentData.partnerMiddleName ?? '') + ' ' + String(parentData.partnerLastName ?? '')}
                            </p>
                        </div>
                        <div className="partner-age">
                            <p>
                                <strong>{translate('app.getting_started.confirmation_step.partner_age_label')}:</strong> {String(parentData.partnerAge ?? '')}
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}

        <div className="space-y-2">
            <p>
                <strong>{translate('app.getting_started.confirmation_step.number_of_children_label')}:</strong> {kids.length}
            </p>
            {kids.map((kid, index) => (
                <div className="rounded border border-1 border-blue-900 p-3" key={index}>
                    <p>
                        <strong>{kid.name}</strong> ({translate(kid.gender)}) - {kid.ageYears} {translate('app.getting_started.confirmation_step.child_age_years')}, {kid.ageMonths} {translate('app.getting_started.confirmation_step.child_age_months')} {`${locale === 'da' ? 'og' : 'and'}`} {kid.ageWeeks} {translate('app.getting_started.confirmation_step.child_age_weeks')}
                    </p>
                </div>
            ))}
        </div>

        <div className="flex flex-wrap gap-3">
            <Button asChild type="button" variant="outline">
                <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'three' })}>{translate('app.back')}</Link>
            </Button>
            <Button disabled={processing || !token} type="submit" className="bg-blue-900 text-white hover:bg-blue-800 hover:text-white">
                {translate('app.complete_onboarding')}
            </Button>
        </div>
        {!token ? <p className="text-sm text-red-600">{translate('app.session_missing')}</p> : null}
    </form>
  );
}
