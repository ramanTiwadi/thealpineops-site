import { Link, useParams } from "react-router-dom";
import blogPosts from "../../data/blogs.json";
import type { BlogPost } from "../../types/Blog";
import { findBlogBySlug } from "../../utils/blogs";

type BlogSection =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string };

const toReadableSections = (content: string): BlogSection[] => {
  const blocks = content
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\n+/g, " ").trim())
    .filter(Boolean);

  return blocks.map((block) => {
    const isHeading =
      block.length <= 60 &&
      !/[.?!:]$/.test(block) &&
      block.split(" ").length <= 8;

    return {
      type: isHeading ? "heading" : "paragraph",
      content: block,
    };
  });
};

const BlogDetail = () => {
  const { slug } = useParams();
  const posts = blogPosts as BlogPost[];
  const post = findBlogBySlug(posts, slug);

  if (!post) {
    return (
      <section className="blogDetail">
        <div className="blogDetail__content">
          <h1>Blog Not Found</h1>
          <p>
            The story you&apos;re looking for isn&apos;t available right now.
          </p>
          <Link className="blogDetail__back" to="/blogs">
            Back to Blogs
          </Link>
        </div>
      </section>
    );
  }

  const sections = toReadableSections(post.content);

  return (
    <section className="blogDetail">
      <div className="blogDetail__content">
        <Link className="blogDetail__back" to="/blogs">
          Back to Blogs
        </Link>

        <div className="blogDetail__meta">
          <span>{post.tag}</span>
          <span>{post.date}</span>
        </div>

        <h1>{post.title}</h1>
        <p className="blogDetail__author">By {post.author}</p>
        <p className="blogDetail__excerpt">{post.excerpt}</p>

        <article className="blogDetail__article">
          {sections.map((section, index) =>
            section.type === "heading" ? (
              <h2 key={`${section.content}-${index}`}>{section.content}</h2>
            ) : (
              <p key={`${section.content.slice(0, 40)}-${index}`}>
                {section.content}
              </p>
            ),
          )}
        </article>
      </div>
    </section>
  );
};

export default BlogDetail;
