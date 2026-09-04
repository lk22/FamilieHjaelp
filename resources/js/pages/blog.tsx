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

export default function Blog({posts, locale, featured}: BlogProps) {
    const { t } = useTranslation();

    const nonFeaturedPosts = posts.filter(post => !post.is_featured);

    return (
      <WebLayout
      pageTitle="Blog" description="Læs vores seneste blogindlæg">
        <div className="bg-white h-full py-36">
            <section className="max-w-[1200px] mx-auto">
              <div className="flex gap-8">
                <div className="-ml-px w-7/12">
                    <Link href={route('page.blog.article', {post: featured.slug, locale: locale})} className="text-blue-700 text-primary font-bold text-lg">
                      <div className="featured-blog-post mb-4">
                        <img src={`/storage/${featured.featured_image}`} alt={featured.title} className="mb-4 h-[500px] w-[1024px] object-cover rounded-xl" />
                        <h3>{featured.title}</h3>
                        {featured.excerpt && (
                          <div
                            className="prose dark:prose-invert max-w-none line-clamp-3 mb-4"
                            dangerouslySetInnerHTML={{__html: featured.excerpt}}></div>
                        )}
                      </div>
                    </Link>

                </div>
                <div className="-ml-px w-5/12">
                  {nonFeaturedPosts.map((post, index) => (
                    // if the post is not featured, display it in the list
                        <Link href={route('page.blog.article', {post: post.slug, locale: locale})} className="text-blue-700 text-primary font-bold text-lg">
                          <article key={post.id} className={`blog-list-article mb-4 ${post.is_featured ? 'featured' : 'not-featured'}`}>
                            <img src={`/storage/${post.featured_image}`} width={200} height={200} alt={post.title} className={`mb-4 w-[400px] h-[200px] object-cover rounded-xl`} />
                            <h3>{post.title}</h3>
                            {post.excerpt && (
                              <div
                                className="prose dark:prose-invert max-w-none line-clamp-3"
                                dangerouslySetInnerHTML={{__html: post.excerpt}}></div>
                            )}
                          </article>
                        </Link>
                    ))}
                </div>
              </div>
            </section>
        </div>
      </WebLayout>
    );
}