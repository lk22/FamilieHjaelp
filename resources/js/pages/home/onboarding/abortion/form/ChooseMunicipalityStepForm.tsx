import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

type StepData = {
  miunicipatility: string;
}

type UserInformationProps = {
  handleStepSubmit: (data: {
    municipality: string;
  }) => void;
}

export default function UserInformationStepForm({ handleStepSubmit }: UserInformationProps) {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [ageOfPartner, setAgeOfPartner] = useState<string>('');
  const [step, setStep] = useState<string>('one');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { onboardingState, getCurrentScenario, completeStep } = useOnboarding();

  const currentScenario = getCurrentScenario();

  // TODO: this needs fix
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentMunicipality = currentStep?.data.municipality || '';

  const { data, setData, post, processing, errors } = useForm<{
    municipality: string;
  }>({
    municipality: ''
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submittedData: StepData = {
      miunicipatility: data.municipality,
    }

    console.log(submittedData)

    // Proceed to the next step or perform other actions
    handleStepSubmit({ ...submittedData });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'two'
      }));
    }, 3000);
  };

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
              <label htmlFor="gender" className="block mt-4 mb-2 font-semibold text-gray-700">
                Hvad er dit køn ?
              </label>
              <select
                id="municipality"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded w-full"
                value={data.municipality || currentMunicipality}
                onChange={(e) => setData('municipality', e.target.value)}
                required
              >
                <option value="">Vælg køn</option>
                <option value="female">Kvinde</option>
                <option value="male">Mand</option>
                <option value="other">Andet</option>
              </select>
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