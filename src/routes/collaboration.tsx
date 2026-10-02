import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Users2,
  Workflow,
  Sparkles,
  BarChart3,
  Clock,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Boxes,
  Truck,
  Building2,
  Database,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { DiagnosticCta } from "@/components/site/CapabilityDetail";
import { meta } from "@/components/site/CapabilityGroupPage";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/collaboration")({
  head: () =>
    meta(
      "Collaboration & Partnership Models — Ecom Gleam",
      "How Ecom Gleam operates: embedded pods, transparent sprints, and our unified digital-to-physical distribution ecosystem.",
    ),
  component: CollaborationPage,
});

const engagementModels = [
  {
    num: "01",
    title: "Embedded Growth Pod",
    subtitle: "Full-Stack Brand & Commerce Operations",
    badge: "MOST POPULAR",
    duration: "Annual / Retained Partnership",
    description:
      "A dedicated, cross-functional pod of senior growth leads, marketplace engineers, creative directors, and data analysts embedded directly into your Slack and daily operations.",
    features: [
      "Dedicated Senior Growth Director & Marketplace Operator",
      "Daily asynchronous communication + weekly strategic sprints",
      "Full performance creative engine (UGC, 3D, motion, copywriting)",
      "Channel governance & Buy Box protection monitoring",
      "Live custom Looker / BI data dashboards",
    ],
    idealFor: "Brands scaling between $5M and $100M looking for end-to-end commercial execution without hiring an 8-person in-house team.",
  },
  {
    num: "02",
    title: "Strategic Advisory Sprint",
    subtitle: "Intelligence, Positioning & Architecture",
    badge: "ACCELERATOR",
    duration: "6 to 8 Weeks",
    description:
      "A rigorous, high-impact diagnostic sprint that uncovers channel leakage, identifies untapped market share, audits unit economics, and crafts an actionable 18-month execution blueprint.",
    features: [
      "Deep category demand, search-intent, and consumer review mining",
      "Competitive digital shelf and pricing architecture benchmarking",
      "Financial modeling, contribution margin analysis, and ad waste audit",
      "Executive synthesis presentation + actionable implementation roadmap",
    ],
    idealFor: "Founders and PE/VC investors seeking objective institutional diligence prior to capital allocation or international expansion.",
  },
  {
    num: "03",
    title: "International Market Entry",
    subtitle: "USA, UK, & GCC Commercial Expansion",
    badge: "EXPANSION",
    duration: "Milestone-Based Rollout",
    description:
      "Turnkey expansion of proven domestic engines into new high-growth geographic territories, handling regulatory compliance, cross-border VAT, localized media, and in-region logistics.",
    features: [
      "Territory-specific market feasibility and demand scoring",
      "Customs, import compliance, and foreign tax coordination",
      "Local marketplace setup (Amazon.co.uk, Amazon.ae, Noon)",
      "In-region fulfillment, 3PL warehousing, and localized customer support",
    ],
    idealFor: "US brands entering the UK/EU/GCC, or international brands establishing a dominant direct footprint in the United States.",
  },
  {
    num: "04",
    title: "Omnichannel Distribution",
    subtitle: "Digital Demand Meets Physical Retail",
    badge: "HYBRID ECOSYSTEM",
    duration: "Integrated Multi-Year Pipeline",
    description:
      "In partnership with Patriotic Distributors, we bridge digital performance with physical retail-chain placement, wholesale accounts, 3PL warehousing, and nationwide distribution.",
    features: [
      "Access to 2,400+ brick-and-mortar retail doors and distributors",
      "Warehousing and fulfillment across CA, TX, and NJ hubs",
      "EDI order processing and B2B wholesale portal management",
      "Synchronized digital advertising timed to retail floor placement",
    ],
    idealFor: "High-volume brands transitioning from purely digital marketplaces to omni-present national retail distribution.",
  },
];

const operatingRhythms = [
  {
    phase: "PHASE 01",
    title: "Immersion & Audit",
    timeframe: "Weeks 1–2",
    summary: "Complete data ingestion, catalog auditing, margin modeling, and stakeholder alignment.",
    deliverables: ["Diagnostic Findings", "TAM / SAM Mapping", "Quick-Win Fixes"],
  },
  {
    phase: "PHASE 02",
    title: "Architecture & Systems",
    timeframe: "Weeks 3–4",
    summary: "Establish custom analytics, build positioning playbooks, normalize catalogs, and launch Buy Box defense.",
    deliverables: ["Brand Playbook", "Catalog Cleanliness Scorecard", "Ad Account Restructure"],
  },
  {
    phase: "PHASE 03",
    title: "Creative & Engineering Deployment",
    timeframe: "Weeks 5–8",
    summary: "Launch new high-converting storefront experiences, modular ad creative, and programmatic retail media.",
    deliverables: ["A+ Content & Storefront", "150+ Modular Creative Assets", "Live BI Dashboard"],
  },
  {
    phase: "PHASE 04",
    title: "Velocity & Territory Expansion",
    timeframe: "Months 3+",
    summary: "Scale ad budgets against rigid contribution margins, introduce new territories, and coordinate retail supply.",
    deliverables: ["Weekly Sprint Cadence", "New Channel Launches", "Monthly Executive Review"],
  },
];

const collaborationPrinciples = [
  {
    icon: <Database className="w-5 h-5 text-primary" />,
    title: "Zero Black-Box Reporting",
    desc: "You retain 100% administrative ownership of all accounts, ad platforms, and custom code. Real-time data dashboards give total transparency into every dollar spent and earned.",
  },
  {
    icon: <Clock className="w-5 h-5 text-primary" />,
    title: "Weekly Sprints, Rapid Turnaround",
    desc: "No multi-month delays. We operate on agile 1-week and 2-week sprint cycles with shared project boards, transparent deliverables, and asynchronous Slack channels.",
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-primary" />,
    title: "Incentives Aligned to Contribution Margin",
    desc: "We don't optimize for vanity impressions or fake ROAS screenshots. We measure net profit, working capital velocity, and enterprise brand equity.",
  },
  {
    icon: <Building2 className="w-5 h-5 text-primary" />,
    title: "The Physical-Digital Flywheel",
    desc: "Unlike traditional agencies that only operate online, our leadership connection with Patriotic Distributors gives our clients a tangible physical distribution advantage in the US.",
  },
];

function CollaborationPage() {
  const [activeModel, setActiveModel] = useState<number>(0);

  return (
    <>
      <PageHero
        eyebrow="Partnership & Engagement Models"
        title="How We Collaborate."
        intro="An accountable operating partnership, not an external vendor ticket queue. We embed senior strategic operators directly with leadership to build, protect, and scale iconic brand engines."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
      />

      {/* Collaboration Principles Row */}
      <section className="border-b border-border bg-background py-16">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collaborationPrinciples.map((cp, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="border border-border/80 bg-card p-6 h-full flex flex-col justify-between hover:border-primary/60 transition-colors">
                  <div>
                    <div className="w-10 h-10 border border-primary/30 flex items-center justify-center bg-primary/5 mb-4">
                      {cp.icon}
                    </div>
                    <h3 className="font-clash font-bold text-lg text-foreground uppercase tracking-wide">
                      {cp.title}
                    </h3>
                    <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed font-sans">
                      {cp.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models Section */}
      <section className="py-20 md:py-28 bg-[var(--ink)] border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-mono text-xs tracking-[0.28em] text-primary uppercase block">
                  // Engagement Models
                </span>
                <h2 className="display mt-3 text-[clamp(2.2rem,4.5vw,4.5rem)] leading-none">
                  Structured For Your Growth Stage
                </h2>
              </div>
              <p className="text-sm md:text-base text-muted-foreground max-w-md font-sans">
                Choose between focused diagnostic acceleration, embedded full-funnel operations, or nationwide physical distribution.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {engagementModels.map((model, idx) => (
              <Reveal key={model.num} delay={idx * 0.08}>
                <div className="relative flex flex-col justify-between border border-border bg-card p-8 md:p-10 h-full hover:border-primary/80 transition-all group">
                  <div>
                    <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-4 mb-6">
                      <span className="font-mono text-xs text-primary font-bold tracking-widest">
                        // {model.num}
                      </span>
                      <span className="bg-primary/10 text-primary border border-primary/30 font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5">
                        {model.badge}
                      </span>
                    </div>

                    <h3 className="font-clash font-bold text-2xl md:text-3xl text-foreground uppercase tracking-wide">
                      {model.title}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-wider text-primary/90 mt-1">
                      {model.subtitle}
                    </p>

                    <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                      {model.description}
                    </p>

                    <div className="my-6 py-3 px-4 bg-zinc-950/50 border-l-2 border-primary">
                      <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block">
                        Typical Engagement: <strong className="text-white">{model.duration}</strong>
                      </span>
                    </div>

                    <div className="space-y-2.5 mt-6">
                      <span className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-bold block mb-3">
                        Included Capabilities:
                      </span>
                      {model.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground font-sans max-w-sm italic">
                      <strong className="text-zinc-300 not-italic">Ideal for:</strong> {model.idealFor}
                    </p>
                    <Button asChild className="rounded-none bg-primary text-zinc-950 hover:bg-primary/90 font-clash font-bold uppercase tracking-wider text-xs shrink-0">
                      <Link to="/contact">Discuss Model</Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Cadence & Roadmap */}
      <section className="py-20 md:py-28 bg-background border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.28em] text-primary uppercase block">
              // The Execution Roadmap
            </span>
            <h2 className="display mt-3 text-[clamp(2.2rem,4.5vw,4.5rem)] leading-none">
              How The Partnership Progresses
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl">
              From day one of onboarding, we establish immediate traction with clear milestones, zero downtime, and accountable deliverables.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {operatingRhythms.map((rhythm, rIdx) => (
              <Reveal key={rhythm.phase} delay={rIdx * 0.06}>
                <div className="border border-border bg-card p-6 flex flex-col justify-between h-full relative group hover:border-primary transition-colors">
                  <div className="absolute top-0 right-0 w-8 h-8 border-b border-l border-border group-hover:border-primary/50 transition-colors flex items-center justify-center font-mono text-[10px] text-muted-foreground">
                    0{rIdx + 1}
                  </div>

                  <div>
                    <span className="font-mono text-xs text-primary font-bold tracking-widest block mb-2">
                      {rhythm.phase}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block mb-3">
                      ⏱ {rhythm.timeframe}
                    </span>
                    <h3 className="font-clash font-bold text-xl text-foreground uppercase tracking-wide">
                      {rhythm.title}
                    </h3>
                    <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed font-sans">
                      {rhythm.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/60">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-2 font-bold">
                      Key Outputs:
                    </span>
                    <ul className="space-y-1">
                      {rhythm.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="text-xs text-zinc-300 font-mono flex items-center gap-1.5">
                          <span className="text-primary font-bold">›</span> {del}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Synergy Section: Ecom Gleam & Patriotic Distributors */}
      <section className="py-20 md:py-28 bg-[var(--ink)] border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="font-mono text-xs tracking-[0.28em] text-primary uppercase block">
                // Unique Market Advantage
              </span>
              <h2 className="display mt-4 text-[clamp(2.2rem,4.2vw,4.5rem)] leading-tight">
                Two Connected Forces. One Shared Direction.
              </h2>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed font-sans">
                Most agencies understand digital search but have never placed a pallet in a national retail warehouse. Most traditional distributors understand trucking and wholesale but have never optimized an Amazon Buy Box algorithm.
              </p>
              <p className="mt-4 text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
                Ecom Gleam and Patriotic Distributors solve this fragmentation. By synchronizing digital customer acquisition with wholesale, retail door placements, and national 3PL infrastructure, our partners achieve true omnichannel scale.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild className="rounded-none bg-primary text-zinc-950 hover:bg-primary/90 font-clash font-bold uppercase tracking-wider text-xs">
                  <Link to="/contact">Request Partnership Call</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-none border-border hover:border-primary text-foreground font-clash font-bold uppercase tracking-wider text-xs">
                  <Link to="/about">About Leadership & Structure</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="border border-border bg-zinc-950/80 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <h3 className="font-mono text-xs tracking-widest text-primary uppercase mb-6">
                  // The Unified Model
                </h3>

                <div className="space-y-6">
                  <div className="border-l-2 border-primary pl-5">
                    <span className="font-clash font-bold text-lg text-white uppercase block">
                      Ecom Gleam
                    </span>
                    <span className="font-mono text-xs text-primary/80 uppercase block mt-0.5">
                      The Digital Intelligence & Brand Acceleration Engine
                    </span>
                    <p className="mt-2 text-xs md:text-sm text-zinc-400 font-sans leading-relaxed">
                      Market research, positioning architecture, conversion-focused design systems, marketplace algorithms, and programmatic retail media.
                    </p>
                  </div>

                  <div className="border-l-2 border-zinc-600 pl-5">
                    <span className="font-clash font-bold text-lg text-white uppercase block">
                      Patriotic Distributors
                    </span>
                    <span className="font-mono text-xs text-zinc-400 uppercase block mt-0.5">
                      The Physical Infrastructure & Distribution Layer
                    </span>
                    <p className="mt-2 text-xs md:text-sm text-zinc-400 font-sans leading-relaxed">
                      2,400+ brick-and-mortar retail relationships, nationwide 3PL warehousing (CA, TX, NJ), wholesale network access, and B2B fulfillment.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/80 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                    Connected at Leadership Level
                  </span>
                  <span className="font-mono text-[11px] text-primary uppercase tracking-wider font-bold">
                    USA • UK • UAE
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <DiagnosticCta
        title="Ready To Explore Collaboration?"
        body="Tell us about your brand's current footprint and commercial goals. We will conduct an initial diagnostic before our first strategic call."
      />
    </>
  );
}
