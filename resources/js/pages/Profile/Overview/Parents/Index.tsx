import {useState} from 'react';
// Layout
import ProfileParentsOverviewLayout from '@/layouts/profile/profile-parents-layout';

// Context resources
import  {OnboardingProvider} from '@/contexts/OnboardingContext';

// components
import ScheduledEventsList from '@/components/Profile/Home/Parents/SchedulesEventsList'
import ScheduledActivitiesList from '@/components/Profile/Home/Parents/ScheduledActivities';
import LatestParentNotes from '@/components/Profile/Home/Parents/LatestParentNotes';
import { NotesListDialog } from '@/components/Profile/Dialogs/NotesListDialog';

const ProfileOverviewParentsContent = () => {
    const [isNotesListOpen, setIsNotesListOpen] = useState<boolean>(false);
    return (
        <>
            <ProfileParentsOverviewLayout title="Parents Overview" headline={
                <>
                    <div className="flex items-end gap-4 justify-between">
                        <div className="w-full">
                            <h1>Hej Leo Knudsen</h1>
                            <h2 className="text-xl mt-4 text-black">Her er dit overblik</h2>
                        </div>
                        <div className="flex-grow text-lg float-right">
                            <p className="text-sm">Vælg barn</p>
                            <select name="child-selector border-b-2" id="child-selector">
                                <option value="Leo Knudsen">Leo Knudsen</option>
                                <option value="Leo Knudsen">Zita Laursen</option>
                                <option value="Leo Knudsen">Jonatan Laursen Knudsen</option>
                                <option value="Leo Knudsen">Joan Binder</option>
                                <option value="Leo Knudsen">Tom Binder</option>
                            </select>
                        </div>
                    </div>
                </>
            }>
            <section 
                id="parents-home-intro" 
                className="mb-8 p-12 pb-32 rounded-lg bg-blue-700 shadow-md text-white"
            >
                <h3 className="text-4xl font-bold mb-4">Se dit overblik</h3>
                <p className="w-10/12">
                    Velkommen til dit forældre dashboard! Her kan du nemt holde styr på dine børns aktiviteter, arrangementer og vigtige opdateringer. Brug menuen til at navigere mellem forskellige sektioner som skemaer, beskeder og rapporter. Vi er her for at hjælpe dig med at få det bedste ud af din oplevelse som forælder.
                </p>

                <div className="grid grid-cols-3 column-gap-5">
                    <div className="mt-4">
                        <h4 className="font-bold mb-2">Du har oprettet 5 notater</h4>
                    </div>
                    <div className="mt-4">
                        <h4 className="font-bold mb-2">Du har ialt 3 arrangementer</h4>
                    </div>
                    <div className="mt-4">
                        <h4 className="font-bold mb-2">Du har ialt 5 aktiviteter</h4>
                    </div>
                </div>
            </section>
            <section 
                id="home-scheduled-events-list"
                className="flex gap-6 mt-8 relative -top-28 mx-12"
            >
                <div className="w-6/12 bg-gray-50 p-8 rounded-lg shadow-lg relative">
                    <h3 className="text-3xl font-bold text-blue-900">Se seneste notater</h3>
                    <p>Se seneste notater og ting du skal være opmærksom på</p>
                    <div className="mt-4">
                        <LatestParentNotes />
                    </div>
                    {/* <button onClick={setIsNotesListOpen(true)}>Se alle noter</button> */}
                    <NotesListDialog isNotesListOpen={isNotesListOpen} setIsNotesListOpen={setIsNotesListOpen} />
                    {/* button to open dialog */}
                    <div className="text-blue-700 text-center font-bold absolute bottom-8 left-8">
                        <button onClick={() => setIsNotesListOpen(true)}>Se alle noter</button>
                    </div>
                </div>
                <div className="w-6/12 bg-gray-50 p-8 rounded-lg shadow-lg relative">
                    <h3 className="text-3xl font-bold text-blue-900">
                        Seneste aktiviteter
                    </h3>
                    <div className="my-4">
                        <ScheduledActivitiesList />
                    </div>
                    <h3 className="text-3xl mt-8 font-bold text-blue-900">Planlagte arrangementer og begivenheder</h3>
                    <p>Se alle planlagte arrangementer & begivenheder</p>
                    <div className="mt-4">
                        <ScheduledEventsList />
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