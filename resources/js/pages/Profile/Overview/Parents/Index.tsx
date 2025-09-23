// Layout
import ProfileParentsOverviewLayout from '@/layouts/profile/profile-parents-layout';

// Context resources
import  {OnboardingProvider} from '@/contexts/OnboardingContext';

// components
import ChildList from '@/components/Profile/Home/Parents/ChildList'
import ScheduledEventsList from '@/components/Profile/Home/Parents/SchedulesEventsList'

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
                className="my-8 bg-blue-700 p-8 flex rounded"    
            >
                <div className="w-6/12 text-white">
                    <h3>Planlagte arrangementer og begivenheder</h3>
                    <p>Se alle planlagte arrangementer & begivenheder</p>
                </div>
                <div className="w-6/12 text-white">
                    <ScheduledEventsList />
                </div>
            </section>
            <ChildList />
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