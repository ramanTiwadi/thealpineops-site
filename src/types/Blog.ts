export type BlogContentBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "image"; src: string; alt: string };

export interface BlogPost {
  title: string;
  author: string;
  excerpt: string;
  date: string;
  tag: string;
  content: string;
  image?: string;
  contentBlocks?: BlogContentBlock[];
}
