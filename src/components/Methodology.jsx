import methodologyImage from '../assets/methodology.jpg'
import { useFadeUp } from '../hooks/useFadeUp'

const STEPS = [
  { title: 'استراتيجية الامتياز التجاري', text: 'الرؤية والنموذج والتقييم' },
  { title: 'التحليل المالي', text: 'النموذج المالي والتوقعات' },
  { title: 'الوثائق القانونية', text: 'العقود والاتفاقيات' },
  { title: 'الأدلة التشغيلية', text: 'الأنظمة والإجراءات' },
  { title: 'وثائق التسويق', text: 'الهوية والمحتوى والدعم' },
]

export default function Methodology() {
  const top = useFadeUp()
  const timeline = useFadeUp()

  return (
    <section className="methodology" id="methodology">
      <div className="methodology-bg">
        <img src={methodologyImage} alt="" aria-hidden="true" />
        <div className="methodology-overlay" />
      </div>

      <div className="container methodology-inner">
        <div ref={top.ref} className={`methodology-top ${top.className}`}>
          <div className="methodology-intro">
            <p className="section-label">خمس مراحل متكاملة</p>
            <h2 className="section-title light">
              منهجيتنا في بناء <span className="gold">الامتياز التجاري</span>
            </h2>
            <p className="section-desc light muted">نحول نشاطك إلى نظام امتياز قابل للتوسع.</p>
          </div>
          <p className="methodology-side-text">
            معاً
            <br />
            نصل إلى
            <br />
            قمة جديدة
          </p>
        </div>

        <ol ref={timeline.ref} className={`timeline ${timeline.className}`}>
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <span className={`step-num${i % 2 === 1 ? ' alt' : ''}`}>{i + 1}</span>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
