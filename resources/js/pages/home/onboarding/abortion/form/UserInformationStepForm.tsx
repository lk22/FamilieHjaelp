// dependencies
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

// Conexts
import { useOnboarding } from '@/contexts/OnboardingContext';

// componenets
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Utilities
import { logState } from '@/lib/utils'

type StepData = {
  name: string;
  age: number;
  ageOfPartner: number;
  gender: string;
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
  const [state, setState] = useState<InformationStepStateProperties>({
    name: '',
    age: 0,
    ageOfPartner: 0,
    gender: '',
  });
  const [step, setStep] = useState<string>('one');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {post, data, setData, errors, processing, reset} = useForm<{
    data: {
      name: string;
      age: number;
      ageOfPartner: number;
      gender: string;
    }
  }>({
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
console.log({data, currentName, currentAge, currentAgeOfPartner, currentGender})
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await setLoading(true);

    post(route('onboarding.scenario.step.submit', {
      scenario: onboardingState.currentScenario,
      step: step
    }), {
      onFinish: () => setLoading(false)
    });

    handleStepSubmit({ ...data.data });
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      router.get(route('onboarding.scenario.step', {
        scenario: onboardingState.currentScenario,
        step: 'two'
      }));
      setLoading(false);
    }, 1000);
  };

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
                    className='mt-2 mb-4 -ml-px h-32'
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
                  <select
                    id="gender"
                    className="mt-2 mb-4 p-2 border border-gray-300 rounded w-full"
                    value={data.data.gender || state.gender || currentGender}
                    onChange={(e) => {
                      setState({ ...state, gender: e.target.value });
                      setData('data', {
                        ...data.data,
                        gender: e.target.value
                      })
                    }}
                    required
                  >
                    <option value="">Vælg køn</option>
                    <option value="female">Kvinde</option>
                    <option value="male">Mand</option>
                    <option value="other">Andet</option>
                  </select>
                  <label htmlFor="yourAge" className="block mt-4 mb-2 font-semibold text-gray-700">
                    Hvor gammel er du ?
                  </label>
                  <Input
                    id="yourAge"
                    type="number"
                    value={data.data.age || state.age || currentAge}
                    onChange={(e) => {
                      setState({ ...state, age: parseInt(e.target.value) });
                      setData('data', {
                        ...data.data,
                        age: parseInt(e.target.value)
                      })
                    }}
                    required
                    name='age'
                    className='mt-2 mb-4 h-16'
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