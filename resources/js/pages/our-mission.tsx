import {Accordion, AccordionItem} from "@/components/WebLayout/Accordion/Accordion";
import { motion } from 'framer-motion';
import WebLayout from "@/layouts/web-layout";

import GettingStartedCta from '@/components/WebLayout/GettingStartedCta';
import { JSX } from "react";
import { useTranslation } from "react-i18next";

interface FaqItem {
    title: string;
    body: string | React.ReactNode | React.ReactNode[];
}

export default function Page({ faqItems }: { faqItems: FaqItem[] }) {
    const { t } = useTranslation();

    return (
      <WebLayout
        pageTitle={t('ourMission.meta.title')}
        description={t('ourMission.meta.description')}
      >
        <div className="bg-white">
          <section className="text-blue-900 sm:pt-[90px] xl:pt-15 h-[700px] rounded-b-3xl shadow-lg">
            <div className="container-fluid sm:mx-0 md:mx-0 xl:mx-0 relative rounded-xl flex flex-wrap gap-10 items-center shadow-lg rounded-2xl">
              <video
                src="/videos/our_mission_video.mp4"
                autoPlay={true}
                loop={true}
                muted
                className="w-full h-[700px] object-cover"
              >
                  Your browser does not support the video tag.
              </video>
              <div className="w-4/12 sm:w-full p-8 absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-blue-900/70 to-transparent sm:p-8 xl:p-36 flex flex-col justify-center items-start text-start gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-white lg:w-8/12 balance leading text-8xl font-bold">{t('ourMission.vision_mission_foraeldrehjaelp.title')}</h1>
                </motion.div>
              </div>
            </div>
          </section>
          <section className="pt-56 bg-white">
            <div className="container mx-auto">
              <div className="mx-auto px-4 py-16">
                <h2 className="text-blue-900 w-6/12 text-4xl font-bold mb-2">{t('ourMission.vision_mission_foraeldrehjaelp.title')}</h2>
                <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-8">
                  {t('ourMission.vision_mission_foraeldrehjaelp.description')}
                </p>
                <h3 className="text-blue-900 w-6/12 text-2xl font-bold">{t('ourMission.behind_the_story.title')}</h3>
                <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-8">
                  {t('ourMission.behind_the_story.description')}
                </p>
                <h3 className="text-blue-900 w-6/12 text-2xl font-bold">{t('ourMission.our_values.title')}</h3>
                <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-8">
                  {t('ourMission.our_values.description')}
                </p>
              </div>
            </div>
          </section>
          <section>
            <Accordion>
              {faqItems.map((item, index): JSX.Element => {
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
          <GettingStartedCta />
        </div>
      </WebLayout>
    );
}