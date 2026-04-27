import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MaxFuelRX from './MaxFuelRX'
import Maxfuel from './Maxfuel'
import AboutUs from './Aboutus'
import ContactUs from './Contactus'
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MaxFuelRX
          heroVideo="/hero-video.mp4"
          bottleImage="/bottle.png"
          noteImages={[
            "/colour-shot.jpg",   
            "/nose-shot.jpg",     
            "/taste-shot.jpg",    
            "/finish-shot.jpg",   
          ]}
        />} />
        <Route path="/maxfuel" element={<Maxfuel />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  )
}
