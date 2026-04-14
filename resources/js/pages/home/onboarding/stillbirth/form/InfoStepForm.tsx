// Dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type StepData = {
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

export default function InfoStepForm({ handleStepSubmit }: FirstStepFormProps) {
  const [step, setStep] = useState<string>('one');
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [ageOfPartner, setAgeOfPartner] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { post, data, setData } = useForm<StepData>({
    name: '',
    age: '',
    ageOfPartner: '',
    gender: '',
  });


  const { onboardingState } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  //
  const currentName = currentStep?.data.name || '';
  const currentAge = currentStep?.data.age || '';
  const currentAgeOfPartner = currentStep?.data.ageOfPartner || '';
  const currentGender = currentStep?.data.gender || '';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await setSubmitted(true);
    await setLoading(true);

    await handleStepSubmit({
      name: name,
      age: age,
      ageOfPartner: ageOfPartner,
      gender: gender
    });

    post(route('onboarding.scenario.step.submit', {
      scenario: onboardingState.currentScenario,
      step: step
    }), {
      onFinish: () => setLoading(false)
    });

    setTimeout(() => {
      setSubmitted(false);

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'two'
      }));
      setLoading(false)
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
        {
          submitted ? (
          <>
            <p className="mt-4 text-green-600">Tak, {name}! Du kan nu fortsætte til næste trin.</p>
          </>
          ) : (
            <>
              <label htmlFor="name" className="block mt-4 mb-2 font-medium text-gray-700">
                Hvad er dit navn ?
              </label>
              <Input
                id="name"
                type="text"
                value={name || currentName}
                onChange={(e) => {
                  setName(e.target.value);
                  setData('name', e.target.value);
                }}
                required
              />
              <label htmlFor="gender" className="block mt-4 mb-2 font-medium text-gray-700">
                Hvad er dit køn ?
              </label>
              <select
                id="gender"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded w-full"
                value={gender || currentGender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setData('gender', e.target.value);
                }}
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
                onChange={(e) => {
                  setAge(e.target.value);
                  setData('age', e.target.value);
                }}
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
                      onChange={(e) => {
                        setAgeOfPartner(e.target.value);
                        setData('ageOfPartner', e.target.value);
                      }}
                      required
                    />
                  </>
                )
              }
              <Button
                type="submit"
                className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
                disabled={!name || !age || !gender || (gender === "male" && !ageOfPartner)}
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