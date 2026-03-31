import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import baseUrl from "../../constants/baseUrl";
import gsap from "gsap";
import slidesData from "../../data/heroSlides.json";

type HeroSlide = {
  image: string;
  title: string;
};

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = useMemo(
    () =>
      (slidesData as HeroSlide[]).map((slide) => ({
        ...slide,
        image: slide.image.startsWith("/")
          ? `${baseUrl}${slide.image.slice(1)}`
          : slide.image,
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
      const titleShift = clamp(scrollY * 0.28, 0, 180);

      root.style.setProperty("--hero-media-shift", `${mediaShift.toFixed(2)}px`);
      root.style.setProperty("--hero-title-shift", `${titleShift.toFixed(2)}px`);
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
            style={{ backgroundImage: `url(${slide.image})` }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          />
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
