// Layout
import ProfileParentsOverviewLayout from '@/layouts/profile/profile-parents-layout';

// Context resources
import  {OnboardingProvider} from '@/contexts/OnboardingContext';

// components
import ScheduledEventsList from '@/components/Profile/Home/Parents/SchedulesEventsList'
import ScheduledActivitiesList from '@/components/Profile/Home/Parents/ScheduledActivities';

const ProfileOverviewParentsContent = () => {
    return (
        <>
            <ProfileParentsOverviewLayout title="Parents Overview" headline={
                <>
                    <h1>Hej Leo Knudsen</h1>
                    <h2 className="text-xl mt-4 text-black">Her er dit overblik</h2>
                </>
            }>
            <section 
                id="home-scheduled-events-list"
                className="flex gap-6 mt-8"
            >
                <div className="w-6/12 bg-gray-50 p-8 rounded-lg shadow-md relative">
                    <h3 className="text-2xl font-bold text-blue-700">Planlagte arrangementer og begivenheder</h3>
                    <p>Se alle planlagte arrangementer & begivenheder</p>
                    <div className="mt-4">
                        <ScheduledEventsList />
                    </div>
                </div>
                <div className="w-6/12 bg-gray-50 p-8 rounded-lg shadow-md relative">
                    <h3 className="text-2xl font-bold text-blue-700">
                        Seneste aktiviteter
                    </h3>
                    <div className="mt-4">
                        <ScheduledActivitiesList />
                    </div>
                </div>
            </section>
            </ProfileParentsOverviewLayout>
        </>
    );
}

export default function ProfileOverviewParentsHome() {
    return (
        <OnboardingProvider>
            <ProfileOverviewParentsContent />
        </OnboardingProvider>
    );
}