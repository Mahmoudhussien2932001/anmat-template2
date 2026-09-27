import { Users, CalendarDays } from 'lucide-react'
import workshopImage from '../assets/workshop.jpg'
import { useFadeUp } from '../hooks/useFadeUp'

export default function Workshop() {
  const content = useFadeUp()
  const cards = useFadeUp()
  const media = useFadeUp()

  return (
    <section className="workshop section" id="blog">
      <div className="container workshop-grid">
        {/* RTL right: text */}
        <div ref={content.ref} className={`workshop-content ${content.className}`}>
          <h2 className="section-title">عملية عملية قائمة على ورش العمل</h2>
          <p className="section-desc">
            نؤمن بأن أفضل الحلول تُبنى معك. من خلال سلسلة ورش عمل متخصصة نعمل إلى جانب فريقك لبناء نظام مصمم خصيصاً لعلامتك التجارية.
          </p>
        </div>

        {/* RTL center: stacked stat cards */}
        <div ref={cards.ref} className={`workshop-cards ${cards.className}`}>
          <article className="workshop-card">
            <div className="workshop-card-icon">
              <Users size={22} strokeWidth={1.4} />
            </div>
            <strong>8 - 12 ورشة عمل</strong>
            <span>تفاعلية ومركزة</span>
          </article>
          <article className="workshop-card">
            <div className="workshop-card-icon">
              <CalendarDays size={22} strokeWidth={1.4} />
            </div>
            <strong>2 - 3 أشهر</strong>
            <span>من التشخيص إلى التسليم</span>
          </article>
        </div>

        {/* RTL left: image */}
        <div ref={media.ref} className={`workshop-media ${media.className}`}>
          <img src={workshopImage} alt="ورشة عمل FranchiseME في الرياض" />
        </div>
      </div>
    </section>
  )
}
