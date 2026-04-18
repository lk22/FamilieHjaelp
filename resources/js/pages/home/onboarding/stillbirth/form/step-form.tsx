import { useOnboarding } from '@/contexts/OnboardingContext';
import { type ScenarioProperties } from '@/state/OnboardingState';

import HasOtherChildrenAtHomeStepForm from './HasOtherChildrenAtHomeStepForm';
import HasReceivedDeathCertificateStepForm from './HasReceivedDeathCertificateStepForm';
import InformedAboutBereavementLeaveStepForm from './InformedAboutBereavementLeaveStepForm';
import InfoStepForm from './InfoStepForm';
import KnowsSupportOptionsStepForm from './KnowsSupportOptionsStepForm';
import NeedsHelpApplyingForBereavementLeave from './NeedsHelpApplyingForBereavementLeaveStepForm';
import NeedToPlanFuneralStepForm from './NeedToPlanFuneralStepForm';
import WantsInformationAboutAutopsyStepForm from './WantsInformationAboutAutopsyStepForm';
import WantsToNameChildStepForm from './WantsToNameChildStepForm';
import WeekNumberStepForm from './WeekNumberStepForm';

/**
 * StepForm Component
 * Dynamically renders form fields based on the current onboarding step.
 *
 * @param currentStep The current step identifier
 * @param scenario The scenario of the onboarding
 * @returns
 */
export default function StepForm({ currentStep, scenario }: { currentStep: string; scenario: string }) {
    return (
        <>
            <StepFormContent currentStep={currentStep} scenario={scenario} />
        </>
    );
}

/**
 * Content component for StepForm
 * @param currentStep The current step identifier
 * @returns
 */
const StepFormContent = ({ currentStep, scenario }: { currentStep: string; scenario: string }) => {
    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === scenario);

    if (!currentScenario) {
        return <div>Scenario not found</div>;
    }

    return (
        <div className="pt-8">
            <StepFormFieldsDisplay currentStep={currentStep} scenario={currentScenario} />
        </div>
    );
};

/**
 * Form Display component that renders form fields based on the current step
 * @param currentStep The current step identifier
 * @returns
 */
const StepFormFieldsDisplay = ({ currentStep, scenario }: { currentStep: string; scenario: ScenarioProperties }) => {
    const { updateFormData, updateStep, completeStep } = useOnboarding();

    const submitStep = (data: Record<string, any>) => {
        const currentScenario = scenario?.id;
        updateStep(currentStep, data);
        updateFormData(data);
        completeStep(currentStep, currentScenario, data);
    };

    switch (currentStep) {
        case 'one':
            return <InfoStepForm handleStepSubmit={submitStep} />;
        case 'two':
            return <WeekNumberStepForm handleStepSubmit={submitStep} />;
        case 'three':
            return <WantsToNameChildStepForm handleStepSubmit={submitStep} />;
        case 'four':
            return <NeedToPlanFuneralStepForm handleStepSubmit={submitStep} />;
        case 'five':
            return <HasReceivedDeathCertificateStepForm handleStepSubmit={submitStep} />;
        case 'six':
            return <WantsInformationAboutAutopsyStepForm handleStepSubmit={submitStep} />;
        case 'seven':
            return <HasOtherChildrenAtHomeStepForm handleStepSubmit={submitStep} />;
        case 'eight':
            return <KnowsSupportOptionsStepForm handleStepSubmit={submitStep} />;
        case 'nine':
            return <InformedAboutBereavementLeaveStepForm handleStepSubmit={submitStep} />;
        case 'ten':
            return <NeedsHelpApplyingForBereavementLeave handleStepSubmit={submitStep} />;
        default:
            return <div>Unknown Step</div>;
    }
};
