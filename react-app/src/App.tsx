import HeroSection from './home/components/HeroSection'
import FeaturesSection from './home/components/FeaturesSection'
import AboutSection from './home/components/AboutSection'
import FooterSection from './home/components/FooterSection'
import './App.css'

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <FooterSection />
    </div>
  )
}

export default App
