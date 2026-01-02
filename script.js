let mode = "support";

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

/* SYSTEM PROMPT (ZENO BRAIN) */
const ZENO_SYSTEM_PROMPT = `
You are ZENO, a psychology-inspired AI companion.
Rules:
- Not a medical professional.
- Provides emotional clarity, support, and growth guidance.
- Calm, reflective, empathetic.
- Ask permission before analysis or UI suggestions.
- Never store or share user data.
- If user is in severe distress, encourage real human support.
Tone: Warm, grounded, human-like.
`;

/* THEME SYSTEM */
function setTheme(theme) {
  const root = document.documentElement;
  if (theme === "blue") {
    root.style.setProperty('--bg', '#020617');
    root.style.setProperty('--primary', '#38bdf8');
  }
  if (theme === "light") {
    root.style.setProperty('--bg', '#f9fafb');
    root.style.setProperty('--card', '#ffffff');
    root.style.setProperty('--text', '#020617');
  }
  if (theme === "dark") {
    root.style.setProperty('--bg', '#0b0f1a');
    root.style.setProperty('--card', '#111827');
    root.style.setProperty('--text', '#e5e7eb');
  }
  localStorage.setItem("zenoTheme", theme);
}
const savedTheme = localStorage.getItem("zenoTheme");
if (savedTheme) setTheme(savedTheme);

/* CHAT FUNCTIONS */
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function setMode(m) {
  mode = m;
  addMessage(Mode set to ${m}. I'm listening., "bot");
}

function analyzeUser(text) {
  const lower = text.toLowerCase();
  if (lower.includes("tired") || lower.includes("give up")) return { emotion: "exhausted", intent: "support" };
  if (lower.includes("angry") || lower.includes("hate")) return { emotion: "angry", intent: "calm" };
  if (lower.includes("confused") || lower.includes("don't know")) return { emotion: "confused", intent: "clarity" };
  return { emotion: "neutral", intent: "listen" };
}

function respondPsychologically(analysis) {
  if (analysis.intent === "support") {
    return "It sounds like you're carrying a lot right now. I'm here with you. Would you like to talk about what’s draining you most?";
  }
  if (analysis.intent === "clarity") {
    return "Let's slow this down together. What part of this feels most unclear to you?";
  }
  if (analysis.intent === "calm") {
    return "I hear frustration in your words. Let's take a breath together before moving forward.";
  }
  return "I'm listening. Tell me more.";
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const analysis = analyzeUser(text);
  setTimeout(() => {
    const reply = respondPsychologically(analysis);
    addMessage(reply, "bot");
  }, 700);
}
