import { LayoutGrid, FileSearch, TrendingUp, ShieldCheck, Clock3, Building2, ChevronLeft } from 'lucide-react'
import { useFadeUp } from '../hooks/useFadeUp'

const SERVICES = [
  { icon: LayoutGrid, title: 'تطوير برامج الامتياز التجاري', text: 'بناء أنظمة امتياز متكاملة وقابلة للتوسع' },
  { icon: FileSearch, title: 'الاستشارات والدراسات', text: 'دراسات سوق وتحليل جاهزية العلامة' },
  { icon: TrendingUp, title: 'استراتيجيات التوسع', text: 'خطط نمو محلية وإقليمية وعالمية' },
  { icon: ShieldCheck, title: 'التدريب والتمكين', text: 'برامج تدريب لفرق العمل والمانحين' },
  { icon: Clock3, title: 'المبادرات التوعوية', text: 'رفع الوعي بمنظومة الامتياز التجاري' },
  { icon: Building2, title: 'خدمات الجهات الحكومية', text: 'دعم البرامج والمبادرات الحكومية' },
]

function ServiceCard({ icon: Icon, title, text }) {
  const { ref, className } = useFadeUp()
  return (
    <article ref={ref} className={`service-card ${className}`}>
      <div className="service-icon">
        <Icon size={20} strokeWidth={1.4} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export default function Services() {
  const intro = useFadeUp()

  return (
    <section className="services section" id="services">
      <div className="container services-layout">
        {/* RTL right: title + desc + link */}
        <div ref={intro.ref} className={`services-intro ${intro.className}`}>
          <h2 className="section-title light">خدماتنا</h2>
          <p className="section-desc light">
            من الاستراتيجية إلى التنفيذ، نقدم حلولاً متكاملة في كل مرحلة من مراحل الامتياز التجاري.
          </p>
          <a href="#contact" className="text-cta">
            اكتشف جميع خدماتنا
            <ChevronLeft size={14} />
          </a>
        </div>

        {/* RTL left: 3×2 compact cards */}
        <div className="services-cards">
          {SERVICES.map((item) => (
            <ServiceCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
