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

// Layout 
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

// Components
import InformationSlide from '@/components/Onboarding/InformationSlide';
import { Divider } from '@/components/ui/divider';

import { Key } from 'react';
import { RouteParams } from 'vendor/tightenco/ziggy/src/js';

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
    console.log(auth)

    const currentStepData = getCurrentStepData(2);

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
                    <p className="mb-4 w-6/12">
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
                <section>
                    <div className="home-tasks-overview my-8 flex">
                        <div className="todos-desc-con w-5/12">
                            <h2 className='text-4xl text-blue-500 font-bold mb-2'>Ting og huske</h2>
                            <p className="text-lg">Her er en liste over ting, man skal huske, når man får / mister et barn:</p>
                            <img src="/images/tasks_graphics.svg" alt="tasks" className="my-4 w-6/12" />
                        </div>
                        <div className="latest-todos-container w-7/12">
                            {(Array.isArray(auth?.user.todos) ? auth.user.todos : []).map((todo, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                                    <h3 className="text-2xl font-bold mb-2 text-blue-900">{todo.title}</h3>
                                    <p>{todo.description}</p>
                                    <p>
                                        {todo.due_date ? `Forfaldsdato: ${new Date(todo.due_date).toLocaleDateString()}` : 'Ingen forfaldsdato'}
                                    </p>
                                </div>
                            ))}
                           <Divider marginBlock="8" />
                            <Link href={route('profile.todos')} className="bg-blue-900 px-4 py-2 rounded-sm text-white hover:underline">
                                Gå til opgaver
                            </Link>
                        </div>
                    </div>
                </section>
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
                                        backgroundColor='[#00027C]'
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