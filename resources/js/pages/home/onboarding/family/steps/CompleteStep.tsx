import { Link, useForm } from '@inertiajs/react';
import React from 'react';

import { Button } from '@/components/ui/button';

import { type CompleteStepProps } from '@/types/onboarding';

export default function CompleteStep({ token, familyName, parentData, kidsData }: CompleteStepProps) {
  const kids = kidsData.kids;
  const { post, processing } = useForm<{ data: { session_token: string | null } }>({
    data: {
      session_token: token,
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    post(route('onboarding.completed'));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold">Bekræft familien</h2>

        <div className="rounded border p-4">
            <p>
                <strong>Familienavn:</strong> {familyName}
            </p>
            <p>
                <strong>Onboarder:</strong> {String(parentData.name ?? '')} ({String(parentData.familyTitle ?? '')})
            </p>
            <p>
                <strong>Partner:</strong> {parentData.hasPartner ? 'Ja' : 'Nej'}
            </p>
            {parentData.hasPartner ? (
                <p>
                    <strong>Partner navn:</strong> {String(parentData.partnerName ?? '')}
                </p>
            ) : null}
            <p>
                <strong>Antal børn:</strong> {kids.length}
            </p>
        </div>

        <div className="space-y-2">
            {kids.map((kid, index) => (
                <div className="rounded border p-3" key={index}>
                    <p>
                        <strong>{kid.name}</strong> ({kid.gender}) - {kid.ageYears} år og {kid.ageMonths} måneder
                    </p>
                </div>
            ))}
        </div>

        <div className="flex flex-wrap gap-3">
            <Button asChild type="button" variant="outline">
                <Link href={route('onboarding.scenario.step', { scenario: 'family', step: 'three' })}>Tilbage</Link>
            </Button>
            <Button disabled={processing || !token} type="submit" className="bg-blue-900 text-white hover:bg-blue-800 hover:text-white">
                Fuldfør onboarding
            </Button>
        </div>
        {!token ? <p className="text-sm text-red-600">Sessionen mangler. Start onboarding forfra for at fuldføre.</p> : null}
    </form>
  );
}
