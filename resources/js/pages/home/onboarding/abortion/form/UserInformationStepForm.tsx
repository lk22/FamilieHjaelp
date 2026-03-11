import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from '@/contexts/OnboardingContext';
import { router } from '@inertiajs/react';
import { logState } from '@/lib/utils'

type StepData = {
  name: string;
  age: string;
  ageOfPartner: string;
  gender: string;
}

type UserInformationProps = {
  handleStepSubmit: (data: {
    name: string;
    age: string;
    ageOfPartner: string;
    gender: string
  }) => void;
}

type InformationStepStateProperties = {
  name: string;
  age: string;
  ageOfPartner: string;
  gender: string;
}

export default function UserInformationStepForm({ handleStepSubmit }: UserInformationProps) {
  const [userInfoState, setUserInfoState] = useState<InformationStepStateProperties>({
    name: '',
    age: '',
    ageOfPartner: '',
    gender: '',
  });
  const [step, setStep] = useState<string>('one');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { onboardingState } = useOnboarding();

  const currentScenario = onboardingState.scenarios.find((scenario) => scenario.id === onboardingState.currentScenario);

  logState('UserInformationStepForm', { onboardingState, currentScenario, userInfoState });
  const currentStep = currentScenario?.steps[0]; // First step (index 0)

  const currentName = currentStep?.data.name || '';
  const currentAge = currentStep?.data.age || '';
  const currentAgeOfPartner = currentStep?.data.ageOfPartner || '';
  const currentGender = currentStep?.data.gender || '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      await setLoading(true);
    }, 200)

    const submittedData: StepData = {
      name: userInfoState.name,
      age: userInfoState.age,
      ageOfPartner: userInfoState.ageOfPartner,
      gender: userInfoState.gender,
    }

    // Proceed to the next step or perform other actions
    handleStepSubmit({ ...submittedData });
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
                    value={userInfoState.name || currentName}
                    onChange={(e) => setUserInfoState({...userInfoState, name: e.target.value})}
                    required
                  />
                  <label htmlFor="gender" className="block mt-4 mb-2 font-semibold text-gray-700">
                    Hvad er dit køn ?
                  </label>
                  <select
                    id="gender"
                    className="mt-2 mb-4 p-2 border border-gray-300 rounded w-full"
                    value={userInfoState.gender || currentGender}
                    onChange={(e) => setUserInfoState({...userInfoState, gender: e.target.value})}
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
                    type="text"
                    value={userInfoState.age || currentAge}
                    onChange={(e) => setUserInfoState({...userInfoState, age: e.target.value})}
                    required
                    name='age'
                    className='mt-2 mb-4 h-16'
                  />
                  {
                    userInfoState.gender == "male" && (
                      <>
                        <p className="mt-4 font-bold">Vi skal kende din alder på din partner, da din partner skal i gennem flere ting og processer.</p>
                        <label htmlFor="ageOfPartner" className="block mt-1 mb-2 font-medium text-gray-700">
                          Hvor gammel er din partner ?
                        </label>
                        <Input
                          id="ageOfPartner"
                          type="text"
                          value={userInfoState.ageOfPartner || currentAgeOfPartner}
                          onChange={(e) => setUserInfoState({...userInfoState, ageOfPartner: e.target.value})}
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