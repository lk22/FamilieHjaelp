// dependency imports
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

// Layout component imports
import WebLayout from "@/layouts/web-layout";
import {Link} from '@inertiajs/react';

import FeaturedBlogItem from "@/components/WebLayout/Blog/FeaturedBlogItem";
import BlogListItem from "@/components/WebLayout/Blog/BlogListItem";
import CategoriesNavigation from "@/components/WebLayout/Blog/CategoriesNavigation";

import {
  type PostItem,
  type BlogPageProps as BlogProps
} from "@/types/blog";

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
                <CategoriesNavigation categories={categories} locale={locale} />
              </div>
              <div className="featured-blog-item-container relative max-w-[1200px] mx-auto mb-8">
                {!category && hasFeaturedPost && featured && (
                  <motion.div
                    initial={{opacity: 0, y:20}}
                    transition={{duration: 0.5, delay: 0.5}}
                    whileInView={{opacity: 1, y:0}}
                  >
                    <FeaturedBlogItem featured={featured} locale={locale} />
                  </motion.div>
                )}
              </div>
            </section>
            <section className="max-w-[1200px] mx-auto">
              <div className="flex flex-row flex-wra gap-6">
                {
                  nonFeaturedPosts.length === 0 && (
                    <>
                      <div className="flex flex-col">
                        <h2 className="text-3xl font-bold text-blue-900">
                          {t('blog_page.posts_not_found')}
                        </h2>
                        <p>
                          {t('blog_page.posts_not_found_description')}
                        </p>
                      </div>
                    </>
                  )
                }
                {hasNonFeaturedPosts && nonFeaturedPosts.map((post: PostItem) => (
                  <motion.div
                    initial={{opacity: 0, y:20}}
                    transition={{duration: 0.5, delay: 0.8}}
                    whileInView={{opacity: 1, y:0}}
                    key={post.id}
                    className="w-4/12"
                  >
                      <Link href={route('page.blog.article', {post: post.slug, locale: locale})} className="text-blue-700 text-primary text-lg">
                        <BlogListItem item={post} />
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </section>
        </div>
      </WebLayout>
    );
}