/* All public content for the site lives here.
   Curated from Shree's chronology. Edit freely; every section reads from this file. */

window.SITE = {
  name: "Shree",
  tagline: "I build journey experiences.",
  headline: "Founder of KraftX and Hypercurated. I build AI products and the brands around them.",
  intro: "Robotics kid, gym rat, stand-up comic, AI tinkerer. Twenty-seven years of trying everything, one story.",
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
  { id: "shree", label: "Shree", note: "Innovator, builder, comic. The most multifaceted person I know how to be." },

  { id: "roots", parent: "shree", label: "Roots", note: "Small-town kid, youngest at home, grew up in a fantasy world of gadgets and sci-fi." },
  { id: "origami", parent: "roots", label: "Origami", note: "Paper barter in school. Folded my way into my first trades." },
  { id: "clay", parent: "roots", label: "Clay models", note: "Rubber clay plus coconut oil. Early lessons in making things by hand." },
  { id: "ecoclub", parent: "roots", label: "Eco Club", note: "Nature, National Geographic, Warli painting, pottery." },
  { id: "balbhavan", parent: "roots", label: "Balbhavan", note: "Where a lot of the curiosity started." },
  { id: "fancydress", parent: "roots", label: "Plastic Bhasmasur", note: "Won hearts at a fancy dress competition dressed as a plastic monster." },
  { id: "spirit", parent: "roots", label: "Spirituality", note: "My one brahmastra. Keeps me grounded." },

  { id: "tech", parent: "shree", label: "Tech & Robotics", note: "Every answer was on Google. I pushed myself to master anything digital." },
  { id: "cs", parent: "tech", label: "CS 1.6", note: "Competitive gamer. Learned that teams lose when nobody talks." },
  { id: "robocon", parent: "tech", label: "Robocon", note: "Years in the MIT lab. Prototyping, milling, welding, late-night pit checklists." },
  { id: "nst", parent: "robocon", label: "Delhi NST", note: "Took the bot to the national stage." },
  { id: "drive", parent: "robocon", label: "Drive system", note: "Pushed a drive-system upgrade through heavy resistance." },
  { id: "mindspark", parent: "tech", label: "Mindspark", note: "College tech events and the hacker brain." },
  { id: "gadgets", parent: "tech", label: "Gadget dealer", note: "Ran a phone trading hustle long before any company." },

  { id: "body", parent: "shree", label: "Body", note: "Skinny kid turned athlete. Fitness is my forte." },
  { id: "gym", parent: "body", label: "Gym since 2018", note: "Personal training, diet, the whole discipline." },
  { id: "hard75", parent: "body", label: "75 Hard", note: "Completed it. If I can do it, you definitely can." },
  { id: "cricket", parent: "body", label: "Cricket", note: "Aggressive, competitive, tournament player." },
  { id: "pickle", parent: "body", label: "Pickleball", note: "Won a pickleball tournament in 2025." },
  { id: "kart", parent: "body", label: "Go-karting", note: "Flipped the leaderboard upside down." },

  { id: "founder", parent: "shree", label: "Founder", note: "Every brand is me solving a problem. I listed 1000 problems in every industry." },
  { id: "kraftx", parent: "founder", label: "KraftX", note: "Started in 2023 with Prateek. Rebels but achievers. A vision for people who don't yet know their potential." },
  { id: "kxpeak", parent: "kraftx", label: "25 brains", note: "Showed the vision to 25 people and built a crew." },
  { id: "first5", parent: "kraftx", label: "First 5 clients", note: "Starting with a local medical store in Pune." },
  { id: "hc", parent: "founder", label: "Hypercurated", note: "Feed, community and events. My data is my data." },
  { id: "hcevents", parent: "hc", label: "HC Events", note: "Thunder rave and more." },
  { id: "assistfit", parent: "founder", label: "AssistFit", note: "An early fitness startup idea from 2019–21." },
  { id: "offduty", parent: "founder", label: "Off Duty Driver", note: "Born in 2023 out of a love for cars." },
  { id: "eazy", parent: "founder", label: "EAZY Ayurveda", note: "My mom is a founder too. Everyone at home is." },
  { id: "fishtank", parent: "founder", label: "Fish Tank", note: "Business x entertainment. End-to-end setup for launching founders." },

  { id: "ai", parent: "shree", label: "AI", note: "Absolute personalisation is the layer to automate." },
  { id: "ashwa", parent: "ai", label: "Ashwathhama", note: "Built my own LLM in 2025." },
  { id: "molt", parent: "ai", label: "Home automation", note: "Agents on WhatsApp, a heartbeat, a sense layer of bulbs and speakers." },
  { id: "twin", parent: "ai", label: "Digital twin", note: "Created a more dangerous version of myself. You can talk to it on this site." },
  { id: "twins", parent: "twin", label: "Connect all twins", note: "What is possible right now is connecting all the digital twins." },
  { id: "rentbrain", parent: "ai", label: "Rent your brain", note: "Rent your brain for intelligence." },

  { id: "stage", parent: "shree", label: "Stage", note: "I got a voice after 27 years." },
  { id: "standup", parent: "stage", label: "Stand-up", note: "Held a crowd of 250 for 19 minutes without a dull moment." },
  { id: "rap", parent: "stage", label: "First rap", note: "A founder's journey, in bars." },
  { id: "podcast", parent: "stage", label: "First podcast", note: "December 2025." },
  { id: "content", parent: "stage", label: "Content", note: "LinkedIn and reels took off in late 2025. I can spot a star before they're a rockstar." },
  { id: "acting", parent: "stage", label: "Acting class", note: "Comedy and acting have layers." },

  { id: "world", parent: "shree", label: "Travel", note: "Experiences are the best dopamine." },
  { id: "kedar", parent: "world", label: "Kedarkantha", note: "Winter trek out of Dehradun." },
  { id: "thai", parent: "world", label: "Thailand", note: "Bangkok, Phuket and the islands, outfit planned for every day." },
  { id: "south", parent: "world", label: "South India", note: "Coorg, Wayanad, Gokarna, Mysuru, Pondicherry." },
  { id: "north", parent: "world", label: "Rajasthan & Manali", note: "Jaipur, Pushkar, Ranthambore, the mountains." },
  { id: "abroad", parent: "world", label: "Dubai & Singapore", note: "First trips abroad." },

  { id: "taste", parent: "shree", label: "Taste", note: "Fashion, cars, music, interiors, food." },
  { id: "cars", parent: "taste", label: "Petrolhead", note: "Drifting the Vento, off-road carnivals, Ferrari events." },
  { id: "sneakers", parent: "taste", label: "Sneakers", note: "Sneaker fests and the Underground meetups." },
  { id: "interior", parent: "taste", label: "Interiors", note: "Sofas, laminates, a whole home-decor stint in 2021." },
  { id: "dj", parent: "taste", label: "DJ & music", note: "Rave nights and a playlist for every mood." }
];

/* ---------- Timeline chapters ----------
   act: which illustrated scene plays.  boy: the twin's face + line. */
window.CHAPTERS = [
  { years: "1998–2008", age: 0.52, act: "origami", title: "Paper first", diary: "Origami, paper barter, clay with coconut oil. The first things I ever traded.", boy: { face: "wonder", line: "He made a crane out of homework?" } },
  { years: "2009–2013", age: 0.6, act: "gaming", title: "The screen years", diary: "CS 1.6, gadgets, Google for every question. A shy kid who believed the web had better answers than people.", boy: { face: "curious", line: "One more round. Then sleep." } },
  { years: "2014–2016", age: 0.7, act: "campus", title: "Campus & first trips", diary: "Admitted to college, tech events, first trips to Dubai and Manali. The world got bigger.", boy: { face: "happy", line: "Wait, there's a whole world out there?" } },
  { years: "2017–2019", age: 0.82, act: "robocon", title: "Robocon", diary: "Lab till 3 AM. Milling, welding, pit checklists, taking the bot to the national stage in Delhi.", boy: { face: "proud", line: "That robot is ours." } },
  { years: "2020", age: 0.9, act: "gym", title: "Iron & lockdown", diary: "Back into life, don't compromise. Personal training, diet, patience. Life is a process.", boy: { face: "shock", line: "The skinny one is lifting HOW much?" } },
  { years: "2021–2022", age: 0.95, act: "corporate", title: "Cars & corporate", diary: "Convocation, a job in automobiles, sneaker fests, cricket leagues. Learning how the big machine works.", boy: { face: "bored", line: "Is this the plan forever?" } },
  { years: "2023", age: 1, act: "leap", title: "The leap", diary: "Resigned. Moved fast. Started KraftX with Prateek and fought for the first five clients, beginning with a medical store in Pune.", boy: { face: "nervous", line: "Did he just quit?!" } },
  { years: "2024", age: 1, act: "juggle", title: "A thousand problems", diary: "Listed 1000 problems across industries. Fish Tank, Hypercurated events, a brand for every itch. Finished 75 Hard.", boy: { face: "dizzy", line: "How many companies is that now?" } },
  { years: "2025", age: 1, act: "content", title: "Turning the camera on", diary: "Built Ashwathhama, an LLM. Won a pickleball tournament. First rap, first podcast, content that people actually love.", boy: { face: "cheer", line: "Go go go!" } },
  { years: "2026", age: 1, act: "standup", title: "A voice after 27 years", diary: "A crowd of 250, hooked for 19 minutes. Live for the laugh.", boy: { face: "laugh", line: "HAHAHA. He's actually funny." } },
  { years: "Now", age: 1, act: "twin", title: "Meet the watcher", diary: "The kid who watched all of this is my digital twin. He remembers everything. Ask him anything.", boy: { face: "wink", line: "Psst. Want to talk to me?" } }
];

/* ---------- Projects ---------- */
window.PROJECTS = [
  { name: "KraftX", year: "2023–", kind: "Company", blurb: "Growth and venture studio for rebels who are also achievers. Engineering, ops, finance and legal under one roof.", tags: ["Founder", "Studio"], href: "https://www.kraftxworks.com" },
  { name: "Hypercurated", year: "2024–", kind: "Platform", blurb: "Feed, community and event hosting in one place, built on the idea that your data belongs to you.", tags: ["Consumer", "Community"], href: "https://hypercurated.co" },
  { name: "Ashwathhama", year: "2025", kind: "AI", blurb: "A homegrown LLM. The start of the digital twin you can talk to on this site.", tags: ["LLM", "Twin"], href: "https://ashwathhama.vercel.app" },
  { name: "Home agent", year: "2026", kind: "AI", blurb: "Agent on WhatsApp with a heartbeat and a sense layer: lights, speakers, alarms, no browser.", tags: ["Agents", "Automation"], href: "" },
  { name: "Robocon bot", year: "2017–19", kind: "Robotics", blurb: "Competition robot built in the college lab, raced at the national stage in Delhi.", tags: ["Hardware", "Team"], href: "" },
  { name: "Fish Tank", year: "2024", kind: "Format", blurb: "Business meets entertainment. An end-to-end launchpad for talented founders.", tags: ["Events", "Founders"], href: "https://fish-tank-sigma.vercel.app" }
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
  greeting: "Hey, I'm Shree's twin. I watched him grow up, so I know where the bodies are buried (metaphorically). Ask me about KraftX, robotics, stand-up, AI, or what to do with your life.",
  intents: [
    { k: ["kraftx", "kx", "company", "agency"], a: "KraftX started in 2023 with Prateek. The first six months were basically a test of whether your co-founder shows up. First client was a local medical store in Pune. Now it's a crew of rebels who are also achievers." },
    { k: ["hypercurated", "hc", "platform", "events"], a: "Hypercurated is feed plus community plus event hosting. The whole idea is that your data is yours, not the algorithm's." },
    { k: ["robot", "robocon", "lab", "mit"], a: "Robocon was 2017 to 2019. Lab till 3 AM, milling and welding, politics, and finally the national stage in Delhi. It's where I learned how teams actually work." },
    { k: ["standup", "stand-up", "comedy", "joke", "funny"], a: "I held 250 people for 19 minutes straight. To be funny you need context on every topic plus one step ahead. Want a roast? Tell me your job." },
    { k: ["ai", "llm", "twin", "agent", "ashwathhama"], a: "I'm built on that obsession. Shree built an LLM called Ashwathhama in 2025, then a home agent that runs on WhatsApp. Next step is connecting everyone's digital twins." },
    { k: ["gym", "fitness", "75", "workout"], a: "Skinny kid, now fitness is the forte. Gym since 2018, and 75 Hard is done. If he can do it, you definitely can." },
    { k: ["origami", "child", "kid", "school"], a: "I started with origami and paper barter in school, plus clay models and the Eco Club. I was a shy front-bench kid living in a fantasy world." },
    { k: ["fear", "introvert", "shy", "scared"], a: "Honestly? I was an extreme introvert for most of my life. The voice came at 27. Confront your identity and wear it." },
    { k: ["hire", "work", "collab", "contact", "email"], a: "Love that. Drop your note on the whiteboard or reach out through Hypercurated. I read everything." },
    { k: ["roast"], a: "Okay. You opened a stranger's portfolio and asked the AI version of him to bully you. That's either confidence or a cry for help. Tell me your job and I'll go deeper." },
    { k: ["advice", "life", "should i", "how do i"], a: "Ask yourself what your fire is. There isn't going to be a right time. One year can change your life." }
  ],
  fallback: "Good question. My memory on that is still syncing. Try asking about KraftX, Robocon, stand-up, AI, or the gym."
};
