import { useEffect, useState } from "react";
import baseUrl from "../../constants/baseUrl";
import archiveData from "../../data/archives.json";
import programs from "../../data/programs.json";
import ProgramCard from "../../components/ProgramCard/ProgramCard";
import type { Program } from "../../types/Program";

type ArchiveImage = {
  id: string;
  title: string;
  image: string;
};

type ArchiveSections = {
  mountainProAndTraining: ArchiveImage[];
  expeditionsAndTreks: ArchiveImage[];
};

const Archives = () => {
  const data = programs as Program[];
  const archivedPrograms = data.filter((program) => program.status === "Closed");
  const archives = archiveData as ArchiveSections;
  const archiveSections = [
    {
      title: "Mountain Pro and Training",
      entries: archives.mountainProAndTraining ?? [],
    },
    {
      title: "Expeditions and Treks",
      entries: archives.expeditionsAndTreks ?? [],
    },
  ];
  const hasArchiveSections = archiveSections.some(
    (section) => section.entries.length > 0,
  );
  const [activePreview, setActivePreview] = useState<{
    sectionIndex: number;
    imageIndex: number;
  } | null>(null);

  const getImageSrc = (image: string) =>
    image.startsWith("http") ? image : `${baseUrl}${image}`;

  const activePreviewSection =
    activePreview ? archiveSections[activePreview.sectionIndex] : null;
  const activePreviewEntry =
    activePreviewSection && activePreview
      ? activePreviewSection.entries[activePreview.imageIndex] ?? null
      : null;

  useEffect(() => {
    if (!activePreview || !activePreviewSection?.entries.length) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePreview(null);
      }

      if (event.key === "ArrowRight") {
        setActivePreview((current) =>
          current
            ? {
                ...current,
                imageIndex:
                  (current.imageIndex + 1) % activePreviewSection.entries.length,
              }
            : current,
        );
      }

      if (event.key === "ArrowLeft") {
        setActivePreview((current) =>
          current
            ? {
                ...current,
                imageIndex:
                  (current.imageIndex - 1 + activePreviewSection.entries.length) %
                  activePreviewSection.entries.length,
              }
            : current,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePreview, activePreviewSection]);

  const showPreviousPreview = () => {
    if (!activePreview || !activePreviewSection?.entries.length) return;

    setActivePreview({
      ...activePreview,
      imageIndex:
        (activePreview.imageIndex - 1 + activePreviewSection.entries.length) %
        activePreviewSection.entries.length,
    });
  };

  const showNextPreview = () => {
    if (!activePreview || !activePreviewSection?.entries.length) return;

    setActivePreview({
      ...activePreview,
      imageIndex:
        (activePreview.imageIndex + 1) % activePreviewSection.entries.length,
    });
  };

  return (
    <section className="archives-page">
      <span className="section-eyebrow">Archives</span>
      <h1>Past Programs</h1>
      <p className="archives-page__intro">
        A record of completed Alpine Ops programs, expeditions, and training
        cycles. Archived entries stay here for reference even after active
        registrations close.
      </p>

      {hasArchiveSections ? (
        <div className="archives-page__sections">
          {archiveSections.map((section, sectionIndex) =>
            section.entries.length ? (
              <section key={section.title} className="archives-page__section">
                <div className="archives-page__section-header">
                  <span className="archives-page__section-kicker">Archive</span>
                  <h2>{section.title}</h2>
                </div>

                <div className="archives-page__gallery">
                  {section.entries.map((entry, imageIndex) => (
                    <button
                      key={entry.id}
                      type="button"
                      className="archives-page__entry"
                      onClick={() =>
                        setActivePreview({
                          sectionIndex,
                          imageIndex,
                        })
                      }
                      aria-label={`Open ${entry.title} preview`}
                    >
                      <div className="archives-page__image-wrap">
                        <img
                          src={getImageSrc(entry.image)}
                          alt={entry.title}
                          className="archives-page__image"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ) : null,
          )}
        </div>
      ) : archivedPrograms.length ? (
        <div className="archives-page__grid">
          {archivedPrograms.map((program) => (
            <ProgramCard key={program.id} {...program} />
          ))}
        </div>
      ) : (
        <div className="archives-page__empty">
          <h2>No archived programs yet</h2>
          <p>
            Add entries to the archive data file to power the new visual
            archive layout, or mark current programs as closed to keep using
            the existing archive cards.
          </p>
        </div>
      )}

      {activePreview && activePreviewEntry && activePreviewSection ? (
        <div
          className="archives-page__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activePreviewSection.title} image preview`}
        >
          <button
            type="button"
            className="archives-page__lightbox-backdrop"
            onClick={() => setActivePreview(null)}
            aria-label="Close preview"
          />

          <div className="archives-page__lightbox-panel">
            <button
              type="button"
              className="archives-page__lightbox-close"
              onClick={() => setActivePreview(null)}
              aria-label="Close preview"
            >
              ×
            </button>

            <div className="archives-page__lightbox-meta">
              <span>{activePreviewSection.title}</span>
              <span>
                {activePreview.imageIndex + 1} / {activePreviewSection.entries.length}
              </span>
            </div>

            <div className="archives-page__lightbox-frame">
              <button
                type="button"
                className="archives-page__lightbox-arrow"
                onClick={showPreviousPreview}
                aria-label="Previous image"
              >
                ←
              </button>

              <img
                src={getImageSrc(activePreviewEntry.image)}
                alt={activePreviewEntry.title}
                className="archives-page__lightbox-image"
              />

              <button
                type="button"
                className="archives-page__lightbox-arrow"
                onClick={showNextPreview}
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Archives;
