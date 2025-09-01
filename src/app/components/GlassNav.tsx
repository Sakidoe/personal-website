"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "../styles/glass-nav.css";

export default function GlassNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState<string>(
    typeof window !== "undefined" ? window.location.hash : ""
  );

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isActivePath = (href: string) => (pathname === href ? "active" : "");
  const isActiveHash = (h: string) => (hash === h ? "active" : "");

  return (
    <>
      <svg style={{ display: "none" }}>
        <filter id="glass-distortion">
          <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
        </filter>
      </svg>

      <div className="fixed top-0 inset-x-0 z-50 flex justify-center">
        <nav className="glass-nav mt-3 mx-4">
          <div className="glass-filter" />
          <div className="glass-overlay" />
          <div className="glass-specular" />
          <div className="glass-content">
            <ul className="nav-list">
              <li>
                <Link href="/" className={`nav-item ${isActivePath("/")}`}>Home</Link>
              </li>
              <li>
                {/* link to the About section on this page */}
                <Link href="/#about" className={`nav-item ${isActiveHash("#about")}`}>
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/#projects" className={`nav-item ${isActiveHash("#projects")}`}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className={`nav-item ${isActivePath("/contact")}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
