import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollRevealText } from "@/components/site/ScrollRevealText";

const pillars = [
  {
    num: "01",
    title: "AI-Centered",
    description:
      "In all of our work, we think about how AI can provide more efficiency and personalization. This drives how we experiment to deliver process innovation and data-driven.",
  },
  {
    num: "02",
    title: "Embedded Research",
    description:
      "We use data to strengthen hypotheses and identify risks. Our research team ensures the customer has the loudest voice in the room — using qual and quant data.",
  },
  {
    num: "03",
    title: "Systems First",
    description:
      "Process is at the core of every partnership at Ecom Gleam. We help our clients sustain new growth by providing guidance on which investments in systems and infrastructure.",
  },
  {
    num: "04",
    title: "Dedicated Speed",
    description:
      "Clients come to us when they need to adapt, shift, and scale. These critical moments are why we work quickly — utilizing early prototyping and our expertise.",
  },
];

const stats = [
  { value: 121, label: "YEARS EXPERIENCE", heightClass: "h-[130px] md:h-[150px]" },
  { value: 244, label: "CREATIVE SOLUTIONS", heightClass: "h-[190px] md:h-[220px]" },
  { value: 181, label: "CREATIVE PERSONNEL", heightClass: "h-[160px] md:h-[185px]" },
  { value: 355, label: "HAPPY CUSTOMERS", heightClass: "h-[220px] md:h-[260px]" },
];

function RunningNumber({
  value,
  delay = 0,
  start = false,
}: {
  value: number;
  delay?: number;
  start?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      let startVal = 0;
      const end = value;
      const duration = 1800;
      const startTime = performance.now();

      function update(currentTime: number) {
        if (cancelled) return;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress * (2 - progress);
        setCount(Math.floor(ease * (end - startVal) + startVal));

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [start, value, delay]);

  return <span>{count}</span>;
}

export function WhyChooseUs() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [startNumbersAnimation, setStartNumbersAnimation] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const numbersSectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress purely via native sticky scroll calculation
  // No GSAP pin: true, preventing any DOM reparenting or unmount crashes
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        if (scrollable <= 0) return;

        // Progress from 0 to 1 as container scrolls through the sticky window
        const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
        const total = pillars.length;
        let idx = Math.floor(progress * total);
        if (idx >= total) idx = total - 1;

        setActivePillarIndex(idx);

        // Trigger numbers bar growth once user engages into the section
        if (progress >= 0.65) {
          setStartNumbersAnimation(true);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Secondary observer for numbers section if viewed directly
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStartNumbersAnimation(true);
        }
      },
      { threshold: 0.25 }
    );

    if (numbersSectionRef.current) {
      observer.observe(numbersSectionRef.current);
    }

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black min-h-[220vh]"
    >
      {/* Sticky viewport frame: Pure CSS sticky positioning with zero DOM reparenting */}
      <div className="sticky top-0 min-h-screen flex items-center justify-center py-12 md:py-20 overflow-hidden">
        <div className="mx-auto max-w-[1400px] w-full px-4 sm:px-6 md:px-10 z-20">
          {/* Unified White Card */}
          <div className="bg-[oklch(0.96_0.005_200)] text-zinc-950 p-6 sm:p-10 md:p-16 lg:p-20 shadow-2xl flex flex-col justify-between gap-10 sm:gap-16 md:gap-20">
            {/* Top Half: Why Choose Us split section */}
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 sm:gap-12 lg:gap-24 items-center w-full">
              {/* Left Column (Sticky Title) */}
              <div className="flex flex-col justify-center">
                <span className="text-[0.6875rem] font-bold tracking-[0.28em] text-primary uppercase block">
                  // Why Choose Ecom Gleam
                </span>

                <div className="mt-4 sm:mt-6">
                  <ScrollRevealText
                    text="Unlocking Growth Through Precision."
                    preset="Blur Reveal"
                    htmlTag="h2"
                    colorHidden="rgba(0, 0, 0, 0.18)"
                    colorRevealed="rgba(9, 9, 11, 1)"
                    className="font-clash font-bold text-[7.5vw] leading-[1.1] lg:text-[3.2vw] tracking-normal uppercase text-zinc-950"
                    trigger="Scroll"
                    offsetStart={85}
                    offsetEnd={35}
                  />
                </div>

                <p className="mt-4 sm:mt-8 max-w-sm text-sm sm:text-base md:text-lg text-zinc-700 leading-relaxed font-sans">
                  We build scalable solutions aligned with process innovation and forward-thinking
                  technologies.
                </p>
              </div>

              <div className="border-l-2 border-primary/40 pl-4 sm:pl-8 py-3 sm:py-4 flex flex-col justify-center min-h-[180px] sm:min-h-[220px]">
                {(() => {
                  const currentPillar = pillars[activePillarIndex] ?? {
                    num: "01",
                    title: "AI-Centered",
                    description: "",
                  };

                  return (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePillarIndex}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <span className="font-mono text-xs text-primary tracking-[0.28em] block uppercase mb-3 sm:mb-4">
                          // {currentPillar.num} {currentPillar.title}
                        </span>

                        <h3 className="font-clash font-bold text-xl sm:text-2xl md:text-3xl text-zinc-950 uppercase tracking-wide">
                          {currentPillar.title}
                        </h3>

                        <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-zinc-700 leading-relaxed font-sans max-w-xl min-h-[60px] sm:min-h-[80px]">
                          {currentPillar.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  );
                })()}

                {/* Interactive Pillar Indicators */}
                <div className="flex items-center gap-2 mt-5 sm:mt-7">
                  {pillars.map((p, idx) => (
                    <button
                      key={p.num}
                      type="button"
                      onClick={() => setActivePillarIndex(idx)}
                      aria-label={`View pillar ${p.num} - ${p.title}`}
                      className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${activePillarIndex === idx
                          ? "w-8 bg-primary"
                          : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-zinc-200" />

            {/* Bottom Half: The Numbers Speak bar chart section */}
            <div ref={numbersSectionRef} className="flex flex-col w-full">
              <span className="text-[0.6875rem] font-bold tracking-[0.28em] text-primary uppercase block mb-6 sm:mb-8">
                // The Numbers Speak
              </span>

              {/* Staggered Heights Bars Layout - Base starts from bottom (items-end) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-0.5 items-end rounded-none">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`relative h-[120px] sm:${stat.heightClass} text-white flex flex-col justify-between overflow-hidden group rounded-none isolate`}
                  >
                    {/* Animating background bar growing from bottom to top */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={startNumbersAnimation ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
                      style={{ transformOrigin: "bottom" }}
                      className="absolute inset-0 bg-zinc-950 group-hover:bg-zinc-900 transition-colors duration-300 z-0"
                    />

                    {/* Content Container fading in */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={startNumbersAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                      className="h-full w-full p-6 flex flex-col justify-between relative z-10"
                    >
                      {/* Top Left Number with running count-up animation */}
                      <div className="font-clash font-bold text-4xl md:text-5xl text-primary tracking-tight">
                        <RunningNumber
                          value={stat.value}
                          delay={index * 150 + 300}
                          start={startNumbersAnimation}
                        />
                      </div>

                      {/* Bottom Right Label */}
                      <div className="text-right text-[0.6875rem] md:text-xs font-bold tracking-wider text-white/70 uppercase">
                        {stat.label}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
