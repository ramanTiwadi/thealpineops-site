import baseUrl from "../../constants/baseUrl";
// import SocialMedia from "../SocialMedia/SocialMedia";

const Footer = () => {
  return (
    <footer className="footer">
      <div
        className="footer__bg"
        style={{ backgroundImage: `url(${baseUrl}assets/images/footer.png)` }}
        aria-hidden="true"
      />
      <div className="footer__overlay" aria-hidden="true" />
      <div className="footer__content">
        {/* <SocialMedia variant="footer" /> */}
        <span className="copy">
          © 2025 The Alpine Ops
          {/* © {new Date().getFullYear()} The Alpine Ops */}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
