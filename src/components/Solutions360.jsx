import logo from '../assets/logo.png'
import { useFadeUp } from '../hooks/useFadeUp'

const RIGHT = [
  'تقييم جاهزية الامتياز',
  'دراسة السوق والمنافسين',
  'النموذج المالي',
  'الهيكلة القانونية',
  'الأدلة التشغيلية',
]

const LEFT = [
  'استراتيجية التسويق',
  'خطة التوسع',
  'استقطاب المرشحين',
  'التدريب ونقل المعرفة',
  'المتابعة وقياس الأداء',
]

export default function Solutions360() {
  const intro = useFadeUp()
  const diagram = useFadeUp()

  return (
    <section className="solutions section" id="solutions">
      <div className="container solutions-grid">
        <div ref={intro.ref} className={`solutions-intro ${intro.className}`}>
          <h2 className="section-title">
            حلول الامتياز
            <span className="degree">360°</span>
          </h2>
          <p className="section-desc">
            من الفكرة إلى التوسع، 10 حلول متكاملة لبناء علامة امتياز تجاري ناجحة ومستدامة.
          </p>
          <a href="#contact" className="btn btn-gold">اكتشف الحلول بالتفصيل</a>
        </div>

        <div ref={diagram.ref} className={`solutions-diagram ${diagram.className}`}>
          <ul className="solutions-list solutions-right">
            {RIGHT.map((label, i) => (
              <li key={label}>
                <span className="label">{label}</span>
                <span className="num">{i + 1}</span>
                <i className="connector" />
              </li>
            ))}
          </ul>

          <div className="solutions-center">
            <div className="solutions-ring solutions-ring-outer">
              <div className="solutions-ring-inner">
                <img src={logo} alt="FranchiseME" />
              </div>
            </div>
          </div>

          <ul className="solutions-list solutions-left">
            {LEFT.map((label, i) => (
              <li key={label}>
                <i className="connector" />
                <span className="num">{i + 6}</span>
                <span className="label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
