import {type PageProps} from '@inertiajs/core';
import {usePage} from '@inertiajs/react';
import OnboardingTemplate from './template/onboarding-template';
import OnboardingStepSixForm from './forms/onboarding-step-six-form';
import {Head} from '@inertiajs/react';
import { type OnboardingData } from '@/types/onboarding';
import React from 'react';

type OnboardingStepFiveData = PageProps & {
    onboarding: OnboardingData;
}

export default function OnboardingStepFive() {
    const { onboarding } = usePage<OnboardingStepFiveData>().props;

    const handleStepDescription = () => {
        const checks = onboarding?.data?.steps[3].data.checks;
        const situation = onboarding?.data?.steps[2].data.checks;
    
        if ( 
            checks.includes('is_not_alone') || situation.includes('abort') ||
            checks.includes('is_not_alone') || situation.includes('deathborn')
        ) {
            return (
                <>
                    <p className="mb-4">Det kan være en udfordring at håndtere en abort eller dødsfødsel for begge parter, det er vigtigt og få lagt en plan for for at komme bedre videre.</p> <p>hvordan har i det lige nu i situationen ?</p>
                </>
            );
        } else if (
            checks.includes('is_alone') || situation.includes('deathborn') ||
            checks.includes('is_alone') || situation.includes('abort')
        ) {
            return (
                <>
                    <p className="mb-4">Det kan være en udfordring at håndtere en abort eller dødsfødsel, det kan være en god ide og lave en plan for at komme bedere videre.</p>
                    <p>hvordan har du det lige nu i situationen ?</p>
                </>
            );
        }
    }

    return (
        <OnboardingTemplate title={`Spørgsmål`} description={handleStepDescription()}>
            <Head title={`Spørgsmål | Familiehjælp`} />
            <div className="container max-w-[960px] px-4 py-8 mx-auto">
                <OnboardingStepSixForm />
            </div>
        </OnboardingTemplate>
    );
}
