import { useState } from "react";

const CONTACT_EMAIL = "alpineopsexped@gmail.com";
const HEADQUARTERS_ADDRESS = `Alpine Operations and expeditions 
5, Peepal chowk
Miyanwala 
Dehradun 
248005 IN`;
const HEADQUARTERS_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(HEADQUARTERS_ADDRESS)}`;

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Inquiry from ${name || "Website visitor"}`;
    const body = [
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Mobile Number: ${mobile || "-"}`,
      `Training/Trek/Expedition of Interest: ${interest || "-"}`,
      "",
      message || "No message provided.",
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  return (
    <section className="contact">
      <div className="intro">
        <h1>Reach out to headquarters</h1>
        <div className="details">
          <div>
            <span>Direct line</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          <div>
            <span>Response time</span>
            <p>Typically within 24-48 hours.</p>
          </div>
          <div>
            <span>Headquarters</span>
            <p>{HEADQUARTERS_ADDRESS}</p>
            <a href={HEADQUARTERS_MAP_URL} target="_blank" rel="noreferrer">
              View on Google Maps
            </a>
          </div>
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="fieldRow">
          <label>
            Name
            <input
              name="name"
              placeholder="Your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
        </div>
        <label>
          Mobile Number
          <input
            type="tel"
            name="mobile"
            placeholder="Your mobile number"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
        </label>
        <label>
          Training/Trek/Expedition of Interest
          <input
            name="interest"
            placeholder="Program you're interested in"
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            placeholder="Share any comments or message"
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />
        </label>
        <button type="submit">Send via email</button>
        {/* <p className="note">
          Clicking send will open your email client with the details prefilled.
        </p> */}
      </form>
    </section>
  );
};

export default Contact;
