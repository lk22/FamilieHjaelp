// Libraries
import {JSX} from 'react';
// import { usePage, Link, Deferred } from '@inertiajs/react';
// import { type SharedData } from '@/types';
import {Link, Deferred} from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Contexts & Providers
import { OnboardingProvider } from '@/contexts/OnboardingContext';

// utilities
// import { HandleSwiperSlidesPerView } from '@/lib/SwiperSlidesPerViewUtil';

// hooks
import { useIsMobile } from '@/hooks/use-mobile';

// Layout
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

// Components
import InformationSlide from '@/components/Onboarding/InformationSlide';

import { Key } from 'react';
import {RouteParams} from 'vendor/tightenco/ziggy/src/js';
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
    // const { auth } = usePage<SharedData>().props;
    const isMobile = useIsMobile();
    const Todos = Array.isArray(todos) ? todos : [];

    return (
        <ProfileOverviewLayout
            title="Familiehjælp - Hjem"
        >
            <div>
                <section className={`px-16 pt-8 pb-16 bg-white rounded shadow-md flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8 inset`}>
                    <div className={`${isMobile ? 'w-full' : 'w-6/12'}`}>
                        <h1 className="text-4xl text-blue-800 font-bold mb-2">Her er din oversigt</h1>
                        <p className={`mb-10 w-full text-lg`}>
                            Her kan du få et hurtigt overblik over dine familiære opgaver og informationer.
                        </p>
                    </div>
                </section>
                <section className="w-full">
                    <div className={`relative mx-16 bottom-16`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div className=" bg-gradient-to-r from-[#FE4D66] to-[#FE8A8A] rounded shadow-md text-white p-6 hover:bg-[#FE4D66]">
                                <h2 className="text-2xl font-bold mb-2">Dine noter</h2>
                                <p className="mb-4 text-sm">Her kan du følge dine dine noter og vigtige informationer.</p>
                                <a
                                    href="https://familierogsorg.dk/"
                                    target="_blank"
                                    className={`inline-block py-2 text-white font-bold`}
                                    rel="noopener noreferrer"
                                >
                                    Læs mere
                                </a>
                            </div>
                            <div className="bg-gradient-to-r from-[#1A4D8D] to-[#3A7BD5] rounded shadow-md text-white p-6 hover:bg-[#1A4D8D]">
                                <h2 className="text-2xl font-bold mb-2">Vigtige aftaler</h2>
                                <p className="mb-4 text-sm">Se dine kommende aftaler og vigtige datoer.</p>
                                <a
                                    href="https://familierogsorg.dk/"
                                    target="_blank"
                                    className={`inline-block py-2 text-white font-bold`}
                                    rel="noopener noreferrer"
                                >
                                    Læs mere
                                </a>
                            </div>
                            <div className="bg-gradient-to-r from-[#4B6CB7] to-[#182848] rounded shadow-md text-white p-6 hover:bg-indigo-700">
                                <h2 className="text-2xl font-bold mb-2">Din kalender</h2>
                                <p className="mb-4 text-sm">Følg dine kommende aftaler i kalenderen.</p>
                                <a
                                    href="https://familierogsorg.dk/"
                                    target="_blank"
                                    className={`inline-block py-2 text-white font-bold`}
                                    rel="noopener noreferrer"
                                >
                                    Læs mere
                                </a>
                            </div>
                            <div className="bg-gradient-to-r from-[#C1DAD6] to-[#A8DADC] rounded shadow-md text-white p-6 hover:bg-[#C1DAD6]">
                                <h2 className="text-2xl font-bold mb-2 text-blue-900">Tips & Tricks</h2>
                                <p className="mb-4 text-blue-900 text-sm">Se de bedste tips og tricks til familielivet.</p>
                                <a
                                    href="https://familierogsorg.dk/"
                                    target="_blank"
                                    className={`inline-block py-2 text-blue-900 font-bold`}
                                    rel="noopener noreferrer"
                                >
                                    Læs mere
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mt-8 relative bottom-12 mx-16">
                    <h2 className="text-4xl text-blue-800 font-bold mb-4">15/11-2026</h2>
                    <p className="mb-4 text-xl font-semibold text-blue-800">Her er dagens aftaler i din kalender:</p>
                    <Link href="#">
                        <a className="text-blue-800 underline mb-4 inline-block bg-blue-900 text-white py-2 px-4 rounded decoration-2">Se kalender</a>
                    </Link>
                    <Deferred
                        data="pages"
                        fallback={<PagesFallbackComponent />}
                    >
                        <Swiper spaceBetween={25} slidesPerView={2.5} className="mySwiper">
                            <SwiperSlide>
                                <div className="swiper-item-container rounded shadow-md p-6 hover:bg-[#00027C]">
                                    <h3 className="text-xl font-bold text-white mb-2">Læge aftale</h3>
                                    <div className="divider mt-8">
                                        <span className="text-white">Detaljer</span>
                                    </div>
                                    <p className="text-white">Tid: 10:00 - 11:00</p>
                                    <p className="text-white">Sted: Lægeklinikken</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="swiper-item-container rounded shadow-md p-6 hover:bg-[#00027C]">
                                    <h3 className="text-xl font-bold text-white mb-2">Læge aftale</h3>
                                    <div className="divider mt-8">
                                        <span className="text-white">Detaljer</span>
                                    </div>
                                    <p className="text-white">Tid: 10:00 - 11:00</p>
                                    <p className="text-white">Sted: Lægeklinikken</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="swiper-item-container rounded shadow-md p-6 hover:bg-[#00027C]">
                                    <h3 className="text-xl font-bold text-white mb-2">Læge aftale</h3>
                                    <div className="divider mt-8">
                                        <span className="text-white">Detaljer</span>
                                    </div>
                                    <p className="text-white">Tid: 10:00 - 11:00</p>
                                    <p className="text-white">Sted: Lægeklinikken</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="swiper-item-container rounded shadow-md p-6 hover:bg-[#00027C]">
                                    <h3 className="text-xl font-bold text-white mb-2">Læge aftale</h3>
                                    <div className="divider mt-8">
                                        <span className="text-white">Detaljer</span>
                                    </div>
                                    <p className="text-white">Tid: 10:00 - 11:00</p>
                                    <p className="text-white">Sted: Lægeklinikken</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="swiper-item-container rounded shadow-md p-6 hover:bg-[#00027C]">
                                    <h3 className="text-xl font-bold text-white mb-2">Læge aftale</h3>
                                    <div className="divider mt-8">
                                        <span className="text-white">Detaljer</span>
                                    </div>
                                    <p className="text-white">Tid: 10:00 - 11:00</p>
                                    <p className="text-white">Sted: Lægeklinikken</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="swiper-item-container rounded shadow-md p-6 hover:bg-[#00027C]">
                                    <h3 className="text-xl font-bold text-white mb-2">Læge aftale</h3>
                                    <div className="divider mt-8">
                                        <span className="text-white">Detaljer</span>
                                    </div>
                                    <p className="text-white">Tid: 10:00 - 11:00</p>
                                    <p className="text-white">Sted: Lægeklinikken</p>
                                </div>
                            </SwiperSlide>
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
                <TodoListSection todos={Todos} />
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