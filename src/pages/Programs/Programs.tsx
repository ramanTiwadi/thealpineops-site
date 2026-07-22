import programs from "../../data/programs.json";
import type { Program } from "../../types/Program";
import ProgramCard from "../../components/ProgramCard/ProgramCard";

const monthIndexes: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

const getProgramStartTime = (program: Program) => {
  const yearMatch = program.date.match(/\b(20\d{2})\b/);
  const monthMatch = program.date.match(
    /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/i,
  );
  const dayMatch = program.date.match(/\b(\d{1,2})(?:st|nd|rd|th)?\b/i);

  if (!yearMatch || !monthMatch || !dayMatch) {
    return Number.POSITIVE_INFINITY;
  }

  return new Date(
    Number(yearMatch[1]),
    monthIndexes[monthMatch[1].slice(0, 3).toLowerCase()],
    Number(dayMatch[1]),
  ).getTime();
};

const Programs = () => {
  const data = [...(programs as Program[])].sort(
    (firstProgram, secondProgram) =>
      getProgramStartTime(firstProgram) - getProgramStartTime(secondProgram),
  );

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
