import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface HasReturnedHomeStepFormProps {
    handleStepSubmit: (data: { hasReturnedHome: boolean }) => void;
}

export default function HasReturnedHomeStepForm({ handleStepSubmit }: HasReturnedHomeStepFormProps) {
    const [hasReturnedHome, setHasReturnedHome] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[1];
    const currentHasReturnedHome = currentStep?.data.hasReturnedHome;

    const { post, setData } = useForm<{ data: { hasReturnedHome: boolean } }>({
        data: { hasReturnedHome: currentHasReturnedHome ?? false },
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const submittedData = { hasReturnedHome: hasReturnedHome ?? currentHasReturnedHome ?? false };
        setIsLoading(true);

        try {
            await post(
                route('onboarding.scenario.step.submit', {
                    scenario: onboardingState.currentScenario,
                    step: 'two',
                }),
                { onFinish: () => setIsLoading(false) },
            );

            handleStepSubmit(submittedData);

            router.get(
                route('onboarding.scenario.step', {
                    scenario: onboardingState.currentScenario,
                    step: 'three',
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
                            id="has-returned-home-yes"
                            checked={hasReturnedHome === true || (hasReturnedHome === null && currentHasReturnedHome === true)}
                            onCheckedChange={(checked) => {
                                setHasReturnedHome(Boolean(checked));
                                setData('data', { hasReturnedHome: Boolean(checked) });
                            }}
                        />
                        <Label htmlFor="has-returned-home-yes" className="ml-2">
                            Ja, vi er kommet hjem
                        </Label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="has-returned-home-no"
                            checked={hasReturnedHome === false || (hasReturnedHome === null && currentHasReturnedHome === false)}
                            onCheckedChange={(checked) => {
                                setHasReturnedHome(!checked);
                                setData('data', { hasReturnedHome: !checked });
                            }}
                        />
                        <Label htmlFor="has-returned-home-no" className="ml-2">
                            Nej, vi er stadig på hospitalet
                        </Label>
                    </div>
                    <Button
                        type="submit"
                        className="mt-4 bg-blue-700 text-white hover:bg-blue-800"
                        disabled={hasReturnedHome === null && currentHasReturnedHome === undefined}
                    >
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}
