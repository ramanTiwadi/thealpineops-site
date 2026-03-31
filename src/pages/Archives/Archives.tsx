import programs from "../../data/programs.json";
import ProgramCard from "../../components/ProgramCard/ProgramCard";
import type { Program } from "../../types/Program";

const Archives = () => {
  const data = programs as Program[];
  const archivedPrograms = data.filter((program) => program.status === "Closed");

  return (
    <section className="archives-page">
      <span className="section-eyebrow">Archives</span>
      <h1>Past Programs</h1>
      <p className="archives-page__intro">
        A record of completed Alpine Ops programs, expeditions, and training
        cycles. Archived entries stay here for reference even after active
        registrations close.
      </p>

      {archivedPrograms.length ? (
        <div className="archives-page__grid">
          {archivedPrograms.map((program) => (
            <ProgramCard key={program.id} {...program} />
          ))}
        </div>
      ) : (
        <div className="archives-page__empty">
          <h2>No archived programs yet</h2>
          <p>
            Archived programs will appear here once current programs are marked
            as closed in the data.
          </p>
        </div>
      )}
    </section>
  );
};

export default Archives;
