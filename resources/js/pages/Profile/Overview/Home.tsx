// Libraries
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
                        </SwiperSlide><SwiperSlide key={2}>
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
                    <Link href={route('profile.todos')} className="text-blue-500 hover:underline">
                        Gå til opgaver
                    </Link>
                </div>
            </div>
            <Swiper spaceBetween={25} slidesPerView={handleSwiperSlidesPerView()} className="mySwiper">
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