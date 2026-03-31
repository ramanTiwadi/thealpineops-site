import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../constants/baseUrl";
import HeaderStoriesViewer from "../InstaStories/HeaderStoriesViewer";
import SocialMedia from "../SocialMedia/SocialMedia";

const Header = () => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [storiesEnabled, setStoriesEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const updateStoriesEnabled = (
      event: MediaQueryList | MediaQueryListEvent,
    ) => {
      setStoriesEnabled(event.matches);
    };

    updateStoriesEnabled(mediaQuery);
    mediaQuery.addEventListener("change", updateStoriesEnabled);

    return () => mediaQuery.removeEventListener("change", updateStoriesEnabled);
  }, []);

  return (
    <>
      <header className="topHeader" aria-label="Site header">
        <div className="headerBrand">
          {storiesEnabled ? (
            <button
              type="button"
              className="headerLogo"
              title="Open Alpine Ops stories"
              onClick={() => setViewerOpen(true)}
              aria-label="Open Alpine Ops stories"
            >
              <img
                src={`${baseUrl}assets/images/logo.png`}
                alt="The Alpine Ops logo"
              />
            </button>
          ) : (
            <Link
              className="headerLogo"
              to="/"
              title="The Alpine Ops homepage"
              aria-label="Go to homepage"
            >
              <img
                src={`${baseUrl}assets/images/logo.png`}
                alt="The Alpine Ops logo"
              />
            </Link>
          )}
          <Link
            className="header-title-section"
            to="/"
            title="The Alpine Ops homepage"
            aria-label="Go to homepage"
          >
            <b className="headerTitle">
              Alpine <span className="operations">operations</span> and
              expeditions
            </b>
            {/* <br /> */}
            <span className="headerSubTitle">
              Nature's Wisdom, Military Mindset
            </span>
          </Link>
        </div>

        <SocialMedia variant="header" />
      </header>

      <a
        className="stickyContact"
        href="https://wa.me/917819983273"
        target="_blank"
        rel="noreferrer"
        aria-label="Contact us on WhatsApp at +91 78199 83273"
        title="Contact Us"
      >
        <span className="stickyContactLabel">Enquire on Whatsapp</span>
        <span className="whatsappIcon" aria-hidden="true">
          <img src={`${baseUrl}assets/images/svg/whatsapp.svg`} alt="" />
        </span>
        {/* <span className="whatsappNumber">+91 78199 83273</span> */}
      </a>

      <HeaderStoriesViewer
        open={storiesEnabled && viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </>
  );
};

export default Header;
