import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface KnowsHealthVisitorScheduleStepFormProps {
    handleStepSubmit: (data: { knowsHealthVisitorSchedule: boolean }) => void;
}

export default function KnowsHealthVisitorScheduleStepForm({ handleStepSubmit }: KnowsHealthVisitorScheduleStepFormProps) {
    const [step] = useState<string>('thirteen');
    const [knowsSchedule, setKnowsSchedule] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [, setSubmitted] = useState<boolean>(false);
    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[12];
    const currentKnows = currentStep?.data.knowsHealthVisitorSchedule;

    const { post, setData, data } = useForm<{ data: { knowsHealthVisitorSchedule: boolean } }>({
        data: { knowsHealthVisitorSchedule: currentKnows ?? false },
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const submittedData = { knowsHealthVisitorSchedule: knowsSchedule ?? currentKnows ?? false };
        setIsLoading(true);
        const nextStep = 'fourteen';

        try {
            handleStepSubmit({ knowsHealthVisitorSchedule: knowsSchedule ?? currentKnows ?? false });

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
                    step: 'thirteen',
                }),
                { onFinish: () => setIsLoading(false) },
            );

            handleStepSubmit(submittedData);

            router.get(
                route('onboarding.scenario.step', {
                    scenario: onboardingState.currentScenario,
                    step: 'fourteen',
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
                            id="schedule-yes"
                            checked={knowsSchedule === true || (knowsSchedule === null && currentKnows === true)}
                            onCheckedChange={(checked) => {
                                setKnowsSchedule(Boolean(checked));
                                setData('data', { knowsHealthVisitorSchedule: Boolean(checked) });
                            }}
                        />
                        <Label htmlFor="schedule-yes" className="ml-2">
                            Ja, jeg kender til besøgsplanen
                        </Label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="schedule-no"
                            checked={knowsSchedule === false || (knowsSchedule === null && currentKnows === false)}
                            onCheckedChange={(checked) => {
                                setKnowsSchedule(!checked);
                                setData('data', { knowsHealthVisitorSchedule: !checked });
                            }}
                        />
                        <Label htmlFor="schedule-no" className="ml-2">
                            Nej, jeg vil gerne have mere information
                        </Label>
                    </div>
                    <Button
                        type="submit"
                        className="mt-4 bg-blue-700 text-white hover:bg-blue-800"
                        disabled={knowsSchedule === null && currentKnows === undefined}
                    >
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}
