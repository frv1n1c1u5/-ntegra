import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const elements = ref.current!.querySelectorAll("[data-animate]");
      elements.forEach((el) => {
        const delay = parseFloat(el.getAttribute("data-delay") || "0");
        const duration = parseFloat(el.getAttribute("data-duration") || "0.7");
        const y = parseFloat(el.getAttribute("data-y") || "30");
        const x = parseFloat(el.getAttribute("data-x") || "0");

        gsap.set(el, { opacity: 0, y, x });

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              x: 0,
              duration,
              delay,
              ease: "power3.out",
            });
          },
        });
      });

      const staggerGroups = ref.current!.querySelectorAll("[data-stagger]");
      staggerGroups.forEach((group) => {
        const children = group.querySelectorAll("[data-stagger-child]");
        const staggerDelay = parseFloat(group.getAttribute("data-stagger-delay") || "0.1");
        const staggerY = parseFloat(group.getAttribute("data-stagger-y") || "40");

        gsap.set(children, { opacity: 0, y: staggerY });

        ScrollTrigger.create({
          trigger: group,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(children, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: staggerDelay,
              ease: "power3.out",
            });
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useHeroAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(".hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
        .fromTo(".hero-copy", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-actions", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-proof", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .fromTo(".diagnostic-board", { opacity: 0, x: 60, rotateY: -8 }, { opacity: 1, x: 0, rotateY: -1.5, duration: 1 }, "-=0.8");

      gsap.to(".hero-monogram", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
