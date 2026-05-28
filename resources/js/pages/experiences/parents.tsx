import {Accordion, AccordionItem} from "@/components/WebLayout/Accordion/Accordion";
// import GettingStartedSection from "@/components/GettingStartedSection";
import { motion } from 'framer-motion';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import WebLayout from "@/layouts/web-layout";
import GettingStartedCta from "@/components/WebLayout/GettingStartedCta";
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
        pageTitle={t('ourMission.meta.title')}
        description={t('ourMission.meta.description')}
      >
        <div className="bg-white">
            <section className="bg-white text-blue-900 sm:pt-[90px] xl:pt-15 h-[700px] rounded-b-3xl shadow-lg">
              <div className="container-fluid sm:mx-0 md:mx-0 xl:mx-0 relative rounded-xl flex flex-wrap gap-10 items-center shadow-lg rounded-2xl">
                  <video
                    src="/videos/new_parents_intro.mp4"
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
                        <h1 className="text-white lg:w-8/12 balance leading text-8xl font-bold">{t("parents.headline")}</h1>
                    </motion.div>
                  </div>
              </div>
              </section>
              <section className="pt-56 pb-0 bg-white">
            <div className="container mx-auto">
              <div className="mx-auto px-4 py-16">
                <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-16">
                  {t("parents.description")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
                  <aside>
                    <video
                      src="/videos/new_parents_gatherings.mp4"
                      autoPlay={true}
                      loop={true}
                      muted
                      width={400}
                      height={400}
                      className="w-full rounded-lg shadow-lg mb-8 h-[600px] object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </aside>
                  <aside>
                    <h3 className="text-blue-900 text-4xl font-bold mb-2">{t("parents.recomendations.title")}</h3>
                    <p className="text-blue-900 text-xl leading-10 w-9/12 mb-8">
                      {t("parents.recomendations.description")}
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
                          <img
                            src="/images/web/desktop_application.png"
                            className="w-8/12"
                            width={700}
                            height={400}
                            alt="New parents app illustration"
                          />
                      </div>
                      <div className="text-center">
                          <h2 className="text-blue-900 w-full text-5xl font-bold">{t("parents.app.app_title")}</h2>
                          <p className="text-blue-900 text-xl leading-10 mt-6 w-full mb-8">
                              {t("parents.app.app_description")}
                          </p>
                          <div className="space-y-4">
                              <p className="text-blue-900 text-xl text-center font-bold">{t("parents.app.app_feature_1")}</p>
                              <p  className="text-blue-900 text-xl text-center font-bold">{t("parents.app.app_feature_2")}</p>
                              <p  className="text-blue-900 text-xl text-center font-bold">{t("parents.app.app_feature_3")}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <GettingStartedCta />
        </div>
      </WebLayout>
    );
}