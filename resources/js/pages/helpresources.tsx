import WebLayout from "@/layouts/web-layout";
import { motion } from "framer-motion";
import {Accordion, AccordionItem} from "@/components/WebLayout/Accordion/Accordion";
import { type AccordionItemData, type SharedData } from '@/types';

import { usePage } from "@inertiajs/react";

import GettingStartedCta from '@/components/WebLayout/GettingStartedCta';

export default function HelpResources() {

  const {faqItems} = usePage().props;

  const accordionItems: AccordionItemData[] = faqItems as AccordionItemData[];

  console.log(accordionItems);

  // const accordionItems: AccordionItemData[] = [
  //     {
  //       title: "Personlige ressourcer",
  //       body: "Skræddersyede artikler, videoer og værktøjer, der hjælper dig med at navigere i dine specifikke udfordringer som forælder."
  //     },
  //     {
  //       title: "Professionel vejledning",
  //       body: "Adgang til eksperter inden for sundhed, psykologi og forældreskab, der kan give dig den støtte, du har brug for."
  //     },
  //     {
  //       title: "Fællesskabsstøtte",
  //       body: "Muligheden for at forbinde med andre forældre, der gennemgår lignende oplevelser, så du aldrig føler dig alene."
  //     },
  //     {
  //       title: "Liste over sorggrupper og støttegrupper",
  //       body: (
  //         <ul className="list-disc list-inside">
  //           <li>Støttegruppe for tab af barn</li>
  //           <li>Gruppe for forældre efter abort</li>
  //           <li>Netværk for sorgbearbejdning</li>
  //           <li>Online fællesskab for deling af erfaringer</li>
  //         </ul>
  //       )
  //     }
  //   ];

    return (
      <WebLayout
        pageTitle="Hjælperessourcer - Familiehjælp"
        description="Opdag en række ressourcer og værktøjer, der kan støtte dig som hjælper i Familiehjælp. Uanset om du er ny eller erfaren, har vi samlet information og materialer, der kan hjælpe dig i din rolle som hjælper."
      >
        <div className="bg-white">
          <section className="bg-white text-blue-900 sm:pt-[90px] xl:pt-15 h-[700px] rounded-b-3xl shadow-lg">
            <div className="container-fluid sm:mx-0 md:mx-0 xl:mx-0 relative rounded-xl flex flex-wrap gap-10 items-center shadow-lg rounded-2xl">
              <video src="videos/intro.mp4" autoPlay={true} loop={true} muted className="w-full h-[700px] object-cover">
                  Your browser does not support the video tag.
              </video>
              <div className="w-4/12 sm:w-full p-8 absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-blue-900/70 to-transparent sm:p-8 xl:p-36 flex flex-col justify-center items-start text-start gap-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-white lg:w-6/12 balance font-bold leading text-8xl">Vores hjælpemidler</h1>
              </motion.div>
              </div>
            </div>
          </section>
          <section className="bg-white">
            <div className="container mx-auto">
              <div className="mx-auto pt-16 pb-8">
                <p className="text-blue-900 text-xl leading-10 my-36 w-9/12">
                  Hos ForældreHjælp giver vi adgang til en række midler som er genveje til hurtig hjælp og støtte og ressourcer for forældre i svære situationer. Vores hjælpemidler er designet til at gøre det nemt for dig at finde den støtte, du har brug for, når du har brug for det mest. Uanset om du søger information, professionel vejledning eller et fællesskab af ligesindede, er vores platform her for at hjælpe dig gennem dine udfordringer som forælder. Vi forstår, hvor vigtigt det er at have hurtig adgang til pålidelige ressourcer, især i svære tider, og vores mål er at gøre denne adgang så enkel og effektiv som muligt.
                </p>
                <h2 className="text-blue-900 w-6/12 text-4xl font-bold">Hvilke genveje til hjælpemidler tilbyder vi</h2>
              </div>
              <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <aside>
                    <video src="/videos/hjaelpemidler.mp4" autoPlay={true} loop={true} muted width={400} height={400} className="w-full rounded-lg shadow-lg mb-8 h-[700px] object-cover">
                      Your browser does not support the video tag.
                    </video>
                  </aside>
                  <aside>
                    <p className="text-blue-900 text-xl leading-10 w-9/12 mb-8">
                        vi giver adgang til en række hjælpemidler som er genveje til hurtig hjælp og støtte og ressourcer for forældre i svære situationer. Nogle af de hjælpemidler vi tilbyder inkluderer:
                    </p>
                    <Accordion variant={`compact`}>
                      {
                        accordionItems.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            whileInView={{ opacity: 1, y: 0 }}
                          >
                            <AccordionItem key={index} id={index} title={item.title} body={item.body} />
                          </motion.div>
                        ))
                      }
                    </Accordion>
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