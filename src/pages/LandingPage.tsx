import { useNavigate } from "react-router-dom";
const bgImage = "/lovable-uploads/8b5eeac1-aa2e-4fee-ae27-07892dbcf765.png";
const featuresRow1 = [{
  label: "Real-time POS syncing"
}, {
  label: "Smart ordering + forecasting"
}, {
  label: "FIFO expiry logic"
}];
const featuresRow2 = [{
  label: "Staff accountability tools"
}, {
  label: "Mobile + desktop access"
}];
const valueStats = [{
  stat: "1,620 tons",
  caption: "Restaurants in Beirut waste / year",
  color: "text-accent"
}, {
  stat: "15%",
  caption: "Reduce waste by up to",
  color: "text-accent"
}, {
  stat: "$3,000–$5,000",
  caption: "Cut annual losses by",
  color: "text-accent"
}];
const plans = [{
  name: "Starter",
  price: "Free",
  color: "border-accent bg-accent/10",
  details: [
    "Up to 50 ingredients",
    "1 branch",
    "POS sync",
    "Manual waste logging",
    "Monthly usage summary",
    "Access to current month’s data",
  ],
  cta: "Try Free"
}, {
  name: "Pro",
  price: "$59/mo",
  color: "border-blue-400 bg-blue-400/10",
  details: ["All Starter features", "250 ingredients", "Forecasted orders", "Expiry alerts", "Multi-branch view", "30-day variance reports"],
  cta: "Start Free Trial"
}, {
  name: "Enterprise",
  price: "Custom",
  color: "border-red-400 bg-red-400/10",
  details: ["Unlimited items/branches", "SLA & WhatsApp support", "Onboarding support", "Dedicated success manager"],
  cta: "Book a Demo"
}];
const testimonials = [{
  quote: "This paid for itself in the first month.",
  author: "Michel, Beirut"
}, {
  quote: "I cut lettuce waste by 40%.",
  author: "Lina, Saifi Bistro"
}];

// Accent color is #3CE8B3
const accent = "text-[#3CE8B3]";
const bgDark = "bg-[#0D1A2B]";
const bgOverlay = "bg-black/60";
export default function LandingPage() {
  const nav = useNavigate();
  return <div className={`w-full min-h-screen ${bgDark} text-white`}>
      {/* Hero */}
      <div className="relative min-h-[60vh] flex items-center lg:items-end p-0" style={{
      background: `linear-gradient(rgba(13,26,43,0.93), rgba(13,26,43,0.93)), url('${bgImage}') center/cover no-repeat`
    }}>
        <div className="absolute inset-0 pointer-events-none" />
        <div className="relative z-10 w-full flex flex-col items-center p-8 text-center py-[50px]">
          {/* Logo: lower brightness, no circular frame, no mask */}
          <div className="flex items-center justify-center">
            <img src={bgImage} alt="OptiMised Logo" style={{
            opacity: 0.6,
            filter: "brightness(0.75) contrast(0.9)",
            backgroundColor: "transparent"
          }} className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] object-scale-down" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 py-0">
            Inventory Intelligence for Restaurants That Want to{" "}
            <span className={accent}>Waste Less</span>, Earn{" "}
            <span className={accent}>More</span>.
          </h1>
          <button className={`mt-6 px-8 py-3 rounded-full bg-[#3CE8B3] text-[#0D1A2B] font-bold text-lg hover:bg-[#33b392] transition`} onClick={() => nav("/signup")}>
            Start for Free
          </button>
        </div>
      </div>

      {/* Features */}
      <section className="bg-[#0D1A2B] w-full max-w-none py-12 mx-0 px-0">
        <div className="flex flex-col items-center w-full py-[44px]">
          <h2 className="font-bold text-white mb-8 tracking-tight text-4xl">
            Product Features
          </h2>
          {/* First row */}
          <div className="w-full flex justify-center">
            <ul className="
              flex flex-col sm:flex-row gap-6 items-center justify-center
              ">
              {featuresRow1.map(f => <li key={f.label} className="relative text-center min-w-[160px] sm:min-w-[200px] px-2 flex flex-col items-center justify-center">
                  <span className="inline-block text-xl sm:text-2xl font-bold text-transparent bg-gradient-to-tr from-[#3CE8B3] to-[#47e6db] bg-clip-text tracking-tight leading-tight text-center py-0 mx-[5px]">
                    {f.label}
                  </span>
                </li>)}
            </ul>
          </div>
          {/* Second row */}
          <div className="w-full mt-6 flex justify-center">
            <ul className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              {featuresRow2.map(f => <li key={f.label} className="relative text-center min-w-[160px] sm:min-w-[200px] px-2 flex flex-col items-center justify-center">
                  <span className="inline-block text-xl sm:text-2xl font-bold text-transparent bg-gradient-to-tr from-[#3CE8B3] to-[#47e6db] bg-clip-text tracking-tight leading-tight text-center py-0 mx-[5px]">
                    {f.label}
                  </span>
                </li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Value Block */}
      <section className="max-w-5xl mx-auto px-4 py-[100px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {valueStats.map(({
          stat,
          caption,
          color
        }) => <div key={caption} className="text-center flex-1">
              <div className={`text-4xl font-extrabold ${color}`}>{stat}</div>
              <div className="text-white/70 mt-2">{caption}</div>
            </div>)}
        </div>
      </section>

      {/* Final CTA (moved above pricing) */}
      <section className="text-center py-12 px-4">
        <div className="text-2xl font-bold mb-3">Start reducing waste in 5 minutes — no card needed.</div>
        <button className="mx-auto px-8 py-3 rounded-full bg-[#3CE8B3] text-[#0D1A2B] font-bold text-lg hover:bg-[#33b392] transition" onClick={() => nav("/signup")}>
          Get Started
        </button>
      </section>

      {/* Pricing Plans */}
      <section className="max-w-5xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 items-center md:items-stretch justify-center w-full">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`flex-1 rounded-2xl border-2 ${plan.color} p-6 flex flex-col justify-between min-w-[220px] h-full`}
              style={{ minHeight: "380px" }}
            >
              <div>
                <div className="text-2xl font-bold mb-2">{plan.name}</div>
                <div className={accent + " text-3xl font-bold mb-3"}>
                  {plan.price}
                </div>
                <ul className="mb-6 space-y-1 text-white/90">
                  {plan.details.map(detail => (
                    <li key={detail}>
                      <span className="mr-2 text-[#3CE8B3]">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="bg-[#3CE8B3] w-full py-2 rounded font-bold text-[#0D1A2B] hover:bg-[#33b392] transition mb-2 mt-auto"
                onClick={() => nav("/signup")}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        {/* Toggle Monthly/Yearly (not functional yet) */}
        <div className="text-center text-white/50 text-xs mt-4">
          <span className="px-2 py-1 rounded bg-[#3CE8B3]/10 text-[#3CE8B3] font-semibold">Monthly</span>
          <span> / </span>
          <span className="px-2 py-1 rounded hover:bg-[#3CE8B3]/10 transition cursor-pointer">Yearly <span className="text-[#3CE8B3]">–10%</span></span>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t, i) => <div key={i} className="bg-white/5 border border-accent/10 rounded-xl p-6 flex flex-col items-center">
              <blockquote className="italic text-lg text-[#3CE8B3] mb-3">“{t.quote}”</blockquote>
              <div className="text-white/70 text-sm">— {t.author}</div>
            </div>)}
        </div>
      </section>
    </div>;
}
