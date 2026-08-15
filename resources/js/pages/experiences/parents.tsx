// Dependency imports
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

// Component imports
import WebLayout from "@/layouts/web-layout";
import GettingStartedCta from '@/components/WebLayout/GettingStartedCta';

export default function Page() {
    const { t } = useTranslation();

    return (
      <WebLayout
        pageTitle={t('parents.meta.title')}
        description={t('parents.meta.description')}
      >
        <div>
            <section className="mt-48 text-blue-900 h-[250px] w-[1600px] lg:h-[700px] rounded-b-3xl shadow-lg mx-auto">
              <div className="container-fluid mx-auto sm:mx-0 md:mx-0 xl:mx-0 relative rounded-xl flex flex-wrap gap-10 items-center shadow-lg rounded-2xl">
                  <video
                    src="/videos/new_parents_intro.mp4"
                    autoPlay={true}
                    loop={true}
                    muted
                    controls
                    className="w-full h-[400px] lg:h-[700px] object-cover rounded-lg"
                  >
                      Your browser does not support the video tag.
                  </video>
                  <div className="w-4/12 sm:w-full p-8 absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-blue-900/70 to-transparent sm:p-8 xl:p-36 flex flex-col justify-center items-start text-start gap-6 rounded-lg">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      transition={{ duration: 0.8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-white lg:w-8/12 balance leading text-5xl lg:text-8xl font-bold lg:px-0 px-4">{t("parents.headline")}</h1>
                    </motion.div>
                  </div>
              </div>
            </section>
            <section className="pt-26 lg:pt-8 pb-0 bg-white">
              <div className="container mx-auto lg:px-0 px-8">
                <div className="mx-auto px-4 py-16">
                  <p className="text-blue-900 text-xl leading-10 mt-6 lg:w-9/12 mb-8 lg:mb-16">
                    {t("parents.description")}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
                    <aside>
                      <video
                        src="/videos/new_parents_gatherings.mp4"
                        autoPlay={true}
                        loop={true}
                        muted
                        controls
                        width={400}
                        height={400}
                        className="w-full rounded-lg shadow-lg mb-8 h-[600px] object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </aside>
                    <aside>
                      <h3 className="text-blue-900 text-4xl font-bold mb-2">{t("parents.recomendations.title")}</h3>
                      <p className="text-blue-900 text-xl leading-10 lg:w-9/12 mb-8">
                        {t("parents.recomendations.description")}
                      </p>
                    </aside>
                  </div>
                </div>
              </div>
          </section>
          <section>
              <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="mx-auto px-4 lg:py-16 lg:px-0 py-8 px-8">
                      <h2 className="text-blue-900 w-full text-5xl font-bold">{t("parents.app.app_title")}</h2>
                      <p className="text-blue-900 text-xl leading-10 mt-6 w-full mb-8">
                          {t("parents.app.app_description")}
                      </p>
                      <div className="space-y-4">
                          <p className="text-blue-900 text-xl font-bold">{t("parents.app.app_feature_1")}</p>
                          <p  className="text-blue-900 text-xl font-bold">{t("parents.app.app_feature_2")}</p>
                          <p  className="text-blue-900 text-xl font-bold">{t("parents.app.app_feature_3")}</p>
                      </div>
                  </div>
                    <div className="mx-auto w-full flex justify-center text-center">
                        <img
                          src="/images/mockups/app.png"
                          className="lg:w-8/12"
                          width={400}
                          height={200}
                          alt="New parents app illustration"
                        />
                    </div>
                </div>
              </div>
          </section>
          <GettingStartedCta />
        </div>
      </WebLayout>
    );
}