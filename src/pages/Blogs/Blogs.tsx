import blogPosts from "../../data/blogs.json";

type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  tag: string;
};

const Blogs = () => {
  return (
    <section className="blogs">
      <div className="blogsHero">
        <span className="blogsKicker">Field Notes</span>
        <h1>Blogs</h1>
        <p>
          Insights from training grounds, expeditions, and mountain operations.
        </p>
      </div>

      <div className="blogsGrid">
        {(blogPosts as BlogPost[]).map((post) => (
          <article key={post.title} className="blogCard">
            <div className="blogMeta">
              <span>{post.tag}</span>
              <span>{post.date}</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <button type="button" disabled>
              Read More
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
