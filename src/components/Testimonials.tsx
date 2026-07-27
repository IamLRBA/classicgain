"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    name: "Sarah Mukasa",
    location: "Kampala, Uganda",
    quote:
      "I watch short clips after work anyway. Now those minutes add up and I cash out to MTN without stress.",
    photo: "/images/testimonials/sarah-mukasa.svg",
  },
  {
    name: "James Okello",
    location: "Entebbe, Uganda",
    quote:
      "Trivia on the bus and chats at night. My first withdrawal convinced me this was worth sticking with.",
    photo: "/images/testimonials/james-okello.svg",
  },
  {
    name: "Amara Namukasa",
    location: "Jinja, Uganda",
    quote:
      "I keep music playing while I cook. Small tasks, steady balance, and payouts land on Airtel Money.",
    photo: "/images/testimonials/amara-namukasa.svg",
  },
  {
    name: "David Ocen",
    location: "Mbarara, Uganda",
    quote:
      "I was unsure at first. After a clean cashout I started treating it like a real side hustle.",
    photo: "/images/testimonials/david-ocen.svg",
  },
  {
    name: "Priya Ssentamu",
    location: "Gulu, Uganda",
    quote:
      "Surveys and trivia fit between classes. Flexible, clear, and the support team actually replies.",
    photo: "/images/testimonials/priya-ssentamu.svg",
  },
  {
    name: "Brian Ssekandi",
    location: "Wakiso, Uganda",
    quote:
      "Chat sessions pay the best for me. I log in when I have an hour free and watch the balance climb.",
    photo: "/images/testimonials/brian-ssekandi.svg",
  },
];

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) return;

    const id = window.setInterval(() => {
      const card = track.querySelector<HTMLElement>(".testimonial-card");
      const step = card ? card.offsetWidth + 16 : 300;
      const max = track.scrollWidth - track.clientWidth;
      const next = track.scrollLeft + step;
      track.scrollTo({
        left: next >= max - 8 ? 0 : next,
        behavior: "smooth",
      });
    }, 4200);

    return () => window.clearInterval(id);
  }, [paused]);

  function scrollByCard(dir: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".testimonial-card");
    const step = card ? card.offsetWidth + 16 : 300;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section className="section testimonials" id="stories">
      <div className="section-inner">
        <div className="testimonials-head">
          <div className="section-intro">
            <p className="eyebrow">Success stories</p>
            <h2 className="section-title">
              Voices from <em>Uganda</em>
            </h2>
            <p className="section-lead">
              Side hustle stories from Kampala to Gulu.
            </p>
          </div>

          <div className="testimonials-controls" role="group" aria-label="Testimonials controls">
            <button
              type="button"
              className="testimonials-nav"
              aria-label="Previous testimonial"
              onClick={() => scrollByCard(-1)}
            >
              <ChevronLeft className="ui-icon" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="testimonials-nav"
              aria-label="Next testimonial"
              onClick={() => scrollByCard(1)}
            >
              <ChevronRight className="ui-icon" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="testimonials-viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <ul ref={trackRef} className="testimonials-track">
          {TESTIMONIALS.map((item) => (
            <li key={item.photo} className="testimonial-card">
              <div className="testimonial-top">
                <img
                  className="testimonial-photo"
                  src={item.photo}
                  alt={item.name}
                  width={64}
                  height={64}
                />
                <div>
                  <p className="testimonial-name">{item.name}</p>
                  <p className="testimonial-location">{item.location}</p>
                </div>
              </div>
              <p className="testimonial-quote">{item.quote}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
