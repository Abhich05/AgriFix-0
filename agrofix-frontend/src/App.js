import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import CataloguePage from './components/CataloguePage/CataloguePage';
import OrderPage from './pages/OrderPage';
import TrackOrderPage from './pages/TrackOrderPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoginPage from './pages/AdminLoginPage';
import LanguageToggle from './components/LanguageToggle';
// import WeatherWidget from './components/WeatherWidget';
import Footer from './components/Footer/Footer';
import ImageGallery from './components/ImageGallery';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import './global.css';
import './app-flex-layout.css';
import './home-responsive.css';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate, useLocation } from 'react-router-dom';
import LiveMarketTicker from './components/LiveMarketTicker/LiveMarketTicker';
import NavBar from './components/NavBar/NavBar';
import Joyride from 'react-joyride';
import BuyerLoginPage from './pages/BuyerLoginPage';
import BuyerRegisterPage from './pages/BuyerRegisterPage';
import BuyerDashboardPage from './pages/BuyerDashboardPage';

function Home() {
  const { t } = useLanguage();
  const [profile, setProfile] = React.useState(null);
  React.useEffect(() => {
    const token = localStorage.getItem('buyerToken');
    if (token) {
      // Try to fetch buyer profile
      fetch('https://agrofix-2-czmk.onrender.com/api/buyers/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => setProfile(data))
        .catch(() => setProfile(null));
    } else {
      setProfile(null);
    }
  }, []);
  return (
    <main>
      <section className="hero" style={{
        background: 'linear-gradient(90deg, #e0ffe7 0%, #e3f2fd 100%)',
        borderRadius: 18,
        boxShadow: '0 4px 24px #a8e06333',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        padding: '2.5rem 2rem 2rem 2rem',
        marginBottom: '1.5rem',
        marginTop: '1.5rem',
        minHeight: 250
      }}>
        <img className="hero-img" src="/logo-dummy.svg" alt={t('logoAlt')} style={{ width: 130, height: 130, borderRadius: '50%', boxShadow: '0 2px 16px #388e3c33', background: '#fff', padding: 12 }} />
        <div style={{ flex: 1 }}>
          <h2 className="hero-title" style={{ color: '#2e7d32', fontWeight: 900, fontSize: 36, marginBottom: 8, letterSpacing: 1 }}>{t('welcome')}, {profile && profile.name ? profile.name : t('user')}!</h2>
          <p className="hero-desc" style={{ fontSize: 20, color: '#444', marginBottom: 16 }}>
            <span className="accent" style={{ color: '#43a047', fontWeight: 700 }}>Agrofix</span> <span/>Helps you to
            Buy and sell your vegitables and fruits easily.
          </p>
          <div style={{ margin: '10px 0 18px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <label htmlFor="region-select" style={{ fontWeight: 600, color: '#388e3c', fontSize: 16 }}>{t('region') || 'Region'}:</label>
            <select
              id="region-select"
              value={localStorage.getItem('selectedRegion') || 'Punjab'}
              onChange={e => {
                localStorage.setItem('selectedRegion', e.target.value);
                window.dispatchEvent(new Event('storage'));
              }}
              style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #388e3c', fontSize: 15, background: '#fff', color: '#2e7d32', fontWeight: 600 }}
            >
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Telangana">Telangana</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: 12 }}>
            <a href="/catalogue" className="btn-primary" style={{ textDecoration:'none', fontSize: 18, padding: '10px', borderRadius: 8, width:'120px' }}>Shop Now</a>
            <a href="/order" className="btn-secondary" style={{ textDecoration:'none',fontSize: 18, padding: '10px', borderRadius: 8, background: '#fff', width:'120px',color: '#388e3c', border: '2px solid #388e3c' }}>My Orders</a>
          </div>
        </div>
      </section>
      {/* Event/Occasion Highlight Banner */}
      <section className="event-banner" style={{
        background: 'linear-gradient(90deg, #fffbe7 0%, #ffe082 100%)',
        borderRadius: 16,
        margin: '2rem 0',
        padding: '1.5rem 2rem',
        boxShadow: '0 2px 12px #ffd54f33',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.7rem'
      }}>
        <h2 style={{ color: '#ff9800', fontWeight: 900, marginBottom: 8 }}>Planning a Wedding or Event?</h2>
        <p style={{ color: '#444', fontSize: 18, maxWidth: 600 }}>Order fresh produce in bulk for weddings, parties, and more. Special offers available!</p>
        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: 6 }}>
          <a href="/catalogue?event=wedding" className="btn-primary event-btn" style={{
            fontSize: 18,
            padding: '12px 26px',
            borderRadius: 10,
            fontWeight: 700,
            background: 'linear-gradient(90deg, #ffd54f 0%, #ff9800 100%)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 2px 8px #ff980033',
            transition: 'transform 0.18s',
            cursor: 'pointer',
            outline: 'none',
            minWidth: 170,
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: 4
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.07)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            💍 Shop for Weddings
          </a>
          <a href="/catalogue?event=party" className="btn-secondary event-btn" style={{
            fontSize: 18,
            padding: '12px 26px',
            borderRadius: 10,
            fontWeight: 700,
            background: '#fff',
            color: '#ff9800',
            border: '2px solid #ff9800',
            boxShadow: '0 2px 8px #ffd54f22',
            transition: 'transform 0.18s',
            cursor: 'pointer',
            outline: 'none',
            minWidth: 170,
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: 4
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.07)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            🎉 Shop for Parties
          </a>
        </div>
      </section>
      {/* Farmer Attraction Container */}
      <section className="attract-farmers-section" style={{
        margin: '2.5rem auto 1.5rem',
        maxWidth: 900,
        background: 'linear-gradient(105deg, #e3f0ff 0%, #f0fff0 100%)',
        borderRadius: 28,
        boxShadow: '0 8px 32px #90caf9aa',
        padding: '2.5rem 2.2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '3rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 270
      }}>
        {/* Decorative SVG Waves */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} viewBox="0 0 900 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100 Q 225 200 450 100 T 900 100 V300 H0Z" fill="#b3e5fc" fillOpacity="0.18" />
          <path d="M0 180 Q 225 80 450 180 T 900 180 V300 H0Z" fill="#a5d6a7" fillOpacity="0.13" />
        </svg>
        <div style={{ flex: 1, zIndex: 1 }}>
          <h2 style={{ color: '#1565c0', fontWeight: 900, fontSize: 32, marginBottom: 10, letterSpacing: 1, textShadow: '0 2px 8px #fff' }}>Empowering Farmers Online</h2>
          <hr style={{ border: 'none', borderTop: '2.5px solid #90caf9', width: 60, margin: '12px 0 20px 0' }} />
          <p style={{ color: '#333', fontSize: 20, marginBottom: 22, lineHeight: 1.6 }}>
            <span style={{ fontWeight: 600, color: '#1976d2', background: '#e3f2fd', borderRadius: 6, padding: '2px 10px' }}>No middlemen. More profits.</span><br/>
            Join <span style={{ color: '#43a047', fontWeight: 700 }}>Agrofix</span> to connect directly with buyers, discover modern techniques, and get real-time price updates.
          </p>
          <ul style={{ color: '#333', fontSize: 17, marginLeft: 18, marginBottom: 18, lineHeight: 1.7 }}>
            <li style={{ marginBottom: 3 }}><span style={{ fontSize: 21, marginRight: 8 }}>📈</span>List your produce for the best market rates</li>
            <li style={{ marginBottom: 3 }}><span style={{ fontSize: 21, marginRight: 8 }}>💬</span>Chat with agri-experts and other farmers</li>
            <li style={{ marginBottom: 3 }}><span style={{ fontSize: 21, marginRight: 8 }}>🛡️</span>Safe, transparent transactions</li>
            <li><span style={{ fontSize: 21, marginRight: 8 }}>🔔</span>Instant notifications for new opportunities</li>
          </ul>
          {/* Removed Get Started button as per user request */}
        </div>
        <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 180px' }}>
          <img src="https://img.icons8.com/color/180/farmer-male.png" alt="Empower Farmers" style={{ width: 160, maxWidth: '40vw', borderRadius: 18, boxShadow: '0 4px 18px #90caf9aa', marginBottom: 12 }} />
          <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 8px #1976d233', padding: '7px 13px', fontWeight: 700, color: '#388e3c', fontSize: 15, marginTop: 2 }}>+1200 Farmers Joined!</div>
        </div>
      </section>
      {/* Farmer Innovations Section */}
      <section className="innovations-section" style={{ margin: '2.5rem auto', maxWidth: 900, background: '#f8fff4', borderRadius: 18, boxShadow: '0 2px 16px #a8e06333', padding: '2rem 1.5rem' }}>
        <h2 style={{ color: '#388e3c', fontWeight: 800, fontSize: 28, marginBottom: 18 }}>🌱 Farmer Innovations</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 250px', minWidth: 220 }}>
            <img src="https://img.icons8.com/color/96/tractor.png" alt="Tractor Innovation" style={{ width: 86, marginBottom: 8 }} />
            <h3 style={{ color: '#245c2a', fontWeight: 700, fontSize: 20 }}>Smart Tractor Attachments</h3>
            <p style={{ color: '#444' }}>Local farmers have designed low-cost sensor-based attachments for tractors, improving efficiency in sowing and harvesting.</p>
          </div>
          <div style={{ flex: '1 1 250px', minWidth: 220 }}>
            <img src="https://img.icons8.com/color/96/sprout.png" alt="Organic Practices" style={{ width: 86, marginBottom: 8 }} />
            <h3 style={{ color: '#245c2a', fontWeight: 700, fontSize: 20 }}>Organic Pest Repellents</h3>
            <p style={{ color: '#444' }}>A group of farmers developed natural pest repellents using neem and garlic, reducing chemical use and increasing yield.</p>
          </div>
          <div style={{ flex: '1 1 250px', minWidth: 220 }}>
            <img src="https://img.icons8.com/color/96/irrigation.png" alt="Irrigation" style={{ width: 86, marginBottom: 8 }} />
            <h3 style={{ color: '#245c2a', fontWeight: 700, fontSize: 20 }}>Rainwater Harvesting Models</h3>
            <p style={{ color: '#444' }}>Innovative rainwater harvesting pits and channels have helped villages save water and secure crops during dry spells.</p>
          </div>
        </div>
      </section>
      {/* Weather-based Tips Section */}
      {/* <WeatherTips /> */}
    </main>
  );
}

function FeatureCard({ icon, title, desc, link }) {
  const { t } = useLanguage();
  return (
    <Link to={link} className="feature-card">
      <img src={icon} alt={t(title)} className="feature-card-img" />
      <div className="feature-card-title">{t(title)}</div>
      <div className="feature-card-desc">{t(desc)}</div>
    </Link>
  );
}

function App() {
  // For region-aware features, get region from localStorage or default
  const [region, setRegion] = React.useState(() => {
    return localStorage.getItem('selectedRegion') || 'Punjab';
  });
  const [runTour, setRunTour] = React.useState(() => !localStorage.getItem('agrofixTourCompleted'));
  const joyrideSteps = [
    {
      target: '.hero',
      title: 'Welcome to Agrofix!',
      content: 'This is your starting point. Use Agrofix to get real-time prices, connect with buyers, and more!',
      disableBeacon: true
    },
    {
      target: '.attract-farmers-section',
      title: 'Why Join?',
      content: 'See how Agrofix empowers farmers and how you can benefit by joining the platform.'
    },
    {
      target: '.market-ticker',
      title: 'Live Market Prices',
      content: 'Stay updated with live market prices for your crops here.'
    },
    {
      target: '.nav-order-cart',
      title: 'Order/Cart',
      content: 'Review your cart and place orders directly from here.'
    },
    {
      target: '.nav-catalogue',
      title: 'Buy Veggies',
      content: 'Browse and buy fresh produce from the catalogue.'
    },
    {
      target: '.nav-track-order',
      title: 'Track Orders',
      content: 'Track the status of your orders easily.'
    },
    {
      target: '.nav-admin-login',
      title: 'Admin Login',
      content: 'Admins can log in here to manage the platform.'
    },
    {
      target: 'df-messenger',
      title: 'Need Help? Chat with AgroFixBot!',
      content: 'Click here to chat with our AI assistant for instant support in your language.'
    }
  ];
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <Joyride
            steps={joyrideSteps}
            run={runTour}
            continuous
            showSkipButton
            showProgress
            styles={{ options: { zIndex: 9999, primaryColor: '#388e3c', textColor: '#333', arrowColor: '#388e3c' } }}
            locale={{ last: 'Finish', skip: 'Skip Tour' }}
            callback={data => {
              if (data.status === 'finished' || data.status === 'skipped') {
                setRunTour(false);
                localStorage.setItem('agrofixTourCompleted', '1');
              }
            }}
          />
          <LanguageContextConsumerWrapper region={region} setRegion={setRegion} />
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

function LanguageContextConsumerWrapper({ region, setRegion }) {
  const { lang, t } = useLanguage();
  React.useEffect(() => {
    const handler = e => {
      if (e.key === 'agrofixRegionChange') {
        setRegion(localStorage.getItem('selectedRegion') || 'Punjab');
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [setRegion]);
  React.useEffect(() => {}, [lang]);
  return (
    <div className="app-flex-root">
      <NavBar />
      <div className="app-flex-main">
        <Routes>
          <Route path="/" element={<><LiveMarketTicker region={region} /><Home /></>} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/track" element={<TrackOrderPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/buyer-login" element={<React.Suspense fallback={<div>Loading...</div>}><BuyerLoginPage /></React.Suspense>} />
          <Route path="/buyer-register" element={<React.Suspense fallback={<div>Loading...</div>}><BuyerRegisterPage /></React.Suspense>} />
          <Route path="/buyer-dashboard" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <BuyerDashboardPage />
            </React.Suspense>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
