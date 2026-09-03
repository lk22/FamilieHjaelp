// dependency imports
import { motion } from 'framer-motion';
// import { useTranslation } from "react-i18next";

// Layout component imports
import WebLayout from "@/layouts/web-layout";
import { Link } from 'react-router-dom';

interface PostItem {
  id: number;
  title: string;
  excerpt?: string;
  content?: string;
  featured_image: string;
  slug: string;
  tags: PostTagItem[]
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
}

export default function Blog({posts}) {
    // const { t } = useTranslation();

    console.log(posts)

    console.log()

    return (
      <WebLayout
      pageTitle="Blog" description="Læs vores seneste blogindlæg">
        <div className="bg-white h-screen pt-24">
            <section>
              {posts.map((post) => (
                <article key={post.id} className="blog-list-article">
                  <img src={`/storage/${post.featured_image}`} alt={post.title} className="mb-4 h-[400px]" />
                  <h3>{post.title}</h3>
                  {post.excerpt && (
                    <div
                      className="prose dark:prose-invert max-w-none line-clamp-3"
                      dangerouslySetInnerHTML={{__html: post.excerpt}}></div>
                  )}
                  <Link to={route('page.blog.article', post.slug)} className="text-blue-700 text-primary underline">
                    Læs artikel
                  </Link>
                </article>
              ))}
            </section>
        </div>
      </WebLayout>
    );
}