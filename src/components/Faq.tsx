"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { siteName } from "@/lib/config";
import { MagneticButton } from "./MagneticButton";

const FAQS = [
  {
    q: "How do I get paid?",
    a: "Payouts go to mobile money (MTN and Airtel) on the number you register with. Minimum withdrawal is UGX 18,000.",
  },
  {
    q: "How much can I earn in a day?",
    a: "It scales with how active you stay. Chat sessions, clips, and trivia all add up in Ugandan shillings.",
  },
  {
    q: "Is there a joining fee?",
    a: "Yes. A one-time activation fee so your account can go live. After that, you keep earning without recurring platform charges.",
  },
  {
    q: "Do I need special skills?",
    a: "No. If you can chat, tap play, and answer simple questions, you're ready.",
  },
  {
    q: "Which mobile money networks work?",
    a: "MTN MoMo and Airtel Money are supported for withdrawals in Uganda. Use the same number you register with.",
  },
  {
    q: "How fast are withdrawals?",
    a: "Most mobile money payouts land within 24 hours after you request a withdrawal that meets the minimum.",
  },
  {
    q: "Can I earn from outside Uganda?",
    a: "Yes. ClassicGain works in many countries. Local payout options depend on your registration country.",
  },
  {
    q: "Is my phone number shared publicly?",
    a: "Your number is used for account access and payouts. Keep it accurate so withdrawals reach you without delays.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section faq" id="faq">
      <div className="section-inner faq-grid">
        <div className="faq-intro section-intro">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">
            Straight answers. <em>No maze.</em>
          </h2>
          <p className="section-lead">
            Skim the essentials, then start when it feels right.
          </p>
          <div className="section-actions">
            <MagneticButton>Join {siteName}</MagneticButton>
          </div>
        </div>

        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden>
                    {isOpen ? (
                      <Minus className="ui-icon" strokeWidth={2} />
                    ) : (
                      <Plus className="ui-icon" strokeWidth={2} />
                    )}
                  </span>
                </button>
                <div className="faq-panel">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
