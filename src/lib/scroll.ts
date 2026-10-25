import type Lenis from "lenis";

/* The one place that knows whether Lenis is driving the page. Programmatic scrolls
   (back to top, the project list) go through here so they glide with the same
   easing as wheel scrolling instead of jumping. */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function scrollToY(y: number) {
  if (instance) {
    instance.scrollTo(y, { duration: 1.1 });
  } else {
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
