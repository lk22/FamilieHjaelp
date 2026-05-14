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
      <WebLayout
        pageTitle="Kom igang | FamilieHjælp"
        description="Lær om vores mission og vision hos FamilieHjælp, hvor vi stræber efter at skabe en tryg og støttende platform for forældre, der står over for udfordringer som abort og dødfødsel. Vores mål er at tilbyde let adgang til pålidelige ressourcer, professionel vejledning og et fællesskab af støtte, så ingen forælder behøver at føle sig alene i svære tider. Gennem innovative digitale løsninger ønsker vi at gøre en positiv forskel i livet for familier overalt i Danmark."
      >
        <div className="bg-white">
          <section className="pt-56 pb-0 bg-white">
            <div className="container mx-auto">
              <div className="flex flex-col gap-16">
                <div className="w-12/12">
                  <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      transition={{ duration: 1.5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <h1 className="balance leading text-8xl font-bold text-center">Få hjælp lige ved <span className="text-blue-900">hånden</span></h1>
                      <p className="text-xl text-blue-900 mt-4 text-center w-8/12 mx-auto">
                        Uanset om du er ny bruger eller har brugt vores platform før, er det nemt at komme i gang med Familiehjælp og begynde at få adgang til de ressourcer og hjælpemidler, du har brug for.
                      </p>
                  </motion.div>
                </div>
                <div className="w-12/12 mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 150 }}
                  transition={{ duration: 2.5, delay: 0.5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <img src="/images/web/getting_started.jpg" alt="" height={400} width={800} className="rounded-lg shadow-lg mx-auto"/>
                </motion.div>
                </div>
              </div>
            </div>
          </section>
          <section className="pt-56 pb-0 bg-white">
            <div className="container mx-auto">
              <div className="mx-auto px-4 py-16">
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
          {/* <GettingStartedSection /> */}
        </div>
      </WebLayout>
    );
}