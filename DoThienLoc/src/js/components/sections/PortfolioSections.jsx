import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Gamepad2,
  Github,
  Heart,
  MapPin,
} from 'lucide-react';
import { skills, timeline } from '../../data/portfolio.js';

export function AboutSection() {
  return (
    <section className="intro-band" id="about" aria-labelledby="about-title">
      <div className="section-wrap intro-band__grid">
        <div className="section-marker" data-reveal><span>01</span><span>VỀ MÌNH</span></div>
        <div className="intro-band__content" data-reveal>
          <p className="eyebrow eyebrow--dark">TÒ MÒ HÔM NAY, THẾ GIỚI NGÀY MAI</p>
          <h2 id="about-title">Mỗi thế giới lớn<br />đều bắt đầu từ <em>một dòng code.</em></h2>
          <div className="intro-band__detail">
            <p>Mình là sinh viên năm 3 ngành Công nghệ thông tin tại Trường Đại học Giao thông Vận tải TP. Hồ Chí Minh. Quê ở Đồng Nai, hiện mình học tập và tìm cơ hội phát triển tại TP. Hồ Chí Minh.</p>
            <p>Mình dành thời gian rèn luyện lập trình, tư duy phân tích và cách giải quyết vấn đề. Điều mình muốn theo đuổi là phát triển game: tìm hiểu cách một ý tưởng thành hình, rồi chia sẻ trải nghiệm ấy với mọi người.</p>
          </div>
          <div className="intro-band__facts">
            <div><strong>03</strong><span>NĂM ĐẠI HỌC</span></div>
            <div><strong>05</strong><span>KỸ NĂNG ĐANG RÈN</span></div>
            <div><strong>∞</strong><span>Ý TƯỞNG MUỐN THỬ</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GoalsSection() {
  return (
    <section className="goals section-wrap" id="goals" aria-labelledby="goals-title">
      <div className="section-heading" data-reveal>
        <div className="section-marker"><span>02</span><span>ĐỊNH HƯỚNG</span></div>
        <h2 id="goals-title">Đang học hỏi.<br /><span>Đã biết mình muốn đi đâu.</span></h2>
      </div>
      <div className="goals__grid">
        <article className="goal goal--short" data-reveal>
          <span className="goal__number">A / NGẮN HẠN</span>
          <h3>Xây nền thật chắc.</h3>
          <p>Củng cố lập trình game, thuật toán và cấu trúc dữ liệu; làm quen sâu hơn với Game Engine và quy trình phát triển. Đưa kiến thức vào dự án cá nhân và bài toán thực tế.</p>
          <span className="goal__index">01</span>
        </article>
        <article className="goal goal--long" data-reveal>
          <span className="goal__number">B / DÀI HẠN</span>
          <h3>Tạo game đáng nhớ.</h3>
          <p>Trở thành Game Developer chuyên nghiệp, biết tối ưu hiệu năng, thiết kế kiến trúc linh hoạt và phối hợp tốt với nhiều vai trò để làm nên sản phẩm chất lượng.</p>
          <span className="goal__index">02</span>
        </article>
        <article className="goal goal--intern" data-reveal>
          <span className="goal__number">C / BƯỚC TIẾP THEO</span>
          <h3>Tìm cơ hội thực tập<br />tại TP. Hồ Chí Minh.</h3>
          <p>Mong muốn học quy trình làm game thực tế, tích lũy kinh nghiệm làm việc nhóm và phát triển kỹ năng chuyên môn trong ngành.</p>
          <a href="https://github.com/Do-Thien-Loc" target="_blank" rel="noreferrer" aria-label="Mở GitHub để trao đổi về cơ hội thực tập"><ArrowUpRight size={22} aria-hidden="true" /></a>
        </article>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section className="skills" id="skills" aria-labelledby="skills-title">
      <div className="section-wrap skills__grid">
        <div className="skills__intro" data-reveal>
          <div className="section-marker section-marker--light"><span>03</span><span>BỘ CÔNG CỤ</span></div>
          <h2 id="skills-title">Đang luyện.<br /><span>Đang tiến bộ.</span></h2>
          <p>Mình tin kỹ năng tốt được xây từ những lần thử, sai và làm lại.</p>
          <div className="skills__note"><Braces size={18} aria-hidden="true" /><span>TỰ ĐÁNH GIÁ<br />THÁNG 11, 2026</span></div>
        </div>
        <div className="skills__list" aria-label="Mức độ tự đánh giá kỹ năng">
          {skills.map((skill) => (
            <div className="skill" key={skill.name} data-reveal>
              <div className="skill__top"><span>{skill.name}</span><span>{skill.level}%</span></div>
              <div className="skill__track" role="img" aria-label={`${skill.name}: ${skill.level}%`}>
                <span data-skill-fill style={{ '--skill-level': `${skill.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="skills__ticker" aria-hidden="true"><span>HỌC • THỬ • LẶP LẠI •</span><span>HỌC • THỬ • LẶP LẠI •</span></div>
    </section>
  );
}

export function JourneySection() {
  return (
    <section className="journey section-wrap" id="journey" aria-labelledby="journey-title">
      <div className="journey__head" data-reveal>
        <div className="section-marker"><span>04</span><span>HÀNH TRÌNH</span></div>
        <h2 id="journey-title">Từng bước một,<br /><em>vẫn đang đi.</em></h2>
        <p>Một vài cột mốc trên hành trình học và làm.</p>
      </div>
      <ol className="timeline">
        {timeline.map((item, index) => (
          <li className="timeline__item" key={item.year} data-reveal>
            <span className="timeline__year">{item.year}</span>
            <span className="timeline__dot" aria-hidden="true" />
            <div className="timeline__content"><span className="timeline__step">0{index + 1} / MILESTONE</span><h3>{item.title}</h3><p>{item.description}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProjectLink({ href, children }) {
  return (
    <a className="project__link" href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}

function NetTraVisual() {
  return (
    <div className="project__visual project__visual--nettra" aria-hidden="true">
      <div className="nettra-window">
        <div className="nettra-window__top"><span /><span /><span /><b>NETTRA / NETWORK MONITOR</b></div>
        <div className="nettra-window__body">
          <div className="nettra-window__label">LIVE TRAFFIC <i /></div>
          <div className="nettra-chart"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
          <div className="nettra-window__footer"><span>DOWNLOAD / UPLOAD</span><span>TCP · UDP · DNS</span></div>
        </div>
      </div>
      <span className="project__visual-index">NT—01</span>
    </div>
  );
}

function PortfolioVisual() {
  return (
    <div className="project__visual project__visual--portfolio" aria-hidden="true">
      <div className="portfolio-window">
        <div className="portfolio-window__bar"><span>GROUP_08 / WEB PORTFOLIO</span><span>● ● ●</span></div>
        <div className="portfolio-window__content"><span>CREATIVE<br />ON THE<br /><i>WEB.</i></span><b>08</b><div className="portfolio-window__lines"><i /><i /><i /></div></div>
      </div>
      <span className="project__visual-index">WEB—02</span>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <div className="section-wrap">
        <div className="projects__head" data-reveal>
          <div>
            <div className="section-marker section-marker--light"><span>05</span><span>CHỌN LỌC DỰ ÁN</span></div>
            <h2 id="projects-title">Từ ý tưởng<br />đến <em>bản build.</em></h2>
          </div>
          <p>Mỗi dự án là một lần học thêm điều mới, từ kỹ thuật đến cách nhìn một vấn đề.</p>
        </div>
        <div className="project-list">
          <article className="project project--nettra" data-reveal>
            <NetTraVisual />
            <div className="project__body">
              <div className="project__meta"><span>01 / DESKTOP APP</span><span>2025 — 2026</span></div>
              <h3>NetTra</h3>
              <p>Ứng dụng desktop theo dõi và phân tích lưu lượng mạng theo thời gian thực, với dashboard băng thông, giám sát gói tin và thông tin mối đe dọa.</p>
              <div className="project__tags"><span>React 19</span><span>TypeScript</span><span>Vite</span><span>Tauri 2 · Rust</span><span>Recharts</span></div>
              <ProjectLink href="https://github.com/meme-free/NetTra---Network-traffic-Analyzer">Xem mã nguồn</ProjectLink>
            </div>
          </article>

          <article className="project project--portfolio" data-reveal>
            <PortfolioVisual />
            <div className="project__body">
              <div className="project__meta"><span>02 / WEB PROJECT</span><span>2025</span></div>
              <h3>Portfolio nhóm 8</h3>
              <p>Portfolio cá nhân được lưu trong repository LapTrinhWeb_Group8. Mình sẽ bổ sung mô tả và công nghệ sau khi repository có thông tin xác nhận.</p>
              <div className="project__tags"><span>Stack chưa xác minh</span><span>Portfolio web</span></div>
              <ProjectLink href="https://github.com/Lacky2006/LapTrinhWeb_Group8">Xem mã nguồn</ProjectLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function OutsideSection() {
  return (
    <section className="outside section-wrap" id="outside" aria-labelledby="outside-title">
      <div className="section-marker" data-reveal><span>06</span><span>NGOÀI MÀN HÌNH</span></div>
      <div className="outside__content" data-reveal>
        <p className="eyebrow">NẠP LẠI NĂNG LƯỢNG</p>
        <h2 id="outside-title">Game. Giáo lý.<br /><em>Những chuyến đi.</em></h2>
        <p className="outside__copy">Lúc rảnh mình thường chơi game, đi dạy giáo lý và dành thời gian đi chơi cùng mọi người. Những khoảng dừng này giúp mình giữ sự tò mò và cân bằng.</p>
        <div className="outside__interests"><span><Gamepad2 size={17} aria-hidden="true" /> CHƠI GAME</span><span><Heart size={16} aria-hidden="true" /> DẠY GIÁO LÝ</span><span><MapPin size={16} aria-hidden="true" /> ĐI CHƠI</span></div>
      </div>
      <div className="outside__certificate" data-reveal>
        <span className="outside__certificate-label">CHỨNG CHỈ</span>
        <strong>Chưa có</strong>
        <span className="outside__certificate-line" />
        <span className="outside__certificate-note">Còn nhiều điều để học.</span>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="section-wrap contact__inner" data-reveal>
        <div className="section-marker section-marker--light"><span>07</span><span>LIÊN HỆ</span></div>
        <p className="eyebrow eyebrow--dark">SẴN SÀNG HỌC HỎI VÀ BẮT ĐẦU</p>
        <h2 id="contact-title">Cùng làm nên<br /><em>một trò chơi hay?</em></h2>
        <a className="contact__button" href="https://github.com/Do-Thien-Loc" target="_blank" rel="noreferrer">Ghé GitHub <ArrowUpRight size={20} aria-hidden="true" /></a>
        <div className="contact__details"><a href="https://github.com/Do-Thien-Loc" target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> GitHub <ArrowRight size={14} aria-hidden="true" /></a><span>Sinh viên CNTT · TP. Hồ Chí Minh</span></div>
      </div>
    </section>
  );
}
