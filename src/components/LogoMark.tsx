"use client";
import { useId } from "react";

interface LogoMarkProps {
  className?: string;
}

/* Nikos Lefakis monogram: an N and an L that share one stem, on a deep blue
   squircle. The foot of the L ends in a round dot, the same "node" the project
   list uses. Gradient ids are unique per copy (useId) so several logos on one
   page never share or lose their paint. */
export function LogoMark({ className = "" }: LogoMarkProps) {
  const uid = useId().replace(/:/g, "");
  const tile = `nl-tile-${uid}`;
  const shine = `nl-shine-${uid}`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={tile} x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4f7dff" />
          <stop offset="1" stopColor="#1d3fb8" />
        </linearGradient>
        <linearGradient id={shine} x1="32" y1="0" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Squircle tile with a light edge and a soft top sheen */}
      <rect width="64" height="64" rx="17" fill={`url(#${tile})`} />
      <rect x="0.5" y="0.5" width="63" height="63" rx="16.5" stroke="#ffffff" strokeOpacity="0.18" />
      <rect width="64" height="34" rx="17" fill={`url(#${shine})`} />

      {/* N and L sharing the right stem */}
      <path
        d="M18 46 V18 L33 46 V18 M33 46 H44"
        stroke="#ffffff"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="46" r="2.9" fill="#ffffff" />
    </svg>
  );
}
