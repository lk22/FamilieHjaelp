// dependency imports
import { type SharedData } from '@/types';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

import WebLayout from '@/layouts/web-layout';

import GettingStartedCta from '@/components/WebLayout/GettingStartedCta';

export default function Welcome() {
    return (
        <>
            <WebLayout
                pageTitle="Din digitale forælder assistent lige ved hånden"
                description="Vi er her for at hjælpe dig med at navigere forældreskabet ved at give dig nem adgang til de ressourcer og den støtte, du har brug for."
            >
                <section className="bg-white text-blue-900 sm:pt-[90px] xl:pt-50">
                    <div className="container w-[1600px] max-w-[1600px] mx-auto">
                        <div className="flex px-10 gap-12">
                            <div className="w-7/12 sm:px-8 md:px-0 flex flex-col justify-center items-start text-start gap-6">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 1.5 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className={"text-4xl font-bold text-blue-900"}
                                >
                                    <h1 className="text-7xl font-bold mt-12">Din digitale famillie assistent <span className="text-indigo-600">lige ved hånden</span></h1>
                                </motion.h1>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                >
                                    <p className="text-xl text-black w-10/12">Vi er her for at hjælpe dig med at navigere forældreskabet ved at give dig nem adgang til de ressourcer og den støtte, du har brug for.</p>
                                </motion.div>
                            </div>
                            <div className="w-5/12 relative flex justify-end items-end">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 1.5, delay: 1.5 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="w-full h-full relative"
                                >
                                    <div className="w-4/12 sm:w-full w-full h-full bg-gradient-to-br absolute from-blue-700/0 via-transparent to-blue-900/70 flex flex-col justify-center items-start text-start gap-6 rounded-2xl"></div>
                                    <video src="/videos/intro.mp4" autoPlay={true} loop={true} muted className="w-full h-[700px] object-cover rounded-2xl shadow-lg">
                                        Your browser does not support the video tag.
                                    </video>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8 sm:px-8 md:px-0 container mx-auto py-32">
                        <div className="ups-item bg-blue-400/10 rounded-2xl p-8 flex flex-col justify-center items-start text-start gap-4">
                            <div className="flex justify-between items-center gap-4 w-full">
                                <h3 className="text-6xl font-bold mt-2 text-blue-800">1000+</h3>
                                <p className="text-zinc-600 dark:text-black mt-2 font-bold text-xl">Familier Har vi hjulpet</p>
                            </div>
                        </div>
                        <div className="ups-item bg-blue-900/10 rounded-2xl p-8 flex flex-col justify-start items-start text-start gap-4">
                            <div className="flex justify-between items-center gap-4 w-full">
                                <h3 className="text-6xl font-bold mt-2 text-blue-800">95%</h3>
                                <p className="text-zinc-600 dark:text-black mt-2 font-bold text-2xl">Tilfredshed</p>
                            </div>
                        </div>
                        <div className="ups-item bg-blue-900/10 rounded-2xl p-8 flex flex-col justify-start items-start text-start gap-4">
                            <div className="flex justify-between items-center gap-4 w-full">
                                <h3 className="text-6xl font-bold mt-2 text-blue-800">5</h3>
                                <p className="text-zinc-600 dark:text-black mt-2 font-bold text-2xl">Minutters gennemsnitlig opstartstid</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white text-blue-900 pt-20 pb-32">
                    <div className="container mx-auto flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse xl:flex-row flex-wrap">
                        <div className="w-full xl:w-6/12 p-8 flex flex-col justify-center items-start text-start gap-6">
                            <h3 className="text-5xl font-bold">Om Familiehjælp</h3>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <p className="text-lg mb-8 leading-8 text-zinc-600 dark:text-black font-medium">Familiehjælp er dedikeret til at gøre en forskel for familier i nød. Vi forstår de udfordringer, som mange familier står overfor, og vi er her for at tilbyde støtte og ressourcer, der kan hjælpe dem med at navigere gennem svære tider. Vores platform er designet til at være brugervenlig og tilgængelig, så alle kan finde den hjælp, de har brug for, når de har brug for det.</p>
                                <Link href="/vores-mission" className="bg-blue-800 text-white py-3 mt-8 px-8 rounded-full mt-4 font-medium hover:bg-blue-900 transition cursor-pointer font-bold">Læs mere om vores mission</Link>
                            </motion.div>
                        </div>
                        <div className="w-full xl:w-6/12 p-16 flex xl:justify-center xl:items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <img src="images/web/intro_illustration_one.svg" width={600} height={400} alt="About us image"/>
                            </motion.div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container mx-auto">
                        <h3 className="text-5xl font-bold text-blue-800">Vi kan hjælpe dig der har oplevet</h3>
                        <div className="flex gap-8 mt-12">
                            <div className="w-1/3 min-h-64 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex flex-col justify-center items-center text-center gap-6 py-12">
                                <h3 className="text-3xl font-bold text-white mt-4">Abort</h3>
                                <p className="text-lg text-blue-200 w-10/12">Vi forstår, hvor svært det kan være at miste et barn, og vi er her for at støtte dig gennem denne svære tid.</p>
                                <button
                                    className="mb-4 bg-white text-blue-800 py-3 px-8 rounded-full mt-6 font-medium hover:bg-gray-100 transition cursor-pointer inline-block font-medium"
                                >
                                    <Link href={route('page.experiences.abortion')}>Læs mere</Link>
                                </button>
                            </div>
                            <div className="w-1/3 min-h-64 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex flex-col justify-center items-center text-center gap-6">
                                <h3 className="text-3xl font-bold text-white">Dødfødsel</h3>
                                <p className="text-lg text-blue-200 w-10/12">Vi forstår, hvor svært det kan være at miste et barn, og vi er her for at støtte dig gennem denne svære tid.</p>
                                <button
                                    className="mb-4 bg-white text-blue-800 py-3 px-8 rounded-full mt-6 font-medium hover:bg-gray-100 transition cursor-pointer inline-block font-medium"
                                >
                                    <Link href={route('page.experiences.stillbirth')}>Læs mere</Link>
                                </button>
                            </div>
                            <div className="w-1/3 min-h-64 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl flex flex-col justify-center items-center text-center gap-6">
                                <h3 className="text-3xl font-bold text-white">Er nye forældre</h3>
                                <p className="text-lg text-blue-200 w-10/12">Vi forstår, at forældreskabet kan være udfordrende, og vi er her for at støtte dig gennem de svære tider og hjælpe dig med at finde de ressourcer, du har brug for.</p>
                                <button
                                    className="mb-4 bg-white text-blue-800 py-3 px-8 rounded-full mt-6 font-medium hover:bg-gray-100 transition cursor-pointer inline-block font-medium"
                                >
                                    <Link href={route('page.experiences.new-parents')}>Læs mere</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white text-blue-900 xl:px-8 xl:py-32">
                    <div className="container flex flex-wrap mx-auto">
                        <div className="w-full lg:w-6/12 pe-16 px-8 sm:px-8 md:px-0 flex justify-center items-center">
                            <video src="/videos/function_resources_intro.mp4" autoPlay={true} loop={true} muted className="w-full h-[700px] object-cover rounded-2xl shadow-lg shadow-blue-200">
                            Your browser does not support the video tag.
                        </video>
                        </div>
                        <div className="w-full lg:w-6/12 mt-8 flex flex-col justify-center items-start text-start gap-6 px-8 sm:px-8 md:px-0 lg:ps-16">
                        <motion.h3
                            className="text-5xl font-bold mb-4 text-blue-800"
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            Ressourcer og funktioner
                        </motion.h3>
                        <p className="text-xl leading-8 text-blue-600 dark:text-black mb-6 font-medium">
                            Familiehjælp tilbyder en række funktioner designet til at støtte dig og din familie i svære tider. Vores platform inkluderer bland andet:
                        </p>
                        <p className="text-lg leading-8 text-zinc-600 dark:text-blue-900">
                            - Et omfattende bibliotek af ressourcer og hjælpemidler <br/>
                            - Brugervenlige værktøjer til at finde den rette hjælp <br/>
                            - Mulighed for at kontakte vores supportteam for personlig assistance <br/>
                            - Regelmæssige opdateringer og nye ressourcer baseret på brugernes behov <br/>
                        </p>
                            <Link href="/functions" className="bg-blue-700 text-white py-3 px-8 rounded-full mt-6 font-medium hover:bg-blue-800 transition cursor-pointer inline-block font-medium">Udforsk vores funktioner</Link>
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
                            <h3 className="text-5xl font-bold mb-4 text-blue-800 text-center">Vi bliver anbefalet af mange familier</h3>
                            <p className="text-center">Læs nogle af de success historier fra dem vi har hjulpet</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex gap-8 mt-20">
                                <div className="testimonial flex gap-12 relative">
                                    <div className="story w-6/12">
                                        <h3 className="text-3xl font-bold mb-4 text-blue-800 w-9/12">"Familiehjælp har været en uvurderlig ressource for mig og min familie"</h3>
                                        <p className="text-lg text-blue-800 w-10/12">"Vi kom ud for en svær situation, vi var usikre på, hvordan vi skulle håndtere en dødfødsel.</p>
                                        <p className="text-lg text-blue-800 w-10/12 mt-2">"Familiehjælp appen hjalp os med at finde de rette ressourcer og støtte, og det gjorde en enorm forskel for os i en meget svær tid. Vi kunne ikke have klaret det uden dem."</p>
                                        <p className="text-md text-blue-600 mt-4 font-bold mt-4">- Maria, mor til to børn</p>

                                        <div className="absolute bottom-2">
                                            <h3 className="text-2xl text-blue-500">Vil du læse flere success historier som denne?</h3>
                                            <Link href="/testimonials/marias-story" className="bg-blue-700 text-white py-3 px-8 rounded-full mt-6 font-medium hover:bg-blue-800 transition cursor-pointer inline-block font-medium">
                                                Se flere historier
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="story-image w-6/12">
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
