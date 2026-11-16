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

interface IFamily {
    name: string;
    family_size: number;
    children_count: number;
    members: IFamilyMember[];
    children: IFamilyChildren[];
}

interface IFamilyMember {
    name: string;
    email: string;
    family_role: string;
    age: number;
    attached_email: string;
}

interface IFamilyChildren {
    name: string;
    age_years: number;
    age_months: number;
    age_weeks: number;
    needs_user_access: boolean;
    use_attached_parent_email: boolean;
    child_email: string;
}

interface ProfileOverviewHomeProps {
    todos: Todo[];
    family: IFamily;
    pages: Page[];
}

const ProfileOverviewHomeContent = ({
    todos,
    pages,
    family
}: ProfileOverviewHomeProps) => {
    // const { auth } = usePage<SharedData>().props;
    const isMobile = useIsMobile();
    const Todos = Array.isArray(todos) ? todos : [];

    return (
        <ProfileOverviewLayout title="Familiehjælp - Hjem">
            <div className="space-y-6">
                {/* Hero Section */}
                <section className="bg-white rounded-xl h-65 shadow-md px-10 py-8 md:px-16 md:py-12 flex flex-col md:flex-col gap-4 pb-20 border-1 border-blue-200">
                    <h1 className="text-3xl text-blue-800 font-bold mb-2 md:mb-0">Her er din oversigt</h1>
                    <p className="text-base md:text-lg leading-relaxed max-w-2xl text-gray-700">
                        Her kan du få et hurtigt overblik over dine familiære opgaver og informationer.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed max-w-2xl text-gray-700">
                        Familie: {family.name} ({family.family_size} medlemmer, {family.children_count} børn)
                    </p>
                </section>

                {/* Quick Access Cards */}
                <section className="relative bottom-25 h-25 mx-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-8">
                        {/* Notes Card */}
                        <a
                            href="https://familierogsorg.dk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-gradient-to-br from-pink-500 to-rose-300 rounded-xl shadow-md transition-colors duration-200 hover:from-pink-600 hover:to-rose-400"
                        >
                            <div className="p-6 flex flex-col justify-between h-full">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2 text-white">Noter</h2>
                                    <p className="mb-4 text-sm leading-relaxed text-white/90 group-hover:text-white transition-colors">
                                        Her kan du følge dine noter og vigtige informationer.
                                    </p>
                                </div>
                                <div className="mb-0">
                                    <span className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-md font-semibold text-white text-sm group-hover:bg-white/30 transition-colors">
                                        Se noter →
                                    </span>
                                </div>
                            </div>
                        </a>

                        {/* Important Agreements Card */}
                        <a
                            href="https://familierogsorg.dk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-gradient-to-br from-blue-700 to-blue-500 rounded-xl shadow-md transition-colors duration-200 hover:from-blue-800 hover:to-blue-600"
                        >
                            <div className="p-6 flex flex-col justify-between h-full">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2 text-white">Aftaler</h2>
                                    <p className="mb-4 text-sm leading-relaxed text-white/90 group-hover:text-white transition-colors">
                                        Se dine kommende aftaler og vigtige datoer.
                                    </p>
                                </div>
                                <div className="mb-0">
                                    <span className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-md font-semibold text-white text-sm group-hover:bg-white/30 transition-colors">
                                        Se aftaler →
                                    </span>
                                </div>
                            </div>
                        </a>

                        {/* Calendar Card */}
                        <a
                            href="https://familierogsorg.dk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl shadow-md transition-colors duration-200 hover:from-indigo-700 hover:to-indigo-900"
                        >
                            <div className="p-6 flex flex-col justify-between h-full">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2 text-white">Kalender</h2>
                                    <p className="mb-4 text-sm leading-relaxed text-white/90 group-hover:text-white transition-colors">
                                        Følg dine kommende aftaler i kalenderen.
                                    </p>
                                </div>
                                <div className="mb-0">
                                    <span className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-md font-semibold text-white text-sm group-hover:bg-white/30 transition-colors">
                                        Se kalender →
                                    </span>
                                </div>
                            </div>
                        </a>

                        {/* Tips & Tricks Card */}
                        <a
                            href={route('profile.todos')}
                            className="group block bg-gradient-to-br from-emerald-300 to-teal-200 rounded-xl shadow-md transition-colors duration-200 hover:from-emerald-400 hover:to-teal-300"
                        >
                            <div className="p-6 h-full flex flex-col justify-between">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2 text-blue-950">Opgaver</h2>
                                    <p className="mb-4 text-sm leading-relaxed text-blue-900/80 group-hover:text-blue-900 transition-colors">
                                        Få styr over alle familiens opgaver
                                    </p>
                                </div>
                                <div className="mb-0">
                                    <span className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-md font-semibold text-blue-900 text-sm group-hover:bg-white/30 transition-colors">
                                        Se opgaver →
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>

                {/* Today's Schedule */}
                <section>
                    <div className="flex justify-between">
                        <div className="w-6/12">
                            <h2 className="text-xl text-blue-800 font-bold px-16">15/11-2026</h2>
                            <p className="mb-6 text-md font-semibold text-blue-800 leading-relaxed px-16">
                                Her er dagens aftaler i din kalender:
                            </p>
                        </div>
                        <div className="w-6/12 me-16 flex items-center justify-end">
                            <Link href="#" className="ms-8 inline-flex items-center px-3 py-1.5 bg-blue-900 backdrop-blur-sm rounded-md font-semibold text-white text-sm group-hover:bg-blue-950 transition-colors duration-200 float-right">
                                Se kalender →
                            </Link>
                        </div>
                    </div>
                    <Deferred
                        data="pages"
                        fallback={<PagesFallbackComponent />}
                    >
                        <div className="px-16">
                            <Swiper spaceBetween={25} slidesPerView={2.5} className="mySwiper px-40 mb-20">
                                <SwiperSlide>
                                    <div className="swiper-item-container rounded-xl shadow-md p-6 bg-gradient-to-br from-gray-800 to-blue-950 group hover:from-gray-900 hover:to-blue-950 transition-colors duration-200">
                                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors">Læge aftale</h3>
                                        <div className="divider mt-6">
                                            <span className="text-gray-300">Detaljer</span>
                                        </div>
                                        <p className="mt-2 text-gray-200">Tid: 10:00 - 11:00</p>
                                        <p className="text-gray-200">Sted: Lægeklinikken</p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="swiper-item-container rounded-xl shadow-md p-6 bg-gradient-to-br from-gray-800 to-blue-950 group hover:from-gray-900 hover:to-blue-950 transition-colors duration-200">
                                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors">Kør Olivia til håndbold</h3>
                                        <div className="divider mt-6">
                                            <span className="text-gray-300">Detaljer</span>
                                        </div>
                                        <p className="mt-2 text-gray-200">Tid: 10:00 - 11:00</p>
                                        <p className="text-gray-200">Sted: Roskilde Håndbold</p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="swiper-item-container rounded-xl shadow-md p-6 bg-gradient-to-br from-gray-800 to-blue-950 group hover:from-gray-900 hover:to-blue-950 transition-colors duration-200">
                                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors">Indkøb</h3>
                                        <div className="divider mt-6">
                                            <span className="text-gray-300">Detaljer</span>
                                        </div>
                                        <p className="mt-2 text-gray-200">Tid: 10:00 - 11:00</p>
                                        <p className="text-gray-200">Sted: Bilka</p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="swiper-item-container rounded-xl shadow-md p-6 bg-gradient-to-br from-gray-800 to-blue-950 group hover:from-gray-900 hover:to-blue-950 transition-colors duration-200">
                                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors">Læge aftale</h3>
                                        <div className="divider mt-6">
                                            <span className="text-gray-300">Detaljer</span>
                                        </div>
                                        <p className="mt-2 text-gray-200">Tid: 10:00 - 11:00</p>
                                        <p className="text-gray-200">Sted: Lægeklinikken</p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="swiper-item-container rounded-xl shadow-md p-6 bg-gradient-to-br from-gray-800 to-blue-950 group hover:from-gray-900 hover:to-blue-950 transition-colors duration-200">
                                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors">Læge aftale</h3>
                                        <div className="divider mt-6">
                                            <span className="text-gray-300">Detaljer</span>
                                        </div>
                                        <p className="mt-2 text-gray-200">Tid: 10:00 - 11:00</p>
                                        <p className="text-gray-200">Sted: Lægeklinikken</p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="swiper-item-container rounded-xl shadow-md p-6 bg-gradient-to-br from-gray-800 to-blue-950 group hover:from-gray-900 hover:to-blue-950 transition-colors duration-200">
                                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors">Læge aftale</h3>
                                        <div className="divider mt-6">
                                            <span className="text-gray-300">Detaljer</span>
                                        </div>
                                        <p className="mt-2 text-gray-200">Tid: 10:00 - 11:00</p>
                                        <p className="text-gray-200">Sted: Lægeklinikken</p>
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
                        </div>
                    </Deferred>
                </section>

                {/* Todo List Section */}
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

export default function ProfileOverviewHome({
    family,
    todos,
    pages
}: ProfileOverviewHomeProps) {
    console.log(family)
    console.log(family.children)
    return (
        <OnboardingProvider>
            <ProfileOverviewHomeContent
                family={family}
                familyMembers={family.members}
                children={family.children}
                todos={todos}
                pages={pages}
            />
        </OnboardingProvider>
    );
}
