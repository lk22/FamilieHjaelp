import { useTranslation } from "react-i18next";
import WebLayout from '@/layouts/web-layout';
import { motion } from 'framer-motion';
import GettingStartedCta from "@/components/WebLayout/GettingStartedCta";

export default function StoriesPage() {
    const { t } = useTranslation();
    const stories = [1, 2, 3, 4].map((item) => ({
        title: t(`stories_page.stories.cards.${item}.title`, { defaultValue: `Story ${item}` }),
        description: t(`stories_page.stories.cards.${item}.description`, {
            defaultValue: 'A family shared how support, structure, and practical tools helped them find calm and direction during a difficult period.',
        }),
        author: t(`stories_page.stories.cards.${item}.author`, { defaultValue: 'Anonymous family' }),
    }));

    return (
        <WebLayout
            pageTitle={t('stories_page.meta.title', { defaultValue: 'Stories | FamilieHjælp' })}
            description={t('stories_page.meta.description', { defaultValue: 'Read personal stories from families who found support and practical help through FamilieHjælp.' })}
        >
            <div className="bg-white">
                <section className="bg-white text-blue-900 mt-48 w-[1600px] h-[700px] mx-auto rounded-b-3xl shadow-lg rounded-lg">
                    <div className="container-fluid sm:mx-0 md:mx-0 xl:mx-0 relative rounded-xl flex flex-wrap gap-10 items-center shadow-lg rounded-2xl rounded-lg">
                        <video
                            src="/videos/new_parents_intro.mp4"
                            autoPlay={true}
                            loop={true}
                            muted
                            controls
                            className="w-full h-[700px] w-[1600px] rounded-lg object-cover"
                        >
                            Your browser does not support the video tag.
                        </video>
                        <div className="w-4/12 sm:w-full p-8 absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-blue-900/70 to-transparent sm:p-8 xl:p-36 flex flex-col justify-center items-start text-start gap-6 rounded-lg">
                          <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                          >
                            <h1 className="text-white lg:w-8/12 balance leading text-8xl font-bold">
                                {t('stories_page.hero.title', { defaultValue: 'Stories from families we have supported' })}
                            </h1>
                            <p className="text-white text-xl leading-10 mt-6 w-9/12 mb-16">
                                {t('stories_page.description', {
                                    defaultValue: 'Every family has a different journey. Here are stories from people who found guidance, practical tools, and emotional support through FamilieHjælp.',
                                })}
                            </p>
                          </motion.div>
                        </div>
                    </div>
                 </section>
                 <section className="pt-20 pb-20 bg-white">
                    <div className="container mx-auto">
                        <div className="mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                transition={{ duration: 0.6 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <h2 className="text-blue-900 text-5xl font-bold w-full md:w-8/12">
                                    {t('stories_page.stories.heading', { defaultValue: 'Selected Stories' })}
                                </h2>
                            </motion.div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6  mt-12">
                                {stories.map((story, index) => (
                                    <motion.article
                                        key={story.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        transition={{ duration: 0.5, delay: index * 0.08 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="rounded-2xl border border-blue-100 bg-gradient-to-b from-white to-blue-50 shadow-sm"
                                    >
                                        <img src="/images/story.jpg" alt={story.title} className="w-full h-96 object-cover rounded-t-lg mb-4" />
                                        <p className="text-blue-900 text-xl font-semibold mb-3 px-8">{story.title}</p>
                                        <p className="text-blue-900/85 leading-8 px-8">{story.description}</p>
                                        <p className="text-blue-700 font-semibold mt-5 px-8 pb-4">{story.author}</p>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </div>
                 </section>
                <GettingStartedCta />
            </div>
        </WebLayout>
    );
}