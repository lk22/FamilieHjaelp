// dependency imports
import { type SharedData } from '@/types';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

import WebLayout from '@/layouts/web-layout';

export default function Welcome() {
    return (
        <>
            <WebLayout
                pageTitle="Din digitale forælder assistent lige ved hånden"
                description="Vi er her for at hjælpe dig med at navigere forældreskabet ved at give dig nem adgang til de ressourcer og den støtte, du har brug for."
            >
                <section className="bg-white text-blue-900 sm:pt-[90px] xl:pt-0 h-[100vh] rounded-b-3xl shadow-lg">
                    <div className="container-fluid sm:mx-0 md:mx-0 xl:mx-0 relative rounded-xl flex flex-wrap gap-10 items-center shadow-lg rounded-2xl">
                        <video src="/videos/intro.mp4" autoPlay={true} loop={true} muted className="w-full h-full object-cover">
                            Your browser does not support the video tag.
                        </video>
                        <div className="w-4/12 sm:w-full p-8 absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-blue-900/70 to-transparent sm:p-8 xl:p-36 flex flex-col justify-center items-start text-start gap-6">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            whileInView={{opacity: 1}}
                            className={"text-4xl font-bold text-blue-900"}
                        >
                            <h1 className="text-9xl font-bold mt-12 text-white">Din digitale forældre assistent <span className="text-indigo-600">lige ved hånden</span></h1>
                        </motion.h1>
                        <p className="mt-4 text-2xl text-white">Vi er her for at hjælpe dig med at navigere forældreskabet ved at give dig nem adgang til de ressourcer og den støtte, du har brug for.</p>
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
                                <p className="text-lg mb-8 leading-8 text-zinc-600 dark:text-black font-medium">
                                Familiehjælp er dedikeret til at gøre en forskel for familier i nød. Vi forstår de udfordringer, som mange familier står overfor, og vi er her for at tilbyde støtte og ressourcer, der kan hjælpe dem med at navigere gennem svære tider. Vores platform er designet til at være brugervenlig og tilgængelig, så alle kan finde den hjælp, de har brug for, når de har brug for det.
                                </p>
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
                    <section className="bg-white text-blue-900 pt-8">
                    <div className="container py-32 flex flex-wrap mx-auto">
                        <div className="w-full mb-20 px-12 sm:px-8 md:px-0 flex flex-col text-start gap-6 justify-center items-start">
                            <p className="text-5xl text-blue-800 font-semibold mb-6 wrap-balance">Kom godt i gang med Familiehjælp</p>
                            <p className="text-xl leading-8 text-zinc-600 dark:text-blue-900 w-9/12">
                            Uanset om du er ny bruger eller har brugt vores platform før, er det nemt at komme i gang med Familiehjælp og begynde at få adgang til de ressourcer og hjælpemidler, du har brug for.
                            </p>
                        </div>
                        <div className="w-full xl:w-6/12 px-8 sm:px-8 md:px-0 flex flex-col text-start gap-6 justify-center items-start">
                            <p className="text-4xl font-bold text-blue-800">Fortæl om din oplevelse</p>
                            <p className="text-lg leading-8 text-zinc-600 dark:text-black font-medium">
                            Del din historie med os. Vi vil gerne høre om dine oplevelser og hvordan Familiehjælp har hjulpet dig og din familie. Din feedback er vigtig for os, da den hjælper os med at forbedre vores platform og tilbyde bedre støtte til familier i nød.
                            </p>
                        </div>
                        <div className="w-full xl:w-6/12 sm:px-8 xl:px-0 mt-12 xl:mt-0 mb-12 flex justify-start xl:justify-center items-center">
                            <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            >
                            <img className="shadow-lg" src="images/web/onboarding_scenario.png" width={400} height={400} alt="Getting started illustration"/>
                            </motion.div>
                        </div>
                    </div>
                    </section>
                    <section className="bg-white text-blue-900 pt-8 pb-32">
                    <div className="container flex flex-col-reverse xl:flex-row lg:flex-wrap px-8 sm:px-8 md:px-0 mx-auto">
                        <div className="w-6/12 mb-12 flex justify-start xl:justify-center items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                            <img className="shadow-lg" src="images/web/Successpage.png" width={400} height={400} alt="Getting started illustration"/>
                            </motion.div>
                        </div>
                        <div className="w-full xl:w-6/12 flex flex-col text-start gap-6 justify-center items-start mb-12">
                            <p className="text-4xl font-medium text-blue-800">Opret din konto</p>
                            <p className="text-lg leading-8 text-zinc-600 dark:text-black font-medium">
                            Når du har udfyldt din oplevelse, kan du oprette en konto på Familiehjælp for at få adgang til flere funktioner og ressourcer. Det er hurtigt og nemt at oprette en konto, og det giver dig mulighed for at gemme dine oplysninger og få personlig støtte baseret på dine behov.
                            </p>
                        </div>
                    </div>
                    </section>
                    <section className="bg-white text-blue-900 pt-8 pb-32">
                    <div className="container flex flex-wrap mx-auto">
                        <div className="w-full xl:w-6/12 flex flex-col text-start gap-6 justify-center items-start mb-12 px-8 sm:px-8 md:px-0">
                            <p className="text-4xl font-medium text-blue-800">Og du er igang </p>
                            <p className="text-lg leading-8 text-zinc-600 dark:text-black font-medium">
                            Tillykke! Du er nu klar til at bruge Familiehjælp og få adgang til de ressourcer og hjælpemidler, du har brug for. Udforsk vores platform, find de værktøjer, der passer bedst til dine behov, og kontakt os, hvis du har brug for yderligere støtte. Vi er her for at hjælpe dig og din familie gennem svære tider.
                            </p>
                        </div>
                        <div className="w-full lg:w-6/12 mb-12 flex justify-center items-center px-8 sm:px-8 md:px-0">
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                            <img className="shadow-lg" src="images/web/app_dashboard.png" width={400} height={400} alt="Getting started illustration"/>
                            </motion.div>
                        </div>
                    </div>
                    </section>
                    <section className="bg-white text-blue-900 pt-8 pb-32 hidden">
                    <h2 className="text-3xl font-semibold mb-6 text-blue-800 text-center">Sådan kommer du i gang</h2>
                        <p>Det er nemt at komme i gang med Familiehjælp. Følg disse enkle trin for at begynde at bruge vores platform og få adgang til de ressourcer, du har brug for:</p>
                    <div className="container flex justify-center gap-16 mx-auto mt-12">
                        <div className="w-3/12">
                        <h3 className="text-xl font-medium mb-4">1. Opret en konto</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Tilmeld dig vores platform ved at oprette en gratis konto. Det tager kun et par minutter, og du vil få adgang til alle vores funktioner og ressourcer.
                        </p>
                        </div>
                        <div className="w-3/12">
                        <h3 className="text-xl font-medium mb-4">2. Udforsk ressourcer</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Gennemse vores omfattende bibliotek af ressourcer og hjælpemidler, der er designet til at støtte familier i forskellige situationer.
                        </p>
                        </div>
                        <div className="w-3/12">
                        <h3 className="text-xl font-medium mb-4">3. Få hjælp</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Kontakt vores supportteam eller brug vores online værktøjer til at få den hjælp, du har brug for, når du har brug for det.
                        </p>
                        </div>
                    </div>
                    </section>
            </WebLayout>
        </>
    );
}
