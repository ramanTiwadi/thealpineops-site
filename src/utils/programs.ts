import type { Program } from "../types/Program";

export const normalizeProgramSlug = (slug: string) =>
  decodeURIComponent(slug).trim().toLowerCase();

export const findProgramBySlug = (programs: Program[], slug?: string) => {
  if (!slug) return undefined;

  const normalizedSlug = normalizeProgramSlug(slug);

  return programs.find(
    (program) => normalizeProgramSlug(program.slug) === normalizedSlug,
  );
};

export const getProgramPath = (slug: string) =>
  `/programs/${normalizeProgramSlug(slug)}`;
