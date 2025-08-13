import React, { useEffect, useRef, useState, useMemo } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

interface Props {
  step: number;
  totalSteps: number;
}

export default function AnimatedProgressCircle({ step, totalSteps }: Props) {
  const [fill, setFill] = useState(0);
  const prevStep = useRef(0);

  useEffect(() => {
    const newFill = (step / totalSteps) * 100;
    setFill((prev) => {
      prevStep.current = prev;
      return newFill;
    });
  }, [step, totalSteps]);

  return (
    <AnimatedCircularProgress
      size={60}
      width={10}
      fill={fill}
      rotation={0}
      tintColor="#00e0ff"
      backgroundColor="#3d5875"
      duration={400}
    />
  );
}
