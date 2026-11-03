import { ArrowUp } from 'lucide-react';
import { profile } from '../data/portfolio.js';

function SiteFooter() {
  return (
    <footer className="site-footer section-container">
      <a className="brand" href="#top"><span className="brand__mark">L</span><span className="brand__name">{profile.name}</span></a>
      <p>© 2026 {profile.name} · Portfolio cá nhân</p>
      <a className="back-to-top" href="#top">Lên đầu trang <ArrowUp size={15} aria-hidden="true" /></a>
    </footer>
  );
}

export default SiteFooter;
