"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Scroll-reveal hook ──────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    const targets = el.querySelectorAll(".reveal, .reveal-scale, .reveal-left, .reveal-right");
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── Data ────────────────────────────────────────────────────── */
const menuItems = [
  {
    id: 1,
    category: "Coffee",
    name: "Saturday Morning Blend",
    desc: "Single-origin pour-over with notes of dark chocolate, caramel, and a hint of dried cherry.",
    price: "120",
    unit: "฿",
    emoji: "☕",
    badge: "Bestseller",
    gradient: "linear-gradient(145deg, #D4B896 0%, #8B5E3C 100%)",
  },
  {
    id: 2,
    category: "Drinks",
    name: "Golden Hour Latte",
    desc: "Espresso, steamed oat milk, turmeric, and a touch of honey — warm and deeply soothing.",
    price: "135",
    unit: "฿",
    emoji: "🌿",
    badge: "New",
    gradient: "linear-gradient(145deg, #C4956A 0%, #6B4226 100%)",
  },
  {
    id: 3,
    category: "Food",
    name: "Sourdough & Ricotta",
    desc: "House sourdough, whipped ricotta, seasonal jam, crushed pistachios, and wild honey.",
    price: "190",
    unit: "฿",
    emoji: "🍞",
    badge: null,
    gradient: "linear-gradient(145deg, #E8C99A 0%, #A0714F 100%)",
  },
  {
    id: 4,
    category: "Dessert",
    name: "Brown Butter Financier",
    desc: "Crisp almond cakes baked fresh every Saturday, dusted with powdered sugar and sea salt.",
    price: "95",
    unit: "฿",
    emoji: "🧁",
    badge: "Saturday Only",
    gradient: "linear-gradient(145deg, #BF8A60 0%, #4A2C14 100%)",
  },
];

const navLinks = [
  { href: "#about", label: "เกี่ยวกับเรา" },
  { href: "#menu", label: "เมนู" },
  { href: "#contact", label: "ติดต่อ" },
];

/* ─── Navbar ──────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);

      const sections = ["hero", "about", "menu", "contact"];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF7F2]/96 backdrop-blur-xl shadow-[0_1px_32px_rgba(44,26,14,0.07)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#hero"
          className="group flex flex-col leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span
            className={`text-[13px] md:text-sm font-semibold tracking-wider uppercase transition-colors duration-300 ${
              scrolled ? "text-[#4A2C14]" : "text-[#FAF7F2]"
            }`}
          >
            don&apos;t miss
          </span>
          <span
            className={`text-[13px] md:text-sm italic font-medium transition-colors duration-300 ${
              scrolled ? "text-[#8B5E3C]" : "text-[#C4956A]"
            }`}
          >
            this saturday
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`nav-link text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                  scrolled
                    ? activeSection === l.href.slice(1)
                      ? "text-[#8B5E3C]"
                      : "text-[#4A2C14]/70 hover:text-[#8B5E3C]"
                    : activeSection === l.href.slice(1)
                    ? "text-[#C4956A]"
                    : "text-[#FAF7F2]/70 hover:text-[#FAF7F2]"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#menu"
              className={`ml-1 px-5 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300 ${
                scrolled
                  ? "bg-[#8B5E3C] text-[#FAF7F2] hover:bg-[#6B4226] shadow-[0_4px_20px_rgba(139,94,60,0.3)]"
                  : "bg-[#FAF7F2]/15 text-[#FAF7F2] border border-[#FAF7F2]/30 hover:bg-[#FAF7F2]/25"
              }`}
            >
              ดูเมนู
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-[5px]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-[1.5px] bg-current transition-all duration-300 ${
                scrolled ? "text-[#4A2C14]" : "text-[#FAF7F2]"
              } ${
                i === 0
                  ? menuOpen
                    ? "w-5 rotate-45 translate-y-[6.5px]"
                    : "w-5"
                  : i === 1
                  ? menuOpen
                    ? "w-5 opacity-0"
                    : "w-4"
                  : menuOpen
                  ? "w-5 -rotate-45 -translate-y-[6.5px]"
                  : "w-5"
              }`}
              style={{ backgroundColor: scrolled ? "#4A2C14" : "#FAF7F2" }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-[#FAF7F2]/98 backdrop-blur-xl border-t border-[#E8D5B7]/60`}
      >
        <div className="px-6 py-6 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className="flex items-center justify-between py-3 border-b border-[#E8D5B7]/60 text-[15px] font-medium text-[#4A2C14]/80 hover:text-[#8B5E3C] transition-colors"
            >
              {l.label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
          <div className="pt-4">
            <a
              href="#menu"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#8B5E3C] text-[#FAF7F2] text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(139,94,60,0.3)]"
            >
              ดูเมนูทั้งหมด
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#1E1108" }}
    >
      {/* Multi-layer warm radial backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 15% 60%, rgba(139,94,60,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 85% 15%, rgba(196,149,106,0.25) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 55% 90%, rgba(107,66,38,0.3) 0%, transparent 55%),
            #1E1108
          `,
        }}
      />

      {/* Film-grain noise */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Geometric ring ornaments */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute right-[8%] top-[12%] w-56 h-56 rounded-full border border-[#C4956A]/10" />
        <div className="absolute right-[5%] top-[8%] w-80 h-80 rounded-full border border-[#C4956A]/06" />
        <div className="absolute right-[2%] top-[4%] w-[440px] h-[440px] rounded-full border border-[#C4956A]/04" />
        <div className="absolute -left-20 bottom-[10%] w-72 h-72 rounded-full border border-[#8B5E3C]/12" />
        <div className="absolute left-[40%] top-[50%] w-px h-[30vh] bg-gradient-to-b from-transparent via-[#C4956A]/15 to-transparent" />
      </div>

      {/* Horizontal rule lines */}
      <div className="absolute inset-x-0 top-[30%] h-px bg-gradient-to-r from-transparent via-[#C4956A]/10 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-[28%] h-px bg-gradient-to-r from-transparent via-[#C4956A]/08 to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">

        {/* Eyebrow tag */}
        <div className="animate-fade-up mb-7 md:mb-10">
          <span className="pill text-[#C4956A] border-[#C4956A]/35 bg-[#C4956A]/08">
            <span className="w-1 h-1 rounded-full bg-[#C4956A] inline-block" />
            Hangout Space · Bangkok
          </span>
        </div>

        {/* Main heading */}
        <div className="animate-fade-up-delay-1 mb-6 md:mb-8">
          <h1 style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="block text-[#FAF7F2] text-[clamp(3.2rem,10vw,7rem)] font-[400] leading-[1.02] tracking-[-0.02em]">
              don&apos;t miss
            </span>
            <span className="block text-[#C4956A] text-[clamp(3.2rem,10vw,7rem)] font-[400] italic leading-[1.02] tracking-[-0.01em]">
              this saturday
            </span>
          </h1>
        </div>

        {/* Ornament divider */}
        <div className="animate-fade-up-delay-2 flex items-center justify-center gap-5 mb-7 md:mb-9">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#C4956A]/50" />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L12.39 7.26L18 8.18L14 12.08L14.9 17.66L10 15L5.1 17.66L6 12.08L2 8.18L7.61 7.26L10 2Z"
              fill="none" stroke="#C4956A" strokeWidth="1" strokeLinejoin="round" opacity="0.6"/>
          </svg>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#C4956A]/50" />
        </div>

        {/* Tagline */}
        <p className="animate-fade-up-delay-2 text-[#FAF7F2]/65 text-base md:text-lg lg:text-xl leading-[1.75] max-w-[38ch] mx-auto font-light tracking-[0.01em]">
          พื้นที่อบอุ่นสำหรับกาแฟดี ๆ อาหารอร่อย
          <br className="hidden sm:block" />
          และบทสนทนาที่คุณจะไม่ลืม
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center gap-3 mt-10 md:mt-12">
          <a
            href="#menu"
            className="px-8 py-4 bg-[#8B5E3C] text-[#FAF7F2] rounded-full text-[13px] font-semibold tracking-[0.06em] uppercase hover:bg-[#6B4226] transition-all duration-300 shadow-[0_8px_32px_rgba(139,94,60,0.45)] hover:shadow-[0_12px_40px_rgba(139,94,60,0.55)] hover:-translate-y-0.5"
          >
            ดูเมนูทั้งหมด
          </a>
          <a
            href="#about"
            className="px-8 py-[15px] border border-[#FAF7F2]/20 text-[#FAF7F2]/70 rounded-full text-[13px] font-medium tracking-[0.06em] uppercase hover:border-[#C4956A]/50 hover:text-[#FAF7F2] transition-all duration-300"
          >
            เรื่องราวของเรา
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-up-delay-4 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[#C4956A]/50 text-[9px] tracking-[0.3em] uppercase font-medium">scroll</span>
          <div className="scroll-arrow flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-gradient-to-b from-[#C4956A]/50 to-transparent" />
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="#C4956A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About ───────────────────────────────────────────────────── */
function About() {
  const ref = useReveal();

  return (
    <section id="about" className="py-28 md:py-40 bg-[#FAF7F2] overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 lg:gap-28 items-center">

          {/* Left — visual */}
          <div className="relative order-2 md:order-1 reveal-left">
            {/* Main image block */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(44,26,14,0.15)]">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(155deg, #C4956A 0%, #7A4F2E 45%, #2C1A0E 100%)",
                }}
              />
              {/* Layered SVG shapes */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
                <ellipse cx="300" cy="120" rx="180" ry="180" fill="#FAF7F2" />
                <ellipse cx="100" cy="400" rx="140" ry="140" fill="#FAF7F2" />
                <ellipse cx="240" cy="320" rx="110" ry="110" fill="#FAF7F2" />
              </svg>
              {/* Inner content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <p
                  className="text-[#FAF7F2]/50 text-xl tracking-[0.25em] uppercase font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Est.
                </p>
                <p
                  className="text-[#FAF7F2] text-[7rem] md:text-[8rem] leading-none font-semibold tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  2021
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-8 h-px bg-[#FAF7F2]/35" />
                  <p className="text-[#FAF7F2]/55 text-[10px] tracking-[0.25em] uppercase">Bangkok · Thailand</p>
                  <div className="w-8 h-px bg-[#FAF7F2]/35" />
                </div>
              </div>
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#2C1A0E]/40 to-transparent" />
            </div>

            {/* Floating hours card */}
            <div className="absolute -bottom-5 -right-3 md:-right-6 bg-[#2C1A0E] rounded-2xl px-6 py-5 shadow-[0_16px_48px_rgba(44,26,14,0.35)]">
              <p
                className="text-[#C4956A] text-4xl font-semibold leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Sat
              </p>
              <div className="mt-3 space-y-1">
                <p className="text-[#FAF7F2] text-sm font-medium">09:00 – 18:00</p>
                <p className="text-[#FAF7F2]/40 text-[10px] tracking-wide uppercase">เปิดทุกวันเสาร์</p>
              </div>
            </div>

            {/* Dashed ring ornament */}
            <div className="absolute -top-5 -left-5 w-28 h-28 rounded-full border-2 border-dashed border-[#C4956A]/25 pointer-events-none" />
            <div className="absolute -top-2 -left-2 w-16 h-16 rounded-full border border-[#C4956A]/15 pointer-events-none" />
          </div>

          {/* Right — copy */}
          <div className="order-1 md:order-2 space-y-6">
            <div className="reveal">
              <span className="pill text-[#8B5E3C] border-[#8B5E3C]/30">
                เกี่ยวกับเรา
              </span>
            </div>

            <h2
              className="reveal reveal-delay-1 text-[#2C1A0E] text-4xl md:text-[2.8rem] lg:text-5xl leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            >
              พื้นที่ที่ถูก
              <br />
              <em className="text-[#8B5E3C]">สร้างขึ้นเพื่อวันเสาร์</em>
            </h2>

            <div className="reveal reveal-delay-2 space-y-4 text-[#4A2C14]/70 leading-[1.85] text-[15px] md:text-base">
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
            <div className="reveal reveal-delay-3 grid grid-cols-3 gap-2 pt-8 mt-8 border-t border-[#E8D5B7]">
              {[
                { val: "4+", label: "ปีที่เปิด" },
                { val: "120+", label: "เมนูผ่านมา" },
                { val: "∞", label: "ความทรงจำดี ๆ" },
              ].map((s) => (
                <div key={s.label} className="text-center py-2">
                  <p
                    className="text-[#8B5E3C] text-[1.9rem] md:text-4xl font-semibold leading-none"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {s.val}
                  </p>
                  <p className="text-[#4A2C14]/45 text-[11px] mt-2 leading-snug tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Menu ────────────────────────────────────────────────────── */
function Menu() {
  const ref = useReveal();

  return (
    <section id="menu" className="py-28 md:py-40 bg-[#F5EFE6] overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="reveal inline-block">
            <span className="pill text-[#8B5E3C] border-[#8B5E3C]/30">สัปดาห์นี้</span>
          </div>
          <h2
            className="reveal reveal-delay-1 text-[#2C1A0E] text-4xl md:text-[2.8rem] lg:text-5xl mt-5 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            เมนูแนะนำ
          </h2>
          <p className="reveal reveal-delay-2 mt-4 text-[#4A2C14]/55 text-[15px] max-w-[36ch] mx-auto leading-relaxed">
            คัดมาเพื่อคุณโดยเฉพาะ — เปลี่ยนตามฤดูกาล หมดแล้วหมดเลย
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {menuItems.map((item, i) => (
            <article
              key={item.id}
              className={`menu-card reveal reveal-delay-${i + 1} relative bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-[0_2px_24px_rgba(44,26,14,0.07)] flex flex-col`}
            >
              {/* Badge */}
              {item.badge && (
                <div className="absolute top-3.5 left-3.5 z-20 bg-[#2C1A0E] text-[#C4956A] text-[9px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full">
                  {item.badge}
                </div>
              )}

              {/* Image area */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <div
                  className="card-image-inner absolute inset-0"
                  style={{ background: item.gradient }}
                />
                {/* Concentric circle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-36 h-36 rounded-full" style={{ background: "rgba(250,247,242,0.1)" }} />
                  <div className="w-52 h-52 rounded-full absolute" style={{ background: "rgba(250,247,242,0.05)" }} />
                </div>
                {/* Emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[3.2rem] drop-shadow-lg select-none" aria-hidden="true">
                    {item.emoji}
                  </span>
                </div>
                {/* Category label */}
                <span className="absolute bottom-3 left-4 text-[#FAF7F2]/75 text-[9px] tracking-[0.18em] uppercase font-medium">
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3
                  className="text-[#2C1A0E] text-[1.05rem] leading-snug mb-2.5 flex-shrink-0"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                >
                  {item.name}
                </h3>
                <p className="text-[#4A2C14]/55 text-[13px] leading-relaxed mb-5 line-clamp-3 flex-1">
                  {item.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[#E8D5B7] mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-[#8B5E3C] text-2xl font-semibold leading-none"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.price}
                    </span>
                    <span className="text-[#4A2C14]/45 text-xs">{item.unit}</span>
                  </div>
                  <button
                    className="w-8 h-8 rounded-full bg-[#8B5E3C] flex items-center justify-center hover:bg-[#6B4226] active:scale-95 transition-all duration-200 shadow-[0_4px_16px_rgba(139,94,60,0.3)]"
                    aria-label={`เพิ่ม ${item.name}`}
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1.5v10M1.5 6.5h10" stroke="#FAF7F2" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer note */}
        <p className="reveal text-center text-[#4A2C14]/35 text-[13px] mt-12 italic tracking-wide">
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
    <section id="contact" className="py-28 md:py-40 bg-[#2C1A0E] relative overflow-hidden" ref={ref}>

      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 75% 35%, rgba(139,94,60,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 50% 45% at 15% 70%, rgba(196,149,106,0.1) 0%, transparent 60%)
          `,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(#C4956A 1px, transparent 1px),
            linear-gradient(90deg, #C4956A 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="reveal inline-block">
            <span className="pill text-[#C4956A] border-[#C4956A]/30">มาเจอกัน</span>
          </div>
          <h2
            className="reveal reveal-delay-1 text-[#FAF7F2] text-4xl md:text-[2.8rem] lg:text-5xl mt-5 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            ติดต่อและหาเรา
          </h2>
        </div>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">

          {/* Location card */}
          <div className="reveal reveal-delay-1 group bg-white/[0.04] border border-[#C4956A]/15 rounded-2xl p-7 hover:bg-white/[0.07] transition-colors duration-400">
            <div className="w-11 h-11 rounded-xl bg-[#8B5E3C]/25 flex items-center justify-center mb-6 group-hover:bg-[#8B5E3C]/35 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <h3
              className="text-[#FAF7F2] text-[1.1rem] mb-3 leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ที่อยู่
            </h3>
            <address className="not-italic text-[#FAF7F2]/55 text-sm leading-[1.9]">
              123 ซอยสุขุมวิท 55<br />
              แขวงคลองตันเหนือ<br />
              เขตวัฒนา กรุงเทพฯ 10110
            </address>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-[#C4956A] text-[12px] font-medium tracking-wide hover:text-[#E8B97A] transition-colors group/link"
            >
              ดูแผนที่
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">
                <path d="M2.5 9.5 9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Hours card (accent) */}
          <div className="reveal reveal-delay-2 relative bg-[#8B5E3C] rounded-2xl p-7 overflow-hidden">
            <div
              className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-[0.18]"
              style={{ background: "radial-gradient(circle, #FAF7F2 0%, transparent 70%)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-[0.08]"
              style={{ background: "radial-gradient(circle, #FAF7F2 0%, transparent 70%)" }}
            />

            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-6">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>

            <h3
              className="text-[#FAF7F2] text-[1.1rem] mb-5 leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              เวลาทำการ
            </h3>

            <div className="space-y-3.5">
              {[
                { day: "วันเสาร์", time: "09:00 – 18:00", highlight: true },
                { day: "วันอาทิตย์", time: "10:00 – 16:00", highlight: false },
                { day: "จันทร์ – ศุกร์", time: "ปิดทำการ", highlight: false },
              ].map((h, i) => (
                <div
                  key={h.day}
                  className={`flex justify-between items-center text-sm pb-3.5 ${
                    i < 2 ? "border-b border-[#FAF7F2]/15" : ""
                  }`}
                >
                  <span className={h.highlight ? "text-[#FAF7F2] font-semibold" : "text-[#FAF7F2]/55 text-[13px]"}>
                    {h.day}
                  </span>
                  <span
                    className={`text-[11px] px-3 py-1 rounded-full font-medium ${
                      h.highlight
                        ? "bg-[#FAF7F2]/20 text-[#FAF7F2]"
                        : h.time === "ปิดทำการ"
                        ? "text-[#FAF7F2]/30"
                        : "text-[#FAF7F2]/60"
                    }`}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social card */}
          <div className="reveal reveal-delay-3 group bg-white/[0.04] border border-[#C4956A]/15 rounded-2xl p-7 hover:bg-white/[0.07] transition-colors duration-400">
            <div className="w-11 h-11 rounded-xl bg-[#8B5E3C]/25 flex items-center justify-center mb-6 group-hover:bg-[#8B5E3C]/35 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </div>

            <h3
              className="text-[#FAF7F2] text-[1.1rem] mb-2 leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ติดตามเรา
            </h3>
            <p className="text-[#FAF7F2]/40 text-[13px] mb-6 leading-relaxed">
              อัปเดตเมนูและกิจกรรมใหม่ทุกสัปดาห์
            </p>

            <div className="space-y-4">
              {[
                {
                  name: "Instagram",
                  handle: "@dontmissthissaturday",
                  href: "https://instagram.com",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
                {
                  name: "Facebook",
                  handle: "Don't Miss This Saturday",
                  href: "https://facebook.com",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                },
                {
                  name: "Line OA",
                  handle: "@dontmisssaturday",
                  href: "https://line.me",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 text-[#FAF7F2]/50 hover:text-[#C4956A] transition-colors duration-200 group/social"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#FAF7F2]/06 flex items-center justify-center text-current group-hover/social:bg-[#C4956A]/15 transition-colors flex-shrink-0">
                    {s.icon}
                  </span>
                  <div>
                    <p className="text-[13px] font-medium text-[#FAF7F2]/70 group-hover/social:text-[#C4956A] transition-colors leading-none mb-0.5">
                      {s.name}
                    </p>
                    <p className="text-[11px] text-[#FAF7F2]/35 leading-none">{s.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="reveal mt-20 pt-8 border-t border-[#C4956A]/12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-[#FAF7F2]/25 text-[13px] italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            don&apos;t miss this saturday
          </p>
          <p className="text-[#FAF7F2]/20 text-xs tracking-wide">
            © {new Date().getFullYear()} · Made with warmth in Bangkok
          </p>
        </div>

      </div>
    </section>
  );
}

/* ─── Page root ───────────────────────────────────────────────── */
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
