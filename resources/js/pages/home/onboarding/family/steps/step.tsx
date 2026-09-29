import { localizeRoute } from '@/util/localizeRoute';
import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import CompleteStep from './CompleteStep';
import FamilyNameStep from './FamilyNameStep';
import KidsStep from './KidsStep';
import ParentStep from './ParentStep';

import { type FamilyNameStepData, type KidsStepData, type ParentStepData, type SessionProps } from '@/types/onboarding';

export default function FamilyOnboardingStep() {
    const { t } = useTranslation();
    const locale = usePage<SessionProps>().props.locale;
    const translateRoute = localizeRoute(locale);
    const { currentStep, onboardingSession } = usePage<SessionProps>().props;

    const one: FamilyNameStepData = {
        familyName: String(onboardingSession.stepsData.one?.familyName ?? ''),
    };
    const two: ParentStepData = {
        name: String(onboardingSession.stepsData.two?.name ?? ''),
        age: String(onboardingSession.stepsData.two?.age ?? ''),
        familyTitle: String(onboardingSession.stepsData.two?.familyTitle ?? ''),
        hasPartner: Boolean(onboardingSession.stepsData.two?.hasPartner ?? false),
        partnerName: String(onboardingSession.stepsData.two?.partnerName ?? ''),
        partnerAge: String(onboardingSession.stepsData.two?.partnerAge ?? ''),
        partnerFamilyTitle: String(onboardingSession.stepsData.two?.partnerFamilyTitle ?? ''),
        partnerNeedsUser: Boolean(onboardingSession.stepsData.two?.partnerNeedsUser ?? false),
        partnerUserName: String(onboardingSession.stepsData.two?.partnerUserName ?? ''),
        partnerUserEmail: String(onboardingSession.stepsData.two?.partnerUserEmail ?? ''),
    };
    const three: KidsStepData = onboardingSession.stepsData.three ?? { kids: [] };
    const stepNumberByName: Record<string, string> = {
        one: '1',
        two: '2',
        three: '3',
        complete: '4',
    };

    return (
        <main className="flex items-center bg-[#004EA7] py-10 text-white" id="onboarding">
            <Head title="Familie onboarding" />
            <div className="mx-auto w-full max-w-3xl">
                <div className="flex justify-between">
                    <div className="step-column">
                        <h1 className="text-3xl font-bold">Familie onboarding</h1>
                        <p className="mt-2 text-lg">Trin {stepNumberByName[currentStep] ?? '1'} af 4</p>
                    </div>
                    <div className="logo">
                        <img src="/images/logo.svg" height={75} width={75} alt="Onboarding illustration" className="mb-4" />
                    </div>
                </div>
                <div className="mt-8 rounded-lg bg-white p-6 text-black shadow">
                    {currentStep === 'one' ? <FamilyNameStep defaultFamilyName={String(one.familyName ?? '')} translate={t} /> : null}
                    {currentStep === 'two' ? <ParentStep defaultData={two} /> : null}
                    {currentStep === 'three' ? <KidsStep defaultData={three} /> : null}
                    {currentStep === 'complete' ? (
                        <CompleteStep token={onboardingSession.token} familyName={one.familyName} parentData={two} kidsData={three} />
                    ) : null}
                </div>
            </div>
        </main>
    );
}
