// Libraries
import {JSX} from 'react';
import { usePage, Link, Deferred } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Contexts & Providers
import { OnboardingProvider } from '@/contexts/OnboardingContext';

// utilities
import { handleSwiperSlidesPerView } from '@/lib/SwiperSlidesPerViewUtil';

// hooks
import { useIsMobile } from '@/hooks/use-mobile';

// Layout 
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

// Components
import InformationSlide from '@/components/Onboarding/InformationSlide';

import { Key } from 'react';
import { RouteParams } from 'vendor/tightenco/ziggy/src/js';
import TodoListSection from '@/components/Profile/Home/TodoList';

interface PageSlideProperty {
    title: string;
    slug: RouteParams<'profile.info.page'> | undefined;
    description: string;
    backgroundColor: string;
}

type PageIndex = {
    index: number;
    key: Key | null | undefined
}

interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    due_date?: string;
}

interface Page {
    id: number;
    title: string;
    slug: RouteParams<'profile.info.page'> | undefined;
    description: string;
    backgroundColor: string;
}

interface ProfileOverviewHomeProps {
    todos: Todo[];
    pages: Page[];
}

const ProfileOverviewHomeContent = ({ todos, pages }: ProfileOverviewHomeProps) => {
    const { auth } = usePage<SharedData>().props;
    const isMobile = useIsMobile();
    const Todos = Array.isArray(todos) ? todos : [];

    return (
        <ProfileOverviewLayout
            title="Familiehjælp - Hjem"
            headline={<>
                <span className="text-blue-800">Velkommen {auth.user.name}</span>
                <span className="text-gray-600"> - Her er din oversigt</span>
            </>}
        >
            <div>
                <section className={`mt-8 pl-8 py-8 bg-white rounded-lg shadow-md flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8 border-t-2 border-blue-800 inset`}>
                    <div className={`${isMobile ? 'w-full' : 'w-6/12'}`}>
                        <h1 className="text-4xl text-blue-800 font-bold mb-2">Hjælp til at komme videre</h1>
                        <p className={`mb-10 w-full text-sm`}>
                            Vi er kede af jeres situation, det kan være svært at komme videre alene, Vi kan dirigere dig hurtigt videre til den nødvendige hjælp men vi skal bruge din hjælp.
                        </p>
                        <Link href="#" className="bg-blue-900 px-4 py-2 rounded-sm text-white hover:underline transition-colors duration-300 ease-in-out hover:bg-blue-800">
                            Se mere
                        </Link> 
                    </div>
                    <div className={`relative ${isMobile ? 'w-full' : 'w-6/12'}`}>
                        <Swiper spaceBetween={25} 
                            slidesPerView={handleSwiperSlidesPerView()} 
                            className="mySwiper after:content-[''] after:block after:clear-both after:right-0 after:bg-white after:absolute"
                        >
                            <SwiperSlide key={0}>
                                <div className="bg-blue-600 rounded-lg shadow-md text-white p-6 transition-colors duration-300 ease-in-out hover:bg-[#1A4D8D]">
                                    <h2 className="text-xl font-bold mb-2">Dansk center for familier og sorg</h2>
                                    <p className="mb-4 text-sm">Vi tilbyder støtte og rådgivning til familier i sorg.</p>
                                    <a 
                                        href="https://familierogsorg.dk/" 
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
                                    <h2 className="text-xl font-bold mb-2">Sorggrupper</h2>
                                    <p className="mb-4 text-sm">Sorggrupper for forældre, der har mistet et barn.</p>
                                    <a 
                                        href="https://www.sorgvejviser.dk/sorgtilbud/sorggrupper-for-foraeldre-der-har-mistet-et-barn/" 
                                        target="_blank" 
                                        className={`inline-block py-2 text-white`}
                                        rel="noopener noreferrer"
                                    >
                                        Læs mere
                                    </a>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>
                <TodoListSection todos={Todos} />
                <section className="mt-8">
                    <h2 className="text-4xl text-blue-800 font-bold mb-4">Praktisk information</h2>
                    <p className="mb-4 text-xl font-semibold text-blue-800">Her er nogle nyttige sider, der kan hjælpe dig med at forstå dine rettigheder og muligheder:</p>
                    <Deferred
                        data="pages"
                        fallback={<PagesFallbackComponent />}
                    >
                        <Swiper spaceBetween={25} slidesPerView={2.5} className="mySwiper">
                            {(Array.isArray(pages) ? pages : []).map(
                                (
                                    page: PageSlideProperty,
                                    index: PageIndex['index'],
                                ): JSX.Element => (
                                    <SwiperSlide key={index}>
                                        <InformationSlide
                                            title={page.title}
                                            link={route('profile.info.page', page.slug)}
                                            description={page.description}
                                            backgroundColor='#00027C'
                                        />
                                    </SwiperSlide>
                                )
                            )}
                        </Swiper>
                    </Deferred>
                </section>
            </div>
        </ProfileOverviewLayout>
    );
}


const PagesFallbackComponent = () => {
    return (
        <div className="text-center text-white">Indlæser sider...</div>
    )
}

export default function ProfileOverviewHome({ todos, pages }: ProfileOverviewHomeProps) {
    return (
        <OnboardingProvider>
            <ProfileOverviewHomeContent todos={todos} pages={pages} />
        </OnboardingProvider>
    );
}