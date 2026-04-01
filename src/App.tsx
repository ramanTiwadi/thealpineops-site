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
import MountainPro from "./pages/MountainPro/MountainPro";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const routerBase = baseUrl === "/" ? "/" : baseUrl.replace(/\/$/, "");

  return (
    <BrowserRouter basename={routerBase}>
      <ScrollToTop />
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
