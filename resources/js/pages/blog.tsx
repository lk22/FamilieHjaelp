// dependency imports
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

// Layout component imports
import WebLayout from "@/layouts/web-layout";
import {Link} from '@inertiajs/react';

interface PostItem {
  id: number;
  title: string;
  excerpt?: string;
  content?: string;
  featured_image: string;
  slug: string;
  tags: PostTagItem[]
  url: string;
  categories: PostCategoryItem[]
  is_featured: boolean;
  published_at: string;
}

interface PostTagItem {
  id: number;
  name: string;
}

interface PostCategoryItem {
  id: number;
  name: string;
}

interface BlogProps {
  posts: PostItem[]
  locale: string;
  featured: PostItem;
}

type BlogListItem = Pick<PostItem, 'id' | 'title' | 'excerpt' | 'featured_image' | 'slug'>;

export default function Blog({posts, locale, featured}: BlogProps) {
    const { t } = useTranslation();

    const nonFeaturedPosts = posts.filter(post => !post.is_featured);
    const featuredPost = posts.filter(post => post.is_featured);

    const hasFeaturedPost = featuredPost.length > 0;
    const hasNonFeaturedPosts = nonFeaturedPosts.length > 0;

    return (
      <WebLayout
      pageTitle="Blog" description="Læs vores seneste blogindlæg">
        <div className="bg-white h-full py-26">
            <section className="w-full mx-auto">
              <div className="max-w-[1200px] mx-auto pb-8">
                <h1 className="text-6xl text-blue-900 mb-8 font-bold">
                  {t("blog_page.headline")}
                </h1>
                <p className="text-lg mb-4 text-blue-900">
                  {t("blog_page.description")}
                </p>
              </div>
              <div className="featured-blog-item-container relative max-w-[1200px] mx-auto">
                {hasFeaturedPost && (
                  <motion.div
                    initial={{opacity: 0, y:20}}
                    transition={{duration: 0.5, delay: 0.5}}
                    whileInView={{opacity: 1, y:0}}
                  >
                    <Link href={route('page.blog.article', {post: featured.slug, locale: locale})} className="text-blue-700 text-primary font-bold text-lg">
                      <article className="featured-blog-post mb-4">
                        <picture>
                          <img src={`/storage/${featured.featured_image}`}
                            alt={featured.title}
                            className="mb-4 h-[500px] w-full object-cover rounded-xl"
                          />
                        </picture>
                        <h3>{featured.title}</h3>
                        <p>
                          Offentliggjort D. {new Date(featured.published_at).toLocaleDateString()}
                        </p>
                        {featured.excerpt && (
                          <div
                          className="prose dark:prose-invert max-w-none line-clamp-3 mb-4"
                          dangerouslySetInnerHTML={{__html: featured.excerpt}}></div>
                        )}
                      </article>
                    </Link>
                  </motion.div>
                )}
              </div>
            </section>
            <section className="max-w-[1200px] mx-auto">
              <div className="flex flex-col gap-8">
                <div className="-ml-px w-full">
                  {hasNonFeaturedPosts && nonFeaturedPosts.map((post: BlogListItem, index: number) => (
                    <motion.div
                      initial={{opacity: 0, y:20}}
                      transition={{duration: 0.5, delay: 0.8}}
                      whileInView={{opacity: 1, y:0}}
                    >
                        <Link href={route('page.blog.article', {post: post.slug, locale: locale})} className="text-blue-700 text-primary font-bold text-lg">
                          <article key={post.id} className={`blog-list-article mb-4`}>
                            <picture>
                              <img src={`/storage/${post.featured_image}`}
                                 width={200}
                                 height={200}
                                 alt={post.title}
                                 className={`mb-4 w-[400px] h-[200px] object-cover rounded-xl`}
                              />
                            </picture>
                            <h3>{post.title}</h3>
                            {post.excerpt && (
                              <div
                                className="prose dark:prose-invert max-w-none line-clamp-3"
                                dangerouslySetInnerHTML={{__html: post.excerpt}}></div>
                            )}
                          </article>
                        </Link>
                      </motion.div>
                    ))}
                </div>
              </div>
            </section>
        </div>
      </WebLayout>
    );
}