import { useOnboarding } from "@/contexts/OnboardingContext";
import FirstStepForm from "@/pages/home/onboarding/abortion/form/FirstStepForm";
import {useForm} from "@inertiajs/react";

/**
 * StepForm Component
 * Dynamically renders form fields based on the current onboarding step.
 *
 * @param currentStep The current step identifier
 * @param scenario The scenario of the onboarding
 * @param onboardingSession The onboarding session data
 * @returns
 */
export default function StepForm({
    currentStep,
    scenario,
}: {
    currentStep: string,
    scenario: string
}) {
    return (
        <div className="container max-w-[960px] px-4 py-8 mx-auto">
            <StepFormContent currentStep={currentStep} scenario={scenario}/>
        </div>
    );
}

/**
 * Content component for StepForm
 * @param currentStep The current step identifier
 * @returns
 */
const StepFormContent = ({
    currentStep,
    scenario}: {
    currentStep: string;
    scenario: string
}) => {
    const {onboardingState} = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === scenario);
    const stepQuestion = currentScenario?.steps.find((s) => s.stepName === currentStep);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">{stepQuestion?.question}</h2>
            <StepFormFieldsDisplay currentStep={currentStep} scenario={scenario}/>
        </div>
    )
}

/**
 * Form Display component that renders form fields based on the current step
 * @param currentStep The current step identifier
 * @returns
 */
const StepFormFieldsDisplay = ({
    currentStep,
    scenario
}: {
    currentStep: string;
    scenario: string;
}) => {
    const {onboardingState, updateFormData, updateStep, completeStep} = useOnboarding();
    const {data, setData, post, processing, errors} = useForm<{
        step: string;
        scenario: string;
        session_token: string;
        data: Record<string, any>;
    }>({
        step: currentStep,
        scenario: scenario,
        session_token: onboardingState.token || '',
        data: {},
    });

    const submitStep = (data: Record<string, any>) => {
        // setting form data for submission
        setData('data', data);

        // updating the onboarding state context
        updateStep(currentStep, data);
        updateFormData(data);
        completeStep(currentStep);

        console.log('Updated onboardingState:', onboardingState);

        // TODO send the data to the backend or handle it as needed
        // post(route('onboarding.scenario.update-step', { scenario: scenario, step: currentStep }), {
        //     onSuccess: () => {
        //         console.log('Step submitted successfully');
        //     }
        // });
    }

    switch (currentStep) {
        case 'one':
            return <FirstStepForm handleStepSubmit={submitStep} />;
        case 'two':
            return <div>Form Fields for Step Two</div>;
        case 'three':
            return <div>Form Fields for Step Three</div>;
        default:
            return <div>Unknown Step</div>;
    }
}