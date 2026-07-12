import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Smartstruct from './Smartstruct'
import PrivacyPolicy from './PrivacyPolicy'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Smartstruct
          heroVideo="/hero-video.mp4"
          bottleImage="/bottle.png"
          noteImages={[
            "/colour-shot.jpg",   
            "/nose-shot.jpg",     
            "/taste-shot.jpg",    
            "/finish-shot.jpg",   
          ]}
        />} />
       
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  )
}
