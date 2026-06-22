"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AccordionItem } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I set up my eSIM?",
    answer:
      "It's incredibly simple. Download our app, choose your plan, and scan the QR code we provide. Your eSIM activates instantly — no store visit, no physical SIM card, no waiting. The entire process takes under 2 minutes.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We currently have excellent coverage in Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret with 90-98% coverage. We're rapidly expanding to more cities and towns. Check our coverage map for real-time updates.",
  },
  {
    question: "How does billing work?",
    answer:
      "Simple monthly subscription. No hidden fees, no surprise charges, no sneaky add-ons. You pay what you see, and your data never expires. Pay via M-Pesa, card, or bank transfer.",
  },
  {
    question: "Is the unlimited data actually unlimited?",
    answer:
      "Yes. When we say unlimited, we mean it. No fair usage caps, no throttling after a certain amount, no speed reductions. Use as much as you want, whenever you want.",
  },
  {
    question: "Which devices support eSIM?",
    answer:
      "Most modern smartphones support eSIM including iPhone XS and newer, Samsung Galaxy S20 and newer, Google Pixel 3 and newer, and many more. Check our compatibility page for the full list.",
  },
  {
    question: "Can I keep my current number?",
    answer:
      "Absolutely. We support number portability. You can transfer your existing number to nocap without any downtime. The process is handled digitally and completes within 24 hours.",
  },
  {
    question: "What happens if I want to cancel?",
    answer:
      "Cancel anytime with zero penalties. No contracts, no early termination fees. Just go to settings in the app and cancel with one tap. We believe if we're good enough, you'll stay — we don't need to trap you.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-[#09090B]">
      <div ref={ref} className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            FAQ
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Got Questions?
          </motion.h2>
          <motion.p
            className="text-white/50 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            We believe in transparency. Here&apos;s everything you need to know.
          </motion.p>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8"
        >
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} trigger={faq.question}>
              {faq.answer}
            </AccordionItem>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
