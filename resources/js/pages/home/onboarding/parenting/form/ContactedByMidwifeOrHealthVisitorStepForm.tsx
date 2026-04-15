import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface ContactedByMidwifeOrHealthVisitorStepFormProps {
    handleStepSubmit: (data: { contactedByMidwifeOrHealthVisitor: boolean }) => void;
}

export default function ContactedByMidwifeOrHealthVisitorStepForm({ handleStepSubmit }: ContactedByMidwifeOrHealthVisitorStepFormProps) {
    const [contactedByMidwifeOrHealthVisitor, setContactedByMidwifeOrHealthVisitor] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [step, setStep] = useState<string>('four');
    const [nextStep, setNextStep] = useState<string>('');

    const { onboardingState } = useOnboarding();
    const currentScenario = onboardingState.scenarios.find((s) => s.id === onboardingState.currentScenario);
    const currentStep = currentScenario?.steps[3];
    const currentContacted = currentStep?.data.contactedByMidwifeOrHealthVisitor;

    const { post, setData, data } = useForm<{
        data: { contactedByMidwifeOrHealthVisitor: boolean } }>
    ({
        data: { contactedByMidwifeOrHealthVisitor: currentContacted ?? false },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setSubmitted(true);
        const nextStep = 'five';

        try {
            handleStepSubmit({ contactedByMidwifeOrHealthVisitor: contactedByMidwifeOrHealthVisitor ?? currentContacted ?? false });

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
                            id="contacted-yes"
                            checked={
                                contactedByMidwifeOrHealthVisitor === true ||
                                (contactedByMidwifeOrHealthVisitor === null && currentContacted === true)
                            }
                            onCheckedChange={(checked) => {
                                setContactedByMidwifeOrHealthVisitor(Boolean(checked));
                                setData('data', { contactedByMidwifeOrHealthVisitor: Boolean(checked) });
                            }}
                        />
                        <Label htmlFor="contacted-yes" className="ml-2">
                            Ja, de har kontaktet os
                        </Label>
                    </div>
                    <div className="mb-4 flex items-center">
                        <Checkbox
                            id="contacted-no"
                            checked={
                                contactedByMidwifeOrHealthVisitor === false ||
                                (contactedByMidwifeOrHealthVisitor === null && currentContacted === false)
                            }
                            onCheckedChange={(checked) => {
                                setContactedByMidwifeOrHealthVisitor(!checked);
                                setData('data', { contactedByMidwifeOrHealthVisitor: !checked });
                            }}
                        />
                        <Label htmlFor="contacted-no" className="ml-2">
                            Nej, vi har endnu ikke hørt fra dem
                        </Label>
                    </div>
                    {contactedByMidwifeOrHealthVisitor === false && (
                        <p className="mt-2 text-sm text-yellow-600">
                            Jordemoder kontakter jer dag 2-3 efter fødsel, og sundhedsplejersken dag 4-5. Hvis de ikke har ringet, skal I selv tage
                            kontakt.
                        </p>
                    )}
                    <Button
                        type="submit"
                        className="mt-4 bg-blue-700 text-white hover:bg-blue-800"
                        disabled={contactedByMidwifeOrHealthVisitor === null && currentContacted === undefined}
                    >
                        Næste
                    </Button>
                </>
            )}
        </form>
    );
}
