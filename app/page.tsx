"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Scroll-reveal hook ─────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    el.querySelectorAll(".reveal").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── Data ─────────────────────────────────────────────────────── */
const menuItems = [
  {
    id: 1,
    category: "Coffee",
    name: "Saturday Morning Blend",
    desc: "Single-origin pour-over with notes of dark chocolate, caramel, and a hint of dried cherry.",
    price: "120",
    emoji: "☕",
    badge: "Bestseller",
    hue: "#C8A882",
  },
  {
    id: 2,
    category: "Drinks",
    name: "Golden Hour Latte",
    desc: "Espresso, steamed oat milk, turmeric, and a touch of honey — warm and deeply soothing.",
    price: "135",
    emoji: "🌿",
    badge: "New",
    hue: "#9A7050",
  },
  {
    id: 3,
    category: "Food",
    name: "Sourdough & Ricotta",
    desc: "House sourdough, whipped ricotta, seasonal jam, crushed pistachios, and wild honey.",
    price: "190",
    emoji: "🍞",
    badge: null,
    hue: "#B89060",
  },
  {
    id: 4,
    category: "Dessert",
    name: "Brown Butter Financier",
    desc: "Crisp almond cakes baked fresh every Saturday, dusted with powdered sugar and sea salt.",
    price: "95",
    emoji: "🧁",
    badge: "Sat only",
    hue: "#7A5A40",
  },
];

const socialLinks = [
  { name: "Instagram", handle: "@dontmissthissaturday", href: "https://instagram.com" },
  { name: "Facebook", handle: "Don't Miss This Saturday", href: "https://facebook.com" },
  { name: "Line OA", handle: "@dontmisssaturday", href: "https://line.me" },
];

const hours = [
  { day: "วันเสาร์", time: "09:00 – 18:00", active: true },
  { day: "วันอาทิตย์", time: "10:00 – 17:00", active: false },
  { day: "จันทร์ – ศุกร์", time: "ปิด", active: false },
];

/* ─── Navbar ───────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.4s ease, box-shadow 0.4s ease",
        background: scrolled ? "rgba(250,248,244,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(221,214,203,0.7)" : "none",
      }}
    >
      {/* Nav container */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: "'Instrument Serif', serif",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            lineHeight: 1.2,
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: scrolled ? "#1E1610" : "#FDFAF6",
              transition: "color 0.3s",
            }}
          >
            don&apos;t miss
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              fontStyle: "italic",
              color: scrolled ? "#A88060" : "#C4A882",
              transition: "color 0.3s",
            }}
          >
            this saturday
          </span>
        </a>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.25rem",
          }}
          className="desktop-nav"
        >
          {[
            { label: "เกี่ยวกับเรา", href: "#about" },
            { label: "เมนู", href: "#menu" },
            { label: "ติดต่อ", href: "#contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 400,
                color: scrolled ? "rgba(30,22,16,0.6)" : "rgba(253,250,246,0.6)",
                transition: "color 0.2s",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#menu"
            className="btn-primary"
            style={{
              background: "#A88060",
              color: "#FDFAF6",
              boxShadow: "0 2px 14px rgba(168,128,96,0.35)",
            }}
          >
            ดูเมนู
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          style={{
            width: "2rem",
            height: "2rem",
            display: "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              display: "block",
              width: "1.25rem",
              height: "1px",
              background: scrolled ? "#1E1610" : "#FDFAF6",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(45deg) translate(2.5px, 2.5px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "1rem",
              height: "1px",
              background: scrolled ? "#1E1610" : "#FDFAF6",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.3s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "1.25rem",
              height: "1px",
              background: scrolled ? "#1E1610" : "#FDFAF6",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(-45deg) translate(2.5px, -2.5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "360px" : "0",
          opacity: menuOpen ? 1 : 0,
          transition: "max-height 0.4s ease, opacity 0.3s",
          background: "#FAF8F4",
          borderTop: "1px solid #EEE9E1",
        }}
      >
        <div
          style={{
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {[
            { label: "เกี่ยวกับเรา", href: "#about" },
            { label: "เมนู", href: "#menu" },
            { label: "ติดต่อ", href: "#contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "0.875rem 0",
                fontSize: "0.9375rem",
                color: "#1E1610",
                textDecoration: "none",
                borderBottom: "1px solid #EEE9E1",
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ paddingTop: "1rem" }}>
            <a
              href="#menu"
              onClick={() => setMenuOpen(false)}
              className="btn-primary"
              style={{ width: "100%", background: "#A88060", color: "#FDFAF6" }}
            >
              ดูเมนู
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#17100A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 38%, rgba(168,128,96,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.04,
          backgroundImage: "radial-gradient(circle, #C4A882 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "7rem 1.5rem 4rem",
          maxWidth: "760px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <div className="anim-fade-up">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(196,168,130,0.7)",
              fontWeight: 400,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#C4A882",
              }}
            />
            Hangout Space · Bangkok
          </span>
        </div>

        {/* Heading */}
        <div className="anim-fade-up-1" style={{ marginTop: "1.5rem", marginBottom: "1.25rem" }}>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "#FDFAF6",
            }}
          >
            <span style={{ display: "block", fontSize: "clamp(3rem, 11vw, 6.5rem)" }}>
              don&apos;t miss
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(3rem, 11vw, 6.5rem)",
                fontStyle: "italic",
                color: "#C4A882",
              }}
            >
              this saturday
            </span>
          </h1>
        </div>

        {/* Divider */}
        <div
          className="anim-fade-up-2"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            margin: "1.75rem 0",
          }}
        >
          <div className="anim-line-left" style={{ width: "3rem", height: "1px", background: "rgba(196,168,130,0.4)" }} />
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C4A882", opacity: 0.6 }} />
          <div className="anim-line-right" style={{ width: "3rem", height: "1px", background: "rgba(196,168,130,0.4)" }} />
        </div>

        {/* Tagline */}
        <p
          className="anim-fade-up-2"
          style={{
            color: "rgba(253,250,246,0.5)",
            fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)",
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: "36ch",
            margin: "0 auto",
          }}
        >
          พื้นที่อบอุ่นสำหรับกาแฟดี ๆ อาหารอร่อย
          <br />
          และบทสนทนาที่คุณจะไม่ลืม
        </p>

        {/* CTAs */}
        <div
          className="anim-fade-up-3"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginTop: "2.5rem",
          }}
        >
          <a
            href="#menu"
            className="btn-primary"
            style={{
              background: "#A88060",
              color: "#FDFAF6",
              boxShadow: "0 4px 24px rgba(168,128,96,0.45)",
              minWidth: "160px",
            }}
          >
            ดูเมนูทั้งหมด
          </a>
          <a
            href="#about"
            className="btn-outline"
            style={{
              borderColor: "rgba(253,250,246,0.2)",
              color: "rgba(253,250,246,0.6)",
              minWidth: "160px",
            }}
          >
            เรื่องราวของเรา
          </a>
        </div>

        {/* Scroll hint */}
        <div
          className="anim-fade-up-4"
          style={{
            marginTop: "5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(196,168,130,0.4)",
            }}
          >
            scroll
          </span>
          <div className="anim-scroll-bounce">
            <div
              style={{
                width: "1px",
                height: "3rem",
                background: "linear-gradient(to bottom, rgba(196,168,130,0.4), transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About ────────────────────────────────────────────────────── */
function About() {
  const ref = useReveal();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "6rem 0",
        background: "#FAF8F4",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Section label */}
        <div className="reveal" style={{ marginBottom: "2.5rem" }}>
          <span className="section-label" style={{ color: "#A88060" }}>
            เกี่ยวกับเรา
          </span>
        </div>

        {/* Grid: left = visual, right = copy */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* ── Left column: visual block ── */}
          <div className="reveal reveal-d1">
            <div style={{ position: "relative", maxWidth: "420px" }}>
              {/* Main card */}
              <div
                style={{
                  aspectRatio: "3/4",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Gradient bg */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(160deg, #C8A882 0%, #8A6A4A 50%, #3A2414 100%)",
                  }}
                />
                {/* SVG shapes */}
                <svg
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }}
                  viewBox="0 0 400 533"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <circle cx="320" cy="100" r="200" fill="#FAF8F4" />
                  <circle cx="80" cy="440" r="150" fill="#FAF8F4" />
                  <circle cx="280" cy="380" r="100" fill="#FAF8F4" />
                </svg>
                {/* Text content */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "2rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(253,250,246,0.45)",
                      fontWeight: 400,
                    }}
                  >
                    Est.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: "clamp(4rem, 12vw, 7rem)",
                      fontWeight: 400,
                      color: "#FDFAF6",
                      lineHeight: 1,
                    }}
                  >
                    2021
                  </p>
                  <div
                    style={{
                      marginTop: "1.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div style={{ width: "2rem", height: "1px", background: "rgba(253,250,246,0.3)" }} />
                    <p
                      style={{
                        fontSize: "0.625rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(253,250,246,0.45)",
                      }}
                    >
                      Bangkok
                    </p>
                    <div style={{ width: "2rem", height: "1px", background: "rgba(253,250,246,0.3)" }} />
                  </div>
                </div>
              </div>

              {/* Floating hours card */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-1.25rem",
                  right: "-1rem",
                  background: "#17100A",
                  borderRadius: "1rem",
                  padding: "1rem 1.25rem",
                  minWidth: "140px",
                  boxShadow: "0 8px 32px rgba(23,16,10,0.45)",
                  zIndex: 10,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "1.75rem",
                    color: "#C4A882",
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  Sat
                </p>
                <p style={{ marginTop: "0.375rem", fontSize: "0.8125rem", color: "#FDFAF6", fontWeight: 400 }}>
                  09:00 – 18:00
                </p>
                <p
                  style={{
                    marginTop: "0.125rem",
                    fontSize: "0.6875rem",
                    color: "rgba(253,250,246,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  เปิดทุกเสาร์
                </p>
              </div>

              {/* Decorative ring */}
              <div
                style={{
                  position: "absolute",
                  top: "-1rem",
                  left: "-1rem",
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "50%",
                  border: "1.5px dashed rgba(168,128,96,0.3)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* ── Right column: copy ── */}
          <div className="reveal reveal-d2" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingTop: "0.5rem" }}>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(2rem, 4.5vw, 2.75rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "#1E1610",
              }}
            >
              พื้นที่ที่ถูกสร้าง
              <br />
              <em style={{ color: "#A88060" }}>เพื่อวันเสาร์</em>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "#6A5A4E", fontSize: "0.9375rem", lineHeight: 1.85 }}>
              <p>
                &ldquo;don&apos;t miss this saturday&rdquo; เกิดขึ้นจากความเชื่อว่าวันหยุดที่ดีควรเริ่มต้นด้วยบรรยากาศที่ใช่ —
                ไม่เร่งรีบ ไม่ตึงเครียด แค่อบอุ่นและเป็นกันเอง
              </p>
              <p>
                เราคัดสรรกาแฟจากฟาร์มในไทยและเอเชียตะวันออกเฉียงใต้ จับคู่กับอาหารและขนมที่ทำสดใหม่ทุกวัน
                ในพื้นที่ที่ออกแบบมาเพื่อการพักผ่อนอย่างแท้จริง
              </p>
              <p>
                มาคนเดียว มากับเพื่อน หรือมาอ่านหนังสือเงียบ ๆ — เราพร้อมต้อนรับเสมอ ทุกเช้าวันเสาร์
              </p>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "0.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid #EEE9E1",
              }}
            >
              {[
                { val: "4+", label: "ปีที่เปิด" },
                { val: "120+", label: "เมนูผ่านมา" },
                { val: "∞", label: "ความทรงจำดี ๆ" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center", padding: "0.5rem 0" }}>
                  <p
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                      color: "#A88060",
                      fontWeight: 400,
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </p>
                  <p
                    style={{
                      marginTop: "0.375rem",
                      fontSize: "0.6875rem",
                      color: "#6A5A4E",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Menu ─────────────────────────────────────────────────────── */
function Menu() {
  const ref = useReveal();

  return (
    <section
      id="menu"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "6rem 0",
        background: "#EEE9E1",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="reveal">
            <span className="section-label" style={{ color: "#A88060", display: "inline-block", marginBottom: "0.75rem" }}>
              สัปดาห์นี้
            </span>
          </div>
          <h2
            className="reveal reveal-d1"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2rem, 4.5vw, 2.75rem)",
              fontWeight: 400,
              color: "#1E1610",
              lineHeight: 1.15,
            }}
          >
            เมนูแนะนำ
          </h2>
          <p
            className="reveal reveal-d2"
            style={{
              marginTop: "0.75rem",
              fontSize: "0.9375rem",
              color: "#6A5A4E",
              maxWidth: "32ch",
              margin: "0.75rem auto 0",
              lineHeight: 1.65,
            }}
          >
            คัดมาเพื่อคุณโดยเฉพาะ — เปลี่ยนตามฤดูกาล หมดแล้วหมดเลย
          </p>
        </div>

        {/* Cards grid — horizontal scroll on mobile, 2-col tablet, 4-col desktop */}
        <div
          className="menu-scroll-wrapper"
          style={{
            display: "flex",
            gap: "1rem",
            overflowX: "auto",
            paddingBottom: "1.5rem",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            /* Hide scrollbar but keep functionality */
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {menuItems.map((item, i) => (
            <article
              key={item.id}
              className={`reveal menu-card-item reveal-d${i + 1}`}
              style={{
                flexShrink: 0,
                width: "78vw",
                maxWidth: "320px",
                background: "#FAF8F4",
                borderRadius: "1.25rem",
                overflow: "hidden",
                scrollSnapAlign: "start",
              }}
            >
              {/* Image area */}
              <div style={{ position: "relative", height: "11rem", overflow: "hidden" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(145deg, ${item.hue} 0%, ${item.hue}cc 100%)`,
                  }}
                />
                {/* Concentric circles */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "5.5rem", height: "5.5rem", borderRadius: "50%", background: "rgba(253,250,246,0.08)" }} />
                  <div style={{ position: "absolute", width: "8rem", height: "8rem", borderRadius: "50%", background: "rgba(253,250,246,0.04)" }} />
                </div>
                {/* Emoji */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
                  }}
                >
                  {item.emoji}
                </div>
                {/* Badge */}
                {item.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      background: "#17100A",
                      color: "#C4A882",
                      fontSize: "0.625rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.25rem 0.625rem",
                      borderRadius: "99px",
                    }}
                  >
                    {item.badge}
                  </div>
                )}
                {/* Category label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "0.75rem",
                    left: "0.875rem",
                    fontSize: "0.5625rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(253,250,246,0.65)",
                    fontWeight: 500,
                  }}
                >
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.25rem" }}>
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "1.0625rem",
                    fontWeight: 400,
                    color: "#1E1610",
                    lineHeight: 1.3,
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "#6A5A4E",
                    lineHeight: 1.65,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                    paddingTop: "0.875rem",
                    borderTop: "1px solid #EEE9E1",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                    <span
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "1.375rem",
                        color: "#A88060",
                      }}
                    >
                      {item.price}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#6A5A4E" }}>฿</span>
                  </div>
                  <button
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      background: "#A88060",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                    aria-label={`เพิ่ม ${item.name}`}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#8A6A4A"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#A88060"; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1.5v9M1.5 6h9" stroke="#FDFAF6" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Note */}
        <p
          className="reveal"
          style={{
            textAlign: "center",
            marginTop: "2.5rem",
            fontSize: "0.8125rem",
            color: "rgba(106,90,78,0.4)",
            fontStyle: "italic",
          }}
        >
          * เมนูอาจเปลี่ยนแปลงตามวัตถุดิบที่หาได้ในแต่ละสัปดาห์
        </p>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────────────── */
function Contact() {
  const ref = useReveal();

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "6rem 0",
        background: "#17100A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(168,128,96,0.15) 0%, transparent 65%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="reveal">
            <span className="section-label" style={{ color: "#C4A882", display: "inline-block", marginBottom: "0.75rem" }}>
              มาเจอกัน
            </span>
          </div>
          <h2
            className="reveal reveal-d1"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2rem, 4.5vw, 2.75rem)",
              fontWeight: 400,
              color: "#FDFAF6",
              lineHeight: 1.15,
            }}
          >
            ติดต่อและหาเรา
          </h2>
        </div>

        {/* 3-card grid */}
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
        >
          {/* Location card */}
          <div
            className="reveal reveal-d1 card-hover"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(221,214,203,0.1)",
              borderRadius: "1.25rem",
              padding: "1.75rem",
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.75rem",
                background: "rgba(168,128,96,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "1.125rem",
                fontWeight: 400,
                color: "#FDFAF6",
                marginBottom: "0.75rem",
              }}
            >
              ที่อยู่
            </h3>
            <address
              style={{
                fontStyle: "normal",
                fontSize: "0.875rem",
                color: "rgba(253,250,246,0.45)",
                lineHeight: 1.85,
              }}
            >
              123 ซอยสุขุมวิท 55
              <br />
              แขวงคลองตันเหนือ
              <br />
              เขตวัฒนา กรุงเทพฯ 10110
            </address>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                marginTop: "1.25rem",
                fontSize: "0.75rem",
                color: "#C4A882",
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
            >
              ดูแผนที่
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5 9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Hours card */}
          <div
            className="reveal reveal-d2"
            style={{
              background: "#A88060",
              borderRadius: "1.25rem",
              padding: "1.75rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow orb */}
            <div
              style={{
                position: "absolute",
                top: "-2rem",
                right: "-2rem",
                width: "5rem",
                height: "5rem",
                borderRadius: "50%",
                background: "rgba(253,250,246,0.12)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.75rem",
                background: "rgba(253,250,246,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FDFAF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "1.125rem",
                fontWeight: 400,
                color: "#FDFAF6",
                marginBottom: "1.25rem",
              }}
            >
              เวลาทำการ
            </h3>
            <div>
              {hours.map((h, idx) => (
                <div
                  key={h.day}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "0.875rem",
                    marginBottom: "0.875rem",
                    borderBottom: idx < hours.length - 1 ? "1px solid rgba(253,250,246,0.12)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: h.active ? "#FDFAF6" : "rgba(253,250,246,0.5)",
                      fontWeight: h.active ? 500 : 400,
                    }}
                  >
                    {h.day}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.625rem",
                      borderRadius: "99px",
                      background: h.active ? "rgba(253,250,246,0.15)" : "transparent",
                      color: h.active ? "#FDFAF6" : h.time === "ปิด" ? "rgba(253,250,246,0.25)" : "rgba(253,250,246,0.5)",
                    }}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social card */}
          <div
            className="reveal reveal-d3 card-hover"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(221,214,203,0.1)",
              borderRadius: "1.25rem",
              padding: "1.75rem",
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.75rem",
                background: "rgba(168,128,96,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "1.125rem",
                fontWeight: 400,
                color: "#FDFAF6",
                marginBottom: "0.5rem",
              }}
            >
              ติดตามเรา
            </h3>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "rgba(253,250,246,0.35)",
                marginBottom: "1.25rem",
                lineHeight: 1.6,
              }}
            >
              อัปเดตเมนูและกิจกรรมใหม่ทุกสัปดาห์
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {socialLinks.map((s, idx) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    textDecoration: "none",
                    padding: "0.625rem 0",
                    borderBottom: idx < socialLinks.length - 1 ? "1px solid rgba(221,214,203,0.08)" : "none",
                  }}
                >
                  <span
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "0.5rem",
                      background: "rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {/* Instagram icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(253,250,246,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.8" fill="rgba(253,250,246,0.5)" stroke="none" />
                    </svg>
                  </span>
                  <div>
                    <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "rgba(253,250,246,0.65)" }}>
                      {s.name}
                    </p>
                    <p style={{ fontSize: "0.6875rem", color: "rgba(253,250,246,0.3)", marginTop: "0.125rem" }}>
                      {s.handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="reveal"
          style={{
            marginTop: "4rem",
            height: "1px",
            background: "rgba(221,214,203,0.08)",
          }}
        />

        {/* Footer */}
        <div
          className="reveal"
          style={{
            marginTop: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "0.875rem",
              color: "rgba(253,250,246,0.2)",
            }}
          >
            don&apos;t miss this saturday
          </p>
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(253,250,246,0.15)",
              letterSpacing: "0.04em",
            }}
          >
            © {new Date().getFullYear()} · Made with warmth in Bangkok
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Page root ─────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Contact />
      </main>
    </>
  );
}