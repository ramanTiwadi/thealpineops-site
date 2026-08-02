import { Link } from "react-router-dom";
import baseUrl from "../../constants/baseUrl";
import SocialMedia from "../SocialMedia/SocialMedia";

const Header = () => {
  return (
    <>
      <header className="topHeader" aria-label="Site header">
        <div className="headerBrand">
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
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp at +91 78199 83273"
        title="Contact Us"
      >
        <span className="stickyContactLabel">Enquire on Whatsapp</span>
        <span className="whatsappIcon" aria-hidden="true">
          <img src={`${baseUrl}assets/images/svg/whatsapp.svg`} alt="" />
        </span>
        {/* <span className="whatsappNumber">+91 78199 83273</span> */}
      </a>
    </>
  );
};

export default Header;
