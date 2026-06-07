import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

import WebLayout from "@/layouts/web-layout";

export default function Page() {
  const { t } = useTranslation();

    return (
    <WebLayout
      pageTitle={t('stillbirth.meta.title')}
      description={t('stillbirth.meta.description')}
    >
      <div className="bg-white">
        <section className="bg-white text-blue-900 sm:pt-[90px] xl:pt-15 h-[700px] rounded-b-3xl shadow-lg">
          <div className="container-fluid sm:mx-0 md:mx-0 xl:mx-0 relative rounded-xl flex flex-wrap gap-10 items-center shadow-lg rounded-2xl">
            <video
              src="/videos/loosing_someone.mp4"
              autoPlay={true}
              loop={true}
              muted
              controls
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
                <h1 className="text-white lg:w-8/12 balance leading text-8xl font-bold">{t("stillbirth.headline")}</h1>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="pt-24 pb-0 bg-white">
        <div className="container mx-auto">
          <div className="mx-auto px-4 pb-16">
            <p className="text-blue-900 text-xl leading-10 mt-6 w-9/12 mb-16">
              {t("stillbirth.description")}
            </p>
            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-blue-900 text-4xl font-bold mb-2"
            >
              Værd at vide om dødfødsler
            </motion.h3>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-2">
              Ved en dødfødsel efter 22 fulde graviditetsuger gælder der en række vigtige juridiske, administrative og praktiske regler. \n
            </p>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-2">
              For det første skal dødfødselen anmeldes til myndighederne, og der skal udstedes en dødsattest for barnet, det sørger hospitalet for.
            </p>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-2">
              Hvis barnet er født dødt efter 22 fulde graviditets uger, er det lovpligtigt at få barnet begravet eller kremeret, og forældrene har ret til at vælge en ceremoni, der passer til deres ønsker og behov.
            </p>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-2">
              i samme situation skal faren registreres sit faderskab til barnet, dette skal ske inden de første 14 dage efter fødslen, og det kan gøres ved at kontakte din kirke i den kommune man bor i.
            </p>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-8">
              Forældrene har ret til at få Sorgorlov i op til 6 måneder efter dødfødselen, og det er vigtigt at kontakte sin arbejdsgiver, da din arbejdsgiver skal søge om orloven for dig.
            </p>
            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-blue-900 text-4xl font-bold mb-2"
            >
              Ting, der kan hjælpe dig igennem sorgen
            </motion.h3>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-2">
              <strong>Find en måde at mindes dit barn på</strong>: Mange forældre finder trøst i at skabe en ceremoni eller et mindested for deres barn, hvor de kan komme og mindes det. Det kan være en gravplads, en mindeplade eller et særligt sted i hjemmet, hvor de kan føle sig tæt på deres barn.
            </p>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-2">
              <strong>Skab minder og tag afsked</strong>: Det kan være en trøst at skabe minder om barnet, selvom det er svært. Mange forældre vælger at tage billeder, lave hånd- og fodaftryk eller skrive breve til deres barn som en måde at sige farvel på og bevare minderne.
            </p>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-2">
              <strong>Skab minder og tag afsked</strong>: Det kan være en trøst at skabe minder om barnet, selvom det er svært. Mange forældre vælger at tage billeder, lave hånd- og fodaftryk eller skrive breve til deres barn som en måde at sige farvel på og bevare minderne.
            </p>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-2">
              <strong>Søg støtte</strong>: Det er vigtigt at søge støtte fra venner, familie eller professionelle rådgivere, der kan hjælpe dig med at bearbejde sorgen. At tale om dine følelser og dele dine oplevelser kan være en vigtig del af helingsprocessen.
            </p>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-8">
              <strong>Pas på dig selv</strong>: Det er vigtigt at tage sig tid til at sørge og tage vare på sig selv under denne svære tid. Sørg for at få nok hvile, spis sundt og giv dig selv lov til at føle og bearbejde dine følelser.
            </p>
            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-blue-900 text-4xl font-bold mb-2"
            >
              Vigtige regler og pligter
            </motion.h3>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-2">
              <strong>Anmeldelse og begravelse</strong>: som forældre til et barn, der er født efter 22 fulde graviditetsuger, er det vigtigt at anmelde dødfødslen og sørge for at barnets begravelse eller bisættelse. Det skal ske senest 8 hverdage efter fødlsen via blanketten Anmeldelse af dødfødt barn og anmodning om begravelse/ligbrænding,
            </p>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-2">
              <strong>Registrering af faderskab</strong>: I samme situation skal faren registrere sit faderskab til barnet. Dette skal ske inden de første 14 dage efter fødslen, og det kan gøres ved at kontakte din kirke i den kommune, man bor i.
            </p>
            <p className="text-blue-900 text-xl leading-10 w-9/12 mb-2">
              <strong>Navngivning</strong>: Et dødfødt barn kan ikke formelt navngives eller døbes, men forældrene kan få registreret et kaldenavn i kirkebogen i forbindelse med begravelsen, hvis de ønsker det. Dette kan være en måde at ære og mindes barnet på, selvom det ikke har fået et officielt navn.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
              <aside>
                <video
                  src="/videos/hjaelpemidler.mp4"
                  autoPlay={true}
                  loop={true}
                  muted
                  controls
                  width={400}
                  height={400}
                  className="w-full rounded-lg shadow-lg mb-8 h-[500px] object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </aside>
              <aside>
                <h3 className="text-blue-900 text-4xl font-bold mb-2">{t("stillbirth.recomendations.title")}</h3>
                <p className="text-blue-900 text-xl leading-8 w-9/12 mb-8">
                  {t("stillbirth.recomendations.description")}
                </p>
                <p className="text-blue-900 text-xl leading-10 w-9/12 mb-2">
                  {t("stillbirth.recomendations.recomendation_contact.title")}
                </p>
                <p className="text-blue-900 text-sm w-9/12 mb-8">
                  {t("stillbirth.recomendations.recomendation_contact.description")}
                </p>
                  <a href={t("stillbirth.recomendations.recomendation_contact.link")} target="_blank" rel="noopener noreferrer" className="mt-16 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      {t("stillbirth.recomendations.recomendation_contact.title")}
                  </a>
              </aside>
            </div>
          </div>
        </div>
      </section>
      </div>
    </WebLayout>
  );
}