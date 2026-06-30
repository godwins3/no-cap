"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Grace Wanjiku",
    role: "Content Creator",
    avatar: "GW",
    text: "I used to spend KES 5,000/month on data that would expire before I could use it. Now I pay once and never worry about it again. My streams never buffer anymore.",
    rating: 5,
  },
  {
    name: "Kevin Ochieng",
    role: "University Student",
    avatar: "KO",
    text: "As a student, every shilling counts. The fact that my data doesn't expire means I can budget properly. No more Okoa Jahazi debt traps at 3am.",
    rating: 5,
  },
  {
    name: "Diana Nyambura",
    role: "Freelance Designer",
    avatar: "DN",
    text: "Working from home needs reliable internet. Traditional telcos throttled me after 'fair usage'. nocap gives me actual unlimited data. Game changer for remote work.",
    rating: 5,
  },
  {
    name: "Allan Kiprop",
    role: "Mobile Gamer",
    avatar: "AK",
    text: "Low ping, no throttling, no expiry. My PUBG sessions are uninterrupted now. My squad switched too after seeing the difference in my gameplay.",
    rating: 5,
  },
  {
    name: "Faith Achieng",
    role: "Digital Marketer",
    avatar: "FA",
    text: "The eSIM setup took literally 2 minutes. No going to a store, no waiting. Just scan and go. This is how telecom should always have been.",
    rating: 5,
  },
  {
    name: "Brian Mwangi",
    role: "Software Developer",
    avatar: "BM",
    text: "Finally a Kenyan company that understands digital-native users. The app is clean, the pricing is transparent, and the service actually works.",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 3;
  const maxIndex = testimonials.length - visibleCount;

  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090B] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F97316]/3 blur-[150px] rounded-full" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.span
              className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              Testimonials
            </motion.span>
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Real People.{" "}
              <span className="text-white/40">Real Stories.</span>
            </motion.h2>
          </div>

          {/* Navigation */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 sm:gap-6"
            animate={{ x: `-${currentIndex * (100 / visibleCount + 2)}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
              >
                <div className="h-full bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-colors">
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-[#F97316]/20 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316]/20 to-[#000000]/20 flex items-center justify-center text-sm font-bold text-white">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{testimonial.name}</p>
                      <p className="text-white/30 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile dots */}
        <div className="flex sm:hidden justify-center gap-2 mt-6">
          {Array.from({ length: testimonials.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(Math.min(i, maxIndex))}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-[#F97316] w-6" : "bg-white/20"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
