// Libraries
import {JSX} from 'react';
import { usePage, Link } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Contexts & Providers
import { useOnboarding, OnboardingProvider } from '@/contexts/OnboardingContext';

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

const ProfileOverviewHomeContent = () => {
    const { getCurrentStepData } = useOnboarding();
    const { auth } = usePage<SharedData>().props;
    const currentStepData = getCurrentStepData(2);
    const isMobile = useIsMobile();
    const Todos = Array.isArray(auth?.user.todos) ? auth?.user.todos : [];

    console.log(auth);
    console.log('Current Step Data:', currentStepData);

    return (
        <ProfileOverviewLayout
            title="Familiehjælp - Hjem"
            headline={<>
                <h1 className="text-5xl font-bold mb-4">
                    <span className="text-blue-800">Velkommen {auth.user.name}</span>
                    <span className="text-gray-600"> - Her er din oversigt</span>
                </h1>
            </>}
        >
            <div>
                <section className="mt-8">
                    <h1 className="text-4xl text-blue-800 font-bold mb-4">Hjælp til at komme videre</h1>
                    <p className={`mb-4 ${isMobile ? 'w-full' : 'w-6/12'}`}>
                        Vi er kede af jeres situation, det kan være svært at komme videre alene, Vi kan dirigere dig hurtigt videre til den nødvendige hjælp men vi skal bruge din hjælp.
                    </p>
                    <Swiper spaceBetween={25} slidesPerView={handleSwiperSlidesPerView()} className="mySwiper">
                        <SwiperSlide key={0}>
                            <div className="bg-[#2C6DB6] rounded-lg shadow-md  text-white p-6">
                                <h2 className="text-xl font-bold mb-2">Dansk center for familier og sorg</h2>
                                <p className="mb-4">Vi tilbyder støtte og rådgivning til familier i sorg.</p>
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
                            <div className="bg-[#2C6DB6] rounded-lg shadow-md text-white p-6">
                                <h2 className="text-xl font-bold mb-2">Dansk center for familier og sorg</h2>
                                <p className="mb-4">Vi tilbyder støtte og rådgivning til familier i sorg.</p>
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
                        <SwiperSlide key={2}>
                            <div className="bg-[#2C6DB6] rounded-lg shadow-md text-white p-6">
                                <h2 className="text-xl font-bold mb-2">Dansk center for familier og sorg</h2>
                                <p className="mb-4">Vi tilbyder støtte og rådgivning til familier i sorg.</p>
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
                    </Swiper>
                </section>
                <TodoListSection todos={Todos} />
                <section>
                    <h2 className="text-4xl text-blue-800 font-bold mb-4">Praktisk information</h2>
                    <p className="mb-4 text-xl font-semibold">Her er nogle nyttige sider, der kan hjælpe dig med at forstå dine rettigheder og muligheder:</p>
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
                                        backgroundColor='#00027C'
                                    />
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                </section>
            </div>
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