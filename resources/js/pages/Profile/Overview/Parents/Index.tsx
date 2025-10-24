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

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// utilities
import { HandleSwiperSlidesPerView } from '@/lib/SwiperSlidesPerViewUtil';

const ProfileOverviewParentsContent = () => {
    const [isNotesListOpen, setIsNotesListOpen] = useState<boolean>(false);
    return (
        <>
            <ProfileParentsOverviewLayout title="Parents Overview" headline={
                <>
                    <div className="flex items-end gap-4 justify-between">
                        <div className="w-full">
                            <h1>Hej Leo Knudsen</h1>
                        </div>
                        <div className="flex-grow text-lg float-right">
                            <p className="text-sm">Vælg barn</p>
                            <select name="child-selector" id="child-selector">
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
                className="mb-8 p-12 pb-32 rounded-lg bg-blue-700 shadow-md text-white mt-8 relative"
            >
                <h3 className="text-4xl font-bold mb-4">Se dit overblik</h3>
                <p className="w-10/12">
                    Velkommen til dit forældre dashboard! Her kan du nemt holde styr på dine børns aktiviteter, arrangementer og vigtige opdateringer. Brug menuen til at navigere mellem forskellige sektioner som skemaer, beskeder og rapporter. Vi er her for at hjælpe dig med at få det bedste ud af din oplevelse som forælder.
                </p>
                <article id="overview-quick-links" className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 absolute -bottom-150 sm:-bottom-18 md:-bottom-90 lg:-bottom-45 xl:-bottom-40 left-12 right-12">
                    <div className="w-full bg-gray-50 hover:slate-200 p-8 rounded-lg shadow-lg hover:shadow-xl shadow-blue-200 transition-shadow duration-300 ease-in-out relative pb-16">
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">Se barnets skema</h3>
                        <p className="sm:w-full text-blue-800">Få et overblik over dit barns daglige skema, inklusive aktiviteter, måltider og hviletider.</p>
                        <a href="" className="text-blue-700 font-bold mt-4 inline-block">Gå til skema</a>
                    </div>
                    <div className="w-full bg-gray-50 hover:slate-200 p-8 rounded-lg shadow-lg hover:shadow-xl shadow-blue-200 transition-shadow duration-300 ease-in-out relative">
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">Beskeder og opdateringer</h3>
                        <p className="sm:w-full text-blue-800">Hold dig opdateret med vigtige beskeder fra institutionen om dit barns trivsel og udvikling.</p>
                        <a href="" className="text-blue-700 font-bold mt-4 inline-block">Se beskeder</a>
                    </div>
                    <div className="w-full bg-gray-50 hover:slate-200 p-8 rounded-lg shadow-lg hover:shadow-xl shadow-blue-200 transition-shadow duration-300 ease-in-out sm:col-span-1 md:col-span-2 lg:col-span-1 relative">
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">Planlagte arrangementer</h3>
                        <p className="sm:w-full text-blue-800">Se kommende arrangementer og aktiviteter, som dit barn kan deltage i.</p>
                        <a href="" className="text-blue-700 font-bold mt-4 inline-block">Se arrangementer</a>
                    </div>
                </article>
            </section>
            <section id="practical-information" className="mx-12 mb-16 mt-160 sm:mt-155 md:mt-95 lg:mt-56 xl:mt-45 border-2 border-slate-200 p-8 rounded-lg shadow-lg shadow-blue-200">
                <h2 className="text-4xl text-blue-800 font-bold mb-2">Praktisk information</h2>
                <p className="mb-8 text-xl font-semibold text-blue-800">Her er nogle nyttige sider, der kan hjælpe dig med at forstå dine rettigheder og muligheder:</p>
                <Swiper spaceBetween={25} 
                    slidesPerView={HandleSwiperSlidesPerView()} 
                    className="mySwiper after:content-[''] after:block after:clear-both after:right-0 after:bg-white after:absolute"
                >
                    <SwiperSlide key={0}>
                        <div className="bg-blue-600 rounded-lg shadow-md text-white p-6 transition-colors duration-300 ease-in-out hover:bg-[#1A4D8D]">
                            <h2 className="text-xl font-bold mb-2">Forældreansvarsloven</h2>
                            <p className="mb-4 text-sm">Lær om dine rettigheder og ansvar som forælder under forældreansvarsloven.</p>
                            <a 
                                href="https://www.retsinformation.dk/eli/lta/2019/1063" 
                                target="_blank" 
                                className={`inline-block py-2 text-white`}
                                rel="noopener noreferrer"
                            >
                                Læs mere
                            </a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide key={1}>
                        <div className="bg-[#2C6DB6] rounded-lg shadow-md text-white p-6 transition-colors duration-300 ease-in-out hover:bg-[#1A4D8D]">
                            <h2 className="text-xl font-bold mb-2">Børne- og ungeydelse</h2>
                            <p className="mb-4 text-sm">Få information om børne- og ungeydelse, herunder berettigelse og ansøgningsproces.</p>
                            <a 
                                href="https://www.borger.dk/familie-og-boern/boern-og-unge/boerne-og-ungeydelse" 
                                target="_blank" 
                                className={`inline-block py-2 text-white`}
                                rel="noopener noreferrer"
                            >
                                Læs mere
                            </a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide key={2}>
                        <div className="bg-blue-600 rounded-lg shadow-md text-white p-6 transition-colors duration-300 ease-in-out hover:bg-[#1A4D8D]">
                            <h2 className="text-xl font-bold mb-2">Forældrehverv</h2>
                            <p className="mb-4 text-sm">Opdag dine rettigheder og muligheder for forældrehverv i forbindelse med dit barns opvækst.</p>
                            <a 
                                href="https://www.borger.dk/familie-og-boern/boern-og-unge/foraeldrehverv" 
                                target="_blank" 
                                className={`inline-block py-2 text-white`}
                                rel="noopener noreferrer"
                            >
                                Læs mere
                            </a>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>

            <section 
                id="home-scheduled-events-list"
                className="flex gap-6 mt-8 mx-12 hidden"
            >
                <div className="w-6/12 bg-gray-50 p-8 rounded-lg shadow-lg relative">
                    <h3 className="text-3xl font-bold text-blue-900">Se seneste notater</h3>
                    <h4 className="font-bold mb-2 text-lg">Du har oprettet ialt 5 notater</h4>
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
                    .
                    <h3 className="text-3xl font-bold text-blue-900">
                        Seneste aktiviteter
                    </h3>
                    <h4 className="font-bold mb-2 text-lg">Du har ialt 5 aktiviteter</h4>
                    <div className="my-4">
                        <ScheduledActivitiesList />
                    </div>
                    <h3 className="text-3xl mt-8 font-bold text-blue-900">Planlagte arrangementer og begivenheder</h3>
                    <p>Se alle planlagte arrangementer & begivenheder</p>
                    <h4 className="font-bold mb-2 text-lg">Du har ialt 5 arrangementer</h4>
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