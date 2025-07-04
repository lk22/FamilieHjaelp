import {type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepThreeForm from './forms/onboarding-step-three-form';

export default function OnboardingStepTwo() {
    const { name, onboarding } = usePage<SharedData>().props;

    return (
        <OnboardingTemplate step="3" title={`Spørgsmål`} description="Hvornår skete situationen ?" step="3">
            <Head title={`Kom i gang | ${name}`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepThreeForm onboarding={onboarding} />
            </div>
        </OnboardingTemplate>
    );
}
