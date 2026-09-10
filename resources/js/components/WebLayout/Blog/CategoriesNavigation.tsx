import {Link} from '@inertiajs/react';

interface CategoriesNavigationProps {
  categories: { name: string; slug: string }[];
  locale: string;
}

export default function CategoriesNavigation({ categories, locale }: CategoriesNavigationProps) {
  return (
    <nav className="flex gap-2 mb-4">
      {categories.map((category) => (
        <Link key={category.id} href={route('page.blog', {category: category.slug, locale: locale})}>
          <span key={category.id} className="item-category text-lg font-bold text-blue-900 mr-4 hover:underline hover:text-blue-700">
            {category.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}