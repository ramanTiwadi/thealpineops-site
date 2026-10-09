import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import baseUrl from "../../constants/baseUrl";
import gsap from "gsap";
import slidesData from "../../data/heroSlides.json";

type HeroSlide = {
  image: string;
  webp?: string;
  title: string;
};

const withBaseUrl = (path: string) =>
  path.startsWith("/") ? `${baseUrl}${path.slice(1)}` : path;

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedSlideIndexes, setLoadedSlideIndexes] = useState<Set<number>>(
    () => new Set([0]),
  );
  const slides = useMemo(
    () =>
      (slidesData as HeroSlide[]).map((slide) => ({
        ...slide,
        image: withBaseUrl(slide.image),
        webp: slide.webp ? withBaseUrl(slide.webp) : undefined,
      })),
    [],
  );

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          clearProps: "opacity,transform",
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    setLoadedSlideIndexes((prev) => {
      if (prev.has(activeIndex)) return prev;
      const next = new Set(prev);
      next.add(activeIndex);
      return next;
    });

    const preloadIndex = (activeIndex + 1) % slides.length;
    const id = window.setTimeout(() => {
      setLoadedSlideIndexes((prev) => {
        if (prev.has(preloadIndex)) return prev;
        const next = new Set(prev);
        next.add(preloadIndex);
        return next;
      });
    }, 1500);

    return () => window.clearTimeout(id);
  }, [activeIndex, slides.length]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.innerWidth <= 768) return;

    let frame = 0;
    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const updateParallax = () => {
      frame = 0;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const mediaShift = clamp(scrollY * 0.16, 0, 120);

      root.style.setProperty("--hero-media-shift", `${mediaShift.toFixed(2)}px`);
    };

    const queueUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };
  const activeSlide = slides[activeIndex];

  return (
    <section
      ref={ref}
      className="hero-carousel"
      aria-roledescription="carousel"
    >
      <div className="heroMedia">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`heroSlide ${index === activeIndex ? "heroSlideActive" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            {loadedSlideIndexes.has(index) ? (
              <picture className="heroSlidePicture">
                {slide.webp ? <source srcSet={slide.webp} type="image/webp" /> : null}
                <img
                  src={slide.image}
                  alt=""
                  className="heroSlideImage"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding="async"
                />
              </picture>
            ) : null}
          </div>
        ))}
        <div className="heroOverlay" />
        <button
          type="button"
          className="heroArrow heroArrowLeft"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous slide"
        >
          &#8249;
        </button>
        <button
          type="button"
          className="heroArrow heroArrowRight"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next slide"
        >
          &#8250;
        </button>
      </div>

      <h1 className="heroTitle">
        {activeSlide?.title ?? "Alpine Operations and Expeditions"}
      </h1>
    </section>
  );
};

export default Hero;
