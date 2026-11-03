import { ArrowUpRight } from 'lucide-react';

function SiteFooter() {
  return (
    <footer className="site-footer section-wrap">
      <a className="brand brand--footer" href="#top">
        <span className="brand__mark">L.</span>
        <span className="brand__label">ĐỖ THIÊN LỘC <small>GAME DEVELOPER</small></span>
      </a>
      <span>THIẾT KẾ VỚI SỰ TÒ MÒ <span aria-hidden="true">©</span> 2026</span>
      <a className="footer-top" href="#top">VỀ ĐẦU TRANG <ArrowUpRight size={14} aria-hidden="true" /></a>
    </footer>
  );
}

export default SiteFooter;
