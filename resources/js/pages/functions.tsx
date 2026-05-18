import {Accordion, AccordionItem} from "@/components/WebLayout/Accordion/Accordion";
// import GettingStartedSection from "@/components/GettingStartedSection";
import { motion } from 'framer-motion';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import WebLayout from "@/layouts/web-layout";

interface FaqItem {
    title: string;
    body: string | React.ReactNode | React.ReactNode[];
}

interface FaqItemsProps {
    item: FaqItem;
    index: number|string;
}

export default function Page() {
    const faqItems = usePage().props.faqItems as FaqItem[];

    return (
      <WebLayout pageTitle="Vores mission og vision | Familiehjælp" description="Lær om vores mission og vision hos ForældreHjælp, hvor vi stræber efter at skabe en tryg og støttende platform for forældre, der står over for udfordringer som abort og dødfødsel. Vores mål er at tilbyde let adgang til pålidelige ressourcer, professionel vejledning og et fællesskab af støtte, så ingen forælder behøver at føle sig alene i svære tider. Gennem innovative digitale løsninger ønsker vi at gøre en positiv forskel i livet for familier overalt i Danmark.">
        <div className="bg-white">
          <section className="text-blue-900 sm:pt-[90px] xl:pt-15 h-[700px] rounded-b-3xl shadow-lg">
            <div className="container-fluid sm:mx-0 md:mx-0 xl:mx-0 relative rounded-xl flex flex-wrap gap-10 items-center shadow-lg rounded-2xl">
              <video src="videos/our_mission_video.mp4" autoPlay={true} loop={true} muted className="w-full h-[700px] object-cover">
                  Your browser does not support the video tag.
              </video>
              <div className="w-4/12 sm:w-full p-8 absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-blue-900/70 to-transparent sm:p-8 xl:p-36 flex flex-col justify-center items-start text-start gap-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
                whileInView={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-white lg:w-8/12 balance leading text-8xl font-bold">Funktioner og ressourcer</h1>
                </motion.div>
              </div>
            </div>
          </section>
          <section className="pt-56 bg-white">
            <div className="container mx-auto">
              <div className="mx-auto px-4 py-16">
                <h2 className="text-blue-900 w-6/12 text-4xl font-bold mb-2">Funktioner og ressourcer hos FamilieHjælp</h2>
                <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-8">
                  Hos FamilieHjælp tilbyder vi en række funktioner og ressourcer designet til at støtte forældre gennem svære tider. Vores platform inkluderer adgang til professionelle rådgivere, informative artikler, støttegrupper og personlige værktøjer, der kan hjælpe dig med at navigere i de udfordringer, du måtte stå over for. Uanset om du har brug for hjælp til at håndtere sorg, finde pålidelige informationer eller oprette forbindelse til andre i lignende situationer, er FamilieHjælp her for at støtte dig på din rejse.
                </p>
                <h3 className="text-blue-900 w-6/12 text-2xl font-bold">Historen bag</h3>
                <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-8">
                  Ideen til FamilieHjælp opstod fra en personlig oplevelse med min kæreste, vi ventet vores føreste barn
                </p>
                <h3 className="text-blue-900 w-6/12 text-2xl font-bold">Vores tilgang</h3>
                <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-8">
                  Vores tilgang er centreret omkring empati, tilgængelighed og innovation. Vi kombinerer ekspertise inden for sundhed og teknologi for at udvikle brugervenlige løsninger, der imødekommer de unikke behov hos forældre i krise. Ved at samarbejde med sundhedsprofessionelle, psykologer og brugergrupper sikrer vi, at vores platform ikke kun er inform men også følsom over for de følelsesmæssige aspekter af forældreskabets udfordringer. Vi er dedikerede til kontinuerlig forbedring og tilpasning af vores tjenester baseret på feedback fra vores brugere og de nyeste forskningsresultater inden for området.
                </p>
              </div>
            </div>
          </section>
          {/* <GettingStartedSection /> */}
        </div>
      </WebLayout>
    );
}