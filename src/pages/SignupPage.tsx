import { useState } from "react";
import { useNavigate } from "react-router-dom";

const bgDark = "bg-[#0D1A2B]";
const teal = "#3CE8B3";

const branchOptions = [
  { label: "1", value: "1" },
  { label: "2–3", value: "2-3" },
  { label: "4–10", value: "4-10" },
  { label: "11+", value: "11+" }
];

export default function SignupPage() {
  const nav = useNavigate();

  const [values, setValues] = useState({
    restaurant: "",
    email: "",
    password: "",
    confirm: "",
    language: "en",
    branches: ""
  });

  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err: any = {};
    if (!values.restaurant) err.restaurant = "Required";
    if (!values.email) err.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) err.email = "Invalid email";
    if (!values.password) err.password = "Required";
    if (values.password.length < 6) err.password = "Min 6 characters";
    if (!values.confirm) err.confirm = "Required";
    if (values.confirm !== values.password) err.confirm = "Passwords must match";
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
      restaurant: true, email: true, password: true, confirm: true, branch: true
    });
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setLoading(true);

    // Mock "signup" async
    setTimeout(() => {
      setLoading(false);
      if (values.email === "test@email.com") {
        setErrors({ email: "Email already in use" });
      } else {
        // success
        // Show toast (if available)
        if ((window as any).toast) {
          (window as any).toast("Account created", { type: "success" });
        }
        nav("/dashboard");
      }
    }, 1500);
  }

  return (
    <div className={`${bgDark} min-h-screen w-full flex items-center justify-center`}>
      <form
        className="w-full max-w-md flex flex-col bg-white/[0.04] p-8 rounded-2xl border border-white/10 shadow-lg"
        style={{ boxShadow: `0 8px 32px rgba(60,232,179,.06)` }}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center mb-8">
          {/* Updated logo style - brighter and more translucent */}
          <img
            src="/lovable-uploads/8b5eeac1-aa2e-4fee-ae27-07892dbcf765.png"
            alt="OptiMised Logo"
            className="w-[300px] h-[300px] object-scale-down mb-3"
            style={{
              opacity: 0.45,
              filter: "brightness(1.45) contrast(1.0) saturate(0.7)",
              backgroundColor: "transparent"
            }}
          />
          <h2 className="text-2xl font-bold text-white">Get Started with OptiMised</h2>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-white font-semibold" htmlFor="restaurant">Restaurant Name</label>
          <input
            id="restaurant"
            name="restaurant"
            value={values.restaurant}
            onChange={handleChange}
            className={`rounded p-2 bg-[#22344d] text-white border ${touched.restaurant && errors.restaurant ? "border-red-500" : "border-[#3CE8B3]"}`}
            placeholder="Your restaurant name"
          />
          {touched.restaurant && errors.restaurant && <p className="text-red-400 text-sm">{errors.restaurant}</p>}

          <label className="text-white font-semibold" htmlFor="email">Business Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={`rounded p-2 bg-[#22344d] text-white border ${touched.email && errors.email ? "border-red-500" : "border-[#3CE8B3]"}`}
            placeholder="business@email.com"
          />
          {touched.email && errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

          <label className="text-white font-semibold" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className={`rounded p-2 bg-[#22344d] text-white border ${touched.password && errors.password ? "border-red-500" : "border-[#3CE8B3]"}`}
            placeholder="Password"
            autoComplete="new-password"
          />
          {touched.password && errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}

          <label className="text-white font-semibold" htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            value={values.confirm}
            onChange={handleChange}
            className={`rounded p-2 bg-[#22344d] text-white border ${touched.confirm && errors.confirm ? "border-red-500" : "border-[#3CE8B3]"}`}
            placeholder="Repeat password"
            autoComplete="new-password"
          />
          {touched.confirm && errors.confirm && <p className="text-red-400 text-sm">{errors.confirm}</p>}

          <div className="flex flex-row gap-3 justify-between items-center">
            <label className="text-white font-semibold">Preferred Language</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setValues(v => ({ ...v, language: "en" }))}
                className={`px-4 py-1 rounded ${values.language === "en" ? "bg-[#3CE8B3] text-[#0D1A2B]" : "bg-[#22344d] text-white"}`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setValues(v => ({ ...v, language: "ar" }))}
                className={`px-4 py-1 rounded ${values.language === "ar" ? "bg-[#3CE8B3] text-[#0D1A2B]" : "bg-[#22344d] text-white"}`}
              >
                العربية
              </button>
            </div>
          </div>
          
          <label className="text-white font-semibold">Branch Count</label>
          <select
            className={`rounded p-2 bg-[#22344d] text-white border ${touched.branches && errors.branches ? "border-red-500" : "border-[#3CE8B3]"}`}
            name="branches"
            value={values.branches || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {branchOptions.map(opt => (
              <option value={opt.value} key={opt.value}>{opt.label}</option>
            ))}
          </select>
          {touched.branches && errors.branches && <p className="text-red-400 text-sm">{errors.branches}</p>}
        </div>
        <button
          className="mt-6 bg-[#3CE8B3] text-[#0D1A2B] font-extrabold rounded-full py-3 transition hover:bg-[#33b392] disabled:opacity-40"
          type="submit"
          disabled={!isValid || loading}
        >
          {loading ? "Creating account..." : "Create My Account"}
        </button>
        <div className="text-white/50 text-center mt-6 text-xs">
          Already have an account?{" "}
          <span onClick={() => nav("/")} className="text-[#3CE8B3] cursor-pointer underline hover:text-[#69f2d6]">Log in</span>
        </div>
      </form>
    </div>
  );
}
