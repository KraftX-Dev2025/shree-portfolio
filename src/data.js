/* All public content for the site lives here.
   Curated from Shree's chronology. Edit freely; every section reads from this file. */

window.SITE = {
  name: "Shree",
  tagline: "Founder · KraftX · Hypercurated",
  headline: "I build AI products and the brands around them.",
  intro: "Mechanical engineer from MIT Pune. Took a walking robot to the Robocon nationals, left a corporate job in 2023, and have shipped 54 products since.",
  showreel: "", // drop a URL like "showreel.mp4" here when it's ready
  ticker: ["Origami", "Robocon", "75 Hard", "KraftX", "Hypercurated", "Ashwathhama LLM", "Stand-up", "Pickleball champ", "First rap", "Digital twin"],
  socials: [
    { label: "Hypercurated", href: "https://hypercurated.co" },
    { label: "LinkedIn", href: "" }, // add real URLs; empty ones are hidden
    { label: "Instagram", href: "" }
  ]
};

/* ---------- "Download my memory" card ----------
   Traits are scored out of 10 and drawn as a radar. Edit freely. */
window.PERSONA = {
  traits: [["Builder", 10], ["Curiosity", 10], ["Comedy", 8], ["Discipline", 8], ["Tech", 9], ["Taste", 8], ["Wanderlust", 8], ["Spirit", 7]],
  core: ["Origami", "Robocon", "75 Hard", "KraftX", "Ashwathhama", "250 people · 19 minutes"],
  banter: "Never thought I'd end up in your Downloads folder too.",
  url: "shree-hypercurator-and-serial-chiller.vercel.app"
};

/* ---------- Memory graph ----------
   Each node: id, label, note (shown in side panel), parent.
   Clicking a node reveals its children. */
window.GRAPH = [
  { id: "shree", label: "Shree", note: "Mechanical engineer turned founder. Also does stand-up." },

  { id: "roots", parent: "shree", label: "Roots", note: "Small-town kid, youngest at home. Grew up on gadgets and sci-fi." },
  { id: "origami", parent: "roots", label: "Origami", note: "Paper barter in school. My first trades." },
  { id: "clay", parent: "roots", label: "Clay models", note: "Rubber clay set with coconut oil. Early practice at making things by hand." },
  { id: "ecoclub", parent: "roots", label: "Eco Club", note: "Nature, National Geographic, Warli painting, pottery." },
  { id: "balbhavan", parent: "roots", label: "Balbhavan", note: "Where the curiosity started." },
  { id: "fancydress", parent: "roots", label: "Plastic Bhasmasur", note: "Entered a fancy-dress competition as a monster made of plastic waste." },
  { id: "spirit", parent: "roots", label: "Spirituality", note: "Keeps me grounded." },

  { id: "tech", parent: "shree", label: "Tech & Robotics", note: "Google had every answer, so I learned anything digital." },
  { id: "cs", parent: "tech", label: "CS 1.6", note: "Competitive gamer. Learned that teams lose when nobody talks." },
  { id: "mit", parent: "tech", label: "MIT Pune · Mechanical", note: "Mechanical Engineering at MIT Pune. Second year is when Robocon took over." },
  { id: "robocon", parent: "tech", label: "Robocon", note: "Robocon 2019, theme Great Urtuu: wheels banned. Our 30-member, five-branch team built a four-legged robot that walks like a horse and climbs a mountain, plus a manual robot. I made 29 parts runs across Pune that season." },
  { id: "nst", parent: "robocon", label: "Delhi NST", note: "Milled and welded in the lab till 3 AM, then took the walking robot to the national stage in Delhi." },
  { id: "drive", parent: "robocon", label: "Drive system", note: "Pushed a drive-system upgrade through heavy resistance." },
  { id: "mindspark", parent: "tech", label: "Mindspark", note: "College tech events and the hacker brain." },
  { id: "gadgets", parent: "tech", label: "Gadget dealer", note: "Ran a phone trading hustle long before any company." },

  { id: "body", parent: "shree", label: "Body", note: "Skinny as a kid. Training since 2018." },
  { id: "gym", parent: "body", label: "Gym since 2018", note: "Personal training, diet, the whole discipline." },
  { id: "hard75", parent: "body", label: "75 Hard", note: "Completed all 75 days." },
  { id: "cricket", parent: "body", label: "Cricket", note: "Aggressive, competitive, tournament player." },
  { id: "pickle", parent: "body", label: "Pickleball", note: "Won a pickleball tournament in 2025." },
  { id: "kart", parent: "body", label: "Go-karting", note: "Flipped the leaderboard upside down." },

  { id: "founder", parent: "shree", label: "Founder", note: "Each brand started as a problem on a list of 1,000." },
  { id: "kraftx", parent: "founder", label: "KraftX", note: "Started in 2023 with Prateek. Built for rebels who are also achievers." },
  { id: "kxpeak", parent: "kraftx", label: "25 brains", note: "Pitched 25 people. Built the crew from them." },
  { id: "first5", parent: "kraftx", label: "First 5 clients", note: "Client one was a local medical store in Pune." },
  { id: "hc", parent: "founder", label: "Hypercurated", note: "Feed, community and events. Your data stays yours." },
  { id: "hcevents", parent: "hc", label: "HC Events", note: "Thunder rave and more." },
  { id: "assistfit", parent: "founder", label: "AssistFit", note: "An early fitness startup idea from 2019–21." },
  { id: "offduty", parent: "founder", label: "Off Duty Driver", note: "Born in 2023 out of a love for cars." },
  { id: "eazy", parent: "founder", label: "EAZY Ayurveda", note: "My mother's company. Everyone at home is a founder." },
  { id: "fishtank", parent: "founder", label: "Fish Tank", note: "Business as entertainment. A launch format for founders." },

  { id: "ai", parent: "shree", label: "AI", note: "Absolute personalisation is the layer to automate." },
  { id: "ashwa", parent: "ai", label: "Ashwathhama", note: "Built my own LLM in 2025." },
  { id: "molt", parent: "ai", label: "Home automation", note: "Agents on WhatsApp, a heartbeat, a sense layer of bulbs and speakers." },
  { id: "twin", parent: "ai", label: "Digital twin", note: "Created a more dangerous version of myself. You can talk to it on this site." },
  { id: "twins", parent: "twin", label: "Connect all twins", note: "What is possible right now is connecting all the digital twins." },
  { id: "rentbrain", parent: "ai", label: "Rent your brain", note: "Rent your brain for intelligence." },

  { id: "stage", parent: "shree", label: "Stage", note: "I got a voice after 27 years." },
  { id: "standup", parent: "stage", label: "Stand-up", note: "Held 250 people for 19 minutes." },
  { id: "rap", parent: "stage", label: "First rap", note: "A founder's story, in bars." },
  { id: "podcast", parent: "stage", label: "First podcast", note: "December 2025." },
  { id: "content", parent: "stage", label: "Content", note: "LinkedIn and reels took off in late 2025." },
  { id: "acting", parent: "stage", label: "Acting class", note: "Comedy and acting have layers." },

  { id: "world", parent: "shree", label: "Travel", note: "Travel is the best dopamine." },
  { id: "kedar", parent: "world", label: "Kedarkantha", note: "Winter trek out of Dehradun." },
  { id: "thai", parent: "world", label: "Thailand", note: "Bangkok, Phuket and the islands." },
  { id: "south", parent: "world", label: "South India", note: "Coorg, Wayanad, Gokarna, Mysuru, Pondicherry." },
  { id: "north", parent: "world", label: "Rajasthan & Manali", note: "Jaipur, Pushkar, Ranthambore, the mountains." },
  { id: "abroad", parent: "world", label: "Dubai & Singapore", note: "First trips abroad." },

  { id: "taste", parent: "shree", label: "Taste", note: "Fashion, cars, music, interiors, food." },
  { id: "cars", parent: "taste", label: "Petrolhead", note: "Drifting the Vento, off-road carnivals, Ferrari events." },
  { id: "sneakers", parent: "taste", label: "Sneakers", note: "Sneaker fests and the Underground meetups." },
  { id: "interior", parent: "taste", label: "Interiors", note: "Sofas, laminates, a whole home-decor stint in 2021." },
  { id: "dj", parent: "taste", label: "DJ & music", note: "Rave nights and long playlists." }
];

/* ---------- Timeline chapters ----------
   act: which illustrated scene plays.  boy: the twin's face + line. */
window.CHAPTERS = [
  { years: "1998–2008", age: 0.52, act: "origami", title: "Paper first", diary: "Origami, paper barter in school, clay set with coconut oil. My first trades.", boy: { face: "wonder", line: "That crane was homework." } },
  { years: "2009–2013", age: 0.6, act: "gaming", title: "The screen years", diary: "CS 1.6, gadgets, Google for every question. Shy offline, fluent online.", boy: { face: "curious", line: "One more round." } },
  { years: "2014–2016", age: 0.7, act: "campus", title: "College", diary: "Tech events, and the first trips out: Dubai, Manali.", boy: { face: "happy", line: "Passport stamps. Noted." } },
  { years: "2017–2019", age: 0.82, act: "robocon", title: "Robocon: a robot that walks", diary: "Robocon 2019 banned wheels, so our 30-person team built a four-legged robot that walks like a horse and climbs a mountain. 29 parts runs across Pune, welding till 3 AM, and we made the nationals in Delhi.", boy: { face: "proud", line: "We built that." } },
  { years: "2020", age: 0.9, act: "gym", title: "Lockdown", diary: "Personal training, a diet, and patience. The habit stuck.", boy: { face: "shock", line: "He used to be the skinny one." } },
  { years: "2021–2022", age: 0.95, act: "corporate", title: "Cars and corporate", diary: "Graduated into a job in automobiles. Sneaker fests and cricket leagues on weekends. Learned how a big company runs.", boy: { face: "bored", line: "Nine to six, every day." } },
  { years: "2023", age: 1, act: "leap", title: "The resignation", diary: "Resigned in 2023 and started KraftX with Prateek. Client one was a medical store in Pune.", boy: { face: "nervous", line: "He actually quit." } },
  { years: "2024", age: 1, act: "juggle", title: "1,000 problems", diary: "Listed 1,000 problems across industries and started building against them: Fish Tank, Hypercurated events. Finished 75 Hard.", boy: { face: "dizzy", line: "I've lost count of the companies." } },
  { years: "2025", age: 1, act: "content", title: "On camera", diary: "Built Ashwathhama, an LLM. Won a pickleball tournament. First rap, first podcast, and the posts took off.", boy: { face: "cheer", line: "He's recording again." } },
  { years: "2026", age: 1, act: "standup", title: "Stand-up", diary: "One set. 250 people. 19 minutes.", boy: { face: "laugh", line: "Fine. He's funny." } },
  { years: "Now", age: 1, act: "twin", title: "The twin", diary: "The kid on the crate saw every scene. He runs on my stories now. Ask him what you'd ask me.", boy: { face: "wink", line: "Questions go below." } }
];

/* ---------- Projects ---------- */
window.PROJECTS = [
  { name: "KraftX", year: "2023–", kind: "Company", blurb: "Growth and venture studio for rebels who are also achievers. Engineering, ops, finance and legal under one roof.", tags: ["Founder", "Studio"], href: "https://www.kraftxworks.com" },
  { name: "Hypercurated", year: "2024–", kind: "Platform", blurb: "Feed, community and event hosting in one place, built on the idea that your data belongs to you.", tags: ["Consumer", "Community"], href: "https://hypercurated.co" },
  { name: "Ashwathhama", year: "2025", kind: "AI", blurb: "A homegrown LLM. The twin on this site grew out of it.", tags: ["LLM", "Twin"], href: "https://ashwathhama.vercel.app" },
  { name: "Home agent", year: "2026", kind: "AI", blurb: "An agent on WhatsApp with a heartbeat and a sense layer. It runs the lights, speakers and alarms without a browser.", tags: ["Agents", "Automation"], href: "" },
  { name: "Great Urtuu", year: "2019", kind: "Robocon", blurb: "Wheels banned. Our team built a four-legged robot that walks like a horse and climbs a mountain, and took it to the nationals in Delhi.", tags: ["Hardware", "Team"], href: "" },
  { name: "Fish Tank", year: "2024", kind: "Format", blurb: "Business as entertainment. A launch format for founders.", tags: ["Events", "Founders"], href: "https://fish-tank-sigma.vercel.app" }
];

/* ---------- Whiteboard seed thoughts ----------
   cluster sets the colour; x,y place them on the board. */
window.CLUSTERS = {
  ai: { label: "AI & twins", x: 60, y: 40 },
  life: { label: "How to live", x: 640, y: 40 },
  stage: { label: "Voice & comedy", x: 1220, y: 40 },
  build: { label: "Building", x: 60, y: 720 },
  self: { label: "Fear & identity", x: 640, y: 720 }
};
window.THOUGHTS = [
  { id: "t1", c: "ai", date: "14.6.26", text: "Rent your brain for intelligence." },
  { id: "t2", c: "ai", date: "29.5.26", text: "Created a more dangerous version of myself. How can I trust it? I'm just proud of what I've created." },
  { id: "t3", c: "ai", date: "8.4.26", text: "What is possible right now is connecting all the digital twins." },
  { id: "t4", c: "ai", date: "31.1.26", text: "What goes on in a person's head? Absolute personalisation. That is the layer to automate." },
  { id: "t5", c: "ai", date: "30.1.26", text: "Code just doesn't matter. You can just rebuild it." },
  { id: "t6", c: "ai", date: "29.4.26", text: "AI is coming for everyone. Create abundance." },
  { id: "t7", c: "stage", date: "21.5.26", text: "Comedy needs context of every topic plus one step ahead. Better jokes, better topics. Both axes." },
  { id: "t8", c: "stage", date: "23.5.26", text: "People are extremely stressed. I live for the laugh." },
  { id: "t9", c: "stage", date: "8.4.26", text: "Create jokes on all my insecurities." },
  { id: "t10", c: "stage", date: "22.5.26", text: "Life is a story." },
  { id: "t11", c: "build", date: "1.12.24", text: "All of the brands are me solving a problem. I listed 1000 problems in every industry." },
  { id: "t12", c: "build", date: "Jan 26", text: "Everyone has to be a salesman. There isn't going to be a right time." },
  { id: "t13", c: "build", date: "14.11.25", text: "Rebels but achievers is what KraftX is." },
  { id: "t14", c: "build", date: "4.1.26", text: "My data is my data. It should not be used by someone else." },
  { id: "t15", c: "build", date: "10.11.25", text: "Hire for learnability. We're co-creating a better world." },
  { id: "t16", c: "self", date: "24.4.26", text: "Confront your identity and wear it. That's what I'm afraid of." },
  { id: "t17", c: "self", date: "21.5.26", text: "I got a voice after 27 years." },
  { id: "t18", c: "self", date: "12.8.25", text: "I was never born for the systems. Schools, colleges, institutions." },
  { id: "t19", c: "self", date: "1.12.24", text: "Fear: people will judge me." },
  { id: "t20", c: "self", date: "2024", text: "Every best thing in my life got messed up by under-communication." },
  { id: "t21", c: "life", date: "2024", text: "Experiences are the best dopamine." },
  { id: "t22", c: "life", date: "2024", text: "Curiosity will build everything. Care about the art; it takes care of the rest." },
  { id: "t23", c: "life", date: "23.7.25", text: "All I'm doing is living in tomorrow. Live today." },
  { id: "t24", c: "life", date: "Jan 26", text: "You can achieve anything. What is your fire? That's the question to ask." },
  { id: "t25", c: "life", date: "Apr 25", text: "Family is the only thing you fall back to." },
  { id: "t26", c: "life", date: "23.9.25", text: "One year can change your life." }
];
window.LINKS = [["t2", "t3"], ["t3", "t1"], ["t4", "t14"], ["t9", "t16"], ["t17", "t8"], ["t11", "t12"], ["t20", "t17"], ["t22", "t7"], ["t24", "t21"], ["t5", "t11"]];

/* ---------- Twin: fallback brain used when no API is connected ---------- */
window.TWIN = {
  greeting: "I'm Shree's twin. I know the stories he leaves out of interviews. Ask about KraftX, Robocon, stand-up or AI.",
  intents: [
    { k: ["kraftx", "kx", "company", "agency"], a: "KraftX started in 2023 with Prateek. The first six months tested whether your co-founder shows up. Client one was a local medical store in Pune. Since then, 54 products across 10 industries." },
    { k: ["hypercurated", "hc", "platform", "events"], a: "Hypercurated is feed, community and event hosting in one place. Your data stays yours, not the algorithm's." },
    { k: ["robot", "robocon", "lab", "mit"], a: "Robocon 2019, theme Great Urtuu. Wheels were banned, so our 30-member, five-branch team at MIT Pune built a four-legged robot that walks like a horse and climbs a mountain, plus a manual robot. I was in second-year Mechanical and made 29 parts runs across Pune that season: Bohri Ali, gear shops, welders. Lab till 3 AM, and we made the nationals in Delhi. It's where I learned how teams actually work." },
    { k: ["standup", "stand-up", "comedy", "joke", "funny"], a: "250 people, 19 minutes, one set. Good comedy needs context on every topic and a step ahead of the room. Tell me your job if you want a roast." },
    { k: ["ai", "llm", "twin", "agent", "ashwathhama"], a: "Shree built an LLM called Ashwathhama in 2025, then a home agent that runs on WhatsApp. Next: connecting everyone's digital twins." },
    { k: ["gym", "fitness", "75", "workout"], a: "Training since 2018. Finished 75 Hard. Ask about the diet, not the motivation." },
    { k: ["origami", "child", "kid", "school"], a: "Origami and paper barter in school, then clay models and the Eco Club. A shy front-bench kid with a lot going on inside." },
    { k: ["fear", "introvert", "shy", "scared"], a: "I was an extreme introvert for most of my life. The voice came at 27. Confront your identity and wear it." },
    { k: ["hire", "work", "collab", "contact", "email"], a: "Leave a note on the Thoughts board. Shree reads every one." },
    { k: ["roast"], a: "You opened a stranger's portfolio and asked his AI to bully you. Bold. Tell me your job and I'll start." },
    { k: ["advice", "life", "should i", "how do i"], a: "Work out what your fire is. There won't be a right time. One year can change your life." }
  ],
  fallback: "Not in my memory yet. Try KraftX, Robocon, stand-up, AI or training."
};
