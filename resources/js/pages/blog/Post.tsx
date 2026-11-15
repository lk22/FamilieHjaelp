// dependency importss
import { useTranslation } from "react-i18next";
import { Link } from '@inertiajs/react';
import { localizeRoute } from "@/util/localizeRoute";

import type { PostItem } from "@/types/blog";

// Layout component imports
import WebLayout from "@/layouts/web-layout";

export default function Post({
  post,
  locale
}: {
  post: PostItem,
  locale: string
}) {
    const { t } = useTranslation();
    const localized = localizeRoute(locale)

    const formattedPublishedAt = new Date(post.published_at).toLocaleDateString();

    return (
      <WebLayout
        pageTitle={t('blog.meta.title')}
        description={t('blog.meta.description')}
       >
        <article className="blog-item-article mb-32">
          <section className="w-full bg-blue-900 mb-46 pt-26">
            <div className="go-back-section max-w-[1200px] mx-auto relative top-30">
              <Link href={localized('page.blog')} className="text-white">
                {t('blog_post_item.go_back')}
              </Link>
            </div>
            <picture className="max-w-[1200px] mx-auto relative top-36">
              <img
                src={`/storage/${post.featured_image}`}
                alt={post.title}
                width={1024}
                height={400}
                className="mb-4 w-[1200px] h-[600px] mx-auto rounded-xl object-cover"
              />
            </picture>
          </section>
          <section>
            <div className="mx-auto min-h-[200px]">
                <div className="max-w-[1200px] min-h-[500px] mx-auto">
                <h1>{post.title}</h1>
                <div className="flex justify-between">
                  <p className="text-gray-500 mb-4">{t('blog_post_item.published_at')}: {formattedPublishedAt}</p>
                </div>
                {post.categories.length && (
                  <div className="flex gap-2 mb-4">
                    {post.categories.map((category) => (
                      <span key={category.slug} className="text-md font-bold text-blue-900">
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
                {post.content && (
                  <div
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{__html: post.content}}></div>
                )}
                </div>  {/* Closing the max-w-[1200px] min-h-[500px] mx-auto div */}
            </div>  {/* Closing the mx-auto min-h-[200px] div */}
          </section>
        </article>
      </WebLayout>
    );
}