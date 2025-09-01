"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "./PixelButton.css";

export default function PixelButton({
  children,
  target,
}: {
  children: React.ReactNode;
  target: string;
}) {
  const [hovering, setHovering] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hovering) {
      interval = setInterval(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const pixel = document.createElement("span");

        const rand = Math.random();
        if (rand < 0.4) {
          // Static pixel
          const button = wrapper.querySelector("button");
          if (button) {
            const rect = button.getBoundingClientRect();
            const pixelX = Math.random() * rect.width;
            const pixelY = Math.random() * rect.height;

            pixel.className = "pixel-static absolute-on-button";
            pixel.style.left = `${pixelX}px`;
            pixel.style.top = `${pixelY}px`;

            wrapper.appendChild(pixel);
            setTimeout(() => pixel.remove(), 1000);
          }
          return;
        }

        // Halo or border pixel
        pixel.className = "pixel-burst";
        let x = 0, y = 0;

        if (rand < 0.7) {
          const angle = Math.random() * 360;
          const distance = 60 + Math.random() * 120;
          x = Math.cos((angle * Math.PI) / 180) * distance;
          y = Math.sin((angle * Math.PI) / 180) * distance;
          pixel.style.left = "50%";
          pixel.style.top = "50%";
        } else {
          const side = ["top", "right", "bottom", "left"][Math.floor(Math.random() * 4)];
          const spread = 80 + Math.random() * 100;
          switch (side) {
            case "top":
              pixel.style.left = `${Math.random() * 100}%`;
              pixel.style.top = `0%`;
              x = (Math.random() - 0.5) * spread;
              y = -spread;
              break;
            case "bottom":
              pixel.style.left = `${Math.random() * 100}%`;
              pixel.style.top = `100%`;
              x = (Math.random() - 0.5) * spread;
              y = spread;
              break;
            case "left":
              pixel.style.left = `0%`;
              pixel.style.top = `${Math.random() * 100}%`;
              x = -spread;
              y = (Math.random() - 0.5) * spread;
              break;
            case "right":
              pixel.style.left = `100%`;
              pixel.style.top = `${Math.random() * 100}%`;
              x = spread;
              y = (Math.random() - 0.5) * spread;
              break;
          }
        }

        pixel.style.setProperty("--x", `${x}px`);
        pixel.style.setProperty("--y", `${y}px`);
        wrapper.appendChild(pixel);
        setTimeout(() => pixel.remove(), 1400);
      }, 90);
    }

    return () => clearInterval(interval);
  }, [hovering]);

  const handleClick = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const pixelCount = 36;
    const size = wrapper.offsetWidth;

    for (let i = 0; i < pixelCount; i++) {
      const pixel = document.createElement("span");
      pixel.className = "pixel-square-burst";

      const direction = i % 4;
      const offset = (i / 4) * 10;
      let x = 0;
      let y = 0;

      switch (direction) {
        case 0:
          x = -size / 2 + offset;
          y = -50;
          break;
        case 1:
          x = 50;
          y = -size / 2 + offset;
          break;
        case 2:
          x = -size / 2 + offset;
          y = 50;
          break;
        case 3:
          x = -50;
          y = -size / 2 + offset;
          break;
      }

      pixel.style.left = `50%`;
      pixel.style.top = `50%`;
      pixel.style.setProperty("--x", `${x}px`);
      pixel.style.setProperty("--y", `${y}px`);

      wrapper.appendChild(pixel);
      setTimeout(() => pixel.remove(), 1000);
    }

    // Navigate after slight delay for dramatic effect
    setTimeout(() => {
      router.push(target);
    }, 250);
  };

  return (
    <div
      className="pixel-button-wrapper"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      ref={wrapperRef}
    >
      <button className="pixel-button" onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}
