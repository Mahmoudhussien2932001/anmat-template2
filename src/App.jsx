import Header from './components/Header'
import Hero from './components/Hero'
import WhyFranchiseMe from './components/WhyFranchiseMe'
import Services from './components/Services'
import Solutions360 from './components/Solutions360'
import Methodology from './components/Methodology'
import Workshop from './components/Workshop'
import Sectors from './components/Sectors'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyFranchiseMe />
        <Services />
        <Solutions360 />
        <Methodology />
        <Workshop />
        <Sectors />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
