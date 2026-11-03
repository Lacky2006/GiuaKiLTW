import { ArrowUpRight, Gamepad2, Heart, MapPin, Network } from 'lucide-react';
import { milestones, projects, skills } from '../data/portfolio.js';

export function AboutSection() {
  return (
    <section className="content-section section-container" id="about" aria-labelledby="about-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">01 · GIỚI THIỆU</p>
        <h2 id="about-title">Một chút về mình</h2>
      </div>
      <div className="about-grid">
        <p className="about-lead" data-reveal>Mình là sinh viên năm 3 ngành Công nghệ thông tin tại Trường Đại học Giao thông Vận tải TP. Hồ Chí Minh.</p>
        <div className="about-copy" data-reveal>
          <p>Quê ở Đồng Nai, hiện mình đang học tập tại TP. Hồ Chí Minh. Bên cạnh việc học chuyên ngành, mình dành nhiều thời gian rèn luyện lập trình và phân tích vấn đề.</p>
          <p>Cùng với sự phát triển của AI, lĩnh vực mình muốn theo đuổi là phát triển game. Mình luôn muốn tìm hiểu, biến ý tưởng thành sản phẩm thật và chia sẻ trải nghiệm đó với mọi người.</p>
        </div>
      </div>
    </section>
  );
}

export function GoalsSection() {
  return (
    <section className="content-section section-container" id="goals" aria-labelledby="goals-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">02 · MỤC TIÊU NGHỀ NGHIỆP</p>
        <h2 id="goals-title">Hướng đi mình đang xây dựng</h2>
      </div>
      <div className="goals-grid">
        <article className="info-panel" data-reveal>
          <span className="panel-label">NGẮN HẠN</span>
          <h3>Củng cố nền tảng</h3>
          <p>Tập trung vào lập trình game, tư duy thuật toán và cấu trúc dữ liệu; rèn luyện sử dụng Game Engine và hiểu quy trình phát triển. Mong muốn vận dụng kiến thức vào dự án thực tế hoặc dự án cá nhân.</p>
        </article>
        <article className="info-panel" data-reveal>
          <span className="panel-label">DÀI HẠN</span>
          <h3>Trở thành Game Developer</h3>
          <p>Hướng đến khả năng tối ưu hiệu năng, thiết kế kiến trúc phần mềm linh hoạt và phối hợp hiệu quả với các bộ phận để tạo ra sản phẩm game chất lượng cao.</p>
        </article>
        <article className="info-panel info-panel--accent" data-reveal>
          <span className="panel-label">ĐỊNH HƯỚNG THỰC TẬP</span>
          <h3>Học từ dự án thực tế</h3>
          <p>Tìm kiếm cơ hội thực tập Game Developer tại TP. Hồ Chí Minh để tích lũy kinh nghiệm làm việc nhóm và phát triển kỹ năng chuyên môn.</p>
        </article>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section className="content-section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="section-container">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">03 · KỸ NĂNG CHUYÊN MÔN</p>
          <h2 id="skills-title">Những gì mình đang rèn luyện</h2>
          <p className="section-intro">Mức độ tự đánh giá hiện tại, dựa trên quá trình học tập và thực hành.</p>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-item" key={skill.name} data-reveal>
              <div className="skill-item__heading"><h3>{skill.name}</h3><span>{skill.level}%</span></div>
              <div className="skill-meter" role="meter" aria-label={`${skill.name}: ${skill.level}%`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={skill.level}>
                <span className="skill-meter__fill" data-skill-fill style={{ '--skill-level': `${skill.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducationSection() {
  return (
    <section className="content-section section-container" id="education" aria-labelledby="education-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">04 · HỌC VẤN & KINH NGHIỆM</p>
        <h2 id="education-title">Hành trình học tập</h2>
      </div>
      <div className="education-summary" data-reveal>
        <div className="education-summary__icon"><MapPin size={20} aria-hidden="true" /></div>
        <div><h3>Công nghệ thông tin</h3><p>Trường Đại học Giao thông Vận tải TP. Hồ Chí Minh · 2024 – nay</p></div>
      </div>
      <ol className="timeline">
        {milestones.map((item) => (
          <li className="timeline-item" key={item.year} data-reveal>
            <span className="timeline-item__year">{item.year}</span>
            <span className="timeline-item__dot" aria-hidden="true" />
            <div><h3>{item.title}</h3><p>{item.description}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card" data-reveal>
      <div className={`project-card__visual project-card__visual--${project.number}`} aria-hidden="true">
        {project.number === '01' ? <Network size={44} strokeWidth={1.5} /> : <span className="portfolio-monogram">L.</span>}
        <span className="project-card__number">{project.number}</span>
      </div>
      <div className="project-card__body">
        <p className="panel-label">{project.category}</p>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <ul className="tag-list" aria-label="Công nghệ và nội dung dự án">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <a className="project-link" href={project.href} target="_blank" rel="noreferrer">Xem repository <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section className="content-section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-container">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">05 · DỰ ÁN CÁ NHÂN</p>
          <h2>Một số dự án mình đã tham gia</h2>
          <p className="section-intro">Các repository công khai để xem thêm về mã nguồn.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
        </div>
      </div>
    </section>
  );
}

export function InterestsSection() {
  return (
    <section className="content-section section-container interests-section" id="interests" aria-labelledby="interests-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">06 · CHỨNG CHỈ & SỞ THÍCH</p>
        <h2 id="interests-title">Ngoài giờ học</h2>
      </div>
      <div className="interests-grid">
        <div className="info-panel" data-reveal>
          <span className="panel-label">CHỨNG CHỈ</span>
          <h3>Chưa có</h3>
          <p>Mình đang tập trung tích lũy kiến thức và kinh nghiệm qua học tập, thực hành dự án.</p>
        </div>
        <div className="info-panel hobbies-panel" data-reveal>
          <span className="panel-label">SỞ THÍCH</span>
          <h3>Những điều mình yêu thích</h3>
          <ul className="hobby-list">
            <li><Gamepad2 size={18} aria-hidden="true" /> Chơi game</li>
            <li><Heart size={18} aria-hidden="true" /> Đi dạy giáo lý</li>
            <li><MapPin size={18} aria-hidden="true" /> Đi chơi</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
