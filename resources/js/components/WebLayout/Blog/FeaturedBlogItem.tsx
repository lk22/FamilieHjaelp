import { Link } from '@inertiajs/react';

import {
  type FeaturedItem
} from "@/types/blog";


interface FeaturedBlogItemProps {
  featured: FeaturedItem;
  locale: string;
}

export default function FeaturedBlogItem({ featured, locale }: FeaturedBlogItemProps) {
  return (
    <div className="featured-blog-item-container relative max-w-[1200px] mx-auto mb-8">
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
    </div>
  );
}