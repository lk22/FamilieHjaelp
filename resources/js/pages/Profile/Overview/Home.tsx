// Libraries
import {JSX} from 'react';
import { usePage, Link } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Contexts
import { useOnboarding, OnboardingProvider } from '@/contexts/OnboardingContext';

// utilities
import { handleSwiperSlidesPerView } from '@/lib/SwiperSlidesPerViewUtil';

// Layout 
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

// Components
import InformationSlide from '@/components/Onboarding/InformationSlide';
import { Key } from 'react';
import { RouteParams } from 'vendor/tightenco/ziggy/src/js';

interface PageSlideProperty {
    title: string;
    slug: RouteParams<'profile.info.page'> | undefined;
    description: string;
    backgroundColor: string;
}

interface TodoProperty {
    title: string;
    description: string;
    due_date: string | null;
    completed: boolean;
}

type PageIndex = {
    index: number;
    key: Key | null | undefined
}

const ProfileOverviewHomeContent = () => {
    const { getCurrentStepData } = useOnboarding();
    
    const { auth } = usePage<SharedData>().props;
    console.log(auth)

    const currentStepData = getCurrentStepData(2);

    console.log('Current Step Data:', currentStepData);

    return (
        <ProfileOverviewLayout
            title="Familiehjælp - Hjem"
            headline={<>
                <h1 className="text-4xl font-bold mb-4">
                    <span className="text-blue-800">Velkommen {auth.user.name}</span>
                    <span className="text-gray-600"> - Her er din oversigt</span>
                </h1>
            </>}
        >
            <div>
                <section>
                    <h1 className="text-2xl text-blue-800 font-bold mb-4">Hjælp til at komme videre</h1>
                    <p className="mb-4 w-6/12">
                        Vi er kede af jeres situation, det kan være svært at komme videre alene, Vi kan dirigere dig hurtigt videre til den nødvendige hjælp men vi skal bruge din hjælp.
                    </p>
                    <Swiper spaceBetween={25} slidesPerView={handleSwiperSlidesPerView()} className="mySwiper">
                        <SwiperSlide key={0}>
                            <div className="bg-[#00027C] rounded-lg shadow-md bg-black text-white p-6">
                                <h2 className="text-xl font-bold mb-2">Dansk center for familier og sorg</h2>
                                <a 
                                    href="https://familierogsorg.dk/" 
                                    target="_blank" 
                                    className={`inline-block px-4 py-2 text-white rounded bg-[#00027C]`}
                                    rel="noopener noreferrer"
                                >
                                    Læs mere
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide key={1}>
                            <div className="bg-[#00027C] rounded-lg shadow-md bg-black text-white p-6">
                                <h2 className="text-xl font-bold mb-2">Dansk center for familier og sorg</h2>
                                <a 
                                    href="https://familierogsorg.dk/" 
                                    target="_blank" 
                                    className={`inline-block px-4 py-2 text-white rounded bg-[#00027C]`}
                                    rel="noopener noreferrer"
                                >
                                    Læs mere
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide key={2}>
                            <div className="bg-[#00027C] rounded-lg shadow-md bg-black text-white p-6">
                                <h2 className="text-xl font-bold mb-2">Dansk center for familier og sorg</h2>
                                <a 
                                    href="https://familierogsorg.dk/" 
                                    target="_blank" 
                                    className={`inline-block px-4 py-2 text-white rounded bg-[#00027C]`}
                                    rel="noopener noreferrer"
                                >
                                    Læs mere
                                </a>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </section>

                <div className="home-tasks-overview mb-4">
                    <h2 className='text-xl text-blue-900 font-semibold mb-2'>Ting og huske</h2>
                    <p>Se alle de ting man skal huske når man får / mister et barn</p>
                    <img src="/images/tasks_graphics.svg" alt="tasks" />
                    {(Array.isArray(auth?.user.todos) ? auth.user.todos : []).map((todo, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                            <h3 className="text-lg font-semibold">{todo.title}</h3>
                            <p>{todo.description}</p>
                            <p>
                                {todo.due_date ? `Forfaldsdato: ${new Date(todo.due_date).toLocaleDateString()}` : 'Ingen forfaldsdato'}
                            </p>
                        </div>
                    ))}
                    <Link href={route('profile.todos')} className="text-blue-500 hover:underline">
                        Gå til opgaver
                    </Link>
                </div>
            </div>
            <Swiper spaceBetween={25} slidesPerView={handleSwiperSlidesPerView()} className="mySwiper">
                {(Array.isArray(auth?.user.pages) ? auth.user.pages : []).map(
                    (
                        page: PageSlideProperty,
                        index: PageIndex['index'],
                    ): JSX.Element => (
                        <SwiperSlide key={index}>
                            <InformationSlide
                                title={page.title}
                                link={route('profile.info.page', page.slug)}
                                description={page.description}
                                backgroundColor='[#00027C]'
                            />
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </ProfileOverviewLayout>
    );
}

export default function ProfileOverviewHome() {
    return (
        <OnboardingProvider>
            <ProfileOverviewHomeContent />
        </OnboardingProvider>
    );
}