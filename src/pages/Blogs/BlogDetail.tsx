import { Link, useParams } from "react-router-dom";
import blogPosts from "../../data/blogs.json";
import type { BlogContentBlock, BlogPost } from "../../types/Blog";
import { findBlogBySlug } from "../../utils/blogs";

const FALLBACK_BLOG_IMAGE = "/assets/images/hero/adventure.jpg";
const imagePlaceholderPattern = /^\{\{([^}]+\.(?:png|jpe?g))\}\}$/i;

const toReadableSections = (content: string): BlogContentBlock[] => {
  const blocks = content
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\n+/g, " ").trim())
    .filter(Boolean);

  return blocks.map((block) => {
    const imageMatch = block.match(imagePlaceholderPattern);

    if (imageMatch) {
      const filename = imageMatch[1];

      return {
        type: "image",
        src: `/assets/images/blogs/${filename}`,
        alt: "",
      };
    }

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

  const sections = post.contentBlocks ?? toReadableSections(post.content);
  const heroImage = post.image ?? FALLBACK_BLOG_IMAGE;

  return (
    <section className="blogDetail">
      <div className="blogDetail__content">
        <Link className="blogDetail__back" to="/blogs">
          Back to Blogs
        </Link>

        <header className="blogDetail__header">
          <img className="blogDetail__heroImage" src={heroImage} alt="" />
          <div className="blogDetail__headerOverlay" aria-hidden="true" />
          <div className="blogDetail__intro">
            <div className="blogDetail__meta">
              <span>{post.tag}</span>
              <span>{post.date}</span>
            </div>
            <h1>{post.title}</h1>
            <p className="blogDetail__author">By {post.author}</p>
            <p className="blogDetail__excerpt">{post.excerpt}</p>
          </div>
        </header>

        <article className="blogDetail__article">
          {sections.map((section, index) => {
            if (section.type === "heading") {
              return (
                <h2 key={`${section.content}-${index}`}>{section.content}</h2>
              );
            }

            if (section.type === "image") {
              return (
                <figure
                  key={`${section.src}-${index}`}
                  className="blogDetail__figure"
                >
                  <img src={section.src} alt={section.alt} loading="lazy" />
                </figure>
              );
            }

            return (
              <p key={`${section.content.slice(0, 40)}-${index}`}>
                {section.content}
              </p>
            );
          })}
        </article>
      </div>
    </section>
  );
};

export default BlogDetail;
