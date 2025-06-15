import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Building2, Languages, ListChecks } from "lucide-react";

const bgDark = "bg-[#0D1A2B]";
const accent = "#3CE8B3";
const features = [
  {
    icon: <ListChecks color={accent} size={24} />,
    text: "Track waste in real time",
  },
  {
    icon: <ListChecks color={accent} size={24} />,
    text: "Forecast your inventory",
  },
  {
    icon: <ListChecks color={accent} size={24} />,
    text: "Connect to Lebanese POS systems",
  },
];

const branchOptions = [
  { label: "1", value: "1" },
  { label: "2–3", value: "2-3" },
  { label: "4–10", value: "4-10" },
  { label: "11+", value: "11+" }
];

function validateEmail(val: string) {
  return /^\S+@\S+\.\S+$/.test(val);
}
function validatePassword(val: string) {
  return val.length >= 8 && /\d/.test(val);
}

export default function SignupPage() {
  const nav = useNavigate();
  const [values, setValues] = useState({
    restaurant: "",
    email: "",
    password: "",
    confirm: "",
    language: "en",
    branches: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err: any = {};
    if (!values.restaurant) err.restaurant = "Required";
    if (!values.email) err.email = "Required";
    else if (!validateEmail(values.email)) err.email = "Invalid email";
    if (!values.password) err.password = "Required";
    else if (!validatePassword(values.password)) err.password = "Min 8, incl. number";
    if (!values.confirm) err.confirm = "Required";
    else if (values.confirm !== values.password) err.confirm = "Passwords must match";
    if (!values.branches) err.branches = "Please select a branch count";
    return err;
  };

  const isValid = Object.keys(validate()).length === 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      restaurant: true, email: true, password: true, confirm: true, branches: true
    });
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setLoading(true);

    // Mock signup async
    setTimeout(() => {
      setLoading(false);
      if (values.email === "test@email.com") {
        toast({ title: "Signup failed", description: "Email already in use", variant: "destructive" });
        setErrors({ email: "Email already in use" });
      } else {
        toast({ title: "Welcome!", description: "Account created", variant: "default" });
        nav("/setup");
      }
    }, 1200);
  }

  function handleGoogle() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // In reality: Use proper Google SSO
      toast({ title: "Signed up with Google!", description: "Account created", variant: "default" });
      nav("/setup");
    }, 900);
  }

  return (
    <div className={`min-h-screen w-full flex items-stretch ${bgDark} font-inter`}>
      {/* Left Panel */}
      <div className="hidden md:flex flex-col justify-center gap-8 items-start flex-1 px-12 relative"
        style={{ background: "#0D1A2B" }}>
        {/* Logo removed from here */}
        <h2 className="text-white font-extrabold text-2xl mb-2 tracking-tight">Machine-learning your food waste to zero.</h2>
        <ul className="my-4 flex flex-col gap-3">
          {features.map(({ icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-white/90 font-medium text-lg">
              <span>{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <div className="flex-1" />
        <div className="mt-auto mb-8 text-xs text-white/30 pl-1">
          &copy; {new Date().getFullYear()} OptiMised. All rights reserved.
        </div>
      </div>

      {/* Right Panel (form) */}
      <div className="w-full md:w-[520px] flex justify-center items-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.98] shadow-xl rounded-2xl p-8 min-w-[330px] w-full max-w-lg flex flex-col gap-5 border border-white/40"
        >
          {/* Logo moved here */}
          <img
            src="/lovable-uploads/8b5eeac1-aa2e-4fee-ae27-07892dbcf765.png"
            alt="OptiMised Logo"
            className="w-20 h-20 mx-auto mb-4 mt-1 opacity-90"
            style={{
              background: "transparent",
              filter: "drop-shadow(0 2px 20px rgba(60,232,179,0.08))",
            }}
          />
          <h1 className="text-[#0D1A2B] font-bold text-2xl mb-1 text-center">Create your OptiMised account</h1>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-[#0D1A2B]" htmlFor="restaurant">Business Name</label>
            <Input
              id="restaurant"
              name="restaurant"
              value={values.restaurant}
              onChange={handleChange}
              className={`bg-white border-2 ${touched.restaurant && errors.restaurant ? "border-red-400" : "border-[#3CE8B3]"}`}
              placeholder="e.g. Saifi Bistro"
              autoFocus
            />
            {touched.restaurant && errors.restaurant && <div className="text-red-500 text-sm">{errors.restaurant}</div>}

            <label className="font-semibold text-[#0D1A2B]" htmlFor="email">Business Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className={`bg-white border-2 ${touched.email && errors.email ? "border-red-400" : "border-[#3CE8B3]"}`}
              placeholder="restaurant@email.com"
              autoComplete="new-email"
            />
            {touched.email && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

            <label className="font-semibold text-[#0D1A2B]" htmlFor="password">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className={`bg-white border-2 ${touched.password && errors.password ? "border-red-400" : "border-[#3CE8B3]"}`}
              placeholder="Create a password"
              autoComplete="new-password"
            />
            {touched.password && errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

            <label className="font-semibold text-[#0D1A2B]" htmlFor="confirm">Confirm Password</label>
            <Input
              id="confirm"
              name="confirm"
              type="password"
              value={values.confirm}
              onChange={handleChange}
              className={`bg-white border-2 ${touched.confirm && errors.confirm ? "border-red-400" : "border-[#3CE8B3]"}`}
              placeholder="Repeat password"
              autoComplete="new-password"
            />
            {touched.confirm && errors.confirm && <div className="text-red-500 text-sm">{errors.confirm}</div>}

            <div className="flex flex-row gap-3 justify-between items-center">
              <label className="font-semibold text-[#0D1A2B]">Language</label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={values.language === "en" ? "default" : "outline"}
                  className={values.language === "en"
                    ? "bg-[#3CE8B3] text-[#0D1A2B] border-[#3CE8B3]"
                    : "text-[#0D1A2B]"}
                  onClick={() => setValues(v => ({ ...v, language: "en" }))}
                >English</Button>
                <Button
                  type="button"
                  variant={values.language === "ar" ? "default" : "outline"}
                  className={values.language === "ar"
                    ? "bg-[#3CE8B3] text-[#0D1A2B] border-[#3CE8B3]"
                    : "text-[#0D1A2B]"}
                  onClick={() => setValues(v => ({ ...v, language: "ar" }))}
                >العربية</Button>
              </div>
            </div>

            <label className="font-semibold text-[#0D1A2B]">Branch Count</label>
            <select
              className={`bg-white border-2 rounded p-2 text-[#0D1A2B] ${touched.branches && errors.branches ? "border-red-400" : "border-[#3CE8B3]"}`}
              name="branches"
              value={values.branches}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {branchOptions.map(opt => (
                <option value={opt.value} key={opt.value}>{opt.label}</option>
              ))}
            </select>
            {touched.branches && errors.branches && <div className="text-red-500 text-sm">{errors.branches}</div>}
          </div>
          <Button
            className="mt-4 bg-[#3CE8B3] text-[#0D1A2B] font-extrabold rounded-full py-3 hover:bg-[#33b392] transition disabled:opacity-40 text-lg"
            type="submit"
            disabled={!isValid || loading}
          >
            {loading ? "Creating account..." : "Create My Account"}
          </Button>

          {/* Divider with "or" */}
          <div className="my-3 flex items-center gap-2">
            <div className="h-px bg-[#0D1A2B]/15 flex-1" />
            <span className="text-[#0D1A2B]/70 font-semibold text-sm">or</span>
            <div className="h-px bg-[#0D1A2B]/15 flex-1" />
          </div>

          <Button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center gap-2 border border-[#3CE8B3] bg-white text-[#0D1A2B] rounded-full font-bold hover:bg-[#3CE8B3]/20 transition text-lg justify-center py-3"
            disabled={loading}
            variant="outline"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" className="mr-1">
              <g>
                <path fill="#4285F4" d="M17.64 9.2H9v2.71h4.93c-.21 1.13-1.26 3.31-4.93 3.31-2.97 0-5.39-2.46-5.39-5.5s2.42-5.5 5.39-5.5c1.69 0 2.84.72 3.49 1.34l2.38-2.32C14.18 3.06 12.24 2 9.99 2 5.57 2 2 5.58 2 10s3.57 8 7.99 8c4.63 0 7.68-3.24 7.68-7.8 0-.52-.06-.91-.13-1.3z"/>
                <path fill="#34A853" d="M3.15 6.58l2.29 1.68C6.39 7.08 7.99 6 9.99 6c1.65 0 3.12.56 4.25 1.67l2.39-2.34C15.27 3.64 13.21 2.74 9.99 2.74c-3.6 0-6.56 2.71-6.83 6.13h.01z"/>
                <path fill="#FBBC05" d="M9.99 18c2.61 0 4.78-.82 6.38-2.24l-2.96-2.31c-.7.52-1.82.97-3.42.97-2.15 0-3.97-1.13-4.89-2.75l-2.95 2.32C3.01 16.29 5.99 18 9.99 18z"/>
                <path fill="#EA4335" d="M17.64 9.2H9v2.71h4.93c-.16.85-.61 2.11-1.69 3.01l2.96 2.31C17.09 15.84 18 13.27 18 10c0-.52-.05-.91-.12-1.3l-.24.5z"/>
              </g>
            </svg>
            Sign up with Google
          </Button>

          <div className="text-[#0D1A2B]/60 text-center mt-4 text-sm">
            Already have an account?{" "}
            <span onClick={() => nav("/")} className="text-[#3CE8B3] cursor-pointer underline hover:text-[#69f2d6]">Log in</span>
          </div>
        </form>
      </div>
    </div>
  );
}
