import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from '@inertiajs/react';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { router } from '@inertiajs/react';

interface StepData {
  name: string;
  age: string;
  ageOfPartner: string;
  gender: string;
}

interface FirstStepFormProps {
  handleStepSubmit: (data: {
    name: string;
    age: string;
    ageOfPartner: string;
    gender: string
  }) => void;
}

export default function FirstStepForm({ handleStepSubmit }: FirstStepFormProps) {
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

  const currentName = currentStep?.data.name || '';
  const currentAge = currentStep?.data.age || '';
  const currentAgeOfPartner = currentStep?.data.ageOfPartner || '';
  const currentGender = currentStep?.data.gender || '';

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
      name,
      age,
      ageOfPartner,
      gender,
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
    }, 1000);
  };

  const handleStepChange = (step: string) => {
    setStep(step);
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
              <Input
                id="name"
                type="text"
                value={name || currentName}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="gender" className="block mt-4 mb-2 font-medium text-gray-700">
                Hvad er dit køn ?
              </label>
              <select
                id="gender"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded w-full"
                value={gender || currentGender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Vælg køn</option>
                <option value="female">Kvinde</option>
                <option value="male">Mand</option>
                <option value="other">Andet</option>
              </select>
              <label htmlFor="age" className="block mt-4 mb-2 font-medium text-gray-700">
                Hvor gammel er du ?
              </label>
              <Input
                id="age"
                type="text"
                value={age || currentAge}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              {
                gender == "male" && (
                  <>

                  <p className="mt-4 font-bold">Vi skal kende din alder på din partner, da din partner skal i gennem flere ting og processer.</p>
                    <label htmlFor="age" className="block mt-1 mb-2 font-medium text-gray-700">
                      Hvor gammel er din partner ?
                    </label>
                    <Input
                      id="age"
                      type="text"
                      value={ageOfPartner || currentAgeOfPartner}
                      onChange={(e) => setAgeOfPartner(e.target.value)}
                      required
                    />
                  </>
                )
              }
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