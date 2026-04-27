import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import programs from "../../data/programs.json";
import type { Program } from "../../types/Program";
import baseUrl from "../../constants/baseUrl";
import {
  findProgramBySlug,
  getProgramPath,
  normalizeProgramSlug,
} from "../../utils/programs";

const resolveImageUrl = (image: string) =>
  image.startsWith("/") ? `${baseUrl}${image.slice(1)}` : image;

const renderQuickFactIcon = (
  icon: Program["detail"]["quickFacts"][number]["icon"],
) => {
  if (icon === "duration") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 10.4V7a1 1 0 1 0-2 0v6.1a1 1 0 0 0 .3.7l3.7 3.7a1 1 0 0 0 1.4-1.4z" />
      </svg>
    );
  }
  if (icon === "tourType") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.8 4.2a1 1 0 0 0-1.4 1.4l2.5 2.5a1 1 0 0 0 1.4-1.4zM16.6 14a1 1 0 0 0-1.4 1.4l2.5 2.5a1 1 0 0 0 1.4-1.4zM17.2 4.2 14.7 6.7a1 1 0 0 0 1.4 1.4l2.5-2.5a1 1 0 0 0-1.4-1.4zM9.3 14.7 6.8 17.2a1 1 0 1 0 1.4 1.4l2.5-2.5a1 1 0 0 0-1.4-1.4z" />
      </svg>
    );
  }
  if (icon === "groupSize") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-6 8a1 1 0 0 1-1-1 5 5 0 0 1 10 0 1 1 0 0 1-1 1zm12-8a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-2.8 2.2a1 1 0 0 0 .4 1.4A3.2 3.2 0 0 1 17 18.4a1 1 0 0 0 2 0 5.2 5.2 0 0 0-2.4-4.4 1 1 0 0 0-1.4.2z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 2zm0 7.5C8.4 9.5 5 11.4 5 14v1.5a4.5 4.5 0 0 0 9 0V14c0-.6 1.2-1.5 3-1.5S20 13.4 20 14v1a1 1 0 0 0 2 0v-1c0-2.6-3.4-4.5-10-4.5z" />
    </svg>
  );
};

const ProgramDetail = () => {
  const { slug } = useParams();
  const data = programs as Program[];
  const program = findProgramBySlug(data, slug);
  const canonicalProgramPath = program ? getProgramPath(program.slug) : null;

  const galleryImages = useMemo(() => {
    if (!program) return [];
    if (program.gallery?.length) {
      return program.gallery.map(resolveImageUrl);
    }
    return program.image ? [resolveImageUrl(program.image)] : [];
  }, [program]);
  const stayImages = useMemo(
    () => (program ? program.detail.stay.images.map(resolveImageUrl) : []),
    [program],
  );
  const hasWhoShouldJoinItems =
    (program?.detail.joinCriteria.whoShouldJoin?.filter(
      (item) => item.trim().length > 0,
    ).length ?? 0) > 0;

  const [galleryState, setGalleryState] = useState({ slug: "", index: 0 });
  const [stayGalleryState, setStayGalleryState] = useState({
    slug: "",
    index: 0,
  });
  const [previewState, setPreviewState] = useState<{
    gallery: "program" | "stay";
    index: number;
  } | null>(null);
  const [openPlanDaysBySlug, setOpenPlanDaysBySlug] = useState<
    Record<string, Record<string, boolean>>
  >({});

  useEffect(() => {
    if (!previewState) return;

    const previewImages =
      previewState.gallery === "program" ? galleryImages : stayImages;
    if (!previewImages.length) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewState(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setPreviewState((current) => {
          if (!current) return current;
          const images =
            current.gallery === "program" ? galleryImages : stayImages;
          if (!images.length) return current;
          return {
            ...current,
            index:
              current.index === 0
                ? images.length - 1
                : Math.max(current.index - 1, 0),
          };
        });
        return;
      }

      if (event.key === "ArrowRight") {
        setPreviewState((current) => {
          if (!current) return current;
          const images =
            current.gallery === "program" ? galleryImages : stayImages;
          if (!images.length) return current;
          return {
            ...current,
            index: current.index === images.length - 1 ? 0 : current.index + 1,
          };
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewState, galleryImages, stayImages]);

  const currentSlug = slug ?? "";
  const defaultOpenPlanDays = useMemo(
    () =>
      Object.fromEntries(
        (program?.detail.trainingPlan.days ?? []).map((planDay, index) => [
          planDay.day,
          index === 0,
        ]),
      ),
    [program],
  );
  const openPlanDays = openPlanDaysBySlug[currentSlug] ?? defaultOpenPlanDays;

  const activeIndex =
    galleryState.slug === (slug ?? "")
      ? Math.min(galleryState.index, Math.max(galleryImages.length - 1, 0))
      : 0;
  const activeImage = galleryImages[activeIndex];
  const hasMultipleImages = galleryImages.length > 1;
  const showPrevImage = () =>
    setGalleryState((prev) => ({
      slug: slug ?? "",
      index: prev.index === 0 ? galleryImages.length - 1 : prev.index - 1,
    }));
  const showNextImage = () =>
    setGalleryState((prev) => ({
      slug: slug ?? "",
      index: prev.index === galleryImages.length - 1 ? 0 : prev.index + 1,
    }));
  const activeStayIndex =
    stayGalleryState.slug === (slug ?? "")
      ? Math.min(stayGalleryState.index, Math.max(stayImages.length - 1, 0))
      : 0;
  const activeStayImage = stayImages[activeStayIndex];
  const hasMultipleStayImages = stayImages.length > 1;
  const showPrevStayImage = () =>
    setStayGalleryState((prev) => ({
      slug: slug ?? "",
      index: prev.index === 0 ? stayImages.length - 1 : prev.index - 1,
    }));
  const showNextStayImage = () =>
    setStayGalleryState((prev) => ({
      slug: slug ?? "",
      index: prev.index === stayImages.length - 1 ? 0 : prev.index + 1,
    }));
  const previewImages =
    previewState?.gallery === "program" ? galleryImages : stayImages;
  const previewIndex = previewState
    ? Math.min(previewState.index, Math.max(previewImages.length - 1, 0))
    : 0;
  const previewImage = previewImages[previewIndex];
  const hasMultiplePreviewImages = previewImages.length > 1;
  const showPrevPreviewImage = () =>
    setPreviewState((current) => {
      if (!current || !previewImages.length) return current;
      return {
        ...current,
        index:
          current.index === 0 ? previewImages.length - 1 : current.index - 1,
      };
    });
  const showNextPreviewImage = () =>
    setPreviewState((current) => {
      if (!current || !previewImages.length) return current;
      return {
        ...current,
        index:
          current.index === previewImages.length - 1 ? 0 : current.index + 1,
      };
    });

  if (!program) {
    return (
      <section className="program-detail">
        <div className="program-detail__content">
          <h1>Program Not Found</h1>
          <p>
            The program you are looking for is not available. Browse the full
            list to find the right fit.
          </p>
          <Link className="program-detail__back" to="/programs">
            Back to Programs
          </Link>
        </div>
      </section>
    );
  }

  if (slug && normalizeProgramSlug(slug) !== normalizeProgramSlug(program.slug)) {
    return <Navigate to={canonicalProgramPath ?? "/programs"} replace />;
  }

  return (
    <section className="program-detail">
      <Link
        className="program-detail__back program-detail__backTop"
        to="/programs"
      >
        <span className="program-detail__backIcon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M14.7 6.3a1 1 0 0 1 0 1.4L10.4 12l4.3 4.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0z" />
          </svg>
        </span>
        Back to Programs
      </Link>

      <div className="program-detail__grid">
        <div className="program-detail__gallery">
          <div className="program-detail__media">
            {activeImage && (
              <img
                className="program-detail__mainImage"
                src={activeImage}
                alt={`${program.title} image ${activeIndex + 1}`}
                onClick={() =>
                  setPreviewState({ gallery: "program", index: activeIndex })
                }
              />
            )}
            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  className="program-detail__galleryNav program-detail__galleryNav--prev"
                  onClick={showPrevImage}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="program-detail__galleryNav program-detail__galleryNav--next"
                  onClick={showNextImage}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {hasMultipleImages && (
            <div
              className="program-detail__thumbs"
              aria-label="Program gallery"
            >
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`program-detail__thumb ${activeIndex === index ? "isActive" : ""}`}
                  onClick={() => {
                    setGalleryState({ slug: slug ?? "", index });
                  }}
                  aria-label={`Show program image ${index + 1}`}
                  aria-pressed={activeIndex === index}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="program-detail__booking">
          {/* <p className="section-eyebrow">{program.detail.eyebrow}</p> */}
          <h1>{program.title}</h1>
          <div className="program-detail__metaPills">
            <span className="program-detail__category">{program.category}</span>
            <span
              className={`status status--${program.status.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {program.status}
            </span>
          </div>
          <p className="program-detail__summary">{program.summary}</p>

          <ul className="program-detail__facts">
            <li>
              <span>{program.detail.factLabels.location}</span>
              <strong>{program.location}</strong>
            </li>
            <li>
              <span>{program.detail.factLabels.date}</span>
              <strong>{program.date}</strong>
            </li>
            <li>
              <span>{program.detail.factLabels.duration}</span>
              <strong>{program.duration}</strong>
            </li>
          </ul>

          {program.detail.showPricing &&
            program.detail.pricing?.items?.length && (
              <div className="program-detail__pricing">
                <h2>{program.detail.pricing.title}</h2>
                <ul className="program-detail__pricingList">
                  {program.detail.pricing.items.map((item) => (
                    <li key={`${item.label}-${item.value}`}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
                {program.detail.pricing.note ? (
                  <p className="program-detail__pricingNote">
                    {program.detail.pricing.note}
                  </p>
                ) : null}
              </div>
            )}

          <a
            className="program-detail__cta"
            href={program.detail.primaryCtaUrl}
            target="_blank"
            rel="noreferrer"
          >
            {program.detail.primaryCtaLabel}
          </a>

          {/* <Link className="program-detail__back" to="/programs">
            <span className="program-detail__backIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M14.7 6.3a1 1 0 0 1 0 1.4L10.4 12l4.3 4.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0z" />
              </svg>
            </span>
            Back to Programs
          </Link> */}
        </aside>
      </div>

      <article className="program-detail__quickFacts">
        {program.detail.quickFacts.map((fact) => (
          <div className="program-detail__quickFact" key={fact.label}>
            <span className="program-detail__quickIcon">
              {renderQuickFactIcon(fact.icon)}
            </span>
            <div>
              <p className="program-detail__quickLabel">{fact.label}</p>
              <strong className="program-detail__quickValue">
                {fact.value}
              </strong>
            </div>
          </div>
        ))}
      </article>

      <div className="program-detail__sections">
        <article className="program-detail__panel">
          <h2>{program.detail.expectTitle}</h2>
          <ul className="program-detail__list">
            {program.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>

        <article className="program-detail__panel">
          <h2>{program.detail.snapshotTitle}</h2>
          {Array.isArray(program.detail.snapshot) ? (
            <ul className="program-detail__list">
              {program.detail.snapshot
                .filter((snapshot) => snapshot.trim().length > 0)
                .map((snapshot) => (
                  <li key={snapshot}>{snapshot}</li>
                ))}
            </ul>
          ) : (
            <p>{program.detail.snapshot}</p>
          )}
          {program.detail.snapshotChips?.length > 0 && (
            <div className="program-detail__chips">
              {program.detail.snapshotChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          )}
        </article>
      </div>

      {program?.detail?.showStay && (
        <article className="program-detail__stay">
          <div className="program-detail__stayHeader">
            <h2>{program.detail.stay.title}</h2>
            <p>{program.detail.stay.summary}</p>
          </div>

          <div className="program-detail__stayGrid">
            <ul className="program-detail__list">
              {program.detail.stay.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            {activeStayImage && (
              <div className="program-detail__stayGallery">
                <div className="program-detail__stayMedia">
                  <img
                    className="program-detail__stayMainImage"
                    src={activeStayImage}
                    alt={`${program.title} accommodation ${activeStayIndex + 1}`}
                    onClick={() =>
                      setPreviewState({
                        gallery: "stay",
                        index: activeStayIndex,
                      })
                    }
                  />
                  {hasMultipleStayImages && (
                    <>
                      <button
                        type="button"
                        className="program-detail__galleryNav program-detail__galleryNav--prev"
                        onClick={showPrevStayImage}
                        aria-label="Previous accommodation image"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="program-detail__galleryNav program-detail__galleryNav--next"
                        onClick={showNextStayImage}
                        aria-label="Next accommodation image"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {hasMultipleStayImages && (
                  <div
                    className="program-detail__stayThumbs"
                    aria-label="Accommodation gallery"
                  >
                    {stayImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        className={`program-detail__thumb ${activeStayIndex === index ? "isActive" : ""}`}
                        onClick={() => {
                          setStayGalleryState({ slug: slug ?? "", index });
                        }}
                        aria-label={`Show accommodation image ${index + 1}`}
                        aria-pressed={activeStayIndex === index}
                      >
                        <img src={image} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </article>
      )}

      {program?.detail?.showTrainingPlan && (
        <article className="program-detail__plan">
          <h2>{program.detail.trainingPlan.title}</h2>
          <div className="program-detail__planGrid">
            {program.detail.trainingPlan.days.map((planDay, index) => (
              <section className="program-detail__planDay" key={planDay.day}>
                <button
                  type="button"
                  className="program-detail__planDayToggle"
                  onClick={() =>
                    setOpenPlanDaysBySlug((current) => {
                      const currentPlanDays =
                        current[currentSlug] ?? defaultOpenPlanDays;
                      return {
                        ...current,
                        [currentSlug]: {
                          ...currentPlanDays,
                          [planDay.day]: !currentPlanDays[planDay.day],
                        },
                      };
                    })
                  }
                  aria-expanded={Boolean(openPlanDays[planDay.day])}
                  aria-controls={`plan-day-${index}`}
                >
                  <span className="program-detail__planDayLabel">
                    {planDay.day}
                  </span>
                  <span className="program-detail__planDayHeading">
                    {planDay.heading}
                  </span>
                  <span
                    className="program-detail__planDayChevron"
                    aria-hidden="true"
                  >
                    {openPlanDays[planDay.day] ? "−" : "+"}
                  </span>
                </button>
                {openPlanDays[planDay.day] && (
                  <div
                    className="program-detail__planDayContent"
                    id={`plan-day-${index}`}
                  >
                    <ul className="program-detail__list">
                      {planDay.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>
        </article>
      )}

      {program?.detail?.showJoinCriteria && (
        <article className="program-detail__join">
          <div
            className={`program-detail__includeExcludeGrid ${
              !hasWhoShouldJoinItems
                ? "program-detail__includeExcludeGrid--single"
                : ""
            }`.trim()}
          >
            <section className="program-detail__includeCard">
              <h3>{program.detail.joinCriteria.whoCanJoinTitle}</h3>
              <ul className="program-detail__list">
                {program.detail.joinCriteria.whoCanJoin.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {hasWhoShouldJoinItems && (
              <section className="program-detail__includeCard">
                <h3>{program.detail.joinCriteria.whoShouldJoinTitle}</h3>
                <ul className="program-detail__list">
                  {program.detail.joinCriteria.whoShouldJoin.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>
      )}

      {program?.detail?.showInclusionsExclusions && (
        <article className="program-detail__includeExclude">
          <h2>{program.detail.inclusionsExclusions.title}</h2>
          <div className="program-detail__includeExcludeGrid">
            <section className="program-detail__includeCard">
              <h3>{program.detail.inclusionsExclusions.inclusionsTitle}</h3>
              <ul className="program-detail__list">
                {program.detail.inclusionsExclusions.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="program-detail__excludeCard">
              <h3>{program.detail.inclusionsExclusions.exclusionsTitle}</h3>
              <ul className="program-detail__list">
                {program.detail.inclusionsExclusions.exclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      )}

      <div className="program-detail__footerNote">
        {program.detail.footerNote}
        <div>
          <a
            href={program.detail.footerCtaUrl}
            target="_blank"
            rel="noreferrer"
          >
            {program.detail.footerCtaLabel}
          </a>
        </div>
      </div>

      {previewState && previewImage && (
        <div
          className="program-detail__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setPreviewState(null)}
        >
          {hasMultiplePreviewImages && (
            <>
              <button
                type="button"
                className="program-detail__lightboxNav program-detail__lightboxNav--prev"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevPreviewImage();
                }}
                aria-label="Previous preview image"
              >
                ‹
              </button>
              <button
                type="button"
                className="program-detail__lightboxNav program-detail__lightboxNav--next"
                onClick={(event) => {
                  event.stopPropagation();
                  showNextPreviewImage();
                }}
                aria-label="Next preview image"
              >
                ›
              </button>
            </>
          )}
          <button
            type="button"
            className="program-detail__lightboxClose"
            onClick={() => setPreviewState(null)}
            aria-label="Close preview"
          >
            ×
          </button>
          <img
            className="program-detail__lightboxImage"
            src={previewImage}
            alt="Program preview"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default ProgramDetail;
