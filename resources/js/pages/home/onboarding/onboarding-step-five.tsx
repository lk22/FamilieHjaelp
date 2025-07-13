import {type PageProps} from '@inertiajs/core';
import {usePage} from '@inertiajs/react';
import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepFiveForm from './forms/onboarding-step-five-form';
import {Head} from '@inertiajs/react';
import { type OnboardingData } from '@/types/onboarding';
import { type OnboardingInitialSteps } from '@/types/onboarding';

type OnboardingStepFiveData = PageProps & {
    onboarding: OnboardingData;
}

export default function OnboardingStepFive({ currentStep, totalSteps }: OnboardingInitialSteps) {
    const { onboarding } = usePage<OnboardingStepFiveData>().props;

    const handleStepDescription = () => {
        const checks = onboarding?.data?.steps[2].data.checks;
        const situation = onboarding?.data?.steps[1].data.checks;
        console.log({ checks, situation });

        if ( 
            checks.includes('is_not_alone') && situation.includes('pregnancy') ||
            checks.includes('is_not_alone') && situation.includes('deathborn')
        ) {
            return "hvor langt er i henne i jeres graviditet ?";
        } else if (
            checks.includes('is_alone') && situation.includes('pregnancy') || 
            checks.includes('is_alone') && situation.includes('deathborn')
        ) {
            return "hvor langt er du henne i din graviditet ?";
        }
    }

    return (
        <OnboardingTemplate 
            title={`Spørgsmål`} 
            description={handleStepDescription()}
            screenGraphic={null}
            steps={totalSteps}
            currentStep={currentStep || 5}    
        >
            <Head title={`Spørgsmål | Familiehjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepFiveForm />
            </div>
        </OnboardingTemplate>
    );
}
