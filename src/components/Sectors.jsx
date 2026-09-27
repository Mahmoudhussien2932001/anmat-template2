import {
  UtensilsCrossed,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Hotel,
  Dumbbell,
  Briefcase,
  Plus,
} from 'lucide-react'
import { useFadeUp } from '../hooks/useFadeUp'

const SECTORS = [
  { icon: UtensilsCrossed, label: 'الأغذية والمشروبات' },
  { icon: ShoppingBag, label: 'التجزئة' },
  { icon: HeartPulse, label: 'الرعاية الصحية' },
  { icon: GraduationCap, label: 'التعليم والتدريب' },
  { icon: Hotel, label: 'الضيافة والسياحة' },
  { icon: Dumbbell, label: 'الرياضة والترفيه' },
  { icon: Briefcase, label: 'الخدمات' },
  { icon: Plus, label: 'قطاعات أخرى' },
]

function SectorItem({ icon: Icon, label }) {
  const { ref, className } = useFadeUp()
  return (
    <div ref={ref} className={`sector-item ${className}`}>
      <div className="sector-icon">
        <Icon size={20} strokeWidth={1.4} />
      </div>
      <span>{label}</span>
    </div>
  )
}

export default function Sectors() {
  const head = useFadeUp()

  return (
    <section className="sectors section" id="sectors">
      <div className="container sectors-layout">
        <div ref={head.ref} className={`sectors-head ${head.className}`}>
          <h2 className="section-title">القطاعات التي نعمل معها</h2>
          <p className="section-desc">خبرة واسعة في مختلف القطاعات الحيوية</p>
        </div>

        <div className="sectors-row">
          {SECTORS.map((item) => (
            <SectorItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
