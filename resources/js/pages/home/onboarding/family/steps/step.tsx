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
    const { locale } = usePage<SessionProps>().props;
    const { currentStep, onboardingSession } = usePage<SessionProps>().props;

    const one: FamilyNameStepData = {
        familyName: String(onboardingSession.stepsData.one?.familyName ?? ''),
    };

    const two: ParentStepData = {
        firstName: String(onboardingSession.stepsData.two?.firstName ?? ''),
        middleName: String(onboardingSession.stepsData.two?.middleName ?? ''),
        lastName: String(onboardingSession.stepsData.two?.lastName ?? one.familyName),
        age: String(onboardingSession.stepsData.two?.age ?? ''),
        familyTitle: String(onboardingSession.stepsData.two?.familyTitle ?? ''),
        hasPartner: Boolean(onboardingSession.stepsData.two?.hasPartner ?? false),
        partnerFirstName: String(onboardingSession.stepsData.two?.partnerFirstName ?? ''),
        partnerMiddleName: String(onboardingSession.stepsData.two?.partnerMiddleName ?? ''),
        partnerLastName: String(onboardingSession.stepsData.two?.partnerLastName ?? ''),
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

    const translatedStepString = locale === 'da'
        ? 'Trin ' + stepNumberByName[currentStep] + ' af 4'
        : 'Step ' + stepNumberByName[currentStep] + ' of 4';

    // if the family name is composed of two words, split it into middle name and last name for the parents section
    if ( one.familyName.split(' ').length > 1 ) {
        const [middleName, lastname] = one.familyName.split(' ');
        two.middleName = middleName;
        two.partnerMiddleName = middleName;
        // You might want to store the last name somewhere else or handle it as needed
        two.lastName = lastname;
        two.partnerLastName = lastname;
    }

    return (
        <main className="flex items-center py-10 text-blue-900" id="onboarding">
            <Head title="Familie onboarding" />
            <div className="mx-auto w-full max-w-3xl">
                <div className="flex justify-between">
                    <div className="step-column">
                        <h1 className="text-3xl font-bold">
                            {t("app.getting_started.onboarding_title_label")}
                        </h1>
                        <p className="mt-2 text-lg">{translatedStepString}</p>
                    </div>
                    <div className="logo">
                        <img src="/images/logo.svg" height={75} width={75} alt="Onboarding illustration" className="mb-4" />
                    </div>
                </div>
                <div className="mt-8 rounded-lg p-6 text-blue-900 shadow border border-4 border-blue-900">
                    {currentStep === 'one' ? <FamilyNameStep defaultFamilyName={String(one.familyName ?? '')} translate={t} /> : null}
                    {currentStep === 'two' ? <ParentStep defaultData={two} translate={t} /> : null}
                    {currentStep === 'three' ? <KidsStep defaultData={three} translate={t} locale={locale} /> : null}
                    {/* {currentStep === 'four' ? <RegisterStep defaultData={four} translate={t} /> : null} */}
                    {currentStep === 'complete' ? (
                        <CompleteStep
                            token={onboardingSession.token}
                            familyName={one.familyName}
                            parentData={two}
                            kidsData={three}
                            translate={t}
                            locale={locale}
                        />
                    ) : null}
                </div>
            </div>
        </main>
    );
}
