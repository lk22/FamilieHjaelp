import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface NeedsSupportForPostpartumIssuesStepFormProps {
    handleStepSubmit: (data: { needsSupportForPostpartumIssues: boolean }) => void;
}

export default function NeedsSupportForPostpartumIssuesStepForm({ handleStepSubmit }: NeedsSupportForPostpartumIssuesStepFormProps) {
    const [needsSupport, setNeedsSupport] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[8];
    const currentNeedsSupport = currentStep?.data.needsSupportForPostpartumIssues;

    const { post, setData } = useForm<{ data: { needsSupportForPostpartumIssues: boolean } }>({
        data: { needsSupportForPostpartumIssues: currentNeedsSupport ?? false },
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const submittedData = { needsSupportForPostpartumIssues: needsSupport ?? currentNeedsSupport ?? false };
        setIsLoading(true);

        try {
            await post(
                route('onboarding.scenario.step.submit', {
                    scenario: onboardingState.currentScenario,
                    step: 'nine',
                }),
                { onFinish: () => setIsLoading(false) },
            );

            handleStepSubmit(submittedData);

            router.get(
                route('onboarding.scenario.step', {
                    scenario: onboardingState.currentScenario,
                    step: 'ten',
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
                            id="postpartum-support-yes"
                            checked={needsSupport === true || (needsSupport === null && currentNeedsSupport === true)}
                            onCheckedChange={(checked) => {
                                setNeedsSupport(Boolean(checked));
                                setData('data', { needsSupportForPostpartumIssues: Boolean(checked) });
                            }}
                        />
                        <Label htmlFor="postpartum-support-yes" className="ml-2">
                            Ja, jeg har brug for støtte
                        </Label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="postpartum-support-no"
                            checked={needsSupport === false || (needsSupport === null && currentNeedsSupport === false)}
                            onCheckedChange={(checked) => {
                                setNeedsSupport(!checked);
                                setData('data', { needsSupportForPostpartumIssues: !checked });
                            }}
                        />
                        <Label htmlFor="postpartum-support-no" className="ml-2">
                            Nej, det går fint
                        </Label>
                    </div>
                    {needsSupport === true && (
                        <p className="mt-2 text-sm text-blue-600">Kontakt sundhedsplejersken eller din læge for at få hjælp og støtte.</p>
                    )}
                    <Button
                        type="submit"
                        className="mt-4 bg-blue-700 text-white hover:bg-blue-800"
                        disabled={needsSupport === null && currentNeedsSupport === undefined}
                    >
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}
