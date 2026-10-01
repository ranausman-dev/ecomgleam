import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Globe,
  Sparkles,
  ArrowRight,
  Check,
  Copy,
  ChevronDown,
  Lock,
  ExternalLink,
  Navigation,
  Building,
  Loader2,
} from "lucide-react";
import { meta } from "@/components/site/CapabilityGroupPage";
import { engagementModels } from "@/data/capabilities";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () =>
    meta(
      "Contact & Brand Diagnostic — Ecom Gleam",
      "Connect with Ecomgleam Headquarters in Lahore, Pakistan. We analyze brand performance, channel economics, unauthorized seller control, and international expansion across USA, UK and UAE.",
    ),
  component: ContactPage,
});

const capabilitiesList = [
  "Market Intelligence & Research",
  "Brand Strategy & Positioning",
  "eCommerce & Marketplace Scale",
  "Performance Media & Demand",
  "Brand Protection & MAP Control",
  "International Expansion (UK/UAE/USA)",
  "Distribution, 3PL & Fulfillment",
  "Data Analytics & Automation",
];

const targetMarkets = [
  { id: "usa", label: "United States (USA)", flag: "🇺🇸" },
  { id: "uk", label: "United Kingdom (UK)", flag: "🇬🇧" },
  { id: "uae", label: "United Arab Emirates (UAE)", flag: "🇦🇪" },
  { id: "global", label: "Global / Omnichannel", flag: "🌐" },
];

const revenueTiers = [
  "< $2M",
  "$2M – $10M",
  "$10M – $50M",
  "$50M+",
];

const faqs = [
  {
    q: "Where is Ecomgleam headquartered?",
    a: "Ecomgleam is headquartered in Lahore, Pakistan, operating from A1, Street No 2, Sector A1, Lahore, 54770. From our central intelligence and operations hub, we manage, protect, and scale brands across global marketplaces in the USA, UK, UAE, and beyond.",
  },
  {
    q: "What is included in the initial Brand Diagnostic?",
    a: "We conduct an algorithmic audit of your brand’s category demand, digital shelf presence, price integrity, unauthorized third-party sellers, and international expansion readiness. You receive a structured briefing highlighting key friction points and immediate commercial opportunities.",
  },
  {
    q: "How does Ecomgleam manage global brands from Pakistan?",
    a: "Our centralized team of marketplace architects, data analysts, and media specialists works across international timezones with direct API integrations into Amazon Seller Central, Walmart Marketplace, TikTok Shop, and international 3PL logistics networks in the USA, UK, and UAE.",
  },
  {
    q: "How does channel control and rogue seller removal work?",
    a: "We deploy active price-monitoring infrastructure, detect unauthorized distribution leakages, trace supply chain sources, and enforce brand protection protocols without jeopardizing your account standing or consumer sentiment.",
  },
  {
    q: "How fast can we launch or expand into the UK, UAE, or US?",
    a: "Depending on product catalog regulatory compliance and supply logistics, international market entry typically launches within 4 to 8 weeks, backed by localized logistics, tax structure setup, and regional marketplace optimization.",
  },
  {
    q: "Do you require long-term lock-in retainer contracts?",
    a: "No. We believe in performance and shared alignment. We structure our engagements into focused diagnostic phases, pilot launches, or hybrid commercial growth partnerships based on what fits your brand best.",
  },
];

const PAKISTAN_OFFICE = {
  name: "Ecomgleam Headquarters",
  city: "Lahore",
  country: "Pakistan",
  flag: "🇵🇰",
  address: "A1, Street No 2, Sector A1 Sector A 1 Lahore, 54770, Pakistan",
  postal: "54770",
  coords: "31.4550° N, 74.3050° E",
  mapQuery: "A1,+Street+No+2,+Sector+A1+Sector+A+1+Lahore,+54770,+Pakistan",
  timeZone: "Asia/Karachi",
  tzAbbr: "PKT",
  phone: "+92 42 3511 5477",
  email: "contact@ecomgleam.com",
  hours: "Monday – Saturday • 9:00 AM – 6:00 PM PKT",
};

function LiveTime({ timeZone, tzAbbr }: { timeZone: string; tzAbbr: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      try {
        const now = new Date();
        const str = now.toLocaleTimeString("en-US", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setTime(str);
      } catch {
        setTime("--:--");
      }
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [timeZone]);

  return (
    <span className="font-mono text-xs text-primary font-medium tracking-wider">
      {time || "--:--"} {tzAbbr}
    </span>
  );
}

function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([
    "Market Intelligence & Research",
    "eCommerce & Marketplace Scale",
  ]);
  const [selectedMarket, setSelectedMarket] = useState("usa");
  const [selectedRevenue, setSelectedRevenue] = useState("$2M – $10M");
  const [selectedModel, setSelectedModel] = useState(engagementModels[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  // Controlled form inputs
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [brandName, setBrandName] = useState("");
  const [storefrontUrl, setStorefrontUrl] = useState("");
  const [challenge, setChallenge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map display controls: "standard" (true-color real Google Map), "dark" (brutalist tactical), "satellite"
  const [mapStyle, setMapStyle] = useState<"standard" | "dark" | "satellite">("standard");
  const [hudMinimized, setHudMinimized] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@ecomgleam.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(PAKISTAN_OFFICE.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2200);
  };

  const toggleCapability = (cap: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const ticket = `EG-${new Date().getFullYear()}-${randomCode}`;
    setReferenceId(ticket);

    const targetMarketObj = targetMarkets.find((m) => m.id === selectedMarket);
    const marketLabel = targetMarketObj ? `${targetMarketObj.flag} ${targetMarketObj.label}` : selectedMarket;

    const payload = {
      _subject: `New Brand Diagnostic Dossier [${ticket}] - ${brandName || "New Client"}`,
      _replyto: workEmail,
      _template: "table",
      "Reference Ticket": ticket,
      "Full Name": fullName,
      "Corporate / Work Email": workEmail,
      "Brand / Company Name": brandName,
      "Storefront / Website URL": storefrontUrl || "Not provided",
      "Selected Capabilities": selectedCapabilities.join(", ") || "General Overview",
      "Target Market": marketLabel,
      "Annual Brand Revenue": selectedRevenue,
      "Preferred Engagement Model": selectedModel,
      "Commercial Challenge": challenge,
      "Dispatch Hub": "Lahore, Pakistan (Ecomgleam HQ)",
      "Submission Date": new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" }) + " PKT",
    };

    try {
      await fetch("https://formsubmit.co/ajax/usman4243ch@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn("Dossier transmission fallback:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Full-Width Hero Card with Brand Image                    */}
      {/* ========================================================================= */}
      <section className="relative w-full pt-24 pb-10 sm:pt-28 sm:pb-14 md:pt-32 md:pb-16 bg-background">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
          
          {/* Main Hero Card */}
          <div className="relative w-full min-h-[500px] sm:min-h-[540px] md:min-h-[600px] lg:min-h-[640px] rounded-2xl md:rounded-[32px] overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-14">
            
            {/* Background Image: Light, Official Corporate Headquarters in Bright Daylight */}
            <div className="absolute inset-0 z-0">
              <img
                src="/assets/images/contact-official.jpg"
                alt="Ecomgleam Corporate Headquarters"
                className="w-full h-full object-cover object-center scale-[1.01] transform transition-transform duration-1000"
              />
              {/* Subtle natural scrim ensuring light, official daylight feel while keeping typography crisp */}
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* TOP ROW: Pill Eyebrow on Left, Direct Quick Contact on Right */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-primary text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>// 07 • Connect &amp; Diagnostic</span>
              </div>

              {/* Direct Quick Lines */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
                {/* Pakistan Headquarters Location Tag */}
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-xs font-mono text-zinc-100">
                  <span>🇵🇰</span>
                  <span>Lahore, Pakistan</span>
                  <span className="text-white/40">•</span>
                  <LiveTime timeZone={PAKISTAN_OFFICE.timeZone} tzAbbr={PAKISTAN_OFFICE.tzAbbr} />
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md hover:border-primary transition-all text-xs font-mono text-zinc-100 cursor-pointer"
                  title="Click to copy email"
                >
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>contact@ecomgleam.com</span>
                  {copiedEmail ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3 text-white/50" />}
                </button>

                <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-xs font-mono text-zinc-100">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>Sector A1, Lahore 54770</span>
                </div>
              </div>
            </div>

            {/* BOTTOM ROW: Giant Display Headline, Subtext & Value Badges */}
            <div className="relative z-10 max-w-4xl mt-16 sm:mt-24 md:mt-32">
              <span className="eyebrow block text-primary font-mono text-xs sm:text-sm tracking-[0.28em] uppercase mb-3">
                Evidence Before Execution
              </span>
              <h1 className="display text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.88] uppercase text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                Start With Intelligence
              </h1>
              <p className="mt-5 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-sans max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Headquartered in Lahore, Pakistan. We diagnose the market, uncover commercial leverage points,
                and architect integrated growth engines across digital marketplaces in the USA, UK, UAE, and beyond.
              </p>

              {/* Guarantees & Turnaround Strip */}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-white/85">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-none bg-black/55 border border-white/15 backdrop-blur-md">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>Sector A1, Lahore, Pakistan</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-none bg-black/55 border border-white/15 backdrop-blur-md">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>&lt; 24h Turnaround</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-none bg-black/55 border border-white/15 backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>Mutual NDA Protection</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN DIAGNOSTIC CONSOLE: Form + 48h Protocol & Metrics                 */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 md:py-24 border-b border-border/80">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-10 md:gap-16 items-start">
            
            {/* ------------------------------------------------------------- */}
            {/* LEFT COLUMN: Interactive Diagnostic Dossier Form              */}
            {/* ------------------------------------------------------------- */}
            <div className="panel p-6 sm:p-8 md:p-10 border border-border bg-surface/80 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              {submitted ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-10 text-left space-y-6"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center">
                    <Check className="w-7 h-7" />
                  </div>

                  <div>
                    <span className="eyebrow block">Diagnostic Request Confirmed</span>
                    <h2 className="display text-4xl sm:text-5xl mt-2 text-foreground">
                      We Have Received Your Dossier
                    </h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed text-sm sm:text-base font-sans">
                      Your brief is in the hands of senior partners at Ecomgleam Headquarters in Lahore.
                      We will review your catalog, analyze current channel metrics, and respond with preliminary findings within 24 hours.
                    </p>
                  </div>

                  {/* Reference Ticket Card */}
                  <div className="p-5 rounded-none border border-border/80 bg-black/40 space-y-3 font-mono text-xs sm:text-sm">
                    <div className="flex justify-between items-center text-muted-foreground pb-2 border-b border-border/60">
                      <span>REFERENCE TICKET:</span>
                      <span className="text-primary font-bold">{referenceId}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>DISPATCH RECIPIENT:</span>
                      <span className="text-primary font-mono font-semibold">usman4243ch@gmail.com</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>BRAND / COMPANY:</span>
                      <span className="text-foreground">{brandName || "Confidential Brand"}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>CONTACT EMAIL:</span>
                      <span className="text-foreground">{workEmail}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>TARGET REGION:</span>
                      <span className="text-foreground uppercase">{selectedMarket}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>ENGAGEMENT FOCUS:</span>
                      <span className="text-foreground">{selectedModel}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>DISPATCH HUB:</span>
                      <span className="text-foreground">Lahore, Pakistan (54770)</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <Button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFullName("");
                        setWorkEmail("");
                        setBrandName("");
                        setStorefrontUrl("");
                        setChallenge("");
                      }}
                      className="rounded-none bg-primary text-zinc-950 font-bold hover:bg-primary/90 text-xs uppercase tracking-wider h-12 px-6 cursor-pointer"
                    >
                      Submit Another Inquiry
                    </Button>
                    <a
                      href={`mailto:usman4243ch@gmail.com?subject=Brand Diagnostic Dossier [${referenceId}] - ${brandName}&body=Reference: ${referenceId}%0D%0AName: ${fullName}%0D%0AEmail: ${workEmail}%0D%0ABrand: ${brandName}%0D%0AStorefront: ${storefrontUrl}%0D%0ACapabilities: ${selectedCapabilities.join(", ")}%0D%0AMarket: ${selectedMarket}%0D%0ARevenue: ${selectedRevenue}%0D%0AModel: ${selectedModel}%0D%0AChallenge: ${challenge}`}
                      className="inline-flex items-center gap-2 h-12 px-6 rounded-none border border-border/80 bg-surface/80 hover:border-primary text-xs uppercase tracking-wider font-mono text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      <span>Direct Email Copy</span>
                    </a>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-none border-border hover:bg-surface text-xs uppercase tracking-wider h-12 px-6"
                    >
                      <Link to="/capabilities">Explore Capabilities</Link>
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 1: Capabilities Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="eyebrow block text-foreground/90 font-bold">
                        01 • Select Required Capabilities
                      </label>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        (Select all that apply)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {capabilitiesList.map((cap) => {
                        const active = selectedCapabilities.includes(cap);
                        return (
                          <button
                            type="button"
                            key={cap}
                            onClick={() => toggleCapability(cap)}
                            className={`px-3.5 py-2 text-xs sm:text-sm rounded-none border transition-all text-left flex items-center gap-1.5 cursor-pointer ${
                              active
                                ? "border-primary bg-primary/15 text-primary font-medium"
                                : "border-border/80 bg-surface hover:border-border text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-primary" : "bg-muted-foreground/40"}`} />
                            {cap}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Target Markets */}
                  <div className="space-y-3">
                    <label className="eyebrow block text-foreground/90 font-bold">
                      02 • Primary Target Market
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {targetMarkets.map((m) => {
                        const active = selectedMarket === m.id;
                        return (
                          <button
                            type="button"
                            key={m.id}
                            onClick={() => setSelectedMarket(m.id)}
                            className={`p-3 text-xs sm:text-sm rounded-none border transition-all flex flex-col items-center justify-center text-center gap-1 cursor-pointer ${
                              active
                                ? "border-primary bg-primary/15 text-primary font-medium"
                                : "border-border/80 bg-surface hover:border-border text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span className="text-base">{m.flag}</span>
                            <span className="font-sans leading-tight">{m.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Brand Revenue & Engagement Model */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="eyebrow block text-foreground/90 font-bold">
                        03 • Annual Brand Revenue
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {revenueTiers.map((tier) => {
                          const active = selectedRevenue === tier;
                          return (
                            <button
                              type="button"
                              key={tier}
                              onClick={() => setSelectedRevenue(tier)}
                              className={`py-2.5 px-3 text-xs sm:text-sm rounded-none border transition-all text-center cursor-pointer ${
                                active
                                  ? "border-primary bg-primary/15 text-primary font-medium"
                                  : "border-border/80 bg-surface hover:border-border text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {tier}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="eyebrow block text-foreground/90 font-bold">
                        04 • Preferred Engagement Model
                      </label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full h-11 px-3 text-xs sm:text-sm rounded-none border border-border bg-surface text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
                      >
                        {engagementModels.map((model) => (
                          <option key={model} value={model} className="bg-background text-foreground">
                            {model}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 4: Contact Inputs */}
                  <div className="space-y-5 pt-2">
                    <label className="eyebrow block text-foreground/90 font-bold">
                      05 • Your Dossier Details
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                          Full Name *
                        </span>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Alexander Vance"
                          className="w-full h-12 px-4 rounded-none border border-border bg-surface text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                          Corporate / Work Email *
                        </span>
                        <input
                          type="email"
                          required
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder="vance@brand.com"
                          className="w-full h-12 px-4 rounded-none border border-border bg-surface text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                          Brand / Company Name *
                        </span>
                        <input
                          type="text"
                          required
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          placeholder="e.g. Apex Health Brands"
                          className="w-full h-12 px-4 rounded-none border border-border bg-surface text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                          Storefront / Website URL
                        </span>
                        <input
                          type="text"
                          value={storefrontUrl}
                          onChange={(e) => setStorefrontUrl(e.target.value)}
                          placeholder="e.g. amazon.com/brand or mybrand.com"
                          className="w-full h-12 px-4 rounded-none border border-border bg-surface text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                        The Commercial Challenge *
                      </span>
                      <textarea
                        required
                        rows={4}
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        placeholder="Detail your current challenge: channel conflict, price erosion from unauthorized sellers, stalled marketplace growth, or international market expansion goals..."
                        className="w-full p-4 rounded-none border border-border bg-surface text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors resize-y"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto h-14 px-8 rounded-none bg-primary text-zinc-950 hover:bg-primary/90 font-clash font-bold text-sm uppercase tracking-wider transition-transform hover:scale-[1.01] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                          <span>Dispatching Dossier to usman4243ch@gmail.com...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Brand Diagnostic</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                    <p className="mt-3 text-[11px] text-muted-foreground font-mono flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      <span>Data submitted is strictly confidential and dispatched directly to executive headquarters.</span>
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT COLUMN: 48h Protocol & Track Record Metrics             */}
            {/* ------------------------------------------------------------- */}
            <div className="space-y-8">
              
              {/* Card 1: Headquarters Details */}
              <div className="panel p-6 sm:p-8 border border-border bg-surface/60 backdrop-blur-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border/80">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-primary" />
                    <h3 className="font-clash text-base font-bold uppercase tracking-wider text-foreground">
                      Central Headquarters
                    </h3>
                  </div>
                  <LiveTime timeZone={PAKISTAN_OFFICE.timeZone} tzAbbr={PAKISTAN_OFFICE.tzAbbr} />
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="text-foreground font-bold flex items-center gap-1.5">
                    <span>🇵🇰</span>
                    <span>{PAKISTAN_OFFICE.name}</span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed font-sans">
                    {PAKISTAN_OFFICE.address}
                  </p>
                  <p className="text-[11px] text-primary">
                    {PAKISTAN_OFFICE.hours}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="px-3 py-1.5 rounded-none border border-border/70 bg-black/40 hover:border-primary text-[11px] font-mono flex items-center gap-1.5 cursor-pointer text-zinc-300"
                  >
                    {copiedAddress ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3 text-primary" />}
                    <span>{copiedAddress ? "Address Copied" : "Copy Address"}</span>
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${PAKISTAN_OFFICE.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-none border border-border/70 bg-black/40 hover:border-primary text-[11px] font-mono flex items-center gap-1.5 text-zinc-300 hover:text-white"
                  >
                    <ExternalLink className="w-3 h-3 text-primary" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>

              {/* Card 2: 48-Hour Diagnostic Protocol */}
              <div className="panel p-6 sm:p-8 border border-border bg-surface/60 backdrop-blur-sm space-y-5">
                <div className="flex items-center gap-2 pb-4 border-b border-border/80">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h3 className="font-clash text-base font-bold uppercase tracking-wider text-foreground">
                    The 48-Hour Diagnostic Protocol
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 border border-primary/40 bg-primary/10 shrink-0">
                      01
                    </span>
                    <div>
                      <h4 className="font-bold text-foreground">Confidential Intake &amp; Data Ingestion</h4>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Execution of mutual NDA and account review covering store metrics, catalog taxonomy, and historical sell-through.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 border border-primary/40 bg-primary/10 shrink-0">
                      02
                    </span>
                    <div>
                      <h4 className="font-bold text-foreground">Algorithmic Shelf &amp; Pricing Audit</h4>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Automated buy box analysis, rogue seller tracking, MAP violation inspection, and search share opportunity benchmarking.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 border border-primary/40 bg-primary/10 shrink-0">
                      03
                    </span>
                    <div>
                      <h4 className="font-bold text-foreground">Executive Findings Briefing</h4>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        A private 30-minute debrief with senior leadership walking through evidence-backed findings and roadmap options.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Track Record Metrics */}
              <div className="panel p-6 sm:p-8 border border-border bg-surface/60 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border border-border/60 bg-black/30">
                    <span className="font-clash text-2xl sm:text-3xl font-bold text-primary block">
                      $1.4B+
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      Total GMV Scaled
                    </span>
                  </div>
                  <div className="p-3 border border-border/60 bg-black/30">
                    <span className="font-clash text-2xl sm:text-3xl font-bold text-foreground block">
                      14+
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      Global Markets
                    </span>
                  </div>
                  <div className="p-3 border border-border/60 bg-black/30">
                    <span className="font-clash text-2xl sm:text-3xl font-bold text-foreground block">
                      99.4%
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      MAP Compliance
                    </span>
                  </div>
                  <div className="p-3 border border-border/60 bg-black/30">
                    <span className="font-clash text-2xl sm:text-3xl font-bold text-primary block">
                      20+ Yrs
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      Market Leadership
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE PAKISTAN LOCATION MAP SECTION                              */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-border/80 bg-[var(--ink)]/40 relative">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-border/70">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-widest mb-3">
                <Navigation className="w-3.5 h-3.5" />
                <span>// Sole Physical Headquarters &amp; Central Operations</span>
              </div>
              <h2 className="display text-4xl sm:text-5xl md:text-6xl uppercase text-foreground">
                Located in Lahore, Pakistan 🇵🇰
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl font-sans">
                Ecomgleam is located strictly in Pakistan. Our central corporate office and digital operations headquarters are based at{" "}
                <span className="text-foreground font-medium">A1, Street No 2, Sector A1 Sector A 1 Lahore, 54770, Pakistan</span>.
              </p>
            </div>

            {/* Map Mode Controls */}
            <div className="flex items-center gap-1.5 bg-surface p-1.5 border border-border rounded-lg shadow-sm">
              <button
                type="button"
                onClick={() => setMapStyle("standard")}
                className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer rounded-md ${
                  mapStyle === "standard"
                    ? "bg-primary text-zinc-950 font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Standard Map
              </button>
              <button
                type="button"
                onClick={() => setMapStyle("dark")}
                className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer rounded-md ${
                  mapStyle === "dark"
                    ? "bg-primary text-zinc-950 font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dark Tactical
              </button>
              <button
                type="button"
                onClick={() => setMapStyle("satellite")}
                className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer rounded-md ${
                  mapStyle === "satellite"
                    ? "bg-primary text-zinc-950 font-bold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Satellite View
              </button>
            </div>
          </div>

          {/* Interactive Map Display Container */}
          <div className="mt-8 rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl relative">
            <div className="relative w-full h-[460px] sm:h-[520px] md:h-[600px] bg-black">
              {/* Embedded Google Map Focused on Sector A1, Lahore, Pakistan */}
              <iframe
                title="Ecomgleam Lahore Pakistan Headquarters Location"
                src={`https://maps.google.com/maps?q=${PAKISTAN_OFFICE.mapQuery}&t=${mapStyle === "satellite" ? "k" : "m"}&z=16&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-none opacity-90 hover:opacity-100 transition-opacity"
                style={{
                  filter:
                    mapStyle === "dark"
                      ? "invert(92%) hue-rotate(180deg) contrast(1.15) brightness(0.92)"
                      : "none",
                }}
                loading="lazy"
              />

              {/* Floating Location HUD Card */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-sm panel p-5 bg-black/90 backdrop-blur-md border border-border/80 text-foreground shadow-2xl transition-all">
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇵🇰</span>
                    <div>
                      <h4 className="font-clash text-base font-bold text-foreground">
                        Ecomgleam
                      </h4>
                      <span className="text-[11px] font-mono text-primary block">
                        Headquarters • Lahore, Pakistan
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <LiveTime timeZone={PAKISTAN_OFFICE.timeZone} tzAbbr={PAKISTAN_OFFICE.tzAbbr} />
                    <button
                      type="button"
                      onClick={() => setHudMinimized(!hudMinimized)}
                      className="text-[10px] font-mono text-muted-foreground hover:text-primary px-1.5 py-0.5 border border-border/60 bg-white/5 cursor-pointer rounded"
                      title={hudMinimized ? "Expand Details" : "Minimize Card"}
                    >
                      {hudMinimized ? "+" : "−"}
                    </button>
                  </div>
                </div>

                {!hudMinimized && (
                  <>
                    <div className="mt-3.5 space-y-2 font-mono text-[11px] text-zinc-300">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="font-sans text-xs text-white/95 leading-snug">
                          {PAKISTAN_OFFICE.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                        <a href={`mailto:${PAKISTAN_OFFICE.email}`} className="hover:text-primary text-white/90">
                          {PAKISTAN_OFFICE.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                        <a href={`tel:${PAKISTAN_OFFICE.phone}`} className="hover:text-primary text-white/90">
                          {PAKISTAN_OFFICE.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground pt-1">
                        <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{PAKISTAN_OFFICE.hours}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${PAKISTAN_OFFICE.mapQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-primary flex items-center gap-1.5 hover:underline"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="text-[11px] font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedAddress ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Location Summary Cards Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Official Address */}
            <div className="panel p-6 border border-border/80 bg-surface/70 space-y-3">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase">
                <MapPin className="w-4 h-4" />
                <span>Physical Headquarters</span>
              </div>
              <h4 className="font-clash text-lg font-bold text-foreground">
                Lahore, Pakistan 🇵🇰
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
                {PAKISTAN_OFFICE.address}
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-border/50">
                <span>POSTAL CODE:</span>
                <span className="text-primary font-bold">54770</span>
              </div>
            </div>

            {/* Card 2: Exclusively Pakistan Hub */}
            <div className="panel p-6 border border-border/80 bg-surface/70 space-y-3">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase">
                <Building className="w-4 h-4" />
                <span>Sole Physical Presence</span>
              </div>
              <h4 className="font-clash text-lg font-bold text-foreground">
                Exclusively Located in Pakistan
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
                Ecomgleam is headquartered and located solely in Pakistan. All strategic analysis, brand protection, creative execution, and cross-border account scaling operate out of this central Lahore headquarters.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-border/50">
                <span>LOCATION:</span>
                <span className="text-primary font-bold">Pakistan Only</span>
              </div>
            </div>

            {/* Card 3: Direct Coordination */}
            <div className="panel p-6 border border-border/80 bg-surface/70 space-y-3">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase">
                <Clock className="w-4 h-4" />
                <span>Operating Hours &amp; Timezone</span>
              </div>
              <h4 className="font-clash text-lg font-bold text-foreground">
                Pakistan Standard Time (PKT)
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
                Active operations Monday – Saturday, 9:00 AM – 6:00 PM PKT (UTC+5). Direct coordination and scheduled availability aligning with global marketplace cycles.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-border/50">
                <span>HOURS:</span>
                <span className="text-primary font-bold">Mon – Sat (PKT)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FAQ ACCORDION SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-border/80 bg-[var(--ink)]/50">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-12 md:gap-20 items-start">
            <div>
              <span className="eyebrow block">Commercial Inquiries</span>
              <h2 className="display text-4xl sm:text-5xl mt-3 text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Everything you need to know about our preliminary diagnostic engagement, Lahore headquarters operations, and international rollout capabilities.
              </p>
              <div className="mt-8 pt-6 border-t border-border/60 space-y-2">
                <span className="text-xs text-muted-foreground block font-mono">DIRECT INQUIRIES:</span>
                <a
                  href="mailto:contact@ecomgleam.com"
                  className="font-mono text-sm text-primary hover:underline block"
                >
                  contact@ecomgleam.com
                </a>
              </div>
            </div>

            {/* Accordion */}
            <div className="divide-y divide-border/80 border-y border-border/80">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left gap-4 font-clash text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          key={`faq-content-${idx}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans pr-6">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BOTTOM EXPANSION BANNER                                                */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="panel p-8 sm:p-12 md:p-16 border border-border bg-surface relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="eyebrow block">Ready to Scale?</span>
              <h3 className="display text-3xl sm:text-4xl md:text-5xl text-foreground">
                Build An Evidence Base Before Capital Is Committed.
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
                Connect with executive leadership in Lahore to review market analytics, pricing architecture, and international expansion avenues.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0 w-full md:w-auto">
              <Button
                asChild
                className="rounded-none bg-primary text-zinc-950 hover:bg-primary/90 font-clash font-bold text-xs uppercase tracking-wider h-14 px-8 cursor-pointer"
              >
                <a href="mailto:contact@ecomgleam.com">Email Partners Directly</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none border-white text-white hover:bg-white hover:text-black font-clash font-bold text-xs uppercase tracking-wider h-14 px-8"
              >
                <Link to="/about">About &amp; Leadership</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
