import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface HasPlannedParentalLeaveWithEmployerStepFormProps {
    handleStepSubmit: (data: { hasPlannedParentalLeaveWithEmployer: boolean; hasPlannedParentalLeaveWithEmployerStartDate?: string }) => void;
}

export default function HasPlannedParentalLeaveWithEmployerStepForm({ handleStepSubmit }: HasPlannedParentalLeaveWithEmployerStepFormProps) {
    const [step] = useState<string>('twelve');
    const [hasPlanned, setHasPlanned] = useState<boolean | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [, setSubmitted] = useState<boolean>(false);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[11];
    const currentHasPlanned = currentStep?.data.hasPlannedParentalLeaveWithEmployer;
    const currentStartDate = currentStep?.data.hasPlannedParentalLeaveWithEmployerStartDate;

    const { post, setData, data } = useForm<{
        data: {
            hasPlannedParentalLeaveWithEmployer: boolean;
            hasPlannedParentalLeaveWithEmployerStartDate?: string;
        };
    }>({
        data: {
            hasPlannedParentalLeaveWithEmployer: currentHasPlanned ?? false,
            hasPlannedParentalLeaveWithEmployerStartDate: currentStartDate,
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setSubmitted(true);
        const nextStep = 'thirteen';

        try {
            handleStepSubmit({
                hasPlannedParentalLeaveWithEmployer: hasPlanned ?? currentHasPlanned ?? false,
                hasPlannedParentalLeaveWithEmployerStartDate: startDate || currentStartDate || undefined,
            });

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
                            id="parental-leave-employer-yes"
                            checked={hasPlanned === true || (hasPlanned === null && currentHasPlanned === true)}
                            onCheckedChange={(checked) => {
                                setHasPlanned(Boolean(checked));
                                setData('data', {
                                    hasPlannedParentalLeaveWithEmployer: Boolean(checked),
                                    hasPlannedParentalLeaveWithEmployerStartDate: startDate || currentStartDate,
                                });
                            }}
                        />
                        <Label htmlFor="parental-leave-employer-yes" className="ml-2">
                            Ja, vi har planlagt barsel med vores arbejdsgivere
                        </Label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="parental-leave-employer-no"
                            checked={hasPlanned === false || (hasPlanned === null && currentHasPlanned === false)}
                            onCheckedChange={(checked) => {
                                setHasPlanned(!checked);
                                setData('data', {
                                    hasPlannedParentalLeaveWithEmployer: !checked,
                                    hasPlannedParentalLeaveWithEmployerStartDate: startDate || currentStartDate,
                                });
                            }}
                        />
                        <Label htmlFor="parental-leave-employer-no" className="ml-2">
                            Nej, vi har ikke planlagt det endnu
                        </Label>
                    </div>
                    {hasPlanned === true && (
                        <div className="mt-4">
                            <Label htmlFor="parental-leave-start-date" className="mb-2 block">
                                Hvornår starter jeres barsel?
                            </Label>
                            <Input
                                type="date"
                                id="parental-leave-start-date"
                                value={startDate || currentStartDate || ''}
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                    setData('data', {
                                        hasPlannedParentalLeaveWithEmployer: hasPlanned ?? currentHasPlanned ?? true,
                                        hasPlannedParentalLeaveWithEmployerStartDate: e.target.value,
                                    });
                                }}
                                className="w-full"
                            />
                        </div>
                    )}
                    {hasPlanned === false && (
                        <p className="mt-2 text-sm text-yellow-600">Tal med jeres arbejdsgivere i god tid, så I kan få den orlov I har ret til.</p>
                    )}
                    <Button
                        type="submit"
                        className="mt-4 bg-blue-700 text-white hover:bg-blue-800"
                        disabled={hasPlanned === null && currentHasPlanned === undefined}
                    >
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}
