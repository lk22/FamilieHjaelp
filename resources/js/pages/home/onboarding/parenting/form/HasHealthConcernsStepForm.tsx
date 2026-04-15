import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { TextArea } from '@/components/ui/textarea';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface HasHealthConcernsStepFormProps {
    handleStepSubmit: (data: { hasHealthConcerns: boolean; healthConcernsDescription?: string }) => void;
}

export default function HasHealthConcernsStepForm({ handleStepSubmit }: HasHealthConcernsStepFormProps) {
    const [step, setStep] = useState<string>('thirteen');
    const [hasHealthConcerns, setHasHealthConcerns] = useState<boolean | null>(null);
    const [description, setDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[13];
    const currentHasConcerns = currentStep?.data.hasHealthConcerns;

    const { post, data, setData } = useForm<{
        data: { hasHealthConcerns: boolean; healthConcernsDescription?: string };
    }>({
        data: { hasHealthConcerns: currentHasConcerns ?? false },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setSubmitted(true);
        const nextStep = 'fifteen';

        try {
            handleStepSubmit({ hasHealthConcerns: hasHealthConcerns ?? currentHasConcerns ?? false, healthConcernsDescription: description });

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
                            id="health-concerns-yes"
                            checked={hasHealthConcerns === true || (hasHealthConcerns === null && currentHasConcerns === true)}
                            onCheckedChange={(checked) => {
                                setHasHealthConcerns(Boolean(checked));
                                setData('data', { hasHealthConcerns: Boolean(checked), healthConcernsDescription: description });
                            }}
                        />
                        <Label htmlFor="health-concerns-yes" className="ml-2">
                            Ja, vi har bekymringer
                        </Label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="health-concerns-no"
                            checked={hasHealthConcerns === false || (hasHealthConcerns === null && currentHasConcerns === false)}
                            onCheckedChange={(checked) => {
                                setHasHealthConcerns(!checked);
                                setData('data', { hasHealthConcerns: !checked, healthConcernsDescription: description });
                            }}
                        />
                        <Label htmlFor="health-concerns-no" className="ml-2">
                            Nej, alt ser fint ud
                        </Label>
                    </div>
                    {hasHealthConcerns === true && (
                        <div className="mt-4">
                            <Label htmlFor="concerns-description" className="mb-2 block">
                                Fortæl os mere om jeres bekymringer:
                            </Label>
                            <TextArea
                                id="concerns-description"
                                value={description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setDescription(e.target.value);
                                    setData('data', {
                                        hasHealthConcerns: hasHealthConcerns ?? currentHasConcerns ?? true,
                                        healthConcernsDescription: e.target.value,
                                    });
                                }}
                                placeholder="Beskriv jeres bekymringer..."
                                className="w-full"
                                rows={4}
                            />
                        </div>
                    )}
                    {hasHealthConcerns === true && (
                        <p className="mt-2 text-sm text-blue-600">Kontakt sundhedsplejersken eller lægen for at få hjælp med jeres bekymringer.</p>
                    )}
                    <Button type="submit" className="mt-4 bg-blue-700 text-white hover:bg-blue-800">
                        Afslut
                    </Button>
                </>
            )}
        </form>
    );
}
