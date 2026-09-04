// dependency imports
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

// Layout component imports
import WebLayout from "@/layouts/web-layout";

export default function Post({post}) {
    const { t } = useTranslation();

    return (
      <WebLayout
        pageTitle={t('blog.meta.title')} description={t('blog.meta.description')}>
        <div className="bg-white h-screen pt-24">
            <section>
                <article className="blog-item-article">
                  <img src={`/storage/${post.featured_image}`} alt={post.title} className="mb-4 h-[400px]" />
                  <h3>{post.title}</h3>
                  {post.excerpt && (
                    <div
                      className="prose dark:prose-invert max-w-none line-clamp-3"
                      dangerouslySetInnerHTML={{__html: post.excerpt}}></div>
                  )}
                </article>
            </section>
        </div>
      </WebLayout>
    );
}