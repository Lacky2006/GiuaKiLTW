import { useRef, useState } from 'react';
import { ArrowUpRight, Copy, Github } from 'lucide-react';
import { profile } from '../data/portfolio.js';

function ContactForm() {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    const nextErrors = {};

    if (name.length < 2) nextErrors.name = 'Vui lòng nhập họ tên (ít nhất 2 ký tự).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Vui lòng nhập email hợp lệ.';
    if (message.length < 20) nextErrors.message = 'Lời nhắn cần có ít nhất 20 ký tự.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('Kiểm tra lại các trường được đánh dấu.');
      formRef.current.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }

    setDraft(`Tên: ${name}\nEmail: ${email}\n\n${message}`);
    setStatus('Thông tin hợp lệ. Sao chép lời nhắn rồi gửi qua GitHub nhé.');
  };

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus('Đã sao chép lời nhắn. Mở GitHub để gửi cho mình.');
    } catch {
      setStatus('Không thể tự sao chép trên trình duyệt này. Hãy chọn và sao chép nội dung bên dưới.');
    }
  };

  return (
    <div className="contact-grid">
      <div className="contact-copy">
        <p className="eyebrow">LIÊN HỆ</p>
        <h2>Cùng trao đổi<br /><span>về một ý tưởng game?</span></h2>
        <p>Hiện mình đang tìm cơ hội thực tập Game Developer tại TP. Hồ Chí Minh và sẵn sàng học hỏi qua dự án thực tế.</p>
        <a className="contact-github" href={profile.github} target="_blank" rel="noreferrer"><Github size={18} aria-hidden="true" /> GitHub cá nhân <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
      <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="contact-name">Họ và tên</label>
          <input id="contact-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
          {errors.name && <span className="field-error" id="contact-name-error">{errors.name}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
          {errors.email && <span className="field-error" id="contact-email-error">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="contact-message">Lời nhắn</label>
          <textarea id="contact-message" name="message" rows="4" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
          {errors.message && <span className="field-error" id="contact-message-error">{errors.message}</span>}
        </div>
        <button className="button button--primary form-submit" type="submit">Kiểm tra lời nhắn <ArrowUpRight size={17} aria-hidden="true" /></button>
        <p className="form-status" role="status" aria-live="polite">{status}</p>
        {draft && (
          <div className="draft-preview">
            <label htmlFor="contact-draft">Nội dung đã kiểm tra</label>
            <textarea id="contact-draft" value={draft} readOnly rows="4" />
            <button className="copy-button" type="button" onClick={copyDraft}><Copy size={15} aria-hidden="true" /> Sao chép lời nhắn</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ContactForm;
