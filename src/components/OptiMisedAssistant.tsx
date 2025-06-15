
import React, { useRef, useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

// Assistant visual config
const ASSISTANT_HEADER = "OptiMised Assistant";
const ASSISTANT_SUBHEADER = "Ask anything about your inventory, waste, or trends";

const SAMPLE_PROMPTS = [
  "What was the potato waste in 2014?",
  "Why did chicken over-usage spike last December?",
  "Which items are approaching expiry this week?",
  "Recommend reorder amount for beef",
  "Show top 5 wasted items last quarter",
] as const;

type Role = "assistant" | "user";
type ChatMessage = {
  role: Role;
  content: string;
  ts: Date;
  isFakeTyping?: boolean;
};

const CANNED_RESPONSES: Record<string, string[]> = {
  "What was the potato waste in 2014?": [
    "In 2014, you logged 96.3 kg of potato waste.",
    "Highest loss occurred in Q4 due to over-prep for holidays."
  ],
  "Why did chicken over-usage spike last December?": [
    "Chicken usage spiked by 28% last December.",
    "Likely due to seasonal demand and unlogged manual entries after POS sync."
  ],
  "Which items are approaching expiry this week?": [
    "3 items are nearing expiry this week:",
    "Tomatoes (2.3kg), Lettuce (1kg), and Milk (3L)."
  ],
  "Recommend reorder amount for beef": [
    "Your current beef stock will last ~2.4 days.",
    "Recommended reorder: 8.7 kg to cover projected sales."
  ],
  "Show top 5 wasted items last quarter": [
    "Top 5 wasted items last quarter:",
    "1. Lettuce, 2. Chicken, 3. Milk, 4. Bread Rolls, 5. Tomatoes."
  ],
  "Should I reorder lettuce?": [
    "You have 1.8 days of lettuce left based on current usage.",
    "Recommend reordering 6.5 kg to avoid stockout."
  ],
  "Which items expired last week?": [
    "3 items expired between June 3–9:",
    "Milk (2L), Chicken Breast (1.5kg), Fresh Herbs (0.3kg)",
    "All were flagged but only 1 logged as spoiled."
  ]
};

function getAssistantFakeResponse(query: string): string[] {
  if (CANNED_RESPONSES[query]) return CANNED_RESPONSES[query];
  // fallback dummy
  return ["Sorry, I don't have enough info to answer that.", "Try a sample question below!"];
}

const preloadMessages: ChatMessage[] = [
  {
    role: "assistant",
    content: "Hi! I’m here to help you track waste, inventory, and forecasts.",
    ts: new Date(Date.now() - 60 * 1000 * 3), // 3 mins ago
  },
  {
    role: "assistant",
    content: "Ask anything — even about past years!",
    ts: new Date(Date.now() - 60 * 1000 * 2), // 2 mins ago
  },
];

function timeAgo(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  if (diffMin < 1) return "Just now";
  if (diffMin === 1) return "1 min ago";
  return `${diffMin} mins ago`;
}

export const OptiMisedAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(preloadMessages);
  const [input, setInput] = useState("");
  const [isBotTyping, setBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  function handleOpenChange(val: boolean) {
    setOpen(val);
    if (val) setTimeout(() => {
      // Scroll to bottom on open
      if (chatEndRef.current)
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  function pushUserMessage(msg: string) {
    setMessages((msgs) => [
      ...msgs,
      { role: "user", content: msg, ts: new Date() },
    ]);
  }

  function pushAssistantMessage(msgs: string[]) {
    // Simulate typing...
    setIsBotTyping(true);
    // Add a fake typing bubble
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", ts: new Date(), isFakeTyping: true },
    ]);
    // Typing anim for 900ms, then 400ms per message
    setTimeout(() => {
      setMessages((prev) => {
        // Remove fake typing
        const filtered = prev.filter((m) => !m.isFakeTyping);
        // Add actual replies
        const tsBase = new Date();
        const extra = msgs.map((reply, i) => ({
          role: "assistant" as Role,
          content: reply,
          ts: new Date(tsBase.getTime() + i * 1000)
        }));
        return [...filtered, ...extra];
      });
      setIsBotTyping(false);
    }, 900 + msgs.length * 400);
  }

  function onSamplePrompt(prompt: string) {
    setInput(prompt);
    setTimeout(() => {
      handleSend();
    }, 200);
  }

  function handleSend(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    pushUserMessage(trimmed);
    setInput("");
    // show assistant typing + dummy reply
    setTimeout(() => {
      pushAssistantMessage(getAssistantFakeResponse(trimmed));
    }, 600);
  }

  // Floating button
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="fixed z-50 bottom-6 right-6 bg-teal-600 hover:bg-teal-700 shadow-xl rounded-full w-16 h-16 flex items-center justify-center text-white text-3xl outline-none focus:ring-2 focus:ring-ring transition-all"
              aria-label="Ask OptiMised Assistant"
              onClick={() => setOpen(true)}
              style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)" }}
            >
              <MessageCircle size={34} strokeWidth={2.4} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            Ask OptiMised Assistant
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Modal */}
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="right"
          className="sm:w-[420px] w-full max-w-full rounded-l-xl border border-white/10 bg-[#0D1A2B] px-0 py-0 shadow-2xl"
          style={{
            minHeight: "550px",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div className="flex flex-col gap-0 border-b border-white/10 py-3 px-6">
            <div className="text-base font-bold text-white">{ASSISTANT_HEADER}</div>
            <div className="text-xs text-white/70">{ASSISTANT_SUBHEADER}</div>
          </div>

          {/* Chat Feed */}
          <div className="flex-1 overflow-y-auto px-3 pb-2" style={{ fontFamily: "Inter, sans-serif" }}>
            <div className="flex flex-col gap-2 pt-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`
                    ${msg.role === "user"
                      ? "bg-teal-600 text-white ml-10"
                      : "bg-white text-gray-900 mr-10"
                    }
                    px-4 py-2 rounded-2xl max-w-[82%] shadow
                    ${msg.isFakeTyping ? "bg-gray-100/40 text-gray-400 font-sans" : ""}
                  `}
                    style={{ position: "relative" }}>
                    {msg.isFakeTyping
                      ? (
                        <span className="inline-flex gap-1 animate-pulse">
                          <span className="dot w-2 h-2 rounded-full bg-gray-500 inline-block" />
                          <span className="dot w-2 h-2 rounded-full bg-gray-400 inline-block" />
                          <span className="dot w-2 h-2 rounded-full bg-gray-300 inline-block" />
                        </span>
                      )
                      : msg.content
                    }
                    {!msg.isFakeTyping && (
                      <div className="text-[11px] text-gray-400 text-right pt-1">
                        {timeAgo(msg.ts)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Chat Input + CTA + sample prompts */}
          <form
            onSubmit={handleSend}
            className="border-t border-white/10 bg-[#10213a] p-4 flex flex-col gap-2"
            autoComplete="off"
          >
            {/* Sample Prompt Chips */}
            <div className="flex flex-wrap gap-2 pb-1">
              {SAMPLE_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-full text-xs font-semibold mr-1 mb-1 transition"
                  onClick={() => onSamplePrompt(prompt)}
                  tabIndex={-1}
                >
                  {prompt}
                </button>
              ))}
            </div>
            {/* Input Row */}
            <div className="flex items-end gap-2 pt-1">
              <input
                type="text"
                className="flex-1 bg-white/90 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                placeholder="Ask about ingredients, waste, or forecasts…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isBotTyping}
                maxLength={140}
                aria-label="Ask about ingredients, waste, or forecasts…"
              />
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full ml-2"
                disabled={input.trim().length === 0 || isBotTyping}
              >
                Send
              </Button>
            </div>
            {/* CTA */}
            <Button
              type="button"
              variant="secondary"
              className="w-full mt-2 text-teal-800 font-bold bg-teal-100 border-0 shadow-sm hover:bg-teal-200"
              onClick={() => onSamplePrompt("Should I reorder lettuce?")}
              disabled={isBotTyping}
            >
              Try a Sample Question
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default OptiMisedAssistant;
