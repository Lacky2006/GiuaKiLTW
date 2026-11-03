import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteFooter from './components/SiteFooter.jsx';
import SiteHeader from './components/SiteHeader.jsx';
import HeroSection from './components/sections/HeroSection.jsx';
import {
  AboutSection,
  ContactSection,
  GoalsSection,
  JourneySection,
  OutsideSection,
  ProjectsSection,
  SkillsSection,
} from './components/sections/PortfolioSections.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function AppShell() {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.scroll-progress__fill', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.25 },
        });

        gsap.from('[data-hero-reveal]', {
          autoAlpha: 0,
          y: 24,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.15,
        });

        gsap.utils.toArray('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            autoAlpha: 0,
            y: 24,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          });
        });

        gsap.from('[data-skill-fill]', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.85,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.skills__list', start: 'top 82%', once: true },
        });
      });

      return () => motion.revert();
    },
    { scope: pageRef },
  );

  return (
    <div className="site-shell" ref={pageRef}>
      <div className="scroll-progress" aria-hidden="true"><span className="scroll-progress__fill" /></div>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <GoalsSection />
        <SkillsSection />
        <JourneySection />
        <ProjectsSection />
        <OutsideSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

export default AppShell;
