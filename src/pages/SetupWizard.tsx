
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/setup/ProgressBar";
import StepPOS from "@/components/setup/StepPOS";
import StepIngredients from "@/components/setup/StepIngredients";
import StepRecipes from "@/components/setup/StepRecipes";
import StepTeam from "@/components/setup/StepTeam";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const BACKGROUND = "bg-[#0D1A2B]";
const ACCENT = "text-teal-400";

const steps = [
  { label: "POS Integration" },
  { label: "Add Ingredients" },
  { label: "Map Recipes" },
  { label: "Invite Team" },
];

type StepData = {
  pos?: any;
  ingredients?: any[];
  recipes?: any[];
  team?: any[];
};

const defaultData: StepData = {
  pos: {},
  ingredients: [],
  recipes: [],
  team: [],
};

const STORAGE_KEY = "optimised-setup-progress";

function loadProgress() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null") || defaultData;
  } catch {
    return defaultData;
  }
}
function saveProgress(data: StepData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function SetupWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<StepData>(loadProgress());
  const nav = useNavigate();

  useEffect(() => {
    saveProgress(data);
  }, [data]);

  const handleNext = (nextData?: Partial<StepData>) => {
    setData(prev => ({ ...prev, ...nextData }));
    if (step < 3) setStep(step + 1);
  };
  const handlePrev = () => setStep(s => (s > 0 ? s - 1 : s));
  const handleBackToDashboard = () => nav("/dashboard");
  const handleFinish = () => {
    saveProgress(data);
    toast({
      title: "Setup Complete! Welcome to OptiMised.",
      description: "",
    });
    setTimeout(handleBackToDashboard, 1000);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepPOS
            value={data.pos}
            onNext={d => handleNext({ pos: d })}
          />
        );
      case 1:
        return (
          <StepIngredients
            value={data.ingredients}
            onNext={d => handleNext({ ingredients: d })}
            onPrev={handlePrev}
          />
        );
      case 2:
        return (
          <StepRecipes
            value={data.recipes}
            onNext={d => handleNext({ recipes: d })}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <StepTeam
            value={data.team}
            onNext={d => {
              handleNext({ team: d });
              handleFinish();
            }}
            onPrev={handlePrev}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${BACKGROUND} min-h-screen w-full py-8 px-2 flex items-center justify-center font-sans`}>
      <Card className="w-full max-w-2xl md:max-w-4xl shadow-xl rounded-2xl border-0 bg-white/5">
        <CardContent className="p-6 md:p-12">
          <ProgressBar step={step} steps={steps.length} labels={steps.map(s => s.label)} />
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
}
