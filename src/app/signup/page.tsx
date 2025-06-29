// Datei: app/signup/page.tsx
"use client";

import { useState } from "react";
import SignupForm from "./SignupForm";
import SignupTerms from "./SignupTerms";
import SignupConfirm from "./SignupConfirm";
import { Container, Box, Stepper, Step, StepLabel } from "@mui/material";

const steps = ["Benutzerangaben", "AGBs", "Bestätigung"];

export default function SignupPage() {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Container maxWidth="xs">
      <Box mt={4}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={4}>
          {activeStep === 0 && <SignupForm onNext={handleNext} />}
          {activeStep === 1 && (
            <SignupTerms onBack={handleBack} onNext={handleNext} />
          )}
          {activeStep === 2 && <SignupConfirm />}
        </Box>
      </Box>
    </Container>
  );
}
