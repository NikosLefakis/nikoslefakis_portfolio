"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";

/* Inertial scrolling for wheel and trackpad. Touch keeps the browser's own
   momentum. Skipped entirely for reduced motion. Anchor links (#projects, ...)
   glide to their section, clear of the floating navbar. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      wheelMultiplier: 0.95,
      anchors: { offset: -88 },
    });
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
