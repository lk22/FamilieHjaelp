// dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Conexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// componenets
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "radix-ui";

// Utilities
import { logState } from '@/lib/utils'
import { SelectItem } from '@/components/ui/select';

type StepData = {
  data: {
    name: string;
    age: number;
    ageOfPartner: number;
    gender: string;
  }
}

type UserInformationProps = {
  handleStepSubmit: (data: {
    name: string;
    age: number;
    ageOfPartner: number;
    gender: string
  }) => void;
}

type InformationStepStateProperties = {
  name: string;
  age: number;
  ageOfPartner: number;
  gender: string;
}

export default function UserInformationStepForm({ handleStepSubmit }: UserInformationProps) {
  const [step, setStep] = useState<string>('one');
  const [state, setState] = useState<InformationStepStateProperties>({
    name: '',
    age: 0,
    ageOfPartner: 0,
    gender: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {post, data, setData, errors, processing, reset} = useForm<StepData>({
    data: {
      name: '',
      age: 0,
      ageOfPartner: 0,
      gender: '',
    }
  })

  const { onboardingState } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find((scenario) => scenario.id === onboardingState.currentScenario);

  logState('UserInformationStepForm', { onboardingState, currentScenario, data });
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentName = currentStep?.data.name || '';
  const currentAge = currentStep?.data.age || 0;
  const currentAgeOfPartner = currentStep?.data.ageOfPartner || 0;
  const currentGender = currentStep?.data.gender || '';

  console.log(errors)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSubmitted(true);
    const nextStep = 'two';

    try {
      handleStepSubmit({ ...data.data });

      post(route('onboarding.scenario.step.submit', {
        scenario: onboardingState.currentScenario,
        step: step,
        nextStep: nextStep
      }), {
        onFinish: () => setLoading(false),
        onError: () => {
          setLoading(false);
          console.log('Error submitting form:', errors);
          setSubmitted(false);
        },
        onSuccess: () => {
          setSubmitted(false);
          setLoading(false);
          router.get(route('onboarding.scenario.step', {
            scenario: onboardingState.currentScenario,
            step: nextStep
          }));
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
      setSubmitted(false);
      return;
    }
  };

  console.log(data.data)

  return (
    <>
      <form onSubmit={handleSubmit} className={submitted ? "" : "animate animate-appear"}>
            <>
            {isLoading ? (
              <div className="inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-700 h-16 w-16"></div>
              </div>
            ) : (
              <>
                <input type="hidden" name="step" value={step} />
                  <label htmlFor="name" className="block mt-4 mb-2 font-semibold text-gray-700">
                    Hvad er dit navn ?
                  </label>
                  <Input
                    id="name"
                    type="text"
                    className='mt-2 mb-4'
                    value={data.data.name || state.name || currentName}
                    onChange={(e) => {
                      setState({ ...state, name: e.target.value });
                      setData('data', {
                        ...data.data,
                        name: e.target.value
                      })
                    }}
                    required
                  />
                  <label htmlFor="gender" className="block mt-4 mb-2 font-semibold text-gray-700">
                    Hvad er dit køn ?
                  </label>

                  <Select.Root defaultValue='female' onValueChange={(value) => {
                    setState({...state, gender: value})
                    setData('data', {
                      ...data.data, gender: value
                    })
                  }}>
                    <Select.Trigger className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded">
                      <Select.Value placeholder={`${'Kvinde'}`} />
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

                  <label htmlFor="yourAge" className="block mt-4 mb-2 font-semibold text-gray-700">
                    Hvor gammel er du ?
                  </label>
                  <Input
                    id="yourAge"
                    type="number"
                    className='mt-2 mb-4 h-16'
                    name='age'
                    value={data.data.age || state.age || currentAge}
                    onChange={(e) => {
                      setState({ ...state, age: parseInt(e.target.value) });
                      setData('data', {
                        ...data.data,
                        age: parseInt(e.target.value)
                      })
                    }}
                    required
                  />
                  {
                    (data.data.gender == "male" || state.gender == "male") && (
                      <>
                        <p className="mt-4 font-bold">Vi skal kende din alder på din partner, da din partner skal i gennem flere ting og processer.</p>
                        <label htmlFor="ageOfPartner" className="block mt-1 mb-2 font-medium text-gray-700">
                          Hvor gammel er din partner ?
                        </label>
                        <Input
                          id="ageOfPartner"
                          type="number"
                          value={data.data.ageOfPartner || state.ageOfPartner || currentAgeOfPartner}
                          onChange={(e) => {
                            setState({ ...state, ageOfPartner: parseInt(e.target.value) });
                            setData('data', {
                              ...data.data,
                              ageOfPartner: parseInt(e.target.value)
                            })
                          }}
                          required
                        />
                      </>
                    )
                  }
                  <Button
                    type="submit"
                    className="bg-blue-700 text-white hover:bg-blue-800 mt-4"
                  >
                    Næste
                  </Button>
              </>
            )}
            </>
      </form>
    </>
  )
}