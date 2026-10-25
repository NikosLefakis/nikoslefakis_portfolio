import type { Transition, Variants } from "framer-motion";

/* One motion vocabulary for the whole site.
   Springs are critically damped (bounce 0): they settle without overshoot, start
   from the value on screen, and can be redirected mid-flight. Bounce is reserved
   for motion that carries momentum, which this page does not have. */
export const SPRING: Transition = { type: "spring", bounce: 0, duration: 0.55 };
export const SPRING_SNAPPY: Transition = { type: "spring", bounce: 0, duration: 0.35 };
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/* Full transform strings, so the animation runs on the compositor under load */
export const reveal: Variants = {
  hidden: { opacity: 0, transform: "translateY(16px)" },
  visible: { opacity: 1, transform: "translateY(0px)", transition: SPRING },
};

export const revealGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

/* Same reveal, with a per-item delay passed through `custom` */
export const revealAt: Variants = {
  hidden: { opacity: 0, transform: "translateY(16px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    transform: "translateY(0px)",
    transition: { ...SPRING, delay: i * 0.05 },
  }),
};
