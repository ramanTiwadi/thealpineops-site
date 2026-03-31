import programs from "../../data/programs.json";
import type { Program } from "../../types/Program";
import ProgramCard from "../../components/ProgramCard/ProgramCard";

const Programs = () => {
  const data = programs as Program[];

  return (
    <section className="programs-page">
      <span className="section-eyebrow">Programs</span>
      <h1>Upcoming Programs</h1>
      <p className="programs-page__intro">
        Mission-built training environments designed for real terrain and real
        pressure. Each program blends conditioning, tactical movement, and
        fieldcraft with clear progression.
      </p>

      <div className="program-grid">
        {data.map((p) => (
          <ProgramCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
};

export default Programs;
