"use client";

import { useEffect, useState } from "react";
import styles from "../styles/projects.module.css";

type Project = {
  id: string;
  title: string;
  cover: string;        // square-ish cover image for the grid
  images: string[];     // images shown in the modal carousel
  description: string;  // text shown in the modal
  stack?: string;       // <-- NEW: short tech/language line shown on hover
};

const PROJECTS: Project[] = [
  {
    id: "p8",
    title: "New York Times Clone",
    cover: "proj8_img_main.png",
    images: ["Proj_Badminton_Team_Match_Scheduler.png", "/projects/p1_2.jpg", "/projects/p1_3.jpg"],
    description:
      "https://github.com/Sakidoe/ECS162-Final-Project",
    stack: "Languages/Tools: Python, C, Svelte, CSS, JavaScript, Google OAuth, Docker, MongoDB"
  },
  {
    id: "p7",
    title: "Strawberry Field Bluetooth Mesh Network",
    cover: "proj7_img_main.png",
    images: ["Proj_Badminton_Team_Match_Scheduler.png", "/projects/p1_2.jpg", "/projects/p1_3.jpg"],
    description:
      "https://github.com/Sakidoe/ECS162-Final-Project",
    stack: "Languages/Tools: Python, C, Svelte, CSS, JavaScript, Google OAuth, Docker, MongoDB"
  },
    {
    id: "p6",
    title: "Taskify",
    cover: "proj6_img_main.png",
    images: ["Proj_Badminton_Team_Match_Scheduler.png", "/projects/p1_2.jpg", "/projects/p1_3.jpg"],
    description:
      "https://github.com/Sakidoe/ECS162-Final-Project",
    stack: "Languages/Tools: Python, C, Svelte, CSS, JavaScript, Google OAuth, Docker, MongoDB"
  },
    {
    id: "p5",
    title: "DUENDavis.com",
    cover: "proj5_img_main.png",
    images: ["Proj_Badminton_Team_Match_Scheduler.png", "/projects/p1_2.jpg", "/projects/p1_3.jpg"],
    description:
      "https://github.com/Sakidoe/duen-website",
    stack: "Languages/Tools: TypeScript, HTML, CSS, JavaScript"
  },
    {
    id: "p4",
    title: "UCDavisBadminton.com",
    cover: "proj4_img_main.png",
    images: ["Proj_Badminton_Team_Match_Scheduler.png", "/projects/p1_2.jpg", "/projects/p1_3.jpg"],
    description:
      "https://github.com/Sakidoe/BadmintonUCD",
    stack: "Languages/Tools: HTML, CSS, ReactJS, JavaScript"
  },
  {
    id: "p3",
    title: "Graphics Renderer",
    cover: "proj3_img_main.png",
    images: ["/projects/p3_1.jpg"],
    description:
      "https://github.com/Sakidoe/Graphic-Renderer",
  },
  {
    id: "p2",
    title: "Fullstack Tournament Scheduler + Webpage",
    cover: "proj2_img_main1.png",
    images: ["proj2_img_1.png", "proj2_img_2.png"],
    description:
      "https://github.com/Sakidoe/UCDavis-Spring-Open-2023",
  },
  {
    id: "p1",
    title: "Badminton Team Match Scheduler",
    cover: "Proj_Badminton_Team_Match_Scheduler.png",
    images: ["Proj_Badminton_Team_Match_Scheduler.png", "/projects/p1_2.jpg", "/projects/p1_3.jpg"],
    description:
      "https://github.com/Sakidoe/Badminton_Meet_Calculator",
    stack: "Languages/Tools: Python3, XLSXWriter, JSON"
  },
];

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const [idx, setIdx] = useState(0);

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
      if (!active) return;
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % active.images.length);
      if (e.key === "ArrowLeft")
        setIdx((i) => (i - 1 + active.images.length) % active.images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const open = (p: Project) => {
    setActive(p);
    setIdx(0);
  };

  const close = () => setActive(null);

  return (
    <section id="projects" className={styles.container} style={{ fontFamily: "Raleway, sans-serif" }}>
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
          marginTop: "4rem",
          fontFamily: "Raleway, sans-serif",
          color: "#fff"
        }}
      >
        Projects
      </h2>
      <hr style={{ borderTop: "1px solid #ccc", marginBottom: "2rem" }} />

      {/* Grid */}
      <div className={styles.gallery}>
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={styles.item}
            onClick={() => open(p)}
            aria-label={`Open ${p.title}`}
          >
            <img src={p.cover} alt={p.title} className={styles.image} />
            <div className={styles.overlay}>
                <span className={styles.overlayTitle}>{p.title}</span>
                {p.stack && <span className={styles.overlaySubtitle}>{p.stack}</span>}
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div
          className={styles.modalBackdrop}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} details`}
        >
          <div
            className={styles.modalPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>{active.title}</div>
              <button
                type="button"
                className={styles.closeBtn}
                aria-label="Close"
                onClick={close}
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.heroImageWrap}>
                <img
                  src={active.images[idx]}
                  alt={`${active.title} image ${idx + 1}`}
                  className={styles.heroImage}
                />

                {active.images.length > 1 && (
                  <div className={styles.carouselControls}>
                    <button
                      type="button"
                      className={styles.carouselBtn}
                      aria-label="Previous"
                      onClick={() =>
                        setIdx((i) => (i - 1 + active.images.length) % active.images.length)
                      }
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className={styles.carouselBtn}
                      aria-label="Next"
                      onClick={() =>
                        setIdx((i) => (i + 1) % active.images.length)
                      }
                    >
                      ›
                    </button>
                  </div>
                )}

                {active.images.length > 1 && (
                  <div className={styles.thumbRow}>
                    {active.images.map((src, i) => (
                      <img
                        key={src + i}
                        src={src}
                        alt=""
                        className={`${styles.thumb} ${
                          i === idx ? styles.thumbActive : ""
                        }`}
                        onClick={() => setIdx(i)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <p className={styles.desc}>{active.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
