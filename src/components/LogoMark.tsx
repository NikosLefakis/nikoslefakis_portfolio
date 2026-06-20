"use client";
import { useId } from "react";

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className = "" }: LogoMarkProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `nlg-${uid}`;
  const glowId = `nlf-${uid}`;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="4" y1="5" x2="20" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="0.7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/*
        NL combined mark:
        — N: left vertical + diagonal (top-left → bottom-right) + right vertical
        — L: shares right vertical of N, adds horizontal foot
      */}
      <path
        d="M4 5 L4 19 M4 5 L12 19 M12 5 L12 19 L20 19"
        stroke={`url(#${gradId})`}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${glowId})`}
      />
    </svg>
  );
}
