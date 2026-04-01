// import blogPosts from "../../data/blogs.json";

// type BlogPost = {
//   title: string;
//   excerpt: string;
//   date: string;
//   tag: string;
// };

const Blogs = () => {
  /*
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
  */

  return (
    <section className="blogs">
      <div className="blogsHero">
        <span className="blogsKicker">Field Notes</span>
        <h1>Blogs</h1>
        <p>
          We&apos;re preparing stories from the mountains, training blocks, and
          expedition field notes.
        </p>
      </div>

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
    </section>
  );
};

export default Blogs;
