"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    let mouseX = -100, mouseY = -100;
    let fx = -100, fy = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const onDown = () => dot.classList.add("click");
    const onUp = () => dot.classList.remove("click");

    const lerp = () => {
      fx += (mouseX - fx) * 0.11;
      fy += (mouseY - fy) * 0.11;
      follower.style.left = `${fx}px`;
      follower.style.top = `${fy}px`;
      raf = requestAnimationFrame(lerp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    lerp();

    const hoverIn = () => {
      dot.classList.add("hover");
      follower.classList.add("hover");
    };
    const hoverOut = () => {
      dot.classList.remove("hover");
      follower.classList.remove("hover");
    };

    const refresh = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", hoverIn);
        el.addEventListener("mouseleave", hoverOut);
      });
    };

    refresh();
    const obs = new MutationObserver(refresh);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor" aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
    </>
  );
}
