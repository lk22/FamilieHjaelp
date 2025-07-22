// Libraries
import { usePage, Link } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import {Skeleton} from '@/components/ui/skeleton';

import { useOnboarding, OnboardingProvider } from '@/contexts/OnboardingContext';

// Layout 
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

// Components
import InformationSlide from '@/components/Onboarding/InformationSlide';

interface SlideProperties {
    title: string;
    description: string;
    link: string;
    backgroundColor: string;
}

const ProfileOverviewHomeContent = () => {
    const { getCurrentStepData } = useOnboarding();
    const { auth } = usePage<SharedData>().props;

    const currentStepData = getCurrentStepData(2);

    console.log('Current Step Data:', currentStepData);

    const slides: SlideProperties[] = [
        {
            title: 'Sorgoverlov',
            description: 'Har du mistet en nær pårørende? Få hjælp til at håndtere sorg og tab.',
            link: route('profile.info.page', { page: 'sorgoverlov' }),
            backgroundColor: 'bg-[#00027C]'
        },
        {
            title: 'Barselsoverlov',
            description: 'Har du brug for information om barselsoverlov? Få hjælp til at forstå dine rettigheder og muligheder.',
            link: route('profile.info.page', { page: 'barselsoverlov' }),
            backgroundColor: 'bg-gradient-to-r from-[#004EA7] to-[#007BFF]'
        },
        {
            title: 'Slide 3',
            description: 'This is the third slide description.',
            link: route('profile.info.page', { page: 'slide-3' }),
            backgroundColor: 'bg-gradient-to-r from-red-800 to-red-600'
        }
    ]

    return (
        <ProfileOverviewLayout
            auth={auth}
            title="Familiehjælp - Hjem"
            headline={currentStepData?.headline || 'Velkommen til dit overblik'}
        >
            <div>
                <h1 className="text-2xl text-blue-800 font-bold mb-4">Hjælp til at komme videre</h1>
                <p className="mb-4">
                    Vi er kede af jeres situation, det kan være svært at komme videre alene, Vi kan dirigere dig hurtigt videre til den nødvendige hjælp men vi skal bruge din hjælp.
                </p>
                <Skeleton className="w-full h-64 mb-4">
                    <Swiper spaceBetween={25} slidesPerView={1.5}>
                        {slides && (
                            <>
                                {slides.map((slide, index) => (
                                    <SwiperSlide key={index}>
                                        <InformationSlide
                                            title={slide.title}
                                            link={slide.link}
                                            description={slide.description}
                                            backgroundColor={slide.backgroundColor}
                                        />
                                    </SwiperSlide>
                                ))}
                            </>
                        )}
                    </Swiper>
                </Skeleton>
                
                <div className="home-tasks-overview">
                    <h2>Ting og huske</h2>
                    <p>Se alle de ting man skal huske når man får / mister et barn</p>
                    <img src="/images/tasks_graphics.svg" alt="tasks" />
                    <Link href={route('profile.todos')} className="text-blue-500 hover:underline">
                        Gå til opgaver
                    </Link>
                </div>
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