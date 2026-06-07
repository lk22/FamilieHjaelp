// dependency imports
import { motion } from 'motion/react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

// Type imports
import { type SharedData } from '@/types';

// Utility imports
import { localizeRoute } from "@/util/localizeRoute";

// Layouts
import WebLayout from '@/layouts/web-layout';

// Component imports
import GettingStartedCta from '@/components/WebLayout/GettingStartedCta';

export default function Welcome() {
    const { locale } = usePage<SharedData>().props;
    const { t } = useTranslation('web');
    const localized = localizeRoute(locale);

    return (
        <>
            <WebLayout
                pageTitle={t('frontpage.meta.title')}
                description={t('frontpage.meta.description')}
            >
                <section className="bg-white text-blue-900 sm:pt-[120px] xl:pt-50">
                    <div className="container 2xl:w-[1600px] 2xl:max-w-[1600px] mx-auto">
                        <div className="flex sm:flex-col 2xl:flex-row px-10 gap-12">
                            <div className=" 2xl:w-7/12 sm:w-full md:w-full flex flex-col justify-center items-start text-start gap-6">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 1.5 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className={"text-7xl font-bold text-blue-900"}
                                >
                                    {t('frontpage.title')} <span className="text-indigo-600">{t('frontpage.title.highlight')}</span>
                                </motion.h1>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                >
                                    <p className="text-xl text-black w-10/12">{t('frontpage.description')}</p>
                                </motion.div>
                            </div>
                            <div className="2xl:w-5/12 sm:w-full relative flex justify-end items-end">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 1.5, delay: 1.5 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="w-full h-full relative"
                                >
                                    <div className="w-4/12 sm:w-full w-full h-full bg-gradient-to-br absolute from-blue-700/0 via-transparent to-blue-900/70 flex flex-col justify-center items-start text-start gap-6 rounded-2xl"></div>
                                    <video
                                        src="/videos/intro.mp4"
                                        autoPlay={true}
                                        loop={true}
                                        muted
                                        controls
                                        className="w-full h-[700px] object-cover rounded-2xl shadow-lg"
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 px-8 sm:px-8 md:px-0 container mx-auto py-32">
                        <div className="ups-item bg-blue-400/10 rounded-2xl p-8 flex flex-col justify-center items-start text-start gap-4">
                            <div className="flex justify-between items-center gap-4 w-full">
                                <h3 className="text-6xl font-bold mt-2 text-blue-800">{t('frontpage.selling_points.families_helped.count')}</h3>
                                <p className="text-zinc-600 dark:text-black mt-2 font-bold text-xl">{t('frontpage.selling_points.families_helped.title')}</p>
                            </div>
                        </div>
                        <div className="ups-item bg-blue-900/10 rounded-2xl p-8 flex flex-col justify-start items-start text-start gap-4">
                            <div className="flex justify-between items-center gap-4 w-full">
                                <h3 className="text-6xl font-bold mt-2 text-blue-800">{t('frontpage.selling_points.satisfaction_rate.count')}</h3>
                                <p className="text-zinc-600 dark:text-black mt-2 font-bold text-xl">{t('frontpage.selling_points.satisfaction_rate.title')}</p>
                            </div>
                        </div>
                        <div className="ups-item bg-blue-900/10 rounded-2xl p-8 flex flex-col justify-start items-start text-start gap-4">
                            <div className="flex justify-between items-center gap-4 w-full">
                                <h3 className="text-6xl font-bold mt-2 text-blue-800">{t('frontpage.selling_points.average_startup_time.count')}</h3>
                                <p className="text-zinc-600 dark:text-black mt-2 font-bold text-xl">{t('frontpage.selling_points.average_startup_time.title')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white text-blue-900 pt-20 pb-32">
                    <div className="container mx-auto flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse xl:flex-row flex-wrap">
                        <div className="w-full xl:w-6/12 p-8 flex flex-col justify-center items-start text-start gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <h3 className="text-5xl font-bold mb-4">{t('frontpage.about_section.title')}</h3>
                                <p className="text-lg mb-8 leading-8 text-zinc-600 dark:text-black font-medium mb-4">{t('frontpage.about_section.description')}</p>
                                <Link href={localized('page.our-mission')} className="bg-blue-800 text-white py-3 mt-8 px-8 rounded-full mt-8 font-medium hover:bg-blue-900 transition cursor-pointer font-bold">{t('frontpage.about_section.button')}</Link>
                            </motion.div>
                        </div>
                        <div className="w-full xl:w-6/12 p-16 flex xl:justify-center xl:items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <img
                                    src="images/web/intro_illustration_one.svg"
                                    width={600}
                                    height={400}
                                    alt="About us image"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container mx-auto">
                        <h3 className="text-5xl font-bold text-blue-800">{t('frontpage.how_we_can_help.title')}</h3>
                        <div className="flex sm:flex-col lg:flex-row gap-8 mt-12">
                            <div className="2xl:w-1/3 sm:w-full py-8 min-h-64 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex flex-col justify-center px-8 gap-6 py-12">
                                <h3 className="text-3xl font-bold text-white mt-4">{t('frontpage.how_we_can_help.sections.abort.title')}</h3>
                                <p className="text-lg text-blue-200 w-10/12">{t('frontpage.how_we_can_help.sections.abort.description')}</p>
                                <Link href={localized('page.experiences.abortion')}>
                                    <button
                                        className="mb-4 bg-white text-blue-800 py-3 px-8 rounded-full mt-6 font-medium hover:bg-gray-100 transition cursor-pointer inline-block font-medium"
                                    >
                                        {t('frontpage.how_we_can_help.sections.abort.button')}
                                    </button>
                                </Link>
                            </div>
                            <div className="2xl:w-1/3 sm:w-full py-8 min-h-64 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex flex-col justify-center px-8 gap-6">
                                <h3 className="text-3xl font-bold text-white">{t('frontpage.how_we_can_help.sections.stillbirth.title')}</h3>
                                <p className="text-lg text-blue-200 w-10/12">{t('frontpage.how_we_can_help.sections.stillbirth.description')}</p>
                                <Link href={localized('page.experiences.stillbirth')}>
                                    <button className="mb-4 bg-white text-blue-800 py-3 px-8 rounded-full mt-6 font-medium hover:bg-gray-100 transition cursor-pointer inline-block font-medium">
                                        {t('frontpage.how_we_can_help.sections.stillbirth.button')}
                                    </button>
                                </Link>
                            </div>
                            <div className="2xl:w-1/3 sm:w-full py-8 min-h-64 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex flex-col justify-center px-8 gap-6">
                                <h3 className="text-3xl font-bold text-white">{t('frontpage.how_we_can_help.sections.new_parents.title')}</h3>
                                <p className="text-lg text-blue-200 w-10/12">{t('frontpage.how_we_can_help.sections.new_parents.description')}</p>
                                <Link href={localized('page.experiences.new-parents')}>
                                    <button className="mb-4 bg-white text-blue-800 py-3 px-8 rounded-full mt-6 font-medium hover:bg-gray-100 transition cursor-pointer inline-block font-medium">
                                        {t('frontpage.how_we_can_help.sections.new_parents.button')}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white text-blue-900 sm:py-20 xl:px-8 xl:py-32">
                    <div className="container flex flex-wrap mx-auto">
                        <div className="w-full lg:w-6/12 md:px-0 flex justify-center items-center">
                            <video
                                src="/videos/function_resources_intro.mp4"
                                autoPlay={true}
                                loop={true}
                                muted
                                controls
                                className="w-full h-[700px] object-cover rounded-2xl shadow-lg shadow-blue-200"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="w-full lg:w-6/12 mt-8 flex flex-col justify-center items-start text-start gap-6 md:px-0 lg:ps-16">
                            <motion.h3
                                className="text-5xl font-bold mb-4 text-blue-800"
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                {t('frontpage.resources_functions.title')}
                            </motion.h3>
                            <p className="text-xl leading-8 text-blue-600 dark:text-black mb-6 font-medium">
                                {t('frontpage.resources_functions.hightlight')}
                            </p>
                            <p className="text-lg leading-2 text-zinc-600 dark:text-blue-900">
                                {t('frontpage.resources_functions.features.feature_one')}
                            </p>
                            <p className="text-lg leading-2 text-zinc-600 dark:text-blue-900">
                                {t('frontpage.resources_functions.features.feature_two')}
                            </p>
                            <p className="text-lg leading-2 text-zinc-600 dark:text-blue-900">
                                {t('frontpage.resources_functions.features.feature_three')}
                            </p>
                            <p className="text-lg leading-2 text-zinc-600 dark:text-blue-900">
                                {t('frontpage.resources_functions.features.feature_four')}
                            </p>
                            <Link href={localized('page.functions')} className="bg-blue-700 text-white py-3 px-8 rounded-full mt-6 font-medium hover:bg-blue-800 transition cursor-pointer inline-block font-medium">Udforsk vores funktioner</Link>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container mx-auto mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <h3 className="text-5xl font-bold mb-4 text-blue-800 text-center">{t('frontpage.recommended.title')}</h3>
                            <p className="text-center">{t('frontpage.recommended.subtitle')}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex gap-8 mt-20">
                                <div className="testimonial flex sm:flex-col-reverse xl:flex-row gap-12 relative">
                                    <div className="story sm:w-full xl:w-6/12">
                                        <h3 className="text-3xl font-bold mb-4 text-blue-800 w-9/12">{t('frontpage.recommended.story.title')}</h3>
                                        <p className="text-lg text-blue-800 w-10/12">{t('frontpage.recommended.story.desc_one')}</p>
                                        <p className="text-lg text-blue-800 w-10/12 mt-2">{t('frontpage.recommended.story.desc_two')}</p>
                                        <p className="text-md text-blue-600 mt-4 font-bold mt-4">{t('frontpage.recommended.story.author')}</p>

                                        <div className="absolute sm:bottom-0 2xl:bottom-2">
                                            <h3 className="text-2xl text-black font-bold">{t('frontpage.recommended.want_to_read_more')}</h3>
                                            <Link href={localized('page.stories')} className="bg-blue-700 text-white py-3 px-8 rounded-full mt-6 font-medium hover:bg-blue-800 transition cursor-pointer inline-block font-medium">
                                                {t('frontpage.recommended.button')}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="story-image sm:w-full xl:w-6/12 relative">
                                        <img src="/images/web/testimonials/success_story_one.jpg" alt="Testimonial 1" className="rounded-2xl shadow-lg"/>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
                <GettingStartedCta />
            </WebLayout>
        </>
    );
}
