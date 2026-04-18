// Dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Contexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "radix-ui";
import { SelectItem } from '@/components/ui/select';

type StepData = {
  data: {
    name: string;
    age: string;
    ageOfPartner: string;
    gender: string;
  }
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { post, data, setData } = useForm<StepData>({
    data: {
      name: '',
      age: '',
      ageOfPartner: '',
      gender: '',
    }
  });

  const { onboardingState } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find(scenario => scenario.id === onboardingState.currentScenario);
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentName = currentStep?.data.name || '';
  const currentAge = currentStep?.data.age || '';
  const currentAgeOfPartner = currentStep?.data.ageOfPartner || '';
  const currentGender = currentStep?.data.gender || '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setIsLoading(true);
    const nextStep = 'two';

    try {
        handleStepSubmit({
          name: name || currentName,
          age: age || currentAge,
          ageOfPartner: ageOfPartner || currentAgeOfPartner,
          gender: gender || currentGender
        });

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
                  setData('data', { ...data.data, name: e.target.value });
                }}
                required
              />
              <label htmlFor="gender" className="block mt-4 mb-2 font-medium text-gray-700">
                Hvad er dit køn ?
              </label>

              <Select.Root onValueChange={(value) => {
                setGender(value);
                setData('data', {
                  ...data.data, gender: value
                })
              }}>
                <Select.Trigger className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded">
                  <Select.Value placeholder="Vælg køn" />
                </Select.Trigger>
                <Select.Content className="bg-white border border-gray-300 rounded mt-1 w-full">
                  <SelectItem value="female" className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full">
                    Kvinde
                  </SelectItem>
                  <SelectItem value="male" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Mand
                  </SelectItem>
                  <SelectItem value="other" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Andet
                  </SelectItem>
                </Select.Content>
              </Select.Root>

              <label htmlFor="age" className="block mt-4 mb-2 font-medium text-gray-700">
                Hvor gammel er du ?
              </label>
              <Input
                id="age"
                type="text"
                value={age || currentAge}
                onChange={(e) => {
                  setAge(e.target.value);
                  setData('data', { ...data.data, age: e.target.value });
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
                        setData('data', { ...data.data, ageOfPartner: e.target.value });
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