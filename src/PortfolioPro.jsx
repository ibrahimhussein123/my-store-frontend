import { useEffect, useState } from "react";
import "./PortfolioPro.css";

function PortfolioPro() {
  const [cvOpen, setCvOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const revealElements = document.querySelectorAll(
      ".portfolio-pro .portfolio-reveal"
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

    const sections = document.querySelectorAll(
      ".portfolio-pro section[id]"
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.45,
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setCvOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="portfolio-pro">

      {/* ================= BACKGROUND ================= */}

      <div className="portfolio-bg-grid"></div>
      <div className="portfolio-bg-orb portfolio-bg-orb-one"></div>
      <div className="portfolio-bg-orb portfolio-bg-orb-two"></div>
      <div className="portfolio-bg-orb portfolio-bg-orb-three"></div>

      {/* ================= NAVBAR ================= */}

      <div className="portfolio-container portfolio-nav-wrap">

        <nav className="portfolio-glass portfolio-nav">

          <div className="portfolio-brand">

            <div className="portfolio-brand-badge">
              YN
            </div>

            <span>
              [YOUR NAME]
            </span>

          </div>


          <div className="portfolio-nav-links">

            {[
              "about",
              "projects",
              "skills",
              "experience",
              "contact",
            ].map((section) => (

              <button
                key={section}
                className={
                  activeSection === section
                    ? "active"
                    : ""
                }
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() +
                  section.slice(1)}
              </button>

            ))}

          </div>

        </nav>

      </div>


      {/* ================= MAIN ================= */}

      <main>

        {/* ================= HERO ================= */}

        <section className="portfolio-hero portfolio-container">

          <div className="portfolio-hero-grid">


            {/* LEFT */}

            <div className="portfolio-hero-card portfolio-glass portfolio-reveal">

              <div className="portfolio-eyebrow">

                <span className="portfolio-eyebrow-dot"></span>

                [YOUR JOB TITLE]

              </div>


              <h1>

                <span className="portfolio-gradient-text">
                  [YOUR TAGLINE]
                </span>

              </h1>


              <p className="portfolio-lead">

                [WRITE A SHORT BIO ABOUT YOURSELF]

              </p>


              <div className="portfolio-hero-actions">

                <button
                  className="portfolio-btn portfolio-btn-primary"
                  onClick={() =>
                    scrollToSection("projects")
                  }
                >
                  Explore Projects
                </button>


                <button
                  className="portfolio-btn portfolio-btn-secondary"
                  onClick={() => setCvOpen(true)}
                >
                  View CV
                </button>

              </div>


              <div className="portfolio-hero-stats">

                <div className="portfolio-stat">

                  <h3>
                    [X.X]
                  </h3>

                  <p>
                    Current GPA
                  </p>

                </div>


                <div className="portfolio-stat">

                  <h3>
                    [X]
                  </h3>

                  <p>
                    Records analyzed
                  </p>

                </div>


                <div className="portfolio-stat">

                  <h3>
                    [X]
                  </h3>

                  <p>
                    Featured projects
                  </p>

                </div>

              </div>

            </div>


            {/* RIGHT */}

            <div className="portfolio-profile-card portfolio-glass portfolio-reveal">

              <div className="portfolio-profile-top">

                <span className="portfolio-profile-chip">
                  [YOUR AVAILABILITY STATUS]
                </span>

                <span className="portfolio-profile-chip">
                  [YOUR GRADUATION DATE]
                </span>

              </div>


              <div className="portfolio-avatar-wrap">

                <div className="portfolio-avatar-ring"></div>

                <div className="portfolio-avatar-content">

                  <div className="portfolio-avatar-initials">
                    YN
                  </div>

                  <h3>
                    [YOUR FIELD OF STUDY]
                  </h3>

                  <p>
                    [LIST YOUR KEY SKILLS]
                  </p>


                  <div className="portfolio-mini-tags">

                    <span>Python</span>
                    <span>Pandas</span>
                    <span>Machine Learning</span>
                    <span>C++</span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= ABOUT ================= */}

        <section
          id="about"
          className="portfolio-container portfolio-section portfolio-reveal"
        >

          <div className="portfolio-section-head">

            <div>

              <span className="portfolio-section-kicker">
                About
              </span>

              <h2>
                Who I am
              </h2>

            </div>

            <p>
              I enjoy combining analytical thinking,
              technical skills, and presentation ability
              to create work that is both strong and
              understandable.
            </p>

          </div>


          <div className="portfolio-section-card portfolio-glass">

            <div className="portfolio-about-grid">

              <div>

                <p className="portfolio-about-text">

                  [WRITE A DETAILED BIO ABOUT YOUR
                  BACKGROUND, EXPERIENCE, AND WHAT YOU DO]

                </p>


                <div className="portfolio-about-points">


                  <div className="portfolio-about-point">

                    <div className="portfolio-icon">
                      📊
                    </div>

                    <div>

                      <h3>
                        Data-Oriented Mindset
                      </h3>

                      <p>
                        I like transforming raw datasets
                        into meaningful findings that support
                        real decisions.
                      </p>

                    </div>

                  </div>


                  <div className="portfolio-about-point">

                    <div className="portfolio-icon">
                      🧠
                    </div>

                    <div>

                      <h3>
                        Technical Foundation
                      </h3>

                      <p>
                        I combine data science concepts
                        with programming and applied data
                        structures.
                      </p>

                    </div>

                  </div>


                  <div className="portfolio-about-point">

                    <div className="portfolio-icon">
                      🎤
                    </div>

                    <div>

                      <h3>
                        Communication & Leadership
                      </h3>

                      <p>
                        I value explaining ideas clearly,
                        supporting others, and contributing
                        well in teams.
                      </p>

                    </div>

                  </div>


                </div>

              </div>


              <div className="portfolio-inner-card">

                <span className="portfolio-section-kicker">
                  Highlights
                </span>


                <div className="portfolio-timeline">


                  <div className="portfolio-timeline-item">

                    <div className="portfolio-timeline-top">

                      <div>

                        <h3>
                          [YOUR SCHOOL NAME]
                        </h3>

                        <p className="portfolio-meta">
                          [YOUR DEGREE / MAJOR & MINOR]
                        </p>

                      </div>

                      <span className="portfolio-meta-pill">
                        [EXPECTED GRADUATION DATE]
                      </span>

                    </div>

                    <p>
                      [DESCRIBE YOUR ACADEMIC FOCUS]
                    </p>

                  </div>


                  <div className="portfolio-timeline-item">

                    <div className="portfolio-timeline-top">

                      <div>

                        <h3>
                          Scholarships
                        </h3>

                        <p className="portfolio-meta">
                          [YOUR SCHOLARSHIPS OR AWARDS]
                        </p>

                      </div>

                      <span className="portfolio-meta-pill">
                        Merit-Based
                      </span>

                    </div>

                    <p>
                      [DESCRIBE WHY YOU RECEIVED THIS AWARD]
                    </p>

                  </div>


                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= PROJECTS ================= */}

        <section
          id="projects"
          className="portfolio-container portfolio-section portfolio-reveal"
        >

          <div className="portfolio-section-head">

            <div>

              <span className="portfolio-section-kicker">
                Portfolio
              </span>

              <h2>
                Featured projects
              </h2>

            </div>

            <p>
              A mix of data science and computer science
              work that reflects both technical depth
              and practical problem-solving.
            </p>

          </div>


          <div className="portfolio-project-grid">


            {/* PROJECT 1 */}

            <article className="portfolio-project-card portfolio-glass portfolio-reveal">

              <div className="portfolio-project-image">

                <div>
                  Your Project Image
                </div>

              </div>


              <div className="portfolio-project-top">

                <div>

                  <h3>
                    [PROJECT TITLE]
                  </h3>

                  <p className="portfolio-meta">
                    [PROJECT SUBTITLE]
                  </p>

                </div>

                <span className="portfolio-tag">
                  [PROJECT CATEGORY]
                </span>

              </div>


              <p>
                [PROJECT DESCRIPTION]
              </p>


              <div className="portfolio-skills-group">

                <span className="portfolio-skill-pill">
                  [SKILL]
                </span>

                <span className="portfolio-skill-pill">
                  [SKILL]
                </span>

                <span className="portfolio-skill-pill">
                  [SKILL]
                </span>

                <span className="portfolio-skill-pill">
                  [SKILL]
                </span>

              </div>


              <div className="portfolio-project-links">

                <a
                  className="portfolio-project-link"
                  href="#contact"
                >
                  View Project
                </a>

              </div>

            </article>


            {/* PROJECT 2 */}

            <article className="portfolio-project-card portfolio-glass portfolio-reveal">

              <div className="portfolio-project-image">

                <div>
                  Your Project Image
                </div>

              </div>


              <div className="portfolio-project-top">

                <div>

                  <h3>
                    [PROJECT TITLE]
                  </h3>

                  <p className="portfolio-meta">
                    [PROJECT SUBTITLE]
                  </p>

                </div>

                <span className="portfolio-tag">
                  [PROJECT CATEGORY]
                </span>

              </div>


              <p>
                [PROJECT DESCRIPTION]
              </p>


              <div className="portfolio-skills-group">

                <span className="portfolio-skill-pill">
                  [SKILL]
                </span>

                <span className="portfolio-skill-pill">
                  [SKILL]
                </span>

                <span className="portfolio-skill-pill">
                  [SKILL]
                </span>

                <span className="portfolio-skill-pill">
                  [SKILL]
                </span>

              </div>


              <div className="portfolio-project-links">

                <a
                  className="portfolio-project-link"
                  href="#contact"
                >
                  View Project
                </a>

              </div>

            </article>


            {/* PROJECT 3 */}

            <article className="portfolio-project-card portfolio-glass portfolio-reveal">

              <div className="portfolio-project-image">

                <div>
                  Your Project Image
                </div>

              </div>


              <div className="portfolio-project-top">

                <div>

                  <h3>
                    [PROJECT TITLE]
                  </h3>

                  <p className="portfolio-meta">
                    [PROJECT SUBTITLE]
                  </p>

                </div>

                <span className="portfolio-tag">
                  [PROJECT CATEGORY]
                </span>

              </div>


              <p>
                [PROJECT DESCRIPTION]
              </p>


              <div className="portfolio-skills-group">

                <span className="portfolio-skill-pill">
                  [SKILL]
                </span>

                <span className="portfolio-skill-pill">
                  [SKILL]
                </span>

                <span className="portfolio-skill-pill">
                  [SKILL]
                </span>

                <span className="portfolio-skill-pill">
                  [SKILL]
                </span>

              </div>


              <div className="portfolio-project-links">

                <a
                  className="portfolio-project-link"
                  href="#contact"
                >
                  Request Demo
                </a>

              </div>

            </article>


            {/* PROJECT 4 */}

            <article className="portfolio-project-card portfolio-glass portfolio-reveal">

              <div className="portfolio-project-top">

                <div>

                  <h3>
                    More Projects Coming
                  </h3>

                  <p className="portfolio-meta">
                    Future updates
                  </p>

                </div>

                <span className="portfolio-tag">
                  Next
                </span>

              </div>


              <p>
                For the Future...
              </p>


              <div className="portfolio-skills-group">

                <span className="portfolio-skill-pill">
                  ....
                </span>

                <span className="portfolio-skill-pill">
                  ...
                </span>

                <span className="portfolio-skill-pill">
                  ...
                </span>

              </div>


              <div className="portfolio-project-links">

                <a
                  className="portfolio-project-link"
                  href="#projects"
                >
                  Update Soon
                </a>

              </div>

            </article>

          </div>

        </section>


        {/* ================= SKILLS ================= */}

        <section
          id="skills"
          className="portfolio-container portfolio-section portfolio-reveal"
        >

          <div className="portfolio-section-head">

            <div>

              <span className="portfolio-section-kicker">
                Skills
              </span>

              <h2>
                Technical & soft skills
              </h2>

            </div>

            <p>
              A balanced skill set across data science,
              programming, front-end learning, and
              communication.
            </p>

          </div>


          <div className="portfolio-section-card portfolio-glass">

            <div className="portfolio-skills-layout">


              <div className="portfolio-skills-card">

                <h3>
                  Programming
                </h3>

                <span className="portfolio-skill-pill">
                  Python
                </span>

                <span className="portfolio-skill-pill">
                  R
                </span>

                <span className="portfolio-skill-pill">
                  C++
                </span>

                <span className="portfolio-skill-pill">
                  JavaScript
                </span>

              </div>


              <div className="portfolio-skills-card">

                <h3>
                  Data Science & Analysis
                </h3>

                <span className="portfolio-skill-pill">
                  Pandas
                </span>

                <span className="portfolio-skill-pill">
                  Data Cleaning
                </span>

                <span className="portfolio-skill-pill">
                  EDA
                </span>

                <span className="portfolio-skill-pill">
                  Visualization
                </span>

                <span className="portfolio-skill-pill">
                  Machine Learning
                </span>

              </div>


              <div className="portfolio-skills-card">

                <h3>
                  Web Development
                </h3>

                <span className="portfolio-skill-pill">
                  HTML
                </span>

                <span className="portfolio-skill-pill">
                  CSS
                </span>

                <span className="portfolio-skill-pill">
                  Responsive Design
                </span>

                <span className="portfolio-skill-pill">
                  UI Styling
                </span>

              </div>


              <div className="portfolio-skills-card">

                <h3>
                  Professional Skills
                </h3>

                <span className="portfolio-skill-pill">
                  Presentation Skills
                </span>

                <span className="portfolio-skill-pill">
                  Communication
                </span>

                <span className="portfolio-skill-pill">
                  Leadership
                </span>

                <span className="portfolio-skill-pill">
                  Teamwork
                </span>

                <span className="portfolio-skill-pill">
                  Mentoring
                </span>

              </div>


            </div>

          </div>

        </section>


        {/* ================= EXPERIENCE ================= */}

        <section
          id="experience"
          className="portfolio-container portfolio-section portfolio-reveal"
        >

          <div className="portfolio-section-head">

            <div>

              <span className="portfolio-section-kicker">
                Experience
              </span>

              <h2>
                Experience & activities
              </h2>

            </div>

            <p>
              Academic support, leadership development,
              and team-based activities that strengthened
              both technical and interpersonal skills.
            </p>

          </div>


          <div className="portfolio-section-card portfolio-glass">

            <div className="portfolio-timeline">


              <div className="portfolio-timeline-item">

                <div className="portfolio-timeline-top">

                  <div>

                    <h3>
                      [EXPERIENCE TITLE / ORGANIZATION]
                    </h3>

                    <p className="portfolio-meta">
                      [EXPERIENCE SUBTITLE]
                    </p>

                  </div>

                  <span className="portfolio-meta-pill">
                    [DURATION]
                  </span>

                </div>

                <p>
                  [EXPERIENCE DESCRIPTION]
                </p>

              </div>


              <div className="portfolio-timeline-item">

                <div className="portfolio-timeline-top">

                  <div>

                    <h3>
                      [EXPERIENCE TITLE / ORGANIZATION]
                    </h3>

                    <p className="portfolio-meta">
                      [EXPERIENCE DATES]
                    </p>

                  </div>

                  <span className="portfolio-meta-pill">
                    [CATEGORY]
                  </span>

                </div>

                <p>
                  [EXPERIENCE DESCRIPTION]
                </p>

              </div>


              <div className="portfolio-timeline-item">

                <div className="portfolio-timeline-top">

                  <div>

                    <h3>
                      [EXPERIENCE TITLE]
                    </h3>

                    <p className="portfolio-meta">
                      [EXPERIENCE SUBTITLE]
                    </p>

                  </div>

                  <span className="portfolio-meta-pill">
                    [CATEGORY]
                  </span>

                </div>

                <p>
                  [EXPERIENCE DESCRIPTION]
                </p>

              </div>


            </div>

          </div>

        </section>


        {/* ================= CONTACT ================= */}

        <section
          id="contact"
          className="portfolio-container portfolio-section portfolio-reveal"
        >

          <div className="portfolio-section-head">

            <div>

              <span className="portfolio-section-kicker">
                Contact
              </span>

              <h2>
                Let's connect
              </h2>

            </div>

            <p>
              Interested in internships, collaborations,
              or discussing data science projects.
            </p>

          </div>


          <div className="portfolio-section-card portfolio-glass">

            <div className="portfolio-contact-grid">


              <div className="portfolio-contact-card portfolio-glass">

                <h3>
                  Contact information
                </h3>

                <p>
                  You can reach me through email, phone,
                  GitHub, or LinkedIn.
                </p>


                <div className="portfolio-contact-stack">

                  <a
                    className="portfolio-contact-link"
                    href="mailto:[YOUR EMAIL]"
                  >
                    📧
                    <span>
                      [YOUR EMAIL]
                    </span>
                  </a>


                  <a
                    className="portfolio-contact-link"
                    href="tel:[YOUR PHONE NUMBER]"
                  >
                    📱
                    <span>
                      [YOUR PHONE NUMBER]
                    </span>
                  </a>


                  <a
                    className="portfolio-contact-link"
                    href="#"
                  >
                    💻
                    <span>
                      [YOUR GITHUB URL]
                    </span>
                  </a>


                  <a
                    className="portfolio-contact-link"
                    href="#"
                  >
                    💼
                    <span>
                      [YOUR LINKEDIN URL]
                    </span>
                  </a>

                </div>

              </div>


              <div className="portfolio-contact-card portfolio-glass">

                <h3>
                  Quick summary
                </h3>

                <p>
                  [WRITE A ONE-LINE SUMMARY OF YOUR
                  BACKGROUND AND EXPERTISE]
                </p>


                <div className="portfolio-meta-row">

                  <span className="portfolio-meta-pill">
                    [YOUR SCHOOL]
                  </span>

                  <span className="portfolio-meta-pill">
                    [YOUR FIELD]
                  </span>

                  <span className="portfolio-meta-pill">
                    [YOUR MINOR / SPECIALTY]
                  </span>

                  <span className="portfolio-meta-pill">
                    [YOUR STATUS]
                  </span>

                </div>

              </div>


            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <div className="portfolio-container portfolio-footer">

        © 2026 [YOUR NAME] • Designed with HTML,
        CSS, and JavaScript

      </div>


      {/* ================= CV MODAL ================= */}

      {cvOpen && (

        <div
          className="portfolio-cv-modal"
          onClick={() => setCvOpen(false)}
        >

          <div
            className="portfolio-cv-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="portfolio-cv-topbar">

              <div>

                <strong>
                  Curriculum Vitae
                </strong>

                <small>
                  [YOUR NAME]
                </small>

              </div>


              <button
                className="portfolio-cv-close"
                onClick={() => setCvOpen(false)}
              >
                ×
              </button>

            </div>


            <div className="portfolio-cv-placeholder">

              <div>

                <span>
                  CV
                </span>

                <h2>
                  Your CV will appear here
                </h2>

                <p>
                  Replace the placeholder with your
                  actual PDF when the portfolio is ready.
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default PortfolioPro;