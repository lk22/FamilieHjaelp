// dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface NeedToPlanFuneralStepFormProps {
  handleStepSubmit: (data: {
    needToPlanFuneral: boolean;
  }) => void;
}

export default function NeedToPlanFuneralStepForm({ handleStepSubmit }: NeedToPlanFuneralStepFormProps) {
  const [step, setStep] = useState<string>('four');
  const [nextStep, setNextStep] = useState<string>('');
  const [needToPlanFuneral, setNeedToPlanFuneral] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onboardingState } = useOnboarding();

  const { post, data, setData } = useForm<{
    data: { needToPlanFuneral: boolean; };
  }>({
    data: { needToPlanFuneral: false },
  });

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentNeedToPlanFuneral: boolean = currentStep?.data.needToPlanFuneral;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setIsLoading(true);
    const nextStep = 'five';

    try {
        handleStepSubmit({ needToPlanFuneral: needToPlanFuneral });

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
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
        {
          submitted ? (
          <>
            <p className="mt-4 text-green-600">Indsendt!</p>
          </>
          ) : (
            <>
              <div className="flex items-center">
                <Checkbox
                  id="need-to-plan-funeral-yes"
                  checked={needToPlanFuneral || currentNeedToPlanFuneral === true}
                  onCheckedChange={(checked) => {
                    setNeedToPlanFuneral(Boolean(checked));
                    setData('data', { ...data.data, needToPlanFuneral: Boolean(checked) });
                  }}
                  className="mr-2 mb-4"
                >
                  Ja, jeg har brug for at planlægge en begravelse
                </Checkbox>
                <label htmlFor="need-to-plan-funeral-yes" className="block mt-2 mb-2 font-medium text-gray-700">
                  Ja, jeg har brug for at planlægge en begravelse
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="need-to-plan-funeral-no"
                  name="need-to-plan-funeral-no"
                  checked={!needToPlanFuneral || currentNeedToPlanFuneral === false}
                  onCheckedChange={(checked) => {
                    setNeedToPlanFuneral(!checked);
                    setData('data', { ...data.data, needToPlanFuneral: !checked });
                  }}
                  className="mr-2"
                >
                  Nej, jeg har ikke brug for at planlægge en begravelse
                </Checkbox>
                <label htmlFor="need-to-plan-funeral-no" className="block mt-2 mb-2 font-medium text-gray-700">
                  Nej, jeg har ikke brug for at planlægge en begravelse
                </label>
              </div>
              <Button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
              >
                Næste
              </Button>
            </>
          )
        }
      </form>
    </>
  )
}