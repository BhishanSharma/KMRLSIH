// src/components/HorizontalScroll.jsx
import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // using lucide-react icons

export default function HorizontalScroll({ children }) {
  const scrollRef = useRef(null);

  // Scroll function
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") scroll("left");
      if (e.key === "ArrowRight") scroll("right");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      {/* Left button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary text-secondary shadow-md hover:bg-accent transition"
      ></button>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10"
      >
        {children}
      </div>

      {/* Right button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary text-secondary shadow-md hover:bg-accent transition"
      ></button>
    </div>
  );
}
