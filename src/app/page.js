"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

/* ===== Data ===== */
const SKILLS = [
  { name: "React", level: 92, category: "frontend" },
  { name: "Next.js", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "JavaScript", level: 95, category: "frontend" },
  { name: "HTML/CSS", level: 93, category: "frontend" },
  { name: "Node.js", level: 88, category: "backend" },
  { name: "Python", level: 82, category: "backend" },
  { name: "Express.js", level: 85, category: "backend" },
  { name: "MongoDB", level: 80, category: "backend" },
  { name: "PostgreSQL", level: 78, category: "backend" },
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 75, category: "tools" },
  { name: "AWS", level: 72, category: "tools" },
  { name: "Figma", level: 70, category: "tools" },
];

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory, Stripe payments, and an admin dashboard. Built for scale with Next.js and PostgreSQL.",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Tailwind"],
    color: "#6c63ff",
    icon: "🛒",
    github: "#",
    live: "#",
  },
  {
    title: "AI Chat Application",
    description:
      "Real-time chat app powered by AI with smart suggestions, message translation, and sentiment analysis. WebSocket-based architecture.",
    tags: ["React", "Node.js", "Socket.io", "OpenAI"],
    color: "#00d4aa",
    icon: "🤖",
    github: "#",
    live: "#",
  },
  {
    title: "Task Management Dashboard",
    description:
      "Kanban-style project management tool with drag-and-drop, team collaboration, analytics, and automated workflows.",
    tags: ["React", "Express", "MongoDB", "D3.js"],
    color: "#ff6b6b",
    icon: "📊",
    github: "#",
    live: "#",
  },
  {
    title: "Social Media Analytics",
    description:
      "Analytics dashboard tracking engagement metrics across platforms with beautiful data visualizations and export capabilities.",
    tags: ["Next.js", "Python", "FastAPI", "Chart.js"],
    color: "#ffd700",
    icon: "📈",
    github: "#",
    live: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Full-Stack Developer",
    company: "Your Company",
    period: "2024 — Present",
    description:
      "Building scalable web applications and leading frontend architecture decisions. Improved page load times by 40% through optimization.",
  },
  {
    role: "Frontend Developer",
    company: "Previous Company",
    period: "2023 — 2024",
    description:
      "Developed responsive UIs with React, implemented design systems, and collaborated with cross-functional teams on product features.",
  },
  {
    role: "Freelance Developer",
    company: "Self-Employed",
    period: "2022 — 2023",
    description:
      "Delivered 15+ client projects ranging from landing pages to full-stack applications. Specialized in modern JavaScript frameworks.",
  },
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ===== Typing Animation Hook ===== */
function useTypingEffect(texts, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout;

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentText.substring(0, displayText.length - 1)
              : currentText.substring(0, displayText.length + 1)
          );
        },
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, textIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

/* ===== Intersection Observer Hook ===== */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/* ===== Components ===== */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`} id="navbar">
      <div className={`container ${styles.navInner}`}>
        <a href="#" className={styles.logo}>
          <span className={styles.logoIcon}>HK</span>
          <span className={styles.logoText}>Harsh Kumar</span>
        </a>

        <div className={`${styles.navLinks} ${mobileOpen ? styles.navLinksOpen : ""}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.navLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className={styles.navCta} onClick={() => setMobileOpen(false)}>
            Let&apos;s Talk
          </a>
        </div>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          id="menu-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

function HeroSection() {
  const typedText = useTypingEffect([
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Open Source Contributor",
  ]);

  const [ref, isVisible] = useInView();

  return (
    <section className={styles.hero} id="hero" ref={ref}>
      <div className={styles.heroBg}>
        <div className={styles.heroOrb1}></div>
        <div className={styles.heroOrb2}></div>
        <div className={styles.heroOrb3}></div>
        <div className={styles.heroGrid}></div>
      </div>

      <div className={`container ${styles.heroContent} ${isVisible ? styles.visible : ""}`}>
        <div className={styles.heroTag}>
          <span className={styles.heroDot}></span>
          Available for opportunities
        </div>

        <h1 className={styles.heroTitle}>
          Hi, I&apos;m <span className="gradient-text">Harsh Kumar</span>
          <br />
          <span className={styles.heroTyped}>
            {typedText}
            <span className={styles.heroCursor}>|</span>
          </span>
        </h1>

        <p className={styles.heroSubtitle}>
          I craft modern, high-performance web experiences with clean code,
          creative design, and a passion for turning ideas into reality.
        </p>

        <div className={styles.heroActions}>
          <a href="#projects" className={styles.btnPrimary} id="view-projects-btn">
            <span>View My Work</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7"/>
            </svg>
          </a>
          <a href="#contact" className={styles.btnSecondary} id="contact-btn">
            <span>Get In Touch</span>
          </a>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.heroDivider}></div>
          <div className={styles.heroStat}>
            <span className={styles.statNumber}>2+</span>
            <span className={styles.statLabel}>Years Exp</span>
          </div>
          <div className={styles.heroDivider}></div>
          <div className={styles.heroStat}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Happy Clients</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel}></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}

function AboutSection() {
  const [ref, isVisible] = useInView();

  return (
    <section className={`section ${styles.about}`} id="about" ref={ref}>
      <div className={`container ${isVisible ? styles.visible : ""}`}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImageWrap}>
            <div className={styles.aboutImage}>
              <div className={styles.aboutAvatar}>
                <span>HK</span>
              </div>
              <div className={styles.aboutImageDecor}></div>
            </div>
            <div className={styles.aboutBadge}>
              <span className={styles.aboutBadgeIcon}>⚡</span>
              <div>
                <strong>2+ Years</strong>
                <span>Experience</span>
              </div>
            </div>
          </div>

          <div className={styles.aboutContent}>
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Passionate about crafting <span className="gradient-text">digital experiences</span>
            </h2>
            <p className={styles.aboutText}>
              I&apos;m a Full-Stack Developer based in India with a keen eye for design and a love for
              building things that live on the internet. I specialize in creating seamless,
              user-centric applications using modern technologies.
            </p>
            <p className={styles.aboutText}>
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open
              source, or designing intuitive user interfaces. I believe in writing clean,
              maintainable code that scales.
            </p>
            <div className={styles.aboutHighlights}>
              <div className={styles.aboutHighlight}>
                <span className={styles.aboutHighlightIcon}>🎯</span>
                <div>
                  <strong>Problem Solver</strong>
                  <span>Love tackling complex challenges</span>
                </div>
              </div>
              <div className={styles.aboutHighlight}>
                <span className={styles.aboutHighlightIcon}>🚀</span>
                <div>
                  <strong>Fast Learner</strong>
                  <span>Always exploring new tech</span>
                </div>
              </div>
              <div className={styles.aboutHighlight}>
                <span className={styles.aboutHighlightIcon}>🤝</span>
                <div>
                  <strong>Team Player</strong>
                  <span>Great collaboration skills</span>
                </div>
              </div>
              <div className={styles.aboutHighlight}>
                <span className={styles.aboutHighlightIcon}>✨</span>
                <div>
                  <strong>Detail Oriented</strong>
                  <span>Pixel-perfect implementations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [ref, isVisible] = useInView();

  const filteredSkills =
    activeFilter === "all" ? SKILLS : SKILLS.filter((s) => s.category === activeFilter);

  return (
    <section className={`section ${styles.skills}`} id="skills" ref={ref}>
      <div className={`container ${isVisible ? styles.visible : ""}`}>
        <div className={styles.sectionHeader}>
          <span className="section-label">Skills</span>
          <h2 className="section-title">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-subtitle">
            Technologies I work with to bring ideas to life
          </p>
        </div>

        <div className={styles.skillFilters}>
          {[
            { label: "All", value: "all" },
            { label: "Frontend", value: "frontend" },
            { label: "Backend", value: "backend" },
            { label: "Tools", value: "tools" },
          ].map((filter) => (
            <button
              key={filter.value}
              className={`${styles.skillFilter} ${activeFilter === filter.value ? styles.skillFilterActive : ""}`}
              onClick={() => setActiveFilter(filter.value)}
              id={`filter-${filter.value}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className={styles.skillsGrid}>
          {filteredSkills.map((skill, i) => (
            <div
              key={skill.name}
              className={`glass-card ${styles.skillCard}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={styles.skillInfo}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillLevel}>{skill.level}%</span>
              </div>
              <div className={styles.skillBar}>
                <div
                  className={styles.skillBarFill}
                  style={{
                    width: isVisible ? `${skill.level}%` : "0%",
                    transitionDelay: `${i * 0.1}s`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [ref, isVisible] = useInView();

  return (
    <section className={`section ${styles.projects}`} id="projects" ref={ref}>
      <div className={`container ${isVisible ? styles.visible : ""}`}>
        <div className={styles.sectionHeader}>
          <span className="section-label">Projects</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="section-subtitle">
            A selection of projects that showcase my skills and passion
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className={`glass-card ${styles.projectCard}`}
              style={{ animationDelay: `${i * 0.1}s` }}
              id={`project-${i}`}
            >
              <div
                className={styles.projectGlow}
                style={{ background: `${project.color}15` }}
              ></div>
              <div className={styles.projectHeader}>
                <span
                  className={styles.projectIcon}
                  style={{ background: `${project.color}20`, color: project.color }}
                >
                  {project.icon}
                </span>
                <div className={styles.projectLinks}>
                  <a href={project.github} className={styles.projectLink} aria-label="View source on GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href={project.live} className={styles.projectLink} aria-label="View live demo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>

              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.description}</p>

              <div className={styles.projectTags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.projectTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [ref, isVisible] = useInView();

  return (
    <section className={`section ${styles.experience}`} id="experience" ref={ref}>
      <div className={`container ${isVisible ? styles.visible : ""}`}>
        <div className={styles.sectionHeader}>
          <span className="section-label">Experience</span>
          <h2 className="section-title">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle">
            A timeline of my professional growth and achievements
          </p>
        </div>

        <div className={styles.timeline}>
          {EXPERIENCE.map((exp, i) => (
            <div
              key={i}
              className={styles.timelineItem}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className={styles.timelineDot}></div>
              <div className={`glass-card ${styles.timelineCard}`}>
                <span className={styles.timelinePeriod}>{exp.period}</span>
                <h3 className={styles.timelineRole}>{exp.role}</h3>
                <span className={styles.timelineCompany}>{exp.company}</span>
                <p className={styles.timelineDesc}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [ref, isVisible] = useInView();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formState;
    const mailtoLink = `mailto:iamharshkumar2004@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section className={`section ${styles.contact}`} id="contact" ref={ref}>
      <div className={`container ${isVisible ? styles.visible : ""}`}>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <span className="section-label">Contact</span>
            <h2 className="section-title">
              Let&apos;s work <span className="gradient-text">together</span>
            </h2>
            <p className="section-subtitle">
              Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something
              amazing together.
            </p>

            <div className={styles.contactDetails}>
              <a href="mailto:iamharshkumar2004@gmail.com" className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <div>
                  <strong>Email</strong>
                  <span>iamharshkumar2004@gmail.com</span>
                </div>
              </a>
              <a href="https://github.com/techharshkumar" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <span className={styles.contactIcon}>💻</span>
                <div>
                  <strong>GitHub</strong>
                  <span>@techharshkumar</span>
                </div>
              </a>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <div>
                  <strong>Location</strong>
                  <span>India</span>
                </div>
              </div>
            </div>
          </div>

          <form className={`glass-card ${styles.contactForm}`} onSubmit={handleSubmit} id="contact-form">
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                value={formState.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.btnPrimary} id="submit-btn">
              <span>Send Message</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.footerTop}>
          <a href="#" className={styles.logo}>
            <span className={styles.logoIcon}>HK</span>
            <span className={styles.logoText}>Harsh Kumar</span>
          </a>
          <div className={styles.footerSocials}>
            <a href="https://github.com/techharshkumar" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="mailto:iamharshkumar2004@gmail.com" aria-label="Email" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Harsh Kumar. Built with Next.js & passion.</p>
        </div>
      </div>
    </footer>
  );
}

/* ===== Main Page ===== */
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </>
  );
}
