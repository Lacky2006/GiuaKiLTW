import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Gamepad2, MapPin } from 'lucide-react';
import SplitText from '../SplitText.jsx';

function HeroSection() {
  const [portraitMissing, setPortraitMissing] = useState(false);

  return (
    <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
      <div className="hero__topline" data-hero-reveal>
        <span className="eyebrow"><i /> ĐANG TÌM CƠ HỘI THỰC TẬP</span>
        <span className="hero__index">PORTFOLIO <b>2026</b></span>
      </div>
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="hero__overline" data-hero-reveal>Xin chào, mình là</p>
          <SplitText
            id="hero-title"
            text="ĐỖ THIÊN LỘC"
            tag="h1"
            className="hero__title"
            textAlign="left"
            overflowVisible
            delay={38}
            duration={0.85}
            effect="rise"
            trigger="load"
            staggerFrom="start"
            accentColor="#2c55db"
          />
          <div className="hero__role" data-hero-reveal>
            <span>GAME</span><span className="hero__role-mark">/</span><span>DEVELOPER</span>
          </div>
          <p className="hero__intro" data-hero-reveal>
            Mình thích biến những ý tưởng còn nằm trên giấy thành trải nghiệm mà mọi người có thể chạm vào, chơi thử và nhớ đến.
          </p>
          <div className="hero__actions" data-hero-reveal>
            <a className="button button--primary" href="#projects">Khám phá dự án <ArrowDownRight size={18} aria-hidden="true" /></a>
            <a className="text-link" href="https://github.com/Do-Thien-Loc" target="_blank" rel="noreferrer">Kết nối GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="hero__location" data-hero-reveal>
            <MapPin size={15} aria-hidden="true" />
            <span>Đồng Nai <b>→</b> TP. Hồ Chí Minh</span>
          </div>
        </div>

        <figure className={`portrait${portraitMissing ? ' portrait--fallback' : ''}`} data-hero-reveal>
          {!portraitMissing && (
            <img
              src="/images/portrait.jpg"
              alt="Đỗ Thiên Lộc trong đồng phục hướng đạo sinh"
              width="1706"
              height="2560"
              fetchPriority="high"
              onError={() => setPortraitMissing(true)}
            />
          )}
          {portraitMissing && (
            <div className="portrait__fallback-art" role="img" aria-label="Khung ảnh chân dung của Đỗ Thiên Lộc">
              <span className="portrait__fallback-initials">ĐTL</span>
              <span className="portrait__fallback-caption">THIÊN LỘC<br />GAME DEVELOPER</span>
            </div>
          )}
          <figcaption className="portrait__caption"><span>NGƯỜI KỂ CHUYỆN BẰNG CODE</span><span>01 — 06</span></figcaption>
          <div className="portrait__stamp" aria-hidden="true"><Gamepad2 size={21} /><span>MADE<br />TO PLAY</span></div>
        </figure>
      </div>
      <div className="hero__bottomline" aria-hidden="true"><span>SCROLL ĐỂ KHÁM PHÁ</span><span>10°46' N / 106°42' E</span></div>
    </section>
  );
}

export default HeroSection;
