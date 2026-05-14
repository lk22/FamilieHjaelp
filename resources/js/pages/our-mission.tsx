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
                  <h1 className="text-white lg:w-8/12 balance leading text-8xl font-bold">Vores mission & vision</h1>
                </motion.div>
              </div>
            </div>
          </section>
          <section className="pt-56 bg-white">
            <div className="container mx-auto">
              <div className="mx-auto px-4 py-16">
                <h2 className="text-blue-900 w-6/12 text-4xl font-bold mb-2">Vores vision og mission hos FamilieHjælp</h2>
                <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-8">
                  Hos FamilieHjælp er vores mission at skabe en tryg og støttende platform for forældre, der står over for udfordringer som abort og dødfødsel. Vi stræber efter at tilbyde let adgang til pålidelige ressourcer, professionel vejledning og et fællesskab af støtte, så ingen forælder behøver at føle sig alene i svære tider. Gennem vores innovative digitale løsninger ønsker vi at gøre en positiv forskel i livet for familier overalt i danmark.
                </p>
                <h3 className="text-blue-900 w-6/12 text-2xl font-bold">Historen bag</h3>
                <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-8">
                  Ideen til FamilieHjælp opstod fra en personlig oplevelse med min kæreste, vi ventet vores føreste barn, men desværre mistede vi ham i uge 22. i graviditeten. hvilke blev en utrolig svær tid for os begge, på mange måder, vi på trods af vejledining og støtte fra sundhedsvæsenet følte vi os alene og usikre på, hvordan vi skulle håndtere og navigere i denne svære situation, vi vidste ikke helt hvordan vi skulle forholde os til al den information der er omkring vores situation og kunne ikke navigere i det og var ekstremt forvirrende. Denne oplevelse inspirerede mig til at skabe en platform, der kunne tilbyde støtte, ressourcer og fællesskab for andre forældre, der gennemgår lignende udfordringer. Mit mål med FamilieHjælp er at sikre, at ingen forælder behøver at føle sig alene i sådanne svære tider, og at de har adgang til den hjælp og støtte, de har brug for.
                </p>
                <h3 className="text-blue-900 w-6/12 text-2xl font-bold">Vores tilgang</h3>
                <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-8">
                  Vores tilgang er centreret omkring empati, tilgængelighed og innovation. Vi kombinerer ekspertise inden for sundhed og teknologi for at udvikle brugervenlige løsninger, der imødekommer de unikke behov hos forældre i krise. Ved at samarbejde med sundhedsprofessionelle, psykologer og brugergrupper sikrer vi, at vores platform ikke kun er inform men også følsom over for de følelsesmæssige aspekter af forældreskabets udfordringer. Vi er dedikerede til kontinuerlig forbedring og tilpasning af vores tjenester baseret på feedback fra vores brugere og de nyeste forskningsresultater inden for området.
                </p>
              </div>
            </div>
          </section>
          <section>
            <Accordion>
              {faqItems.map((item, index) => {
                return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                    <AccordionItem
                      key={index}
                      id={index}
                      title={item.title}
                      body={item.body}
                    />
                    </motion.div>
                )
              })}
            </Accordion>
          </section>
          {/* <GettingStartedSection /> */}
        </div>
      </WebLayout>
    );
}