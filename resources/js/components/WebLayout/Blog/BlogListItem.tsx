interface BlogItem {
  slug: string;
  title: string;
  excerpt?: string;
  featured_image: string;
  categories: { name: string; slug: string }[];
  published_at: string;
}

interface BlogListProps {
  item: BlogItem;
}

export default function BlogListItem({ item }: BlogListProps) {
  return (
    <>
        <article key={item.slug} className={`blog-list-article mb-4`}>
          {item.categories.length && (
            <div className="flex gap-2 mb-4">
              {item.categories.map((category: {slug: string, name: string}) => (
                <span key={category.slug} className="text-sm text-blue-900">
                  {category.name}
                </span>
              ))}
            </div>
          )}
          <picture>
            <img src={`/storage/${item.featured_image}`}
               width={200}
               height={200}
               alt={item.title}
               className={`mb-4 w-full h-[200px] object-cover rounded-xl`}
            />
          </picture>
          <h3>{item.title}</h3>
          {item.excerpt && (
            <div
              className="prose dark:prose-invert max-w-none line-clamp-3"
              dangerouslySetInnerHTML={{__html: item.excerpt}}></div>
          )}
        </article>
    </>
  );
}