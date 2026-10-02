import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { ScrollRevealText } from "@/components/site/ScrollRevealText";
import type { Capability } from "@/data/capabilities";

export function CapabilityDetail({ cap }: { cap: Capability }) {
  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <span className="display text-[7rem] leading-none text-primary/25">{cap.num}</span>
            <h2 className="mt-2 max-w-[14ch] text-2xl font-semibold leading-tight md:text-3xl">
              {cap.title}
            </h2>
          </Reveal>
          <div>
            {cap.intro && (
              <Reveal>
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {cap.intro}
                </p>
              </Reveal>
            )}
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {cap.items.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 0.03} y={16}>
                  <span className="flex gap-3 border-b border-border/70 py-3 text-sm text-foreground/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </span>
                </Reveal>
              ))}
            </ul>
            {cap.note && (
              <Reveal>
                <p className="panel mt-8 p-5 text-sm leading-relaxed text-muted-foreground">
                  {cap.note}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DiagnosticCta({
  title = "Start With Intelligence",
  body = "We begin every engagement with an evidence base: market research, competitive digital shelf benchmarking, channel economics, and the brand problem.",
  image = "/assets/images/contact-official.jpg",
}: {
  title?: string;
  body?: string;
  image?: string;
}) {
  return (
    <section className="relative w-full py-16 sm:py-20 md:py-28 border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
        
        {/* Split-Screen Console: Structured Information on Left, Light Daylight Photo on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT: Structured Steps & Direction */}
          <div className="flex flex-col justify-between border border-border bg-card p-6 sm:p-10 md:p-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>// Next Step • Executive Engagement</span>
              </div>

              <h2 className="font-clash font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground uppercase tracking-tight leading-[0.95]">
                {title}
              </h2>

              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans max-w-xl">
                {body}
              </p>

              {/* 3 Step Directional Framework */}
              <div className="mt-8 space-y-3.5 border-t border-border/80 pt-6">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 border border-primary/30 bg-primary/5">
                    01
                  </span>
                  <div>
                    <h3 className="text-xs font-clash uppercase font-bold text-foreground tracking-wider">
                      Submit Your Brand Context
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans mt-0.5">
                      Share your current marketplace URLs, channel challenges, or target expansion regions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 border border-primary/30 bg-primary/5">
                    02
                  </span>
                  <div>
                    <h3 className="text-xs font-clash uppercase font-bold text-foreground tracking-wider">
                      We Conduct An Evidence Audit
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans mt-0.5">
                      Our intelligence desk audits your Buy Box health, ad waste, and unit economics under NDA.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 border border-primary/30 bg-primary/5">
                    03
                  </span>
                  <div>
                    <h3 className="text-xs font-clash uppercase font-bold text-foreground tracking-wider">
                      Strategic Diagnostic Walkthrough
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans mt-0.5">
                      Review findings on a 30-minute private call directly with our principal directors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-between gap-4 px-7 py-4 bg-primary text-zinc-950 font-clash font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg hover:translate-x-1"
              >
                <span>Request A Brand Diagnostic</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </Link>

              <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" /> &lt; 24h Turnaround
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Mutual NDA
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Dedicated Light Photographic Frame with Floating Context */}
          <div className="relative border border-border bg-card overflow-hidden min-h-[360px] sm:min-h-[420px] lg:min-h-full flex flex-col justify-between p-6 sm:p-8 group">
            {/* The Light Daylight Image */}
            <img
              src={image}
              alt="Ecom Gleam Daylight Headquarters"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Very light natural scrim ensuring photo remains bright, sunny, and distinct */}
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

            {/* Top Badge: Office Status */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-zinc-950 font-mono text-[10px] font-bold tracking-wider uppercase shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Headquarters Active • Lahore</span>
              </div>

              <span className="font-mono text-[10px] text-white/90 bg-black/50 backdrop-blur-sm px-2.5 py-1 border border-white/20 uppercase tracking-widest">
                USA • UK • UAE
              </span>
            </div>

            {/* Bottom Floating Info Card */}
            <div className="relative z-10 bg-black/75 backdrop-blur-md border border-white/15 p-5 mt-auto text-white">
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest block font-bold mb-1">
                // Direct Executive Access
              </span>
              <p className="font-clash font-bold text-base uppercase text-white tracking-wide">
                No Sales Gatekeepers. Direct Senior Operators.
              </p>
              <p className="mt-1 text-xs text-zinc-300 font-sans leading-relaxed">
                Connect directly with the engineers, researchers, and media buyers who will build your brand system.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
