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
  slug: string;
}

interface BlogProps {
  posts: PostItem[]
  locale: string;
  featured: PostItem;
  categories: PostCategoryItem[]
  category?: string;
}

type BlogListItem = Pick<PostItem, 'id' | 'title' | 'excerpt' | 'featured_image' | 'slug' | 'categories'>;

export default function Blog({posts, locale, featured, categories, category}: BlogProps) {
    const { t } = useTranslation();

    const nonFeaturedPosts = posts.filter(post => !post.is_featured);
    const featuredPost = posts.filter(post => post.is_featured);

    const hasFeaturedPost = featuredPost.length > 0 || featured != null;
    const hasNonFeaturedPosts = nonFeaturedPosts.length > 0;

    return (
      <WebLayout
      pageTitle="Blog" description="Læs vores seneste blogindlæg">
        <div className="bg-white h-full py-26">
            <section className="w-full mx-auto">
              <div className="max-w-[1200px] mx-auto pt-16">
                <h1 className="text-6xl text-blue-900 mb-8 font-bold">
                  {category ? t("blog_page.category_headline") + ": " + category : t("blog_page.headline")}
                </h1>
                <p className="text-lg mb-4 text-blue-900 w-10/12">
                  {t("blog_page.description")}
                </p>
              </div>
              <div className="category-selector pb-4 mx-auto max-w-[1200px] pb-18">
                {categories.map((category) => (
                  <Link key={category.id} href={route('page.blog', {category: category.slug, locale: locale})}>
                    <span key={category.id} className="item-category text-lg font-bold text-blue-900 mr-4 hover:underline hover:text-blue-700">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="featured-blog-item-container relative max-w-[1200px] mx-auto mb-8">
                {!category && hasFeaturedPost && featured && (
                  <motion.div
                    initial={{opacity: 0, y:20}}
                    transition={{duration: 0.5, delay: 0.5}}
                    whileInView={{opacity: 1, y:0}}
                  >
                    <Link href={route('page.blog.article', {post: featured.slug, locale: locale})} className="text-blue-700 text-primary font-bold text-lg">
                      <article className="featured-blog-post mb-4">
                        <div className="featured-blog-tag">
                          <h4 className="text-5xl text-blue-900 pb-4 mr-4">Seneste nyhed</h4>
                        </div>
                        <div className="categories">
                            <div className="flex gap-2 mb-4">
                              {featured.categories.map((category) => (
                                <span key={category.slug} className="text-2xl text-blue-900">
                                  {category.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        <picture>
                          <img src={`/storage/${featured.featured_image}`}
                            alt={featured.title}
                            className="mb-4 h-[500px] w-full object-cover rounded-xl"
                          />
                        </picture>
                        <div className="flex gap-4 mt-8">
                          <p>
                            Offentliggjort D. {new Date(featured.published_at).toLocaleDateString()}
                          </p>
                        </div>
                          <h3>{featured.title}</h3>

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
              <div className="flex flex-row flex-wra gap-6">
                {hasNonFeaturedPosts && nonFeaturedPosts.map((post: BlogListItem) => (
                  <motion.div
                    initial={{opacity: 0, y:20}}
                    transition={{duration: 0.5, delay: 0.8}}
                    whileInView={{opacity: 1, y:0}}
                    key={post.id}
                    className="w-4/12"
                  >
                      <Link href={route('page.blog.article', {post: post.slug, locale: locale})} className="text-blue-700 text-primary text-lg">
                        <article key={post.id} className={`blog-list-article mb-4`}>
                          {post.categories.length && (
                            <div className="flex gap-2 mb-4">
                              {post.categories.map((category: {slug: string, name: string}) => (
                                <span key={category.slug} className="text-sm text-blue-900">
                                  {category.name}
                                </span>
                              ))}
                            </div>
                          )}
                          <picture>
                            <img src={`/storage/${post.featured_image}`}
                               width={200}
                               height={200}
                               alt={post.title}
                               className={`mb-4 w-full h-[200px] object-cover rounded-xl`}
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
            </section>
        </div>
      </WebLayout>
    );
}