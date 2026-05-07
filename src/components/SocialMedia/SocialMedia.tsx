import styles from "./SocialMedia.module.scss";

type SocialMediaProps = {
  variant: "header" | "footer";
};

const SocialMedia = ({ variant }: SocialMediaProps) => {
  const rootClass =
    variant === "header"
      ? `${styles.socialMedia} ${styles.header}`
      : `${styles.socialMedia} ${styles.footer}`;

  return (
    <div className={rootClass} aria-label="Social media links">
      <a
        href="https://www.instagram.com/thealpineops"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        title="Instagram"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M16.8 3H7.2A4.2 4.2 0 0 0 3 7.2v9.6A4.2 4.2 0 0 0 7.2 21h9.6a4.2 4.2 0 0 0 4.2-4.2V7.2A4.2 4.2 0 0 0 16.8 3Zm2.6 13.8a2.6 2.6 0 0 1-2.6 2.6H7.2a2.6 2.6 0 0 1-2.6-2.6V7.2a2.6 2.6 0 0 1 2.6-2.6h9.6a2.6 2.6 0 0 1 2.6 2.6Z"
            fill="currentColor"
          />
          <path
            d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2Zm0 8a3.2 3.2 0 1 1 3.2-3.2 3.2 3.2 0 0 1-3.2 3.2Z"
            fill="currentColor"
          />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
        </svg>
      </a>
      <a
        href="https://www.facebook.com/profile.php?id=61587175724686"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        title="Facebook"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M13.4 21v-7.7h2.6l.4-3h-3v-2c0-.9.3-1.5 1.6-1.5h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3v2.1H7.5v3h2.6V21Z"
            fill="currentColor"
          />
        </svg>
      </a>
      <a
        href="https://www.youtube.com/@thealpineops"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        title="YouTube"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M21.6 8.2a3 3 0 0 0-2.1-2.1C17.8 5.6 12 5.6 12 5.6s-5.8 0-7.5.5a3 3 0 0 0-2.1 2.1A31.6 31.6 0 0 0 2 12a31.6 31.6 0 0 0 .4 3.8 3 3 0 0 0 2.1 2.1c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 22 12a31.6 31.6 0 0 0-.4-3.8Z"
            fill="currentColor"
          />
          <path d="M10 15.2V8.8L15.6 12Z" fill="#0b0e11" />
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/company/alpine-operations-expeditions/"
        className={styles.linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6.8 9.2H3.6V20h3.2ZM5.2 4a1.9 1.9 0 1 0 0 3.8A1.9 1.9 0 0 0 5.2 4ZM20.4 13.2c0-2.4-1.3-4.2-3.8-4.2a3.3 3.3 0 0 0-3 1.6V9.2h-3.1V20h3.1v-5.7c0-1.5.3-3 2.1-3s1.8 1.7 1.8 3.1V20h3.1Z"
            fill="currentColor"
          />
        </svg>
      </a>
      <a
        href="https://x.com/thealpineops"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
        title="X"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M18.6 3H21l-6.7 7.7L22 21h-6.2l-4.8-6.2L5.9 21H3.4l7.2-8.3L2 3h6.3l4.3 5.7Zm-1.1 16.2h1.4L7.6 4.7H6.1Z"
            fill="currentColor"
          />
        </svg>
      </a>
      {!(variant === "header") && (
        <a
          href="https://wa.me/917819983273"
          className={styles.whatsApp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M20.5 11.8a8.6 8.6 0 0 1-12.7 7.5L3 21l1.8-4.6A8.6 8.6 0 1 1 20.5 11.8Z"
              fill="currentColor"
            />
            <path
              d="M9.3 7.7c-.3-.6-.5-.6-.8-.6h-.7c-.2 0-.6.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.1 3.1c.2.2 2 3.2 5 4.3 2.5.9 3 .7 3.5.6.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.5.2-1.6-.1-.2-.2-.3-.5-.4l-1.7-.8c-.3-.1-.5-.1-.7.2l-.7.9c-.2.2-.4.3-.7.2-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6 0-.2 0-.4-.1-.6Z"
              fill="#0b0e11"
            />
          </svg>
        </a>
      )}
    </div>
  );
};

export default SocialMedia;
