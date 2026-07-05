import { Link } from "@inertiajs/react";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function GettingStartedCta() {
    const { t } = useTranslation();
    return (
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="py-20"
        >
          <div className="container px-8 md:mx-auto">
              <div className="flex">
                  <div className="w-full h-full md:h-96 bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-8 md:p-4">
                      <div className="w-full h-full flex flex-col justify-center items-center text-center gap-6">
                          <h3 className="text-5xl font-bold text-white">{t('cta.headline')}</h3>
                          <p className="text-xl text-blue-200 w-8/12">{t('cta.description')}</p>
                          <Link href="/app/login" className="bg-white text-blue-800 py-3 px-8 rounded-full mt-6 font-medium hover:bg-gray-100 transition cursor-pointer inline-block font-medium">{t('cta.button')}</Link>
                      </div>
                  </div>
              </div>
          </div>
        </motion.div>
      </section>
    );
};