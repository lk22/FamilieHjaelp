// Libraries
import {useEffect, useState, useCallback} from 'react';
import {Link, usePage} from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Layout 
import ProfileOverviewLayout from '@/layouts/profile/profile-layout';

// Components
import InformationSlide from '@/components/Onboarding/InformationSlide';

interface SlideProperties {
    title: string;
    link: string;
}

export default function ProfileOverviewHome() {
    const { auth } = usePage<SharedData>().props;

    const slides:SlideProperties[] = [
        {
            title: 'Slide 1',
            link: '/slide-1'
        },
        {
            title: 'Slide 2',
            link: '/slide-2'
        },
        {
            title: 'Slide 3',
            link: '/slide-3'
        }
    ]

    return (
        <ProfileOverviewLayout auth={auth}>
            <div>
                <Swiper spaceBetween={50} slidesPerView={1}>
                    {slides && (
                        <>
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <InformationSlide title={slide.title} link={slide.link} />
                            </SwiperSlide>
                        ))}
                        </>
                    )}
                    <SwiperSlide>
                        <InformationSlide title="Slide 1" link="/slide-1" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <InformationSlide title="Slide 2" link="/slide-2" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <InformationSlide title="Slide 3" link="/slide-3" />
                    </SwiperSlide>
                </Swiper>
                <h1>Profile Overview Home</h1>
                <p>Welcome, {auth.user.name}!</p>
                <p>Your email: {auth.user.email}</p>
            </div>
        </ProfileOverviewLayout>
    );
}