import { useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

function SiteHeader() {
  const menuButtonRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          closeMenu();
          menuButtonRef.current?.focus();
        }
      }}
    >
      <a className="brand" href="#top" onClick={closeMenu} aria-label="Đỗ Thiên Lộc, về đầu trang">
        <span className="brand__mark">L.</span>
        <span className="brand__label">ĐỖ THIÊN LỘC <small>GAME DEVELOPER</small></span>
      </a>
      <button
        className="menu-toggle"
        ref={menuButtonRef}
        type="button"
        aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
      </button>
      <nav id="main-navigation" className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Điều hướng chính">
        <a href="#about" onClick={closeMenu}>Giới thiệu <span>01</span></a>
        <a href="#journey" onClick={closeMenu}>Hành trình <span>02</span></a>
        <a href="#projects" onClick={closeMenu}>Dự án <span>03</span></a>
        <a className="site-nav__contact" href="#contact" onClick={closeMenu}>Liên hệ <ArrowUpRight size={15} aria-hidden="true" /></a>
      </nav>
    </header>
  );
}

export default SiteHeader;
