import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface NeedsInfoOnParentalLeaveStepFormProps {
    handleStepSubmit: (data: { needsInfoOnParentalLeave: boolean }) => void;
}

export default function NeedsInfoOnParentalLeaveStepForm({ handleStepSubmit }: NeedsInfoOnParentalLeaveStepFormProps) {
    const [step, setStep] = useState<string>('six');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [needsInfoOnParentalLeave, setNeedsInfoOnParentalLeave] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[5];
    const currentNeedsInfo = currentStep?.data.needsInfoOnParentalLeave;

    const { post, setData, data } = useForm<{ data: { needsInfoOnParentalLeave: boolean } }>({
        data: { needsInfoOnParentalLeave: currentNeedsInfo ?? false },
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const submittedData = { needsInfoOnParentalLeave: needsInfoOnParentalLeave ?? currentNeedsInfo ?? false };
        setIsLoading(true);
        setSubmitted(true);
        const nextStep = 'seven';

        try {
            handleStepSubmit({ needsInfoOnParentalLeave: needsInfoOnParentalLeave ?? currentNeedsInfo ?? false });

            post(route('onboarding.scenario.step.submit', {
                scenario: onboardingState.currentScenario,
                step: step,
                nextStep: nextStep
            }), {
                onFinish: () => setIsLoading(false),
                onError: () => {
                    setIsLoading(false);
                    setSubmitted(false);
                    console.log('Error submitting form:', data);
                },
                onSuccess: () => {
                    setIsLoading(false);
                    setSubmitted(false);
                    router.get(route('onboarding.scenario.step', {
                        scenario: onboardingState.currentScenario,
                        step: nextStep
                    }));
                }
            });
        } catch (error) {
            console.error('Error submitting step:', error);
            setIsLoading(false);
            setSubmitted(false);
        }

        try {
            await post(
                route('onboarding.scenario.step.submit', {
                    scenario: onboardingState.currentScenario,
                    step: 'six',
                }),
                { onFinish: () => setIsLoading(false) },
            );

            handleStepSubmit(submittedData);

            router.get(
                route('onboarding.scenario.step', {
                    scenario: onboardingState.currentScenario,
                    step: 'seven',
                }),
            );
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={isLoading ? '' : 'animate animate-appear'}>
            {isLoading ? (
                <div className="bg-opacity-75 inset-0 z-50 flex items-center justify-center bg-white">
                    <div className="loader h-16 w-16 rounded-full border-8 border-t-8 border-blue-700 ease-linear"></div>
                </div>
            ) : (
                <>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="parental-leave-info-yes"
                            checked={needsInfoOnParentalLeave === true || (needsInfoOnParentalLeave === null && currentNeedsInfo === true)}
                            onCheckedChange={(checked) => {
                                setNeedsInfoOnParentalLeave(Boolean(checked));
                                setData('data', { needsInfoOnParentalLeave: Boolean(checked) });
                            }}
                        />
                        <Label htmlFor="parental-leave-info-yes" className="ml-2">
                            Ja, jeg vil gerne have mere information
                        </Label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="parental-leave-info-no"
                            checked={needsInfoOnParentalLeave === false || (needsInfoOnParentalLeave === null && currentNeedsInfo === false)}
                            onCheckedChange={(checked) => {
                                setNeedsInfoOnParentalLeave(!checked);
                                setData('data', { needsInfoOnParentalLeave: !checked });
                            }}
                        />
                        <Label htmlFor="parental-leave-info-no" className="ml-2">
                            Nej, jeg kender allerede mine rettigheder
                        </Label>
                    </div>
                    <Button
                        type="submit"
                        className="mt-4 bg-blue-700 text-white hover:bg-blue-800"
                        disabled={needsInfoOnParentalLeave === null && currentNeedsInfo === undefined}
                    >
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}
