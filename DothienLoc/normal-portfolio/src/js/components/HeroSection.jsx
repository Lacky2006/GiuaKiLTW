import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import SplitText from './SplitText.jsx';
import { profile } from '../data/portfolio.js';

function HeroSection() {
  return (
    <section className="hero section-container" id="top" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="eyebrow" data-hero-reveal><span className="status-dot" /> SINH VIÊN NĂM 3 · ĐANG TÌM CƠ HỘI THỰC TẬP</p>
        <p className="hero__greeting" data-hero-reveal>Xin chào, mình là</p>
        <SplitText
          id="hero-title"
          text={profile.name.toLocaleUpperCase('vi-VN')}
          tag="h1"
          className="hero__title"
          textAlign="left"
          overflowVisible
          delay={35}
          duration={0.75}
          effect="rise"
          trigger="load"
          accentColor="#2c55db"
        />
        <p className="hero__role" data-hero-reveal>Định hướng <strong>{profile.role}</strong></p>
        <p className="hero__summary" data-hero-reveal>
          Sinh viên Công nghệ thông tin yêu thích lập trình, tư duy phân tích và biến ý tưởng thành trải nghiệm game.
        </p>
        <p className="hero__location" data-hero-reveal><MapPin size={17} aria-hidden="true" /> {profile.hometown} · Hiện học tập tại {profile.location}</p>
        <div className="hero__actions" data-hero-reveal>
          <a className="button button--primary" href="#projects">Xem dự án <ArrowDown size={17} aria-hidden="true" /></a>
          <a className="button button--secondary" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <figure className="hero__portrait" data-hero-reveal>
        <img src="/images/portrait.jpg" alt="Đỗ Thiên Lộc trong đồng phục hướng đạo sinh" width="1706" height="2560" fetchPriority="high" />
        <figcaption>Đỗ Thiên Lộc <span>·</span> Game Developer</figcaption>
      </figure>
      <a className="hero__scroll" href="#about"><ArrowDown size={15} aria-hidden="true" /> Cuộn để xem portfolio</a>
    </section>
  );
}

export default HeroSection;
