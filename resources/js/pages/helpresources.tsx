// Dependency imports
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Type imports
import { type AccordionItemData } from '@/types';

// Component imports
import {Accordion, AccordionItem} from "@/components/WebLayout/Accordion/Accordion";
import WebLayout from "@/layouts/web-layout";
import GettingStartedCta from '@/components/WebLayout/GettingStartedCta';

export default function HelpResources({ faqItems }: { faqItems: AccordionItemData[] }) {
  const { t } = useTranslation();

    return (
      <WebLayout
        pageTitle={t('helpingResources.meta.title')}
        description={t('helpingResources.meta.description')}
      >
        <div className="bg-white">
          <section className="bg-white text-blue-900 sm:pt-[90px] xl:pt-15 h-[700px] rounded-b-3xl shadow-lg">
            <div className="container-fluid sm:mx-0 md:mx-0 xl:mx-0 relative rounded-xl flex flex-wrap gap-10 items-center shadow-lg rounded-2xl">
              <video
                src="/videos/intro.mp4"
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
                <h1 className="text-white lg:w-8/12 balance font-bold leading text-8xl">{t('helpingResources.headline')}</h1>
              </motion.div>
              </div>
            </div>
          </section>
          <section className="bg-white">
            <div className="container mx-auto">
              <div className="mx-auto pt-16 pb-8">
                <p className="text-blue-900 text-xl leading-10 my-36 w-10/12">
                  {t('helpingResources.description')}
                </p>
                <h2 className="text-blue-900 w-6/12 text-4xl font-bold">{t('helpingResources.list_resources.title')}</h2>
              </div>
              <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <aside>
                    <video
                      src="/videos/hjaelpemidler.mp4"
                      autoPlay={true}
                      loop={true}
                      muted
                      controls
                      width={400}
                      height={400}
                      className="w-full rounded-lg shadow-lg mb-8 h-[700px] object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </aside>
                  <aside>
                    <p className="text-blue-900 text-xl leading-10 w-9/12 mb-8">
                        {t('helpingResources.list_resources.description')}
                    </p>
                    <Accordion variant={`compact`}>
                      {
                        faqItems.map((item, index) => (
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