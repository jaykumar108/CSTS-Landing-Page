import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Events from './components/Events';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Carousel from './components/Carousel';
import OurCollaborator from './components/OurCollaborator';
import Footer from './components/Footer';
import Contact from './components/Contact';
import './styles/animations.css';
import Career from './components/Career';
import Join from './components/Join';
import Donate from './components/Donate';
import Membership from './components/Membership';
import SakshamMithila from './components/SakshamMithila';

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Carousel />
                <About />
                <Testimonials />
                <Events />
                <OurCollaborator />
               <Footer/>
              </>
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />
            <Route path="/join-us" element={<Join />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/saksham-mithila" element={<SakshamMithila />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;