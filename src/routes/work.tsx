import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, TrendingUp, Layers, Globe, ShieldCheck, Zap } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { DiagnosticCta } from "@/components/site/CapabilityDetail";
import { meta } from "@/components/site/CapabilityGroupPage";
import { caseStudyLens } from "@/data/capabilities";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/work")({
  head: () =>
    meta(
      "The Work — Evidence-Led Brand Growth & Case Studies — Ecom Gleam",
      "Selected client case studies, commerce systems, and marketplace transformations delivered with measurable commercial ROI.",
    ),
  component: WorkPage,
});

interface Project {
  id: string;
  title: string;
  category: "Marketplace Growth" | "Brand Architecture" | "Commerce Systems" | "Global Expansion" | "Omnichannel";
  client: string;
  timeline: string;
  summary: string;
  image: string;
  impactMetrics: { value: string; label: string }[];
  tags: string[];
  deliverables: string[];
}

const projects: Project[] = [
  {
    id: "commerce-expansion",
    title: "Multi-Region Marketplace Expansion & Catalog Governance",
    category: "Marketplace Growth",
    client: "Tier-1 Consumer Electronics Brand",
    timeline: "9-Month Sprint",
    summary:
      "Transitioned a disjointed multi-seller presence on Amazon US/EU into a singular authorized flagship engine with automated advertising bidding and algorithmic Buy Box defense.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    impactMetrics: [
      { value: "+340%", label: "YoY Marketplace ARR" },
      { value: "99.4%", label: "Buy Box Ownership" },
      { value: "4.8x", label: "Blended ROAS" },
    ],
    tags: ["Amazon US/EU", "Brand Protection", "Retail Media", "DSP"],
    deliverables: ["Catalog Normalization", "Automated Pricing Engine", "A+ Premium Content", "Inventory Allocation"],
  },
  {
    id: "brand-repositioning",
    title: "Global DTC Architecture & Full Brand Redesign",
    category: "Brand Architecture",
    client: "Heritage Wellness & Nutrition Group",
    timeline: "6-Month Transformation",
    summary:
      "Engineered an elevated headless Shopify Plus digital experience coupled with high-converting visual storytelling, custom subscription funnels, and unified ERP integration.",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    impactMetrics: [
      { value: "+185%", label: "DTC Conversion Rate" },
      { value: "+46%", label: "Average Order Value" },
      { value: "72%", label: "Subscription Retention" },
    ],
    tags: ["Headless Commerce", "Design Systems", "Subscriptions", "Retention"],
    deliverables: ["Custom Storefront", "Brand Guidelines", "Design Tokens", "Checkout Optimization"],
  },
  {
    id: "omnichannel-fulfillment",
    title: "Unified B2B Wholesale & Physical Distribution Pipeline",
    category: "Omnichannel",
    client: "National Food & Beverage Disruptor",
    timeline: "12-Month Rollout",
    summary:
      "Combined digital marketplace demand signals with nationwide retail distribution, placing inventory across 2,400+ brick-and-mortar storefronts with optimized 3PL fulfillment.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    impactMetrics: [
      { value: "2,400+", label: "Store Placements" },
      { value: "-28%", label: "Fulfillment Cost/Unit" },
      { value: "99.8%", label: "On-Time Dispatch" },
    ],
    tags: ["Patriotic Distributors", "3PL Warehousing", "EDI Integration", "Retail Chains"],
    deliverables: ["Wholesale Portal", "Demand Forecasting Model", "Logistics Routing", "Floor Placement"],
  },
  {
    id: "international-uae-uk",
    title: "Cross-Border Market Entry: UK & GCC Territory Launch",
    category: "Global Expansion",
    client: "Fast-Growth Apparel & Footwear Label",
    timeline: "8-Month Launch",
    summary:
      "Launched full commercial operations in the UK (Amazon.co.uk + localized Shopify) and UAE (Noon + Amazon.ae), managing multi-currency compliance, VAT, and in-region logistics.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    impactMetrics: [
      { value: "$12.8M", label: "Year-1 Territory GMV" },
      { value: "14 Days", label: "Average Transit to GCC" },
      { value: "#1", label: "New Release in Category" },
    ],
    tags: ["Cross-Border Tax", "Noon / Amazon.ae", "Localized Creative", "EMEA Logistics"],
    deliverables: ["Regulatory Compliance", "Customs Clearance Setup", "Localized Ad Campaigns", "Customer Support Desk"],
  },
  {
    id: "automated-commerce-stack",
    title: "Automated Commerce Engine & Live Predictive Inventory",
    category: "Commerce Systems",
    client: "High-Volume CPG Manufacturer",
    timeline: "5-Month Engineering",
    summary:
      "Built custom real-time data pipelines and inventory prediction microservices to balance multi-channel stock across Amazon FBA, TikTok Shop warehouses, and private retail distribution.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    impactMetrics: [
      { value: "0%", label: "Stockout Incidents" },
      { value: "+38%", label: "Working Capital Velocity" },
      { value: "100%", label: "Automated Reordering" },
    ],
    tags: ["API Integrations", "TikTok Shop", "Data Warehouse", "Inventory Modeling"],
    deliverables: ["ERP Sync Connectors", "Predictive Restock Alerting", "Omnichannel Dashboards", "Channel Attribution"],
  },
  {
    id: "creative-conversion-funnel",
    title: "High-Velocity Performance Media & Creator Seeding Hub",
    category: "Brand Architecture",
    client: "Modern Home Goods Collective",
    timeline: "4-Month Acceleration",
    summary:
      "Deployed a systematic creative testing matrix with 150+ custom modular video ads and organic creator activations, driving customer acquisition costs down by more than half.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
    impactMetrics: [
      { value: "-52%", label: "Blended CAC Reduction" },
      { value: "+210%", label: "Ad Spend Scaled Profitably" },
      { value: "45M+", label: "Organic Impression Reach" },
    ],
    tags: ["Creator Seeding", "Short-Form Video", "Meta / TikTok Ads", "Creative Testing"],
    deliverables: ["Modular Creative Engine", "Creator Contracts", "Hook & Script Matrix", "Weekly Media Attribution"],
  },
];

const categories = [
  "All",
  "Marketplace Growth",
  "Brand Architecture",
  "Commerce Systems",
  "Global Expansion",
  "Omnichannel",
] as const;

function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <>
      <PageHero
        eyebrow="Portfolio & Evidence"
        title="The Work."
        intro="Evidence, not screenshots. We design, build, and operate commercial growth engines across marketplaces, DTC, and physical distribution with measurable ROI."
        image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85"
      />

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 border-b border-border bg-background/90 backdrop-blur-md py-4">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-5 md:px-10">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mr-3 hidden sm:inline-block">
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-none px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-zinc-950 font-bold"
                  : "border border-border/80 text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-background border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            >
              {filteredProjects.map((project, idx) => (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="group relative flex flex-col justify-between border border-border bg-card overflow-hidden hover:border-primary/70 transition-colors"
                >
                  {/* Image Stage */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="bg-primary/90 text-zinc-950 font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                        {project.category}
                      </span>
                      <span className="bg-black/60 backdrop-blur-sm text-zinc-200 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-white/10">
                        {project.timeline}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-mono text-xs uppercase tracking-widest text-primary/90">
                        // {project.client}
                      </p>
                      <h3 className="font-clash font-bold text-xl md:text-2xl text-white uppercase tracking-wide mt-1 leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                      {project.summary}
                    </p>

                    {/* Metrics Banner */}
                    <div className="grid grid-cols-3 gap-3 my-6 py-4 border-y border-border/70 bg-zinc-950/40 px-3">
                      {project.impactMetrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-center">
                          <div className="font-clash font-bold text-lg md:text-2xl text-primary">
                            {m.value}
                          </div>
                          <div className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tags & Action */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-mono text-zinc-400 bg-secondary/50 px-2 py-0.5 border border-border/50"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="rounded-none text-xs font-clash uppercase font-bold tracking-wider hover:text-primary group-hover:translate-x-1 transition-transform p-0 h-auto"
                      >
                        <Link to="/contact">
                          Inquire Case Details
                          <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Case Study Lens: Seven-Part Methodology */}
      <section className="py-20 md:py-32 bg-[var(--ink)] border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.28em] text-primary uppercase block">
              // Methodology & Lens
            </span>
            <h2 className="display mt-4 text-[clamp(2.2rem,4.5vw,4.5rem)] leading-none">
              The Seven-Part Case Framework
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
              We hold our work to institutional rigor. Every engagement is evaluated across
              seven verifiable milestones rather than vanity screenshots.
            </p>
          </Reveal>

          <div className="mt-12 divide-y divide-border">
            {caseStudyLens.map((lens, i) => (
              <Reveal key={lens.label} delay={i * 0.04}>
                <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_2fr] gap-4 md:gap-8 py-6 items-baseline group hover:bg-zinc-950/30 transition-colors px-2">
                  <span className="font-mono text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-clash font-bold text-xl md:text-2xl text-foreground uppercase tracking-wide">
                    {lens.label}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                    {lens.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DiagnosticCta
        title="Bring Us Your Growth Bottleneck"
        body="Whether expanding into the US, UK, or GCC, or solving channel leakage, we apply institutional research before executing."
      />
    </>
  );
}

