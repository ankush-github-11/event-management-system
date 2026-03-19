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
    <header className="sticky top-3 z-100 flex justify-center mt-3">
      <nav className="flex w-[87%] rounded-full h-13 items-center justify-between px-0 sm:px-20 bg-black/10 dark:bg-white/10 backdrop-blur-md">
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
        <ul className="flex gap-x-5">
          <Link href="/" onClick={() => handleNavLinkClick("Home")}>
            Home
          </Link>
          <Link href="/" onClick={() => handleNavLinkClick("Events")}>
            Events
          </Link>
          <Link
            href="/events/create"
            onClick={() => handleNavLinkClick("Create Event")}
          >
            Create Event
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
