import {type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepOneForm from './forms/onboarding-step-one-form';

export default function OnboardingStepOne() {
    const { name, onboarding } = usePage<SharedData>().props;

    return (
        <OnboardingTemplate step="1" title={`Kom i gang | ${name}`} description="Nogle oplevelser ændrer livet fra det ene øjeblik til det andet. At miste et barn — uanset hvor lille det er, kan det have en dybtgående indvirkning på hele familien. Det er vigtigt at anerkende og forstå de følelser, der følger med en sådan oplevelse, og at give plads til sorg og heling." step="1">
            <Head title={`Kom i gang | ${name}`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepOneForm onboarding={onboarding} />
            </div>
        </OnboardingTemplate>
    );
}
