import type { BlogPost } from "../types/Blog";

export const createBlogSlug = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getBlogPath = (title: string) => `/blogs/${createBlogSlug(title)}`;

export const findBlogBySlug = (posts: BlogPost[], slug?: string) =>
  posts.find((post) => createBlogSlug(post.title) === slug);
