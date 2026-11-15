import { motion } from 'framer-motion';
import WebLayout from "@/layouts/web-layout";
import { useTranslation } from 'react-i18next';
import GettingStartedCta from '@/components/WebLayout/GettingStartedCta';

export default function TasksFunction() {
    const { t } = useTranslation();

    return (
      <WebLayout
        pageTitle={t('functions_page.calendar.meta.title')}
        description={t('functions_page.calendar.meta.description')}
      >
        <div className="bg-white">
          <section className="bg-white text-blue-900 pt-40 sm:pt-[200px] xl:py-50">
            <div className="container 2xl:w-[1600px] 2xl:max-w-[1600px] mx-auto">
                <div className="flex flex-col 2xl:flex-row px-10 gap-28">
                    <div className="2xl:w-8/12 xs:w-full 2xl:w-7/12 flex flex-col justify-center items-start text-start gap-6">
                      <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.5 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          className={"text-7xl lg:text-8xl font-bold text-blue-900"}
                      >
                          <h1>{t('functions_page.calendar.hero.title')}</h1>
                      </motion.div>
                      <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.5 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          className={"text-2xl font-bold text-blue-900"}
                      >
                          {t('functions_page.calendar.hero.description')}
                      </motion.div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {[1, 2, 3].map((item, index) => (
                          <motion.article
                            key={item}
                            initial={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="rounded-2xl bg-gradient-to-b from-blue-900 to-blue-800 p-6 shadow-sm"
                          >
                            <p className="text-white  text-xl font-semibold mb-3">{t(`functions_page.calendar.hero.feature_cards.${item}.title`)}</p>
                            <p className="text-white /85 leading-8">{t(`functions_page.calendar.hero.feature_cards.${item}.description`)}</p>
                          </motion.article>
                        ))}
                      </div>
                    </div>
                    <div className="2xl:w-4/12 sm:w-full relative flex justify-end items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="relative"
                        >
                            <img
                                src="/images/mockups/kalender.png"
                                height={250}
                                width={250}
                                className="w-full object-cover"
                            >

                            </img>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
          <section className="py-20 bg-blue-50">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  px-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <h3 className="text-blue-900 text-4xl font-bold">{t('functions_page.calendar.body.title')}</h3>
                  <p className="text-blue-900 text-xl leading-10 mt-6">{t('functions_page.calendar.body.description')}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="w-full"
                >
                  <ul className="flex flex-col gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <li key={item} className="rounded-xl bg-white p-4 bg-gradient-to-r from-blue-900 to-blue-800  border border-blue-100 text-white">
                        {t(`functions_page.calendar.body.bullets.${item}`)}
                      </li>
                    ))}
                  </ul>
                  <img
                    src="/images/mockups/kalender.png"
                    alt={t('functions_page.app.image_alt')}
                    height={350}
                    width={350}
                    className="mx-auto hidden"
                  />
                </motion.div>
              </div>
            </div>
          </section>
          <GettingStartedCta />
        </div>
      </WebLayout>
    );
}