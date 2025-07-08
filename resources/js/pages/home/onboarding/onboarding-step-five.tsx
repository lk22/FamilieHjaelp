import {type PageProps} from '@inertiajs/core';
import {usePage} from '@inertiajs/react';
import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepFiveForm from './forms/onboarding-step-five-form';
import {Head} from '@inertiajs/react';
import { type OnboardingData } from '@/types/onboarding';

type OnboardingStepFiveData = PageProps & {
    onboarding: OnboardingData;
}

export default function OnboardingStepFive() {
    const { onboarding } = usePage<OnboardingStepFiveData>().props;
    const checks = onboarding?.data?.steps[3].data?.checks;
    console.log(checks);

    const handleStepDescription = () => {
        const checks = onboarding?.data?.steps[3].data.checks;
        const situation = onboarding?.data?.steps[2].data.checks;
        console.log(onboarding?.data?.steps[2].data);

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
        <OnboardingTemplate title={`Spørgsmål`} description={handleStepDescription()}>
            <Head title={`Spørgsmål | Familiehjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepFiveForm />
            </div>
        </OnboardingTemplate>
    );
}
