import {Accordion, AccordionItem} from "@/components/WebLayout/Accordion/Accordion";
// import GettingStartedSection from "@/components/GettingStartedSection";
import { motion } from 'framer-motion';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import WebLayout from "@/layouts/web-layout";
import GettingStartedCta from "@/components/WebLayout/GettingStartedCta";

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
      <WebLayout
        pageTitle="Vores mission og vision | FamilieHjælp"
        description="Lær om vores mission og vision hos FamilieHjælp, hvor vi stræber efter at skabe en tryg og støttende platform for forældre, der står over for udfordringer som abort og dødfødsel. Vores mål er at tilbyde let adgang til pålidelige ressourcer, professionel vejledning og et fællesskab af støtte, så ingen forælder behøver at føle sig alene i svære tider. Gennem innovative digitale løsninger ønsker vi at gøre en positiv forskel i livet for familier overalt i Danmark."
      >
        <div className="bg-white">
            <section className="bg-white text-blue-900 sm:pt-[90px] xl:pt-15 h-[700px] rounded-b-3xl shadow-lg">
            <div className="container-fluid sm:mx-0 md:mx-0 xl:mx-0 relative rounded-xl flex flex-wrap gap-10 items-center shadow-lg rounded-2xl">
                <video src="/videos/loosing_someone.mp4" autoPlay={true} loop={true} muted className="w-full h-[700px] object-cover">
                    Your browser does not support the video tag.
                </video>
                <div className="w-4/12 sm:w-full p-8 absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-blue-900/70 to-transparent sm:p-8 xl:p-36 flex flex-col justify-center items-start text-start gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <h1 className="text-white w-full balance leading hidden">Hurtig forælder hjælp <span className="text-blue-500">lige ved hånden</span></h1>
                    <h1 className="text-white lg:w-8/12 balance leading text-8xl font-bold">Har du oplevet en abort?</h1>
                  </motion.div>
                </div>
            </div>
            </section>
            <section className="pt-56 pb-0 bg-white">
          <div className="container mx-auto">
            <div className="mx-auto px-4 py-16">
              <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-16">
                At miste et barn gennem dødfødsel er en hjerteskærende oplevelse, der efterlader forældre i dyb sorg og forvirring. ForældreHjælp er her for at støtte dig gennem denne svære tid ved at tilbyde ressourcer, vejledning og et fællesskab af forståelse. Vores platform giver adgang til professionelle rådgivere, støttegrupper og informative artikler, der kan hjælpe dig med at navigere i sorgen og finde måder at mindes dit barn på. Du er ikke alene – vi er her for at hjælpe dig med at finde styrke og håb i en tid præget af tab.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
                <aside>
                  <video src="/videos/hjaelpemidler.mp4" autoPlay={true} loop={true} muted width={400} height={400} className="w-full rounded-lg shadow-lg mb-8 h-[500px] object-cover">
                    Your browser does not support the video tag.
                  </video>
                </aside>
                <aside>
                  <h3 className="text-blue-900 text-4xl font-bold mb-2">Vi anbefaler</h3>
                  <p className="text-blue-900 text-xl leading-10 w-9/12 mb-8">
                    Vi anbefaler at du søger professionel hjælp og støtte gennem vores platform, hvor du kan finde rådgivere specialiseret i sorgbearbejdning efter dødfødsel. Derudover kan deltagelse i støttegrupper med andre forældre, der har oplevet lignende tab, være en værdifuld måde at dele dine følelser og finde trøst. Vores ressourcer er designet til at hjælpe dig med at navigere i sorgen og finde måder at mindes dit barn på, mens du begynder helingsprocessen.
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </section>
          <GettingStartedCta />
        </div>
      </WebLayout>
    );
}