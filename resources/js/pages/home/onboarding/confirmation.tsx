import React from 'react'
import { useOnboarding, OnboardingProvider } from '@/contexts/OnboardingContext';

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
  const { onboardingState, getCurrentScenario } = useOnboarding();

  console.log('Onboarding State in Confirmation:', onboardingState);

  const getCurrentScenarioDescription = () => {
    const scenario = getCurrentScenario();

    switch (scenario?.id) {
      case 'abortion':
        return 'Vi har noteret i er igennem en abort process.';
      case 'deathborn':
        return 'Vi har noteret i er igennem en død fødsel.';
      case 'parenting_support':
        return 'Vi har noteret i har brug for støtte til forældreskab.';
      default:
        return 'Din valgte situation er ukendt.';
    }
  }

  const getFormattedKeyValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? 'Ja' : 'Nej';
    }
    return value;
  }

  const getFormattedKey = (key: string) => {
    // Convert camelCase or snake_case to normal text
    return key
      .replace(/([A-Z])/g, ' $1') // camelCase to words
      .replace(/_/g, ' ') // snake_case to words
      .replace(/\b\w/g, char => char.toUpperCase()); // capitalize first letter of each word
  }

  const getStepDetails = (stepId: string) => {
    const scenario = getCurrentScenario();

    const step = scenario?.steps.find((step: string) => step.stepName === stepId);
    const question = step?.question;
    const data = step?.data;

    // if the step is not existing in the state dont render the data
    if ( ! step ) return;

    const hasData = data && Object.keys(data).length > 0;
    if ( ! hasData ) return;

    return (
      <>
        {question && <div className="detail-item mt-8 border-b-2 border-white">
          <strong className='text-2xl'>{question}</strong>
        </div>}
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="detail-item mt-2 text-xl">
            <strong className="text-xl">{getFormattedKey(key)}: </strong> {getFormattedKeyValue(String(value))}
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <div id="confirmation" className="bg-white">
        <div className="container w-[1200px] h-screen flex flex-col justify-start items-start m-36 mx-auto">
          <div className="confirmation-details bg-blue-600 text-white shadow-md w-full text-left p-8 rounded-lg">
            <div className="details-header">
              <div className="logo-content flex mb-8">
                <img
                    src={`/images/logo.svg`}
                    alt="Familiehjælp Illustration"
                    className="mt-8 w-[100px]"
                />
                <img
                    src={`/images/FamilieHjælp_text_logo.svg`}
                    alt="Familiehjælp Illustration"
                    className="mt-8 mx-auto w-[200px] ml-4"
                />
              </div>
              <h2 className="text-4xl font-bold">Tak for dine oplysninger!</h2>
            </div>
            <div className="details-body">
              <h3 className="text-xl font-semibold mt-4">
                Vi har stillet dig nogle spørgsmål for at forstå din situation bedre
              </h3>
              <p className="mt-2 mb-2">
                Baseret på dine svar vil vi kunne tilbyde dig den bedst mulige støtte og vejledning gennem hele processen.
              </p>
              <h2 className="mt-4 text-lg font-bold">{getCurrentScenarioDescription()}</h2>
              {getStepDetails('one')}
              {getStepDetails('two')}
              {getStepDetails('three')}
              {getStepDetails('four')}
              {getStepDetails('five')}
              {getStepDetails('six')}
              {getStepDetails('seven')}
            </div>
          </div>
          <div className="details-footer flex flex-col items-start pb-32">
              <p className="mt-8">
                Hvis du har spørgsmål eller brug for yderligere assistance, er du velkommen til at kontakte vores supportteam.
              </p>
              <p className="mt-2">
                Tak fordi du valgte Familiehjælp. Vi ser frem til at støtte dig gennem denne tid.
              </p>
            <div className="actions flex gap-4">
              <button className="mt-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700">Færdiggør</button>
              <button className="mt-6 px-4 py-2 bg-blue-900 text-white rounded hover:bg-gray-700">Gå tilbage</button>
            </div>
          </div>
        </div>
      </div>
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