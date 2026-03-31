"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const Navbar = () => {
  const handleNavLinkClick = (linkName: string) => {
    posthog.capture("nav_link_clicked", {
      link_name: linkName,
    });
  };
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <nav className="pointer-events-auto flex w-[87%] max-w-5xl rounded-full h-14 items-center justify-between px-3 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        <div className="flex gap-x-3">
          <Link
            href="/"
            className="flex gap-x-1 items-center"
            onClick={() => handleNavLinkClick("Logo")}
          >
            <Image src="/icons/logo.png" alt="logo" width={24} height={24} />

            <p className="font-bold text-xl">DevEvent</p>
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="dark-mode-toggle"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
        <ul className="flex items-center gap-x-5">
          <Link href="/" onClick={() => handleNavLinkClick("Events")}>
            Events
          </Link>
          <Link
            href="/events/create"
            onClick={() => handleNavLinkClick("Create Event")}
          >
            Create Event
          </Link>
          <Link
            href="/login"
            className="flex pb-1.5 items-center rounded-full px-5 py-1 bg-white text-black font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Login
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
