import { AnimatedCircularProgress } from "react-native-circular-progress";
import React from "react";

interface Props {
  step: number; 
  totalSteps: number; 
}

export default function AnimatedProgressCircle({ step, totalSteps }: Props) {
  const fill = (step / totalSteps) * 100;

  return (
    <AnimatedCircularProgress
      size={120}
      width={15}
      fill={fill}
      tintColor="#00e0ff"
      backgroundColor="#3d5875"
      duration={400} 
    />
  );
}
