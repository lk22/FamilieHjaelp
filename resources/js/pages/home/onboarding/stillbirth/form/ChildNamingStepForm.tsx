// Dependencies
import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface FirstStepFormProps {
  handleStepSubmit: (data: {
    placedLocation: string;
  }) => void;
}

export default function ChildNamigStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [step, setStep] = useState<string>('one');
  const [placedLocation, setPlacedLocation] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario, completeStep } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find((scenario) => scenario.id === onboardingState.currentScenario);

  // TODO: this needs fix
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentPlacedLocation = currentStep?.data.placedLocation || '';

  const { data, setData, post, processing } = useForm<{
    data: {
      placedLocation: string;
    }
  }>({
    data: {
      placedLocation: '',
    }
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setIsLoading(true);
    const nextStep = 'two';

    try {
        handleStepSubmit({ placedLocation: placedLocation });

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

  /**
   * Getting current placed location from defined state
   *
   * @return JSX.Element
   */
  const getCurrentPlacedLocation = () => {
    if ( ! currentPlacedLocation ) return;

    if (currentPlacedLocation === "not_at_hospital") {
      return <p>Du har angivet at du ikke befinder dig på hospitalet</p>
    }

    if ( currentPlacedLocation === "at_hospital" ) {
      return <p>Du har angivet at du befinder dig på hospitalet</p>
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
        {
          submitted ? (
          <>
            <p className="mt-4 text-green-600">Tak, {data.data.name}! Du kan nu fortsætte til næste trin.</p>
          </>
          ) : (
            <>
            <input type="hidden" name="step" value={step} />
              <label htmlFor="name" className="block mt-4 mb-2 font-medium text-gray-700">
                Hvor befinder du dig lige nu?
              </label>
              <Checkbox
                id="placed-location-home"
                value="not_at_hospital"
                checked={placedLocation === 'not_at_hospital'}
                onChange={(e) => {
                  setPlacedLocation(e.target.value);
                  setData('data', { placedLocation: e.target.value });
                }}
                className="mr-2"
              />
              <label htmlFor="placed-location-home" className="mr-4">Er ikke på hospitalet</label>
              <Checkbox
                id="placed-location-home"
                value="at_hospital"
                checked={placedLocation === 'at_hospital'}
                onChange={(e) => {
                  setPlacedLocation(e.target.value);
                  setData('data', { placedLocation: e.target.value });
                }}
                className="mr-2"
              />
              <label htmlFor="placed-location-hospital" className="mr-4">Er på hospitalet</label>
              <div className="divider">
                {currentPlacedLocation && getCurrentPlacedLocation()}
              </div>
              <Button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
                disabled={processing}
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