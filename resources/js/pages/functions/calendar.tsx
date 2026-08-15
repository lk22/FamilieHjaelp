import { motion } from 'framer-motion';
import WebLayout from "@/layouts/web-layout";
import { useTranslation } from 'react-i18next';
import GettingStartedCta from '@/components/WebLayout/GettingStartedCta';

export default function CalendarFunction() {
    const { t } = useTranslation();

    return (
      <WebLayout
        pageTitle={t('functions_page.calendar.meta.title')}
        description={t('functions_page.calendar.meta.description')}
      >
        <div className="bg-white">
          <section className="text-blue-900 mt-48 h-[700px] w-[1600px] mx-auto rounded-b-3xl rounded-lg shadow-lg">
            <div className="container-fluid mx-auto sm:mx-0 md:mx-0 xl:mx-0 relative rounded-xl flex flex-wrap gap-10 items-center shadow-lg rounded-2xl">
              <video
                src="/videos/intro.mp4"
                autoPlay={true}
                loop={true}
                muted
                controls
                className="w-full h-[700px] object-cover rounded-lg"
              >
                  Your browser does not support the video tag.
              </video>
              <div className="w-4/12 sm:w-full p-8 absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-blue-900/70 to-transparent sm:p-8 xl:p-36 flex flex-col justify-center items-start text-start gap-6 rounded-lg">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
                whileInView={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-white lg:w-9/12 balance leading text-7xl md:text-8xl font-bold">{t('functions_page.calendar.hero.title')}</h1>
                  <p className="text-blue-100 text-lg md:text-2xl mt-6 lg:w-8/12 leading-relaxed">
                    {t('functions_page.calendar.hero.description')}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
          <section className="pt-32 pb-20 bg-white">
            <div className="container mx-auto">
              <div className="mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  transition={{ duration: 0.6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-blue-900 text-5xl font-bold w-full md:w-8/12">{t('functions_page.features.heading')}</h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                  {[2, 3, 4].map((item, index) => (
                    <motion.article
                      key={item}
                      initial={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-blue-100 bg-gradient-to-b from-white to-blue-50 p-6 shadow-sm"
                    >
                      <p className="text-blue-900 text-xl font-semibold mb-3">{t(`functions_page.features.cards.${item}.title`)}</p>
                      <p className="text-blue-900/85 leading-8">{t(`functions_page.features.cards.${item}.description`)}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="py-20 bg-blue-50">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <h3 className="text-blue-900 text-4xl font-bold">{t('functions_page.app.title')}</h3>
                  <p className="text-blue-900 text-xl leading-10 mt-6">{t('functions_page.app.description')}</p>
                  <ul className="mt-8 flex flex-col gap-4">
                    {[1, 2, 3].map((item) => (
                      <li key={item} className="rounded-xl bg-white p-4 border border-blue-100 text-blue-900">
                        {t(`functions_page.app.bullets.${item}`)}
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: item * 0.1 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="rounded-xl bg-white p-4 border border-blue-100 text-blue-900 mt-4"
                      >
                        {t(`functions_page.app.bullets.${item}`)}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="w-full"
                >
                  <img
                    src="/images/web/app_dashboard.png"
                    alt={t('functions_page.app.image_alt')}
                    className="rounded-2xl shadow-lg w-full max-w-[300px] w-[300px] mx-auto"
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