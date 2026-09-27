import ctaImage from '../assets/cta.jpg'
import { useFadeUp } from '../hooks/useFadeUp'

export default function CTA() {
  const fade = useFadeUp()

  return (
    <section className="cta-banner" id="contact">
      <div className="cta-bg">
        <img src={ctaImage} alt="" aria-hidden="true" />
        <div className="cta-shade" />
      </div>
      {/* RTL order: button+heading (right) → divider → phrase (left) */}
      <div ref={fade.ref} className={`container cta-inner ${fade.className}`}>
        <a href="mailto:info@FranchiseME.net" className="btn btn-gold cta-btn">
          ابدأ رحلتك الآن
        </a>
        <h2 className="cta-heading">جاهز لتوسيع علامتك التجارية؟</h2>
        <div className="cta-divider" aria-hidden="true" />
        <p className="cta-phrase">
          مستقبل أكبر
          <br />
          لعلامتك يبدأ الآن
        </p>
      </div>
    </section>
  )
}
