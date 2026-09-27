import { useEffect, useState } from 'react'
import { ChevronLeft, Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'

const NAV = [
  { href: '#home', label: 'الرئيسية' },
  { href: '#why', label: 'من نحن' },
  { href: '#services', label: 'خدماتنا' },
  { href: '#sectors', label: 'القطاعات' },
  { href: '#methodology', label: 'منهجيتنا' },
  { href: '#blog', label: 'المدونة' },
  { href: '#contact', label: 'تواصل معنا' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 6)

      const offset = 110
      let current = 'home'
      document.querySelectorAll('section[id]').forEach((section) => {
        if (window.scrollY >= section.offsetTop - offset) {
          current = section.id
        }
      })
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#home" className="logo-block" onClick={closeMenu}>
          <img src={logo} alt="FranchiseME" className="logo-img" />
        </a>

        <nav className={`main-nav${open ? ' open' : ''}`} aria-label="القائمة الرئيسية">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link${active === item.href.slice(1) ? ' active' : ''}`}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-gold header-cta">
          ابدأ رحلتك معنا
          <ChevronLeft size={14} strokeWidth={2.2} />
        </a>

        <button
          type="button"
          className={`menu-toggle${open ? ' is-open' : ''}`}
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}
