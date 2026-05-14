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
      <WebLayout pageTitle="Vores mission og vision | ForældreHjælp" description="Lær om vores mission og vision hos ForældreHjælp, hvor vi stræber efter at skabe en tryg og støttende platform for forældre, der står over for udfordringer som abort og dødfødsel. Vores mål er at tilbyde let adgang til pålidelige ressourcer, professionel vejledning og et fællesskab af støtte, så ingen forælder behøver at føle sig alene i svære tider. Gennem innovative digitale løsninger ønsker vi at gøre en positiv forskel i livet for familier overalt i Danmark.">
        <div className="bg-white">
            <section className="bg-white text-blue-900 sm:pt-[90px] xl:pt-15 h-[700px] rounded-b-3xl shadow-lg">
              <div className="container-fluid sm:mx-0 md:mx-0 xl:mx-0 relative rounded-xl flex flex-wrap gap-10 items-center shadow-lg rounded-2xl">
                  <video src="/videos/new_parents_intro.mp4" autoPlay={true} loop={true} muted className="w-full h-[700px] object-cover">
                      Your browser does not support the video tag.
                  </video>
                  <div className="w-4/12 sm:w-full p-8 absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-blue-900/70 to-transparent sm:p-8 xl:p-36 flex flex-col justify-center items-start text-start gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    >
                      <h1 className="text-white w-full balance leading hidden">Hurtig forælder hjælp <span className="text-blue-500">lige ved hånden</span></h1>
                      <h1 className="text-white lg:w-8/12 balance leading text-8xl font-bold">At være blevet nybagte forældre</h1>
                  </motion.div>
                  </div>
              </div>
              </section>
              <section className="pt-56 pb-0 bg-white">
            <div className="container mx-auto">
              <div className="mx-auto px-4 py-16">
                <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-16">
                  At blive nybagte forældre er en livsændrende oplevelse fyldt med glæde, men også udfordringer og usikkerheder. ForældreHjælp er her for at støtte jer gennem denne spændende tid ved at tilbyde ressourcer, vejledning og et fællesskab af forståelse. Vores platform giver adgang til professionelle rådgivere, informative artikler og støttegrupper, der kan hjælpe jer med at navigere i de mange aspekter af forældreskabet. Uanset om det handler om søvnvaner, amning, eller følelsesmæssige udfordringer, er vi her for at hjælpe jer med at finde svar og støtte på jeres rejse som nye forældre.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
                  <aside>
                    <video src="/videos/new_parents_gatherings.mp4" autoPlay={true} loop={true} muted width={400} height={400} className="w-full rounded-lg shadow-lg mb-8 h-[600px] object-cover">
                      Your browser does not support the video tag.
                    </video>
                  </aside>
                  <aside>
                    <h3 className="text-blue-900 text-4xl font-bold mb-2">Vi anbefaler</h3>
                    <p className="text-blue-900 text-xl leading-10 w-9/12 mb-8">
                      Vi anbefaler at I som nye forældre søger professionel vejledning og støtte gennem vores platform, hvor I kan finde rådgivere specialiseret i nybagt forældreskab. Derudover kan deltagelse i støttegrupper med andre nye forældre være en værdifuld måde at dele jeres oplevelser og finde trøst i fællesskabet. Vores ressourcer er designet til at hjælpe jer med at navigere i de mange aspekter af forældreskabet og finde de bedste løsninger for jer og jeres barn.
                    </p>
                  </aside>
                </div>
              </div>
            </div>
          </section>
          <section>
              <div className="container mx-auto">
                  <div className="mx-auto px-4 py-16">
                      <div className="mx-auto w-full flex justify-center text-center">
                          <img src="/images/web/desktop_application.png" className="w-8/12" width={700} height={400} alt="New parents app illustration"/>
                      </div>
                      <div className="text-center">
                          <h2 className="text-blue-900 w-full">Vores app kan skrædersyes til forældre</h2>
                          <p className="text-blue-900 text-xl leading-10 mt-6 w-full mb-8">
                              Vores app er designet til at imødekomme de unikke behov hos nye forældre. Med funktioner som personlige påmindelser om fodring og søvn, adgang til ekspertrådgivning og et fællesskab af andre nye forældre, kan vores app hjælpe jer med at navigere i de udfordringer, der følger med at være nybagte forældre. kom igang med appen i dag og oplev, hvordan den kan gøre jeres rejse som forældre lettere og mere støttende sammentidig.
                          </p>
                          <div className="space-y-4">
                              <p className="text-blue-900 text-xl text-center font-bold">Få overblik over dine børn, brug værktøjet til at holde styr på hvad du skal gøre for som forældre for dit barn eller børn</p>
                              <p  className="text-blue-900 text-xl text-center font-bold">du får mulighed for at tage noter over hvor ofte jeres barn evt sover eller mulighed for at notere særlige hændelser</p>
                              <p  className="text-blue-900 text-xl text-center font-bold">Ønsker du at notere særlige henvendelser eller arrangemter enten i eller jeres barn skal til, kan i bruge værktøjets kalender mulighed</p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          {/* <GettingStartedSection /> */}
        </div>
      </WebLayout>
    );
}