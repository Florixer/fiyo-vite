import React from "react";
import { Link } from "react-router-dom";

export default function NotFound404() {
  document.title = "Not Found 404 • Flexiyo";

  return (
    <section id="not-found-404">
      <div className="not-found">
        <div className="notfound-bg"></div>
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>
            We are sorry, but the page you
            <br />
            requested was not found!
          </h2>
          <Link to="/" className="home-btn">
            Go Home
          </Link>
          <Link to="/contact" className="contact-btn">
            Contact us
          </Link>
          <div className="notfound-social">
            <Link to="https://fb.com/florixer.fb">
              <i className="fab fa-facebook"></i>
            </Link>
            <Link to="https://x.com/florixer">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="https://pinterest.com/florixer">
              <i className="fab fa-pinterest"></i>
            </Link>
            <Link to="https://instagram.com/flexomate.ig">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
