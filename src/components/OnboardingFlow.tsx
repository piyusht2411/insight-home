"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { StoreSelection } from "@/components/onboarding/StoreSelection";
import { StoreLogin } from "@/components/onboarding/StoreLogin";
import { GoalSelection } from "@/components/onboarding/GoalSelection";
import { ProcessingAnimation } from "@/components/onboarding/ProcessingAnimation";

type OnboardingStep = "store" | "login" | "goals" | "processing";

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("store");
  const [selectedStore, setSelectedStore] = useState<string>("");
  const [storeUrl, setStoreUrl] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const website = searchParams.get("website");

  const handleStoreSelect = (store: string) => {
    setSelectedStore(store);
    setCurrentStep("login");
  };

  const handleLoginComplete = () => {
    setCurrentStep("goals");
  };

  const handleGoalsComplete = (goals: string[]) => {
    setCurrentStep("processing");
    setTimeout(() => {
      router.push(`/dashboard?website=${website}`);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {currentStep === "store" && (
            <motion.div
              key="store"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <StoreSelection onSelect={handleStoreSelect} />
            </motion.div>
          )}

          {currentStep === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <StoreLogin
                store={selectedStore}
                onComplete={handleLoginComplete}
              />
            </motion.div>
          )}

          {currentStep === "goals" && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <GoalSelection onComplete={handleGoalsComplete} />
            </motion.div>
          )}

          {currentStep === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ProcessingAnimation />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
