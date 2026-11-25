/* ---------- Projects page data ----------
   To add a project: copy any line below and edit it. That's it.
   industry: must match a key in INDUSTRIES (add a new key there for a new industry).
   type:     "venture" (mine), "client" (built by KraftX for a client), "experiment" (side build / tool), "" (role not confirmed: no label shown).
   href:     live link, or "" if not public yet (the card still shows).
   repo:     public GitHub link, optional.
   links:    official socials, optional: { instagram, linkedin, x, youtube, facebook }. Only add links the brand itself publishes.
   stack:    short, optional.
   year:     optional. */
window.INDUSTRIES = {
  ai: "AI & Automation",
  media: "Media, Film & Entertainment",
  community: "Consumer & Community",
  health: "Health & Wellness",
  finance: "Finance & Real Estate",
  education: "Education & Impact",
  design: "Design, Interiors & Fashion",
  food: "Food & Hospitality",
  commerce: "Commerce & Services",
  studio: "Studio & Tools"
};

window.VENTURES = [
  // AI & Automation
  { name: "Ashwathhama", industry: "ai", type: "venture", year: "2025", blurb: "A homegrown LLM and the first-principles plan behind it. The seed of the digital twin on this site.", stack: "LLM · Claude", href: "https://ashwathhama.vercel.app" },
  { name: "SalesAGI", industry: "ai", type: "venture", year: "2026", blurb: "An autonomous 24x7 sales team: agents that research leads, draft emails and report the pipeline.", stack: "Python · Claude · multi-agent", href: "" },
  { name: "Home agent", industry: "ai", type: "experiment", year: "2026", blurb: "Agent on WhatsApp with a heartbeat and a sense layer: lights, speakers, alarms, no browser.", stack: "Agents", href: "" },
  { name: "Higgsfield MCP", industry: "ai", type: "experiment", year: "2026", blurb: "MCP server that lets Claude generate, track and download Higgsfield videos with no public API.", stack: "TypeScript · MCP · Playwright", href: "" },
  { name: "JobBot", industry: "ai", type: "experiment", year: "2025", blurb: "AI job scanner and auto-applier for LinkedIn, Indeed, Naukri and Internshala.", stack: "Chrome extension · Claude", href: "" },
  { name: "Kurukshetra", industry: "ai", type: "venture", year: "2025", blurb: "Edge AI video analytics for tennis, padel and pickleball. Upload a fixed-camera match, mark the court, get player movement metrics.", stack: "Python · computer vision", href: "" },
  { name: "LinkedIn AutoPilot", industry: "ai", type: "experiment", year: "2026", blurb: "Researches a topic across Reddit, YouTube and TikTok, then writes a ready-to-post LinkedIn post.", stack: "Python · AI", href: "" },
  { name: "Campaign OS", industry: "ai", type: "client", year: "2026", blurb: "Weekly campaign tracker with a task rail, results log and playbook. Reseedable for any brand.", stack: "HTML · Postgres", href: "https://anantara-campaign-os.vercel.app" },

  // Media, Film & Entertainment
  { name: "CineOps", industry: "media", type: "venture", year: "2026", blurb: "AI production partner for indie filmmakers: script breakdown, budgets, schedules and vendors.", stack: "React · Gemini", href: "https://cineops-production-partner.vercel.app", repo: "https://github.com/KraftX-Dev2025/cineops-production-partner" },
  { name: "Fish Tank", industry: "media", type: "venture", year: "2024", blurb: "Business meets entertainment. An end-to-end launchpad for talented founders.", stack: "Format · Events", href: "https://fish-tank-sigma.vercel.app" },
  { name: "Mirch Masala Studios", industry: "media", type: "venture", year: "2025", blurb: "Meme-first, bold content marketing. MG Road's marketing mafia.", stack: "Next.js", href: "https://mirch-masala-studios.vercel.app", links: {instagram: "https://www.instagram.com/onlymmsofficial/", facebook: "https://www.facebook.com/people/OnlyMms/61575574449959/"} },
  { name: "GRRR Nights", industry: "media", type: "venture", year: "2026", blurb: "Underground night format in Mumbai, from showflow to graffiti promos.", stack: "Events", href: "" },
  { name: "18Fanz", industry: "media", type: "client", year: "2026", blurb: "Fan-economy platform. KraftX wrote the MVP and the product plan.", stack: "Product · MVP", href: "" },

  // Consumer & Community
  { name: "Hypercurated", industry: "community", type: "venture", year: "2024–", blurb: "Feed, community and event hosting in one place, built on the idea that your data belongs to you.", stack: "Web · Mobile", href: "" },
  { name: "Aadhyatmik Niwas", industry: "community", type: "venture", year: "2025", blurb: "Site for a spiritual retreat: stays and daily practice.", stack: "React · Vite", href: "https://spiritual-website-lime.vercel.app" },
  { name: "Anonymous Chat", industry: "community", type: "experiment", year: "2025", blurb: "Real-time anonymous group chat and reviews, designed for privacy.", stack: "Next.js", href: "https://anonymous-chat-app-three.vercel.app" },
  { name: "JanOS", industry: "community", type: "venture", year: "2026", blurb: "Civic app for citizens: report, track and act on what's around you.", stack: "React Native · Firebase", href: "" },
  { name: "Leo Club app", industry: "community", type: "client", year: "2025", blurb: "Mobile app for a Leo Club chapter: members, events and service projects.", stack: "React Native", href: "" },

  // Health & Wellness
  { name: "Kraftodent", industry: "health", type: "venture", year: "2025", blurb: "AI automation for modern dental practices in India.", stack: "Next.js · AI", href: "https://kraftodent.vercel.app", links: {instagram: "https://instagram.com/kraftodent", linkedin: "https://www.linkedin.com/company/kraftodent/", facebook: "https://facebook.com/kraftodent"} },
  { name: "Tefline", industry: "health", type: "client", year: "2025", blurb: "The epicenter for lifestyle medicine, plus a wellness companion product.", stack: "Next.js · Supabase", href: "https://tefline-website.vercel.app" },
  { name: "Eazy Ayurveda", industry: "health", type: "client", year: "2025", blurb: "Natural Ayurvedic remedies brand: site, Shopify store, Amazon listings and campaigns.", stack: "Next.js · Shopify · webhooks", href: "https://eazy-ayurveda.vercel.app", links: {instagram: "https://instagram.com/eazyayurveda"} },
  { name: "The Trainer", industry: "health", type: "client", year: "2025", blurb: "Site for fitness and nutrition coach Anish Palesha.", stack: "Next.js", href: "https://www.apthetrainer.com", links: {instagram: "https://www.instagram.com/thetraineranish", youtube: "https://youtube.com/@thetraineranish01", linkedin: "https://www.linkedin.com/in/anish-palesha-5458291b1"} },
  { name: "Aadhar Foundation", industry: "health", type: "client", year: "2025", blurb: "Health, nutrition and medical research for underserved communities.", stack: "Next.js", href: "" },
  { name: "Easemyhealth", industry: "health", type: "venture", year: "2025", blurb: "Healthcare access brand: identity and product concept.", stack: "Brand", href: "" },
  { name: "Assistift", industry: "health", type: "",  year: "2025", blurb: "Assistive fitness product, from prototype to pitch deck and demo.", stack: "Hardware · Pitch", href: "" },

  // Finance & Real Estate
  { name: "Kuvera Kapital", industry: "finance", type: "venture", year: "2025", blurb: "Realty and capital advisory.", stack: "Next.js", href: "https://kuvera-pied.vercel.app" },
  { name: "IB OS", industry: "finance", type: "venture", year: "2026", blurb: "Investment-banking OS: deal management, workflows and AI-generated documents for IB, PE and wealth firms.", stack: "TypeScript · AI", href: "" },
  { name: "PropOS", industry: "finance", type: "venture", year: "2026", blurb: "Operating system for real-estate teams: leads, proposals and pipeline.", stack: "TypeScript", href: "https://propos-plum.vercel.app" },
  { name: "Auris Residences", industry: "finance", type: "client", year: "2026", blurb: "Launch page for luxury 4 and 5 BHK apartments in Dubai.", stack: "HTML", href: "https://dubai-residences.vercel.app" },
  { name: "Skyline Haven", industry: "finance", type: "client", year: "2025", blurb: "Real-estate showcase site for Bunty Group.", stack: "React", href: "https://bunty-group.vercel.app" },
  { name: "Bombay House", industry: "finance", type: "client", year: "2026", blurb: "AI growth pitch for a luxury property brand.", stack: "Strategy", href: "" },

  // Education & Impact
  { name: "Mentoverse", industry: "education", type: "",  year: "2025", blurb: "Helping people find their next step in education, career and beyond.", stack: "Next.js · Firebase", href: "https://mentoverse.co.in", links: {instagram: "https://instagram.com/mentoverse_", linkedin: "https://www.linkedin.com/company/mentoverse/", x: "https://twitter.com/mentoverse", facebook: "https://www.facebook.com/mentoverse"} },
  { name: "Morphoverse", industry: "education", type: "venture", year: "2025", blurb: "Emotional intelligence for leaders.", stack: "Next.js", href: "https://morphoverse-ecru.vercel.app" },
  { name: "With You NGO", industry: "education", type: "client", year: "2025", blurb: "Site for an NGO working with communities since 2015.", stack: "Next.js", href: "https://v0-website-development-brief-mauve.vercel.app", links: {instagram: "https://www.instagram.com/withyou.ngo/", linkedin: "https://www.linkedin.com/company/withyoufoundation/", facebook: "https://www.facebook.com/profile.php?id=100064656521136"} },
  { name: "IIHM", industry: "education", type: "client", year: "2025", blurb: "Site for the International Institute of Hotel Management.", stack: "React", href: "https://iihm.vercel.app" },
  { name: "Saamrajya.tech", industry: "education", type: "client", year: "2025", blurb: "Strategic political consulting in India.", stack: "Next.js", href: "https://saamrajhya-tech.vercel.app" },

  // Design, Interiors & Fashion
  { name: "Kathnicc", industry: "design", type: "client", year: "2025", blurb: "Luxury interior design studio.", stack: "Next.js", href: "https://kathnicc-website.vercel.app", links: {instagram: "https://www.instagram.com/kathnicc_/"} },
  { name: "Stone Haus Studio", industry: "design", type: "client", year: "2026", blurb: "Design studio with an A-Z index of its work.", stack: "HTML", href: "https://stonehaus.in", repo: "https://github.com/KraftX-Dev2025/stonehausstudio" },
  { name: "Violate", industry: "design", type: "client", year: "2026", blurb: "Fashion label site, plus a live wishlist and AI vendor finder.", stack: "HTML · AI", href: "https://violate-three.vercel.app" },
  { name: "Alphabetical Studio", industry: "design", type: "client", year: "2026", blurb: "Portfolio site for an art-direction studio.", stack: "Web", href: "" },
  { name: "Blanco", industry: "design", type: "client", year: "2026", blurb: "Bespoke campaign for a luxury brand.", stack: "Campaign", href: "" },
  { name: "Carbon Chrome", industry: "design", type: "client", year: "2026", blurb: "Viral content strategy for an automotive detailing brand.", stack: "Strategy", href: "" },

  // Food & Hospitality
  { name: "The Chaat Cafe", industry: "food", type: "client", year: "2025", blurb: "Authentic Indian street food, online.", stack: "Next.js", href: "https://the-chaat-cafe.vercel.app" },
  { name: "Anantara", industry: "food", type: "client", year: "2026", blurb: "90-day content plan, holiday marketing and an ops kit for a hospitality brand.", stack: "Marketing · Ops", href: "" },
  { name: "Tossin Pizza", industry: "food", type: "client", year: "2026", blurb: "Growth proposal for a pizza brand.", stack: "Strategy", href: "" },

  // Commerce & Services
  { name: "Oriental Sports", industry: "commerce", type: "client", year: "2026", blurb: "Shopify store, custom theme and app for a sports-goods brand.", stack: "Shopify · React Router", href: "", links: {instagram: "https://instagram.com/oriental_sportspune"} },
  { name: "Tailoring Turba", industry: "commerce", type: "client", year: "2025", blurb: "Custom T-shirt printing with an in-browser designer.", stack: "Next.js", href: "https://tailoringturba.com", links: {instagram: "https://www.instagram.com/tailoringturba", linkedin: "https://www.linkedin.com/company/tailoringturba", facebook: "https://www.facebook.com/tailoringturba"} },
  { name: "Adv. Shivraj", industry: "commerce", type: "client", year: "2026", blurb: "Site for an advocate and legal counsel.", stack: "HTML", href: "https://adv-shivraj.vercel.app" },
  { name: "Nutrivita", industry: "commerce", type: "client", year: "2025", blurb: "Company overview film.", stack: "Video", href: "" },

  // Studio & Tools
  { name: "KraftX", industry: "studio", type: "venture", year: "2023–", blurb: "Growth and venture studio for rebels who are also achievers. Engineering, ops, finance and legal under one roof.", stack: "Studio", href: "https://www.kraftxworks.com" },
  { name: "VaultFill", industry: "studio", type: "experiment", year: "2026", blurb: "Chrome password manager. AES-256-GCM vault, PBKDF2 with 600k iterations, nothing leaves your device.", stack: "Chrome MV3", href: "" },
  { name: "WLED Gestures", industry: "studio", type: "experiment", year: "2026", blurb: "Control your lights with hand gestures, right in the browser.", stack: "MediaPipe · WLED", href: "https://wled-gestures.vercel.app" },
  { name: "OpenClaw playbooks", industry: "studio", type: "experiment", year: "2026", blurb: "Install, security, cron and UGC guides for running OpenClaw agents.", stack: "Guides", href: "" },
  { name: "Great Urtuu (Robocon 2019)", industry: "studio", type: "experiment", year: "2019", blurb: "Wheels were banned, so our 30-member team built a four-legged robot that walks like a horse and climbs a mountain, plus a manual robot. Reached the nationals in Delhi.", stack: "Mechanical · Robotics", href: "" }
];
