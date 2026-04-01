import baseUrl from "../../constants/baseUrl";

const About = () => {
  return (
    <section className="about">
      <div className="hero">
        <div className="heroCopy">
          <h1>About Alpine Ops</h1>
          <p>
            Alpine Ops is an adventure-led fitness company rooted in the
            mountains and shaped by military experience.
          </p>
          <p>
            We believe humans were never meant to live soft, disconnected lives.
            We were built to move, adapt, struggle, and grow—physically,
            mentally, and spiritually. The mountains remind us of that truth.
          </p>
          <p>
            At Alpine Ops, we design treks, expeditions, and training programs
            that go far beyond recreation. Every experience is intentional—meant
            to challenge the body, sharpen the mind, and build character under
            real conditions.
          </p>
          {/* <div className="heroStats">
            <div>
              <span>12+</span>
              <p>Years expedition leadership</p>
            </div>
            <div>
              <span>40+</span>
              <p>Program iterations delivered</p>
            </div>
            <div>
              <span>8</span>
              <p>Training terrains across India</p>
            </div>
          </div> */}
        </div>
      </div>

      <div className="values">
        <div className="valuesIntro">
          <div>
            <span className="section-eyebrow">Why We Exist</span>
            <h2>Built in the mountains. Carried back into real life.</h2>
          </div>
        </div>
        <div className="valueGrid">
          <article className="valueFeature">
            <span className="valueEyebrow">Our Philosophy</span>
            <h3>The 4-Dimensional approach to fitness</h3>
            <p>
              Alpine Ops develops the whole person through a framework that
              integrates physical capability with mental resilience, social
              strength, and spiritual grounding.
            </p>
            <div className="dimensionList" aria-label="4-dimensional fitness">
              <span>Physical</span>
              <span>Mental</span>
              <span>Social</span>
              <span>Spiritual</span>
            </div>
            <p>
              The mountains do more than test endurance. They expose fear,
              decision-making, teamwork, patience, and self-belief. Nature
              becomes the classroom, and discomfort becomes the teacher.
            </p>
          </article>

          <article className="valueMentorship">
            <span className="valueEyebrow">Mentorship</span>
            <h3>Guided progression with real-world transfer</h3>
            <p>
              At the core of Alpine Ops lies mentorship. Every progression,
              expedition, and challenge is guided with intent so the lessons do
              not stay on the trail.
            </p>
            <div className="skillsGrid">
              <div>
                <h4>Hard Skills</h4>
                <ul>
                  <li>Planning and navigation</li>
                  <li>Risk assessment</li>
                  <li>Resource management</li>
                  <li>Self-sufficiency</li>
                </ul>
              </div>
              <div>
                <h4>Soft Skills</h4>
                <ul>
                  <li>Leadership under pressure</li>
                  <li>Communication and teamwork</li>
                  <li>Adaptability</li>
                  <li>Emotional control</li>
                </ul>
              </div>
            </div>
            <p>
              In alpine environments, consequences are immediate and
              accountability is non-negotiable. That is what makes the training
              transferable far beyond the mountains.
            </p>
          </article>

          <article>
            <span className="valueEyebrow">Our DNA</span>
            <h3>Shaped by military clarity and high-altitude experience</h3>
            <p>
              Our approach is shaped by years of military service in
              high-altitude and operational environments, where discipline,
              preparation, resilience, and situational awareness are critical
              for survival and success.
            </p>
            <p>
              This isn’t tourism. This is preparation for the mountains and for
              life.
            </p>
          </article>

          <article>
            <span className="valueEyebrow">Our Community</span>
            <h3>A tribe built through shared struggle</h3>
            <p>
              We’re not building customers. We’re building a community that
              trains together, struggles together, and evolves together.
            </p>
            <p>
              Mentorship flows both ways, experience is shared, and growth is
              collective. The goal is not only to complete an expedition, but to
              become the kind of person capable of it.
            </p>
          </article>
        </div>
      </div>

      {/* <div className="story">
        <div className="storyMedia">
          <img src={`${baseUrl}assets/images/main6.jpg`} alt="Field training" />
        </div>
        <div className="storyCopy">
          <h2>What Our Training Looks Like</h2>
          <p>
            Every engagement is built around terrain immersion, tight feedback
            loops, and measured progression. We use realistic constraints,
            adaptive scenarios, and a coaching cadence that aligns teams fast.
          </p>
          <ul>
            <li>Pre-mission planning and threat assessment.</li>
            <li>Live drills, night movement, and tactical navigation.</li>
            <li>After-action reviews with actionable next steps.</li>
          </ul>
        </div>
      </div> */}

      <div className="founders">
        <span className="section-eyebrow">Founders</span>
        <div className="foundersGrid">
          <article>
            <img
              src={`${baseUrl}assets/images/founders/ishant.png`}
              alt="Founder profile"
            />
            <div className="foundersInformation">
              <h3>Lt Col Ishan Rawat (Retd.)</h3>
              <p className="founderRole">Founder</p>
              <p className="founderIntro">
                A retired Infantry officer and accomplished mountaineer, Lt Col
                Ishan Rawat brings together extensive operational experience and
                high-altitude expedition leadership. As Founder of Alpine Ops,
                he promotes disciplined outdoor education focused on resilience,
                functional fitness, and situational awareness—preparing
                individuals for both the mountains and life beyond.
              </p>
              <div className="founderSocials" aria-label="Founder social links">
                <a
                  href="https://www.instagram.com/ishan_theleidenschaft"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
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
                </a>
                <a
                  href="https://wa.me/917819983273"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
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
                </a>
              </div>
            </div>
          </article>
          <article>
            <img
              src={`${baseUrl}assets/images/founders/raman.jpg`}
              alt="Founder profile"
            />
            <div className="foundersInformation">
              <h3>Major Raman Tiwadi (Retd.) SM</h3>
              <p className="founderRole">Co-Founder</p>
              <p className="founderIntro">
                Major Raman Tiwadi (Retd.), SM is a highly decorated Special
                Forces veteran with service in the elite PARA SF and the
                National Security Guard (NSG). As Co-Founder of The Alpine Ops,
                he leads survival and leadership training grounded in
                operational discipline and real-world experience.
              </p>
              <div className="founderSocials" aria-label="Founder social links">
                <a
                  href="https://www.instagram.com/major.raman.tiwadi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
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
                </a>
                <a
                  href="https://wa.me/919389204738"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
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
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;
