import { useState } from 'react';
import { useOnboarding, OnboardingProvider } from '@/contexts/OnboardingContext';
import { router } from '@inertiajs/react';
import { getConfirmationFormattedValue } from '@/lib/utils';
import ResetModal from '@/components/Onboarding/Modals/ResetModal';


interface OnboardingSessionProps {
  onboardingSession: {
    token: string | null;
    currentStep: string | null;
    stepsData: Record<string, any>;
    formData: Record<string, any>;
    completed: boolean;
  }
}

const ConfirmationContent = () => {
  const { onboardingState, getCurrentScenario, resetOnboarding } = useOnboarding();
  const [ isReseting, setIsResetting ] = useState<boolean>(false);

  console.log('Onboarding State in Confirmation:', getCurrentScenario());

  const handleResetOnboarding = () => {
    setIsResetting(true);
  }

  /**
   * Converts stored values into a more human-readable format for confirmation display.
   * @param key
   * @returns
   */
  const getFormattedKey = (key: string) => {
    // Convert camelCase or snake_case to normal text
    return key
      .replace(/([A-Z])/g, ' $1') // camelCase to words
      .replace(/_/g, ' ') // snake_case to words
      .replace(/\b\w/g, char => char.toUpperCase()); // capitalize first letter of each word
  }

  /**
   * Get details for a specific step in the onboarding process.
   * @param stepId string
   * @returns JSX.Element | undefined
   */
  const getStepDetails = (stepId: string) => {
    const scenario = onboardingState.scenarios.find(
      (scenario) => scenario.id === onboardingState.currentScenario
    );

    const step = scenario?.steps.find((step: any) => step.stepName === stepId);
    const data = step?.data;
    const hasData = data && Object.keys(data).length > 0;

    // if the step is not existing in the state dont render the data
    if ( ! step ) return;
    if( ! data ) return;

    if ( ! hasData ) return;

     return (
       <>
        {
          Object.entries(data).map(([key, value]: [string, string | boolean]) => {
            let formattedValue = getConfirmationFormattedValue(value);

            return (
              <div key={key} className="detail-item mt-2 text-xl">
                <strong className="text-lg">{getFormattedKey(key)}: </strong> <span>{String(formattedValue)}</span>
              </div>
            )
          })
        }
      </>
    );
  }

  return (
    <>
      <div id="confirmation" className="bg-white p-8">
        <div className="container-fluid w-[1400px] mx-auto flex flex-col h-[1200px]">
          <div className="flex gap-16 items-center justify-center h-full">
            <div className="w-5/12 flex flex-col justify-center items-start animate animate-appear">
              <img
                  src={`/images/logo.svg`}
                  alt="Familiehjælp Illustration"
                  className="my-4 w-[100px]"
              />
              <h1 className="text-3xl font-bold mt-4">Tak for dine svar</h1>
              <p className="mt-4 text-lg">
                Vi har samlet dine svar nedenfor. Du kan gennemgå dem og foretage eventuelle ændringer, hvis det er nødvendigt.
              </p>
              <p className="mt-4 text-xl font-semibold">
                Hvad skal der ske nu?
              </p>
              <p className="mt-4 text-lg">
                Du vil få en skræderersyet platform baseret på dine svar og situation. som vil guide dig gennem de næste trin i din proces.
              </p>
              <p className="mt-4 text-lg">
                Hvis du har spørgsmål eller brug for yderligere assistance, er du velkommen til at kontakte vores supportteam. Tak fordi du valgte Familiehjælp. Vi ser frem til at støtte dig gennem denne tid.
              </p>
              <div className="actions flex gap-4">
                <button className="mt-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700">Færdiggør</button>
                <button onClick={() => handleResetOnboarding()} className="mt-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700">Start forfra</button>
              </div>
            </div>
            <div className="w-7/12 flex flex-col justify-center items-center animate animate-appear">
              <div className="details bg-white -ml-px -mt-2 p-16 w-full shadow-lg">
               {
                  onboardingState.scenarios.find(
                    (scenario) => scenario.id === onboardingState.currentScenario
                  )?.steps.map((step: any) => (
                    <div key={step.stepName} className="bg-white p-4 border-b border-gray-200">
                      {getStepDetails(step.stepName)}
                    </div>
                  ))
               }
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResetModal
        isOpen={isReseting}
        closeModal={() => setIsResetting(false)}
        onConfirm={() => handleResetOnboarding()}
      />
    </>
  );
}

export default function Confirmation({onboardingSession}: OnboardingSessionProps) {
  return (
    <OnboardingProvider
      initialSession={onboardingSession}
    >
      <ConfirmationContent />
    </OnboardingProvider>
  )
}