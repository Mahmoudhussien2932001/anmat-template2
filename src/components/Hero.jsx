import { Play } from 'lucide-react'
import heroImage from '../assets/hero.jpg'

const STATS = [
  { value: '+200', label: 'علامة تجارية تم دعمها' },
  { value: '+1,000', label: 'فرصة امتياز تم تطويرها' },
  { value: '+15', label: 'سوق مستهدف حول العالم' },
  { value: '+10', label: 'سنوات من الخبرة' },
]

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* RTL: first = right content ~40% */}
      <div className="hero-content">
        <div className="hero-content-inner">
          <p className="hero-label">حلول متكاملة لنمو الامتياز التجاري</p>
          <h1 className="hero-title">
            طوّر علامتك
            <span className="gold">ووسعها باحتراف</span>
          </h1>
          <p className="hero-desc">
            في FranchiseME، نحول الطموح إلى امتيازات ناجحة ونبني علامات تجارية قابلة للتوسع محلياً وعالمياً من خلال استراتيجيات متخصصة ونماذج عملية.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-gold">ابدأ استشارتك الآن</a>
            <a href="#methodology" className="btn btn-outline-light">
              <Play size={13} fill="currentColor" />
              شاهد قصتنا
            </a>
          </div>
        </div>

        {/* Stats sit only under the dark petrol panel */}
        <div className="hero-stats">
          {STATS.map((stat) => (
            <div className="stat" key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RTL: second = left image ~60% */}
      <div className="hero-media">
        <img src={heroImage} alt="رؤية نحو أفق الامتياز التجاري في الرياض" className="hero-img" />
        <p className="hero-edge-text">نبني اليوم .. فرص الغد</p>
      </div>
    </section>
  )
}
