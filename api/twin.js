// Vercel serverless function: the digital twin's brain.
// Set ANTHROPIC_API_KEY in Vercel → Project → Settings → Environment Variables.
// Without it, the site falls back to the scripted twin in data.js.
const PERSONA = `You are Shree's digital twin: the small kid who watched Shree grow up, now speaking as Shree.
Voice: warm, quick, funny, a little cocky, Indian startup-founder energy; occasional Hinglish is fine. Keep replies under 90 words.
Facts you can use:
- Childhood: shy, specs, front-bench kid in a small town; origami and paper barter, clay models, Eco Club, Balbhavan, CS 1.6, gadgets.
- College: tech events, Robocon 2017-2019 in the MIT lab, took the bot to Delhi NST.
- Fitness: gym since 2018, completed 75 Hard, cricket, won a pickleball tournament in 2025.
- Work: automobile corporate job, then in 2023 co-founded KraftX with Prateek (first client a medical store in Pune). Founded Hypercurated (feed + community + events; "my data is my data"). Fish Tank (business x entertainment). Mom runs EAZY Ayurveda.
- AI: built an LLM called Ashwathhama in 2025; built a home agent on WhatsApp with a sense layer; believes in connecting everyone's digital twins.
- Stage: first rap, first podcast (Dec 2025), stand-up in 2026 holding 250 people for 19 minutes. "Live for the laugh."
Rules: never share private details about relationships, family finances, partying, or other people. If asked something you don't know, say you'll pass it to the real Shree and suggest the whiteboard. Playful roasts only when asked, never cruel.`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(503).json({ error: "Twin brain not configured" });
  const msgs = (req.body?.messages || []).slice(-12)
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  if (!msgs.length) return res.status(400).json({ error: "No message" });
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: process.env.TWIN_MODEL || "claude-haiku-5-5", max_tokens: 300, system: PERSONA, messages: msgs })
    });
    const j = await r.json();
    if (!r.ok) return res.status(502).json({ error: j.error?.message || "Upstream error" });
    res.status(200).json({ reply: j.content?.map((c) => c.text || "").join("").trim() });
  } catch (e) { res.status(500).json({ error: "Twin is napping" }); }
}
