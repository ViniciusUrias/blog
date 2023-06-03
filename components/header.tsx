"use client";
import { useEffect, useRef, useState } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { twMerge } from "tailwind-merge";

// import { blogConfig } from '@/config';
// import { NavigationBar } from '@/components/navigation-bar';
// import { Toolbar } from '@/components/toolbar';
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Header() {
  const [scrollTop, setScrollTop] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const layoutSegment = useSelectedLayoutSegments();

  useEffect(() => {
    // sync scroll position with state
    setScrollTop(document.documentElement.scrollTop);

    // update state on scroll
    const handleScroll = () => {
      setScrollTop(document.documentElement.scrollTop);
    };
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="sticky mb-2 top-0 z-30 col-span-1 row-span-1 row-start-1 self-start sm:col-start-2">
      <header
        ref={headerRef}
        className={twMerge(
          headerRef.current && scrollTop > headerRef.current.clientHeight
            ? "border-b border-b-slate-300 bg-slate-500/20 py-2 dark:border-b-slate-600"
            : "bg-transparent py-8",
          "bg-transparent flex flex-row items-center justify-between px-4 xs:px-8 transition-[padding,background-color] duration-300 ease-in-out text-white backdrop-blur dark:text-rose-50"
        )}
      >
        <nav className="flex h-8 flex-row items-center space-x-2 max-xs:text-sm sm:space-x-4 flex-grow mix-blend-color-dodge max-xs:mr-2">
          <Link href="/">Home</Link>
          <Link href="posts">Posts</Link>
          <Link href="about">About</Link>
        </nav>
        <div className="flex h-8 w-fit flex-row items-center justify-end space-x-1 ml-auto">
          <button>a</button>
          <button>b</button>
          <button>c</button>
        </div>
      </header>
    </section>
  );
}
