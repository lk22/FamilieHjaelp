import {Accordion, AccordionItem} from "@/components/WebLayout/Accordion/Accordion";
// import GettingStartedSection from "@/components/GettingStartedSection";
import { motion } from 'framer-motion';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import WebLayout from "@/layouts/web-layout";
import { useTranslation } from "react-i18next";

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

    const { t } = useTranslation();

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
                      <h1 className="balance leading text-8xl font-bold text-center">{t('getting_started_page.headline')} <span className="text-blue-900">{t('getting_started_page.headline_highlight')}</span></h1>
                      <p className="text-xl text-blue-900 mt-4 text-center w-8/12 mx-auto">
                        {t('getting_started_page.description')}
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
                    <h2 className="text-blue-900 w-full text-5xl font-bold">{t('getting_started_page.app_title')}</h2>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-blue-900 text-xl leading-10 mt-6 w-full mb-8">
                      {t('getting_started_page.app_description')}
                    </p>
                    <p>
                      {t('getting_started_page.app_pwa_description')}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <button type="button" className="mt-6 bg-blue-900 text-white py-3 px-8 rounded-full font-medium hover:bg-blue-800 transition cursor-pointer inline-block">
                      {t('getting_started_page.functions_button')}
                    </button>
                    <button
                      type="button"
                      className="mt-6 ml-4 bg-gray-200 text-gray-800 py-3 px-8 rounded-full font-medium hover:bg-gray-300 transition cursor-pointer inline-block"
                    >
                      {t('getting_started_page.get_started_button')}
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