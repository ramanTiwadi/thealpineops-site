import { Link } from "react-router-dom";
import blogPosts from "../../data/blogs.json";
import type { BlogPost } from "../../types/Blog";
import { getBlogPath } from "../../utils/blogs";

const FALLBACK_BLOG_IMAGE = "/assets/images/hero/adventure.jpg";

const getPostImage = (post: BlogPost) => post.image ?? FALLBACK_BLOG_IMAGE;

const getPostWordCount = (post: BlogPost) => {
  if (post.contentBlocks?.length) {
    return post.contentBlocks.reduce((count, block) => {
      if (block.type === "image") {
        return count;
      }

      return count + block.content.split(/\s+/).filter(Boolean).length;
    }, 0);
  }

  return post.content.split(/\s+/).filter(Boolean).length;
};

const getReadTime = (post: BlogPost) =>
  `${Math.max(1, Math.ceil(getPostWordCount(post) / 220))} min read`;

const Blogs = () => {
  const posts = (blogPosts as BlogPost[]) ?? [];
  const hasPosts = posts.length > 0;

  return (
    <section className="blogs">
      <div className="blogsHero">
        <h1>Blogs</h1>
        <p>
          Insights from training grounds, expeditions, and mountain operations.
        </p>
      </div>

      {hasPosts ? (
        <div className="blogsGrid">
          {posts.map((post, index) => {
            const postImage = getPostImage(post);
            const isFeatured = index === 0;

            return (
              <article
                key={post.title}
                className={`blogCard ${isFeatured ? "blogCard--featured" : ""}`}
              >
                <Link
                  className="blogCard__media"
                  to={getBlogPath(post.title)}
                  aria-label={`Read ${post.title}`}
                >
                  <img src={postImage} alt="" loading="lazy" />
                  <span className="blogCard__mediaLabel">
                    {isFeatured ? "Featured Field Note" : "Field Note"}
                  </span>
                </Link>
                <div className="blogCard__body">
                  <div className="blogMeta">
                    <span>{post.tag}</span>
                    <span>{post.date}</span>
                    <span>{getReadTime(post)}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className="blogCard__footer">
                    <p>By {post.author}</p>
                    <Link className="blogCard__link" to={getBlogPath(post.title)}>
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="blogCard">
          <div className="blogMeta">
            <span>Update</span>
            <span>Coming Soon</span>
          </div>
          <h2>Fresh dispatches are on the way.</h2>
          <p>
            This section is being curated right now. Check back soon for
            expedition insights, training lessons, and behind-the-scenes notes
            from Alpine Ops.
          </p>
          <button type="button" disabled>
            Coming Soon
          </button>
        </div>
      )}
    </section>
  );
};

export default Blogs;
