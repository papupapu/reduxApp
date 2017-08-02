import React from 'react';

import './Footer.css';

const Footer = () => (
  <footer id="footer">
    <div className="sw">
      <ul className="footer-links">
        <li><a href="">Link1</a></li>
        <li><a href="">Link2</a></li>
        <li><a href="">Link3</a></li>
        <li><a href="">Link4</a></li>
      </ul>
      <ul className="social-links">
        <li><a href="">Link1</a></li>
        <li><a href="">Link2</a></li>
        <li><a href="">Link3</a></li>
        <li><a href="">Link4</a></li>
        <li><a href="">Link5</a></li>
        <li><a href="">Link6</a></li>
        <li><a href="">Link7</a></li>
      </ul>
    </div>
    <div className="intl">
      <div className="sw">
        <p>
          <strong>International sites:</strong>
          <a href="">Link1</a>
          <a href="">Link2</a>
          <a href="">Link3</a>
          <a href="">Link4</a>
        </p>
      </div>
    </div>
    <div className="sw legal">
      suca eh!
    </div>
  </footer>
);

export default Footer;
