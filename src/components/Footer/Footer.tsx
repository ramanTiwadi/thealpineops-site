import baseUrl from "../../constants/baseUrl";

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
        <span className="copy">© 2025 The Alpine Ops</span>
      </div>
    </footer>
  );
};

export default Footer;
