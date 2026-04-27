import { Link } from "react-router-dom";
import type { Program } from "../../types/Program";
import baseUrl from "../../constants/baseUrl";
import { getProgramPath } from "../../utils/programs";

const ProgramCard = (p: Program) => {
  const statusClass = `status status--${p.status
    .toLowerCase()
    .replace(/\s+/g, "-")}`;
  const imageUrl = p.image
    ? p.image.startsWith("/")
      ? `${baseUrl}${p.image.slice(1)}`
      : p.image
    : undefined;
  const imageStyle = imageUrl
    ? { backgroundImage: `url(${imageUrl})` }
    : undefined;

  return (
    <article className="programCard">
      <div className="media" style={imageStyle}>
        <span className="category">{p.category}</span>
      </div>
      <div>
        <h3>{p.title}</h3>
        <p className="summary">{p.summary}</p>
        <ul className="highlights">
          {p.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="meta">
          {p.location} · {p.date} · {p.duration}
        </p>
        <div className="footer">
          <span className={statusClass}>Registration {p.status}</span>
          <Link className="cta" to={getProgramPath(p.slug)}>
            View Program
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProgramCard;
