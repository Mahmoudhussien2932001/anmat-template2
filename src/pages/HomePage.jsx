import { useOutletContext, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import InvestorOffers from '../components/home/InvestorOffers.jsx'
import MarketExplorer from '../components/home/MarketExplorer.jsx'
import PhaseRail from '../components/home/PhaseRail.jsx'
import { MagneticButton, MagneticLink } from '../components/motion/MagneticLink.jsx'
import MaskedHeading from '../components/motion/MaskedHeading.jsx'
import { company, documentedFigures } from '../data/company.js'
import { clientLogos, investorPhases, ownerPhases } from '../data/sourceContent.js'
import { pathCopy, sharedLabels } from '../data/homeContent.js'
import PageMotion from '../motion/PageMotion.jsx'
import { useSession } from '../state/useSession.js'
import { useRef } from 'react'

function pick(copy, english) {
  return english ? copy.en : copy.ar
}

export default function HomePage() {
  const root = useRef(null)
  const { i18n, t } = useTranslation()
  const { lang } = useParams()
  const { openAssessment } = useOutletContext()
  const { audience, setAudience } = useSession()
  const english = i18n.language === 'en'
  const mode = audience === 'investor' ? 'investor' : 'franchisor'
  const path = pathCopy[mode]
  const phases = mode === 'investor' ? investorPhases : ownerPhases
  const arrow = english ? '→' : '←'

  return (
    <PageMotion scopeRef={root} watch={[english, mode]}>
      <section className="folio-hero" id="top">
        <div className="wrap">
          <div className="folio-paths" role="tablist" aria-label={english ? 'Choose your path' : 'اختر مسارك'}>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'franchisor'}
              className={mode === 'franchisor' ? 'is-selected' : ''}
              onClick={() => setAudience('franchisor')}
            >
              <span>01</span>
              {english ? 'I am a franchisor' : 'أنا مانح امتياز'}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'investor'}
              className={mode === 'investor' ? 'is-selected' : ''}
              onClick={() => setAudience('investor')}
            >
              <span>02</span>
              {english ? 'I am an investor' : 'أنا مستثمر'}
            </button>
          </div>
          <div className="folio-hero-grid">
            <MaskedHeading as="h1">{pick(path.title, english)}</MaskedHeading>
            <div className="folio-hero-side">
              <p className="support">{pick(path.text, english)}</p>
              <div className="hero-actions">
                <a className="button-ghost" href="#services">{pick(pathCopy.franchisor.primary, english)} {arrow}</a>
                {mode === 'investor' ? (
                  <MagneticLink className="button-ghost" to={`/${lang}/opportunities`}>{pick(pathCopy.investor.primary, english)} {arrow}</MagneticLink>
                ) : null}
                <MagneticButton className="button button-gold" onClick={(event) => openAssessment(mode, event)}>
                  {pick(path.secondary, english)} {arrow}
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section explorer-section" aria-label={english ? 'Places named in the profile' : 'المواقع المذكورة في الملف'}>
        <div className="wrap">
          <header className="explorer-head">
            <p className="eyebrow">{investorLabel(mode, english)}</p>
            <MaskedHeading as="h2">{english ? 'Places named in the profile' : 'المواقع المذكورة في الملف'}</MaskedHeading>
          </header>
          <MarketExplorer mode={mode} />
        </div>
      </section>

      <section className="logo-strip" aria-label={english ? 'Brands we are proud to serve' : 'علامات نفخر بخدمتها'}>
        <div className="wrap">
          <p className="client-label">{english ? 'Brands we are proud to serve' : 'علامات نفخر بخدمتها'}</p>
          <div className="logo-row">
            {clientLogos.map((logo) => (
              <span key={logo.en}>
                <img src={logo.src} alt={english ? logo.en : logo.ar} />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section figure-rail" aria-label={t('clients.eyebrow')}>
        <div className="wrap">
          <p className="eyebrow">{t('clients.eyebrow')}</p>
          <p className="fine">{t('clients.note')}</p>
          <ul className="figure-list">
            {documentedFigures.map((item) => (
              <li key={item.id}>
                <strong data-figure={item.figure}>{item.figure}</strong>
                <span>{english ? item.en : item.ar}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {mode === 'investor' ? <InvestorOffers english={english} lang={lang} /> : null}

      <PhaseRail
        key={mode}
        id="services"
        english={english}
        title={mode === 'franchisor'
          ? (english ? 'From your brand… to a first franchise.' : 'من علامتك... إلى أول امتياز.')
          : pick(sharedLabels.studiesTitle, english)}
        intro={mode === 'investor' ? pick(path.sectionText, english) : null}
        phases={phases}
        action={mode === 'investor' ? (
          <MagneticLink className="button" to={`/${lang}/contact`}>{pick(path.final, english)}</MagneticLink>
        ) : null}
      />

      <section className="section folio-contact" id="contact">
        <div className="wrap folio-contact-grid">
          <div>
            <MaskedHeading as="h2">{pick(path.final, english)}</MaskedHeading>
            <p className="fine">{pick(sharedLabels.contactTitle, english)}</p>
            <MagneticLink className="button" to={`/${lang}/contact`}>{pick(path.final, english)}</MagneticLink>
          </div>
          <address className="folio-address">
            <a href={company.phoneHref} dir="ltr">{company.phone}</a>
            <a href={`mailto:${company.email}`} dir="ltr">{company.email}</a>
            <p>{english ? company.addressEn : company.address}</p>
          </address>
        </div>
      </section>
    </PageMotion>
  )
}

function investorLabel(mode, english) {
  if (mode === 'investor') return english ? 'Exploring markets' : 'استكشاف الأسواق'
  return english ? 'Branches and past projects' : 'الفروع والمشاريع السابقة'
}
