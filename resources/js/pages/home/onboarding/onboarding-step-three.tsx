import { Head, usePage } from '@inertiajs/react';
import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepThreeForm from './forms/onboarding-step-three-form';

import { type OnboardingInitialSteps } from '@/types/onboarding';

export default function OnboardingStepTwo({ currentStep, totalSteps }: OnboardingInitialSteps) {
    const { flash } = usePage().props;
    console.log({ flash });
    return (
        <OnboardingTemplate 
            title={`Spørgsmål`} 
            description="har du en partner eller er du alene i situationen ?"
            screenGraphic={null}
            steps={totalSteps}
            currentStep={currentStep || 3}
        >
            <Head title={`Kom i gang | FamilieHjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepThreeForm />
                {flash && (
                    <div className={`alert ${flash.type}`}>
                        {flash.message}
                    </div>
                )}
            </div>
        </OnboardingTemplate>
    );
}
