import { useEffect, useRef } from "react";
import Hero from "../../components/Hero/Hero";
import HomeReviews from "../../components/HomeReviews/HomeReviews";
import baseUrl from "../../constants/baseUrl";
import reviewsData from "../../data/reviews.json";

type ReviewItem = {
  name: string;
  review: string;
};

const Home = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const reviewsRef = useRef<HTMLElement>(null);

  const reviews = reviewsData as ReviewItem[];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    let frame = 0;
    const sections = [
      { ref: aboutRef, speed: 0.07, max: 34 },
      { ref: reviewsRef, speed: 0.06, max: 28 },
    ];

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const updateParallax = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;

      sections.forEach(({ ref, speed, max }) => {
        const element = ref.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const progress =
          (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const centered = progress - 0.5;
        const shift = clamp(centered * viewportHeight * speed, -max, max);

        element.style.setProperty(
          "--section-parallax",
          `${shift.toFixed(2)}px`,
        );
      });
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

  return (
    <>
      <div>
        <Hero />
      </div>
      <section
        ref={aboutRef}
        className="aboutSection parallaxSection"
      >
        <img
          className="aboutLogo"
          src={`${baseUrl}assets/images/logo.png`}
          alt="The Alpine Ops logo"
        />
        <p>
          Alpine Operations and Expeditions commonly known as The Alpine Ops is an adventure-led fitness company
          founded by ex-military operatives, focused on building resilient
          individuals through{" "}
          <b>4D fitness—physical, mental, emotional, and social.</b> We offer
          everything from <b>guided treks and rare expedition experiences</b> to
          structured Mountain Pro progressions and mentorship-driven,
          alpine-style expeditions that emphasize{" "}
          <b>self-sufficiency and real mountaineering growth.</b> Operating from
          the Dehradun Valley, we are building a <b>strong community</b> while
          working across three core domains:{" "}
          <b>Adventure, Training, and Fitness.</b> We prioritize safety,
          personalized coaching, and immersive experiences that foster lifelong
          adventure skills—join our thriving community for expeditions that push
          limits and create legends.
        </p>
      </section>
      <HomeReviews
        sectionRef={reviewsRef}
        className="parallaxSection"
        reviews={reviews}
      />
    </>
  );
};

export default Home;
