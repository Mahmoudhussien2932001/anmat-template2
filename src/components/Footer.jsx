import { Phone, Mail, MapPin } from 'lucide-react'
import logo from '../assets/logo.png'

function LinkedInIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 8.5a2 2 0 110-4 2 2 0 010 4zM5 10h3v9H5v-9zm5 0h2.9v1.3h.1c.4-.7 1.4-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7V19h-3v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19H10v-9z" />
    </svg>
  )
}

function XIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 4h2.3l-5 5.7L21 20h-5.3l-3.5-4.6L7.2 20H4.9l5.4-6.1L3.5 4h5.4l3.2 4.3L17.5 4zm-.8 14.4h1.3L7.4 5.5H6L16.7 18.4z" />
    </svg>
  )
}

function InstagramIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function YouTubeIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.7 2.7 0 00-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3A2.7 2.7 0 002.4 7.2 28 28 0 002 12a28 28 0 00.4 4.8 2.7 2.7 0 001.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 001.9-1.9A28 28 0 0022 12a28 28 0 00-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Col 1 RIGHT: logo */}
        <div className="footer-brand">
          <img src={logo} alt="FranchiseME" className="footer-logo" />
          <p>شريكك في نمو الامتياز التجاري</p>
        </div>

        {/* Col 2: quick links */}
        <div className="footer-col">
          <h4>روابط سريعة</h4>
          <ul>
            <li><a href="#home">الرئيسية</a></li>
            <li><a href="#why">من نحن</a></li>
            <li><a href="#services">خدماتنا</a></li>
            <li><a href="#sectors">القطاعات</a></li>
            <li><a href="#blog">المدونة</a></li>
            <li><a href="#contact">تواصل معنا</a></li>
          </ul>
        </div>

        {/* Col 3: contact */}
        <div className="footer-col">
          <h4>معلومات التواصل</h4>
          <ul className="contact-list">
            <li>
              <Phone size={14} />
              <a href="tel:+966504395551" dir="ltr">+966 50 439 5551</a>
            </li>
            <li>
              <Mail size={14} />
              <a href="mailto:info@FranchiseME.net">info@FranchiseME.net</a>
            </li>
            <li>
              <MapPin size={14} />
              <span>
                Khalid Bin Waleed Street - 4th Floor
                <br />
                Qurtubah - Riyadh, PO BOX: 13244
              </span>
            </li>
          </ul>
        </div>

        {/* Col 4 LEFT: social */}
        <div className="footer-col footer-social-col">
          <h4>لنكن على تواصل</h4>
          <div className="socials">
            <a href="#" aria-label="LinkedIn" className="social"><LinkedInIcon /></a>
            <a href="#" aria-label="X" className="social"><XIcon /></a>
            <a href="#" aria-label="Instagram" className="social"><InstagramIcon /></a>
            <a href="#" aria-label="YouTube" className="social"><YouTubeIcon /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>جميع الحقوق محفوظة © 2026 فرنشايزمي</p>
          <p className="footer-slogan-inline">نبني اليوم .. فرص الغد</p>
        </div>
      </div>
    </footer>
  )
}
