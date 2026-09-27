import { Handshake, LineChart, Gem, Users } from 'lucide-react'
import logo from '../assets/logo.png'
import { useFadeUp } from '../hooks/useFadeUp'

const CARDS = [
  { icon: Handshake, title: 'شراكة حقيقية', text: 'ننجح معك على المدى الطويل.' },
  { icon: LineChart, title: 'نتائج ملموسة', text: 'نمكن انتشار علامتك بخطوات مدروسة وقابلة للتنفيذ.' },
  { icon: Gem, title: 'حلول مخصصة', text: 'نصمم حلولاً تناسب طبيعة علامتك التجارية وطموحاتك.' },
  { icon: Users, title: 'خبرة عملية', text: 'فريق متخصص بخبرة محلية وإقليمية في الامتياز التجاري.' },
]

function FeatureCard({ icon: Icon, title, text }) {
  const { ref, className } = useFadeUp()
  return (
    <article ref={ref} className={`feature-card ${className}`}>
      <div className="feature-icon">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export default function WhyFranchiseMe() {
  const intro = useFadeUp()

  return (
    <section className="why section" id="why">
      <div className="why-bg" aria-hidden="true" />
      <div className="container why-grid">
        <div ref={intro.ref} className={`why-intro ${intro.className}`}>
          <div className="why-title-wrap">
            <img src={logo} alt="" className="why-watermark" aria-hidden="true" />
            <h2 className="why-title">
              لماذا
              <br />
              فرنشايزمي؟
            </h2>
          </div>
          <p className="section-desc">
            شريكك الاستراتيجي في بناء وتوسيع علامات الامتياز التجاري بخبرة ومنهجية وعمق في السوق.
          </p>
        </div>

        <div className="why-cards">
          {CARDS.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
