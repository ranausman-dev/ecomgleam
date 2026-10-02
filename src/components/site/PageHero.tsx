import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
}

export function PageHero({ eyebrow, title, intro, image }: PageHeroProps) {
  // Light, bright, sunlit daylight architectural & studio photography
  const resolveBannerImage = () => {
    if (image) return image;
    const t = `${title} ${eyebrow}`.toLowerCase();
    if (t.includes("work") || t.includes("case")) {
      return "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85";
    }
    if (t.includes("collab") || t.includes("partner")) {
      return "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85";
    }
    if (t.includes("research") || t.includes("intelligence")) {
      return "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85";
    }
    if (t.includes("strategy") || t.includes("narrative")) {
      return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85";
    }
    if (t.includes("commerce") || t.includes("marketplace")) {
      return "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=85";
    }
    if (t.includes("creative") || t.includes("performance")) {
      return "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=2000&q=85";
    }
    if (t.includes("protect") || t.includes("control")) {
      return "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=85";
    }
    if (t.includes("expansion") || t.includes("international")) {
      return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85";
    }
    if (t.includes("distribution") || t.includes("omnichannel")) {
      return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85";
    }
    if (t.includes("industr")) {
      return "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=85";
    }
    if (t.includes("insight")) {
      return "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=85";
    }
    if (t.includes("capabilit") || t.includes("service")) {
      return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85";
    }
    return "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85";
  };

  const bannerImg = resolveBannerImage();

  return (
    <section className="relative w-full pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-32 md:pb-14 bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        {/* Rounded Hero Card Banner matching Contact and About Us */}
        <div className="relative w-full min-h-[480px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[620px] rounded-2xl md:rounded-[32px] overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-14">
          {/* Background Image Layer: Bright, Light, Clearly Visible */}
          <div className="absolute inset-0 z-0">
            <img
              src={bannerImg}
              alt={title}
              className="h-full w-full object-cover object-center scale-[1.01] transform transition-transform duration-1000"
            />
            {/* Minimal subtle scrim matching Contact and About Us: keeps natural daylight warmth and view */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/15 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* TOP ROW: Pill Eyebrow on Left, Direct Action Button on Right */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-primary text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>// {eyebrow}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 sm:gap-3 px-5 py-2 sm:px-7 sm:py-2.5 rounded-full bg-white text-black font-clash font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/90 hover:scale-105 active:scale-95 shadow-xl"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* BOTTOM ROW: Giant Display Headline & Intro Paragraph */}
          <div className="relative z-10 max-w-4xl mt-16 sm:mt-24 md:mt-28">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow block text-primary font-mono text-xs sm:text-sm tracking-[0.28em] uppercase mb-3"
            >
              {eyebrow}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] uppercase text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
            >
              {title}
            </motion.h1>
            {intro && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-5 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-sans max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
              >
                {intro}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

