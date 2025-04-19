import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="agro-footer">
    <div className="footer-main">
      <div className="footer-brand">
        <img src="/logo-dummy.svg" alt="Agrofix Logo" className="footer-logo" />
        <span className="footer-app-name">Agrofix</span>
        <p className="footer-tagline">Empowering Farmers, Connecting Markets</p>
      </div>
      <div className="footer-links">
        <div>
          <h4>Company</h4>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/careers">Careers</a>
        </div>
        <div>
          <h4>Support</h4>
          <a href="/faq">FAQ</a>
          <a href="/help">Help Center</a>
          <a href="mailto:support@agrofix.com">Email Support</a>
        </div>
        <div>
          <h4>Legal</h4>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
      <div className="footer-social">
        <h4>Follow Us</h4>
        <div className="footer-social-icons">
          <a href="#" aria-label="Instagram"><img src="https://img.icons8.com/color/32/instagram-new.png" alt="Instagram" /></a>
          <a href="#" aria-label="X"><img src="https://img.icons8.com/ios-filled/32/000000/x.png" alt="X (Twitter)" /></a>
          <a href="#" aria-label="Facebook"><img src="https://img.icons8.com/color/32/facebook-new.png" alt="Facebook" /></a>
          <a href="#" aria-label="LinkedIn"><img src="https://img.icons8.com/color/32/linkedin.png" alt="LinkedIn" /></a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span> {new Date().getFullYear()} Agrofix. All rights reserved.</span>
      <span className="footer-made">Made with <span style={{color:'#e57373',fontWeight:700}}>&hearts;</span> for Indian Farmers</span>
    </div>
  </footer>
);

export default Footer;
