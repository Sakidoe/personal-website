"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/glass-nav.css";

export default function GlassNav() {
  const pathname = usePathname();

  // Helper to mark the active item by route
  const isActive = (href: string) => (pathname === href ? "active" : "");

  return (
    <>
      {/* SVG Filter for Glass Distortion (kept hidden but present in the DOM) */}
      <svg style={{ display: "none" }}>
        <filter id="glass-distortion">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.008"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
        </filter>
      </svg>

      {/* Right-aligned container with 20% viewport padding */}
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center">
        <nav className="glass-nav mt-3 mx-4">
            <div className="glass-filter" />
            <div className="glass-overlay" />
            <div className="glass-specular" />
            <div className="glass-content">
            <ul className="nav-list">
              <li>
                <Link href="/" className={`nav-item ${isActive("/")}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={`nav-item ${isActive("/about")}`}>
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`nav-item ${isActive("/contact")}`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`nav-item ${isActive("/contact")}`}
                >
                    Projects
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
