// dependency importss
import { useTranslation } from "react-i18next";

// Layout component imports
import WebLayout from "@/layouts/web-layout";

export default function Post({post}) {
    const { t } = useTranslation();

    const formattedPublishedAt = new Date(post.published_at).toLocaleDateString();

    return (
      <WebLayout
        pageTitle={t('blog.meta.title')}
        description={t('blog.meta.description')}
       >
        <div className="bg-white h-full mx-auto w-[1024px] py-36">
            <section>
                <article className="blog-item-article">
                  <img
                    src={`/storage/${post.featured_image}`}
                    alt={post.title}
                    width={1024}
                    height={400}
                    className="mb-4 w-[1024px] h-[400px] mx-auto rounded-xl object-cover"
                  />
                  <h1>{post.title}</h1>
                  <p className="text-gray-500 mb-4">{t('blog_post_item.published_at')}: {formattedPublishedAt}</p>
                  {post.excerpt && (
                    <div
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{__html: post.content}}></div>
                  )}
                </article>
            </section>
        </div>
      </WebLayout>
    );
}