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
import FestivalMithila from './components/FestivalMithila';
import Gallery from './components/Gallery';
import AboutCSTS from './components/AboutCSTS';
import GyanChangera from './components/GyanChangera';
import KnowMithila from './components/KnowMithila';
import MaithiliMachaan from './components/MaithiliMachaan';
import MLF from './components/MLF';
// Admin imports
import AuthProvider from './admin/context/AuthContext';
import AdminRoutes from './admin/pages/AdminRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="font-sans">
          <Routes>
            {/* Admin routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
            
            {/* Public routes */}
            <Route path="/" element={
              <>
                <Header />
                <main>
                  <Carousel />
                  <About />
                  <Testimonials />
                  <Events />
                  <OurCollaborator />
                  <Footer/>
                </main>
              </>
            } />
            <Route path="/contact" element={
              <>
                <Header />
                <main>
                  <Contact />
                </main>
              </>
            } />
            <Route path="/career" element={
              <>
                <Header />
                <main>
                  <Career />
                </main>
              </>
            } />
            <Route path="/join-us" element={
              <>
                <Header />
                <main>
                  <Join />
                </main>
              </>
            } />
            <Route path="/donate" element={
              <>
                <Header />
                <main>
                  <Donate />
                </main>
              </>
            } />
            <Route path="/membership" element={
              <>
                <Header />
                <main>
                  <Membership />
                </main>
              </>
            } />
            <Route path="/saksham-mithila" element={
              <>
                <Header />
                <main>
                  <SakshamMithila />
                </main>
              </>
            } />
            <Route path="/know-mithila/festivals" element={
              <>
                <Header />
                <main>
                  <FestivalMithila />
                </main>
              </>
            } />
            <Route path="/gallery" element={
              <>
                <Header />
                <main>
                  <Gallery />
                </main>
              </>
            } />
            <Route path="/about-us" element={
              <>
                <Header />
                <main>
                  <AboutCSTS />
                </main>
              </>
            } />
            <Route path="/gyan-changera" element={
              <>
                <Header />
                <main>
                  <GyanChangera />
                </main>
              </>
            } />
            <Route path="/know-mithila" element={
              <>
                <Header />
                <main>
                  <KnowMithila />
                </main>
              </>
            } />
            <Route path="/maithil-machaan" element={
              <>
                <Header />
                <main>
                  <MaithiliMachaan />
                </main>
              </>
            } />
            <Route path="/mlf" element={
              <>
                <Header />
                <main>
                  <MLF/>
                </main>
              </>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;