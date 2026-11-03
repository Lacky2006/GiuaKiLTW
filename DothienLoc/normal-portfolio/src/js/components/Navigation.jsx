import { useRef, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { profile } from '../data/portfolio.js';

const links = [
  { href: '#about', label: 'Giới thiệu' },
  { href: '#skills', label: 'Kỹ năng' },
  { href: '#education', label: 'Học vấn' },
  { href: '#projects', label: 'Dự án' },
  { href: '#contact', label: 'Liên hệ' },
];

function Navigation({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && menuOpen) {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    }}>
      <a className="brand" href="#top" onClick={closeMenu} aria-label={`${profile.name}, về đầu trang`}>
        <span className="brand__mark">L</span>
        <span className="brand__name">ĐỖ THIÊN LỘC</span>
      </a>
      <nav className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Điều hướng chính">
        {links.map((link) => <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>)}
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={theme === 'light' ? 'Bật giao diện tối' : 'Bật giao diện sáng'} title={theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}>
          {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
        </button>
        <button
          className="menu-toggle"
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

export default Navigation;
