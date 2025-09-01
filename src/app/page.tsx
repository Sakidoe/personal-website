"use client";
import GlassNav from "./components/GlassNav";
import PixelButton from "./PixelButton";
import ProjectsSection from "./components/ProjectsSection";

export default function Page() {
  return (
    <div className="min-h-[300vh] bg-no-repeat bg-top">
      {/* Fixed, clickable nav lives at the page root */}
      <GlassNav />

      {/* Hero Section with image */}
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src="/richard_stanford.jpg"
          alt="Hero"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
          }}
        />

        {/* Overlay for hero text only */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, width: "100%", height: "100%",
            // no pointerEvents: "none" here
          }}
        >
          <main
            style={{
              textAlign: "center",
              paddingTop: "0rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(2rem, 8vw, 75px)",
                fontFamily: "Raleway, sans-serif",
                textAlign: "right",
                paddingRight: "15vw",
                color: "#fff"
              }}
              className="font-bold"
            >
              Hello! My Name is<br />
              Richard
            </h1>
          </main>
        </div>
      </div>

      {/* About Section */}
      <section
        id="about"
        style={{
          marginTop: "0",
          textAlign: "left",
          paddingLeft: "15vw",
          paddingRight: "15vw",
          // backgroundColor: "navy",
          borderRadius: "12px",
        }}
      >
        <h2
          style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", marginTop: "4rem" ,fontFamily: "Raleway, sans-serif", color: "#fff" }}
        >
          About
        </h2>
        <hr style={{ borderTop: "1px solid #ccc", marginBottom: "2rem" }} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
          <img
        src="/richard_prof_portrait.jpeg"
        alt="Profile"
        style={{
          width: "100%",maxWidth: "200px", height: "100%", maxHeight:"250px", borderRadius: "5px",
          objectFit: "cover", border: "5px solid #fff",
        }}
          />
        <p
        style={{
          fontSize: "1.25rem",
          lineHeight: "1.7",
          maxWidth: "600px",
          fontFamily: "Raleway, sans-serif",
          color: "#fff"
        }}
        >
        Hello there! My name is Richard Huang, and welcome to my personal website. I'm currently a senior pursuing a degree
        in Computer Science and Engineering at the University of California, Davis(UCD). 
        </p>
        </div>
      </section>

      <ProjectsSection />
    </div>
  );
}
