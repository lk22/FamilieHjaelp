import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

interface StepData {
  placedLocation: string;
}

interface FirstStepFormProps {
  handleStepSubmit: (data: {
    placedLocation: string;
  }) => void;
}

export default function PlacedLocationStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [placedLocation, setPlacedLocation] = useState<string>('');
  const [step, setStep] = useState<string>('one');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario, completeStep } = useOnboarding();

  const currentScenario = getCurrentScenario();

  // TODO: this needs fix
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentPlacedLocation = currentStep?.data.placedLocation || '';

  const { data, setData, post, processing, errors } = useForm<{
    name: string;
    age: string;
    ageOfPartner: string;
    gender: string;
  }>({
    name: '',
    age: '',
    ageOfPartner: '',
    gender: ''
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submittedData: StepData = {
      placedLocation: placedLocation,
    }

    console.log(submittedData)

    // Proceed to the next step or perform other actions
    handleStepSubmit({ ...submittedData });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'four'
      }));
    }, 1000);
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
      <form onSubmit={handleSubmit}>
        {
          submitted ? (
          <>
            <p className="mt-4 text-green-600">Tak, {name}! Du kan nu fortsætte til næste trin.</p>
          </>
          ) : (
            <>
            <input type="hidden" name="step" value={step} />
              <label htmlFor="name" className="block mt-4 mb-2 font-medium text-gray-700">
                Hvad er dit navn ?
              </label>
              <Checkbox
                id="placed-location-home"
                value="not_at_hospital"
                checked={placedLocation === 'not_at_hospital'}
                onChange={(e) => setPlacedLocation(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="placed-location-home" className="mr-4">Er ikke på hospitalet</label>
              <Checkbox
                id="placed-location-home"
                value="at_hospital"
                checked={placedLocation === 'at_hospital'}
                onChange={(e) => setPlacedLocation(e.target.value)}
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