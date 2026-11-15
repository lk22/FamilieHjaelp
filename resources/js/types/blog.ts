export interface PostItem {
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

export interface FeaturedItem {
  slug: string;
  title: string;
  excerpt?: string;
  featured_image: string;
  categories: PostCategoryItem[];
  published_at: string;
}

export interface PostTagItem {
  id: number;
  name: string;
}

export interface PostCategoryItem {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPageProps {
  posts: PostItem[]
  locale: string;
  featured: PostItem;
  categories: PostCategoryItem[]
  category?: string;
}

export interface FeaturedBlogItemProps {
  featured: FeaturedItem;
  locale: string;
}

export type BlogListItem = Pick<PostItem, 'id' | 'title' | 'excerpt' | 'featured_image' | 'slug' | 'categories'>;