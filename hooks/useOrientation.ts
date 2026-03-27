"use client";

import { useEffect, useMemo, useState } from "react";

type OrientationState = {
  gamma: number;
  beta: number;
};

const clamp = (value: number, min: number, max: number) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

export default function useOrientation() {
  const [orientation, setOrientation] = useState<OrientationState>({ gamma: 0, beta: 0 });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.DeviceOrientationEvent === "undefined") {
      return;
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const gamma = clamp(event.gamma ?? 0, -45, 45);
      const beta = clamp(event.beta ?? 0, -45, 45);
      setOrientation({ gamma, beta });
    };

    window.addEventListener("deviceorientation", handleOrientation, { passive: true });

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return useMemo(() => orientation, [orientation]);
}
