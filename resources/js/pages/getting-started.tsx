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
          <section>
            <div className="container mx-auto pt-40 mb-20">
              <div className="flex">
                <div className="w-6/12">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 1.5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <h2 className="text-blue-900 w-full text-5xl font-bold">Vores app er tilgængelig på alle enheder</h2>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-blue-900 text-xl leading-10 mt-6 w-full mb-8">
                      Vores app er designet til at være tilgængelig på alle enheder, så du kan få adgang til vores ressourcer og støtte, uanset hvor du er. Uanset om du foretrækker at bruge vores app på din smartphone, tablet eller computer, kan du nemt logge ind og få adgang til de værktøjer og informationer, du har brug for for at hjælpe dig og din familie gennem svære tider.
                    </p>
                    <p>
                      Besøger du denne side på en mobil enhed? download vores app i dag og oplev, hvordan den kan gøre det lettere for dig at få adgang til hjælp og støtte, når du har mest brug for det.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <button type="button" className="mt-6 bg-blue-900 text-white py-3 px-8 rounded-full font-medium hover:bg-blue-800 transition cursor-pointer inline-block">
                      Se vores funktioner
                    </button>
                    <button
                      type="button"
                      className="mt-6 ml-4 bg-gray-200 text-gray-800 py-3 px-8 rounded-full font-medium hover:bg-gray-300 transition cursor-pointer inline-block"
                    >
                      Kom igang
                    </button>
                  </motion.div>
                </div>
                <div className="w-6/12 flex justify-center items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <img
                      src="/images/web/app_dashboard.png"
                      width={350}
                      height={350}
                      alt=""
                      className="rounded-lg shadow-lg"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </WebLayout>
    );
}