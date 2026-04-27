import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import baseUrl from "./constants/baseUrl";
import Home from "./pages/Home/Home";
import Programs from "./pages/Programs/Programs";
import ProgramDetail from "./pages/Programs/ProgramDetail";
import About from "./pages/About/About";
import Archives from "./pages/Archives/Archives";
import Contact from "./pages/Contact/Contact";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetail from "./pages/Blogs/BlogDetail";
import MountainPro from "./pages/MountainPro/MountainPro";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import programs from "./data/programs.json";
import blogPosts from "./data/blogs.json";
import type { Program } from "./types/Program";
import type { BlogPost } from "./types/Blog";
import { findBlogBySlug } from "./utils/blogs";
import { findProgramBySlug, getProgramPath } from "./utils/programs";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const SITE_URL = "https://thealpineops.com";
const DEFAULT_TITLE = "The Alpine Ops | Alpine Operations and Expeditions";
const DEFAULT_DESCRIPTION =
  "The Alpine Ops, also known as Alpine Operations and Expeditions, offers guided Himalayan treks, expeditions, mountaineering training, and outdoor fitness programs.";

const SEO_ROUTES: Record<
  string,
  { title: string; description: string; path: string }
> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  },
  "/programs": {
    title: "Programs | The Alpine Ops",
    description:
      "Explore upcoming treks, expeditions, and mountain training programs from The Alpine Ops.",
    path: "/programs",
  },
  "/about": {
    title: "About | The Alpine Ops",
    description:
      "Learn about The Alpine Ops, the philosophy behind Alpine Operations and Expeditions, and the team leading the mission.",
    path: "/about",
  },
  "/archives": {
    title: "Archives | The Alpine Ops",
    description:
      "Browse past programs, expeditions, and training journeys completed by The Alpine Ops.",
    path: "/archives",
  },
  "/blogs": {
    title: "Blogs | The Alpine Ops",
    description:
      "Read field notes, updates, and stories from The Alpine Ops and Alpine Operations and Expeditions.",
    path: "/blogs",
  },
  "/contact": {
    title: "Contact | The Alpine Ops",
    description:
      "Contact The Alpine Ops for guided treks, expeditions, Mountain Pro, and training inquiries.",
    path: "/contact",
  },
  "/mountain-pro": {
    title: "Mountain Pro | The Alpine Ops",
    description:
      "Discover Mountain Pro, the structured outdoor training system from The Alpine Ops.",
    path: "/mountain-pro",
  },
};

const upsertMetaTag = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const upsertCanonicalLink = (href: string) => {
  let link = document.head.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = href;
};

const getProgramDescription = (program: Program) => {
  if (typeof program.detail.snapshot === "string") {
    return program.detail.snapshot;
  }

  return program.detail.snapshot[0] || program.summary;
};

const SeoManager = () => {
  const location = useLocation();
  const programList = programs as Program[];
  const blogList = blogPosts as BlogPost[];

  useEffect(() => {
    const pathname = location.pathname || "/";
    const routeSeo = SEO_ROUTES[pathname];

    let title = DEFAULT_TITLE;
    let description = DEFAULT_DESCRIPTION;
    let canonicalPath = pathname;

    if (routeSeo) {
      title = routeSeo.title;
      description = routeSeo.description;
      canonicalPath = routeSeo.path;
    } else if (pathname.startsWith("/programs/")) {
      const slug = pathname.replace("/programs/", "");
      const program = findProgramBySlug(programList, slug);

      if (program) {
        title = `${program.title} | The Alpine Ops`;
        description = getProgramDescription(program);
        canonicalPath = getProgramPath(program.slug);
      }
    } else if (pathname.startsWith("/blogs/")) {
      const slug = pathname.replace("/blogs/", "");
      const blog = findBlogBySlug(blogList, slug);

      if (blog) {
        title = `${blog.title} | The Alpine Ops`;
        description = blog.excerpt;
        canonicalPath = `/blogs/${slug}`;
      }
    }

    const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();

    document.title = title;
    upsertMetaTag('meta[name="description"]', {
      name: "description",
      content: description,
    });
    upsertMetaTag('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });
    upsertMetaTag('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMetaTag('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMetaTag('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });
    upsertMetaTag('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertCanonicalLink(canonicalUrl);
  }, [blogList, location.pathname, programList]);

  return null;
};

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const routerBase = baseUrl === "/" ? "/" : baseUrl.replace(/\/$/, "");

  return (
    <BrowserRouter basename={routerBase}>
      <ScrollToTop />
      <SeoManager />
      <div className="appShell">
        <Header />
        <Navbar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
        />
        <div className="pageShell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:slug" element={<ProgramDetail />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/mountain-pro" element={<MountainPro />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
