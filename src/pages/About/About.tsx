import baseUrl from "../../constants/baseUrl";
import { Dumbbell, Mountain, Route } from "lucide-react";

const dimensions = [
  {
    title: "Mental",
    text: "Building resilience and decision-making under pressure.",
  },
  {
    title: "Physical",
    text: "Developing strength, endurance, and capability.",
  },
  {
    title: "Spiritual",
    text: "Cultivating purpose, self-awareness, and inner balance.",
  },
  {
    title: "Social",
    text: "Fostering teamwork, leadership, and meaningful human connections.",
  },
];

const offers = [
  {
    icon: Dumbbell,
    title: "Adventure-led fitness training",
    heading: "Mountain Pro",
    text: "Our flagship Adventure Fitness Programme builds capable, self-reliant, and resilient individuals through progressive outdoor training. Structured across four levels, it combines fitness, technical mountain skills, leadership, and real-world adventure.",
  },
  {
    icon: Mountain,
    title: "Fully guided treks and expeditions",
    heading: "World-class services",
    text: "We deliver premium, fully guided treks and expeditions across the Indian Himalayas. From meticulous planning and logistics to experienced leadership and uncompromising safety standards, every journey is designed to feel seamless.",
  },
  {
    icon: Route,
    title: "Complete alpine logistics",
    heading: "Alpine solutions",
    text: "We provide end-to-end alpine logistics for international and Indian alpine athletes, including permits, transportation, accommodation, equipment, porter support, base camp management, customized menus, nutrition, and on-ground coordination.",
  },
];

const founders = [
  {
    name: "Lt. Col. Ishan Rawat (Retd.)",
    role: "Founder",
    image: "assets/images/founders/ishant.png",
    intro:
      "A retired Infantry officer and accomplished mountaineer, Lt. Col. Ishan Rawat brings together operational experience and high-altitude expedition leadership. He promotes disciplined outdoor education focused on resilience, functional fitness, and situational awareness.",
    instagram: "https://www.instagram.com/ishan_theleidenschaft",
    whatsapp: "https://wa.me/917819983273",
  },
  {
    name: "Major Raman Tiwadi, SM (Retd.)",
    role: "Co-Founder",
    image: "assets/images/founders/raman.jpg",
    intro:
      "Major Raman Tiwadi, SM (Retd.) is a decorated Special Forces veteran with service in the elite PARA SF and the National Security Guard. He leads survival and leadership training grounded in operational discipline and real-world experience.",
    instagram: "https://www.instagram.com/major.raman.tiwadi",
    whatsapp: "https://wa.me/919389204738",
  },
];

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M16.8 3H7.2A4.2 4.2 0 0 0 3 7.2v9.6A4.2 4.2 0 0 0 7.2 21h9.6a4.2 4.2 0 0 0 4.2-4.2V7.2A4.2 4.2 0 0 0 16.8 3Zm2.6 13.8a2.6 2.6 0 0 1-2.6 2.6H7.2a2.6 2.6 0 0 1-2.6-2.6V7.2a2.6 2.6 0 0 1 2.6-2.6h9.6a2.6 2.6 0 0 1 2.6 2.6Z"
      fill="currentColor"
    />
    <path
      d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2Zm0 8a3.2 3.2 0 1 1 3.2-3.2 3.2 3.2 0 0 1-3.2 3.2Z"
      fill="currentColor"
    />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M20.5 11.8a8.6 8.6 0 0 1-12.7 7.5L3 21l1.8-4.6A8.6 8.6 0 1 1 20.5 11.8Z"
      fill="currentColor"
    />
    <path
      d="M9.3 7.7c-.3-.6-.5-.6-.8-.6h-.7c-.2 0-.6.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.1 3.1c.2.2 2 3.2 5 4.3 2.5.9 3 .7 3.5.6.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.5.2-1.6-.1-.2-.2-.3-.5-.4l-1.7-.8c-.3-.1-.5-.1-.7.2l-.7.9c-.2.2-.4.3-.7.2-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6 0-.2 0-.4-.1-.6Z"
      fill="#0b0e11"
    />
  </svg>
);

const About = () => {
  return (
    <section className="about">
      <div className="hero">
        <div className="heroCopy">
          <span className="section-eyebrow">About Us</span>
          <h1>Born purely out of military DNA.</h1>
          <p>
            Founded by two former Army officers who transitioned from leading
            soldiers to leading people into the mountains, Alpine Ops is an
            adventure-led fitness company built on discipline, resilience, and
            purpose.
          </p>
          <p>
            We believe fitness goes beyond physical strength. Through training,
            adventure, mentorship, and a strong community, we develop
            individuals across the four dimensions of fitness.
          </p>
        </div>
        <div className="heroMedia">
          <figure className="heroMediaLead">
            <img
              src={`${baseUrl}assets/images/about/group-trek.jpg`}
              alt="Alpine Ops participants trekking together in the mountains"
            />
          </figure>
          <figure className="heroMediaClimb">
            <img
              src={`${baseUrl}assets/images/about/mountain-pro.jpg`}
              alt="Mountain Pro participant ice climbing"
            />
          </figure>
          <figure className="heroMediaTraining">
            <img
              src={`${baseUrl}assets/images/about/training-briefing.jpg`}
              alt="Alpine Ops instructor briefing a training group"
            />
          </figure>
          <figure className="heroMediaExpedition">
            <img
              src={`${baseUrl}assets/images/about/ice-climbing.jpg`}
              alt="Alpine Ops climber ascending a frozen waterfall"
            />
          </figure>
        </div>
      </div>

      <div className="values">
        <div className="valuesIntro">
          <div>
            <span className="section-eyebrow">4 Dimensions of Fitness</span>
            <h2>Adventure is a powerful tool for transformation.</h2>
          </div>
          <p>
            At Alpine Ops, adventure is not just an activity. We are
            community-driven, not commercially driven, creating a tribe of
            individuals who believe in growth, shared experiences, and becoming
            better versions of themselves through the mountains.
          </p>
        </div>
        <div className="valueGrid dimensionGrid">
          {dimensions.map((dimension) => (
            <article key={dimension.title}>
              <span className="valueEyebrow">{dimension.title}</span>
              <p>{dimension.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="missionGrid">
        <article>
          <span className="valueEyebrow">Our Vision</span>
          <h2>Build the world's most trusted adventure-led fitness ecosystem.</h2>
          <p>
            We empower people to become stronger, more resilient, and capable
            through world-class mountain experiences.
          </p>
        </article>
        <article>
          <span className="valueEyebrow">Our Mission</span>
          <h2>Deliver transformative adventure-led fitness experiences.</h2>
          <p>
            Through military-inspired discipline, expert coaching, premium
            expeditions, and uncompromising safety, we enable individuals to
            perform with confidence in the mountains and in life.
          </p>
        </article>
      </div>

      <div className="aboutMedia" aria-label="Alpine Ops in the field">
        <figure className="aboutMediaPrimary">
          <img
            src={`${baseUrl}assets/images/about/ice-cave.jpg`}
            alt="Alpine Ops participant standing beneath a frozen ice cave"
          />
        </figure>
        <figure className="aboutMediaSecondary">
          <img
            src={`${baseUrl}assets/images/about/night-camp.jpg`}
            alt="Alpine Ops camp under a star-filled night sky"
          />
        </figure>
        <figure className="aboutMediaClimb">
          <img
            src={`${baseUrl}assets/images/about/outdoor-briefing.jpg`}
            alt="Alpine Ops instructor briefing a training group outdoors"
          />
        </figure>
        <figure className="aboutMediaTrekker">
          <img
            src={`${baseUrl}assets/images/about/alpine-rest.jpg`}
            alt="Alpine Ops group resting by a high-altitude river"
          />
        </figure>
        <figure className="aboutMediaTrail">
          <img
            src={`${baseUrl}assets/images/about/trail-team.jpg`}
            alt="Alpine Ops group walking together along a mountain trail"
          />
        </figure>
      </div>

      <div className="offers">
        <div className="valuesIntro">
          <div>
            <span className="section-eyebrow">What We Offer</span>
            <h2>Training, expeditions, and alpine support.</h2>
          </div>
        </div>
        <div className="offerGrid">
          {offers.map((offer) => (
            <article key={offer.heading}>
              <div className="offerIcon" aria-hidden="true">
                <offer.icon strokeWidth={1.5} />
              </div>
              <span className="valueEyebrow">{offer.title}</span>
              <h3>{offer.heading}</h3>
              <p>{offer.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mountainProFeature">
        <div className="mountainProMedia">
          <img
            src={`${baseUrl}assets/images/about/mountain-pro.jpg`}
            alt="Mountain Pro participant ice climbing"
          />
        </div>
        <div className="mountainProCopy">
          <span className="valueEyebrow">
            Adventure-led fitness training programs
          </span>
          <h2>Mountain Pro</h2>
          <p>
            Mountain Pro is our flagship Adventure Fitness Programme, designed
            to build capable, self-reliant, and resilient individuals through
            progressive outdoor training.
          </p>
          <p>
            Structured across four levels, the programme combines fitness,
            technical mountain skills, leadership, and real-world adventure to
            transform participants from beginners into confident mountain
            operators. Every level emphasizes practical learning, teamwork, and
            decision-making in challenging environments, making adventure the
            classroom and the mountains the ultimate training ground.
          </p>
        </div>
      </div>

      <div className="founders">
        <span className="section-eyebrow">Meet Our Founders</span>
        <div className="foundersGrid">
          {founders.map((founder) => (
            <article key={founder.name}>
              <img src={`${baseUrl}${founder.image}`} alt={founder.name} />
              <div className="foundersInformation">
                <h3>{founder.name}</h3>
                <p className="founderRole">{founder.role}</p>
                <p className="founderIntro">{founder.intro}</p>
                <div className="founderSocials" aria-label="Founder social links">
                  <a
                    href={founder.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} on Instagram`}
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href={founder.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} on WhatsApp`}
                  >
                    <WhatsAppIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="contactStrip">
        <span className="section-eyebrow">Contact Us</span>
        <div>
          <a href="tel:+917819983273">+91-7819983273</a>
          <a href="mailto:alpineopsexped@gmail.com">alpineopsexped@gmail.com</a>
          <a href="https://www.thealpineops.com">www.thealpineops.com</a>
          <span>Miyanwala, Dehradun, Uttarakhand</span>
        </div>
      </div>
    </section>
  );
};

export default About;
