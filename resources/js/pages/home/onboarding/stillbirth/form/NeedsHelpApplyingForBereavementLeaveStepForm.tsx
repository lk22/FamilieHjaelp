// Dependencies
import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CompletedModal from '@/components/Onboarding/Modals/CompletedModal';

type StepData = {
  data: {
    needsHelpApplyingForBereavementLeave: boolean;
  }
}

type SubmittedStepData = {
  needsHelpApplyingForBereavementLeave: boolean;
}

interface FirstStepFormProps {
  handleStepSubmit: (data: SubmittedStepData) => void;
}

export default function NeedsHelpApplyingForBereavementLeaveStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [step] = useState<string>('ten');
  const [needsHelpApplyingForBereavementLeave, setNeedsHelpApplyingForBereavementLeave] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { post, data, setData } = useForm<StepData>({
    data: { needsHelpApplyingForBereavementLeave: false },
  });

  const { onboardingState } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentNeedsHelpApplyingForBereavementLeave = currentStep?.data.needsHelpApplyingForBereavementLeave;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setIsLoading(true);
    const nextStep = 'eleven';

    try {
        handleStepSubmit({ needsHelpApplyingForBereavementLeave: needsHelpApplyingForBereavementLeave });

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
            <p className="mt-4 text-green-600">Indsendt</p>
            <CompletedModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
          </>
          ) : (
            <>
              <div className="flex items-center">
                <Checkbox
                  id="needsHelpApplyingForBereavementLeave"
                  checked={needsHelpApplyingForBereavementLeave || currentNeedsHelpApplyingForBereavementLeave === true}
                  onCheckedChange={(checked) => {
                    setNeedsHelpApplyingForBereavementLeave(Boolean(checked));
                    setData('data', { ...data.data, needsHelpApplyingForBereavementLeave: Boolean(checked) });
                  }}
                  className="mr-2"
                >
                  Ja, jeg ønsker hjælp til at ansøge om sorgorlov
                </Checkbox>
                <label htmlFor="needsHelpApplyingForBereavementLeave" className="block mt-4 mb-2 font-medium text-gray-700">
                  Ja, jeg ønsker hjælp til at ansøge om sorgorlov
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="needsHelpApplyingForBereavementLeaveNo"
                  checked={!needsHelpApplyingForBereavementLeave || currentNeedsHelpApplyingForBereavementLeave === false}
                  onCheckedChange={(checked) => {
                    setNeedsHelpApplyingForBereavementLeave(!checked);
                    setData('data', { ...data.data, needsHelpApplyingForBereavementLeave: !checked });
                  }}
                  className="mr-2"
                />
                <label htmlFor="needsHelpApplyingForBereavementLeaveNo" className="block mt-4 mb-2 font-medium text-gray-700">
                  Nej, jeg ønsker ikke hjælp til at ansøge om sorgorlov
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