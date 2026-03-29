import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface WantsToJoinParentGroupsStepFormProps {
    handleStepSubmit: (data: { wantsToJoinParentGroups: boolean }) => void;
}

export default function WantsToJoinParentGroupsStepForm({ handleStepSubmit }: WantsToJoinParentGroupsStepFormProps) {
    const [wantsToJoin, setWantsToJoin] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[9];
    const currentWantsToJoin = currentStep?.data.wantsToJoinParentGroups;

    const { post, setData } = useForm<{ data: { wantsToJoinParentGroups: boolean } }>({
        data: { wantsToJoinParentGroups: currentWantsToJoin ?? false },
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const submittedData = { wantsToJoinParentGroups: wantsToJoin ?? currentWantsToJoin ?? false };
        setIsLoading(true);

        try {
            await post(
                route('onboarding.scenario.step.submit', {
                    scenario: onboardingState.currentScenario,
                    step: 'ten',
                }),
                { onFinish: () => setIsLoading(false) },
            );

            handleStepSubmit(submittedData);

            router.get(
                route('onboarding.scenario.step', {
                    scenario: onboardingState.currentScenario,
                    step: 'eleven',
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
                            id="parent-group-yes"
                            checked={wantsToJoin === true || (wantsToJoin === null && currentWantsToJoin === true)}
                            onCheckedChange={(checked) => {
                                setWantsToJoin(Boolean(checked));
                                setData('data', { wantsToJoinParentGroups: Boolean(checked) });
                            }}
                        />
                        <Label htmlFor="parent-group-yes" className="ml-2">
                            Ja, vi vil gerne deltage i en gruppe
                        </Label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="parent-group-no"
                            checked={wantsToJoin === false || (wantsToJoin === null && currentWantsToJoin === false)}
                            onCheckedChange={(checked) => {
                                setWantsToJoin(!checked);
                                setData('data', { wantsToJoinParentGroups: !checked });
                            }}
                        />
                        <Label htmlFor="parent-group-no" className="ml-2">
                            Nej tak, ikke lige nu
                        </Label>
                    </div>
                    <Button
                        type="submit"
                        className="mt-4 bg-blue-700 text-white hover:bg-blue-800"
                        disabled={wantsToJoin === null && currentWantsToJoin === undefined}
                    >
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}
