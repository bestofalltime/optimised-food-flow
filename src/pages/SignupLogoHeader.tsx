
import React from "react";

export default function SignupLogoHeader() {
  return (
    <div className="flex flex-col items-center mb-8">
      <img
        src="/lovable-uploads/8b5eeac1-aa2e-4fee-ae27-07892dbcf765.png"
        alt="OptiMised Logo"
        className="w-[300px] h-[300px] object-scale-down mb-3"
        style={{
          opacity: 0.22, // even more translucent
          filter: "brightness(1.73) contrast(1.34) saturate(0.8)", // more brightness and contrast
          backgroundColor: "transparent"
        }}
      />
      <h2 className="text-2xl font-bold text-white">Get Started with OptiMised</h2>
    </div>
  );
}

