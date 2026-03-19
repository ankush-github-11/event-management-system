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
  }, [])
  if (!mounted) return null;
  return (
    <header>
      <nav>
        <Link
          href="/"
          className="logo"
          onClick={() => handleNavLinkClick("Logo")}
        >
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />

          <p>DevEvent</p>
        </Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="dark-mode-toggle"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <ul>
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
