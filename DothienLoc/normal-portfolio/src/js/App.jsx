import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation.jsx';
import HeroSection from './components/HeroSection.jsx';
import ContactForm from './components/ContactForm.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import {
  AboutSection,
  EducationSection,
  GoalsSection,
  InterestsSection,
  ProjectsSection,
  SkillsSection,
} from './components/PageSections.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
  const pageRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      return;
    }
  }, [theme]);

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-hero-reveal]', {
        autoAlpha: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.1,
      });

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 18,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });

      gsap.from('[data-skill-fill]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 82%', once: true },
      });
    });
    return () => motion.revert();
  }, { scope: pageRef });

  return (
    <div className="app-shell" data-theme={theme} ref={pageRef}>
      <a className="skip-link" href="#main">Bỏ qua điều hướng</a>
      <Navigation theme={theme} onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')} />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <GoalsSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <InterestsSection />
        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-container"><ContactForm /></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
