import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';

function Contacts() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    e.target.reset();
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div style={{ backgroundColor: '#f4f2e9', minHeight: '100vh', fontFamily: 'Outfit, sans-serif' }}>
      <Header />

      <main>
        <Container className="py-5">
          <h1 className="display-4 fw-bold mb-5 text-center" style={{ color: '#1b262c' }}>
            KONTAKTUJTE NÁS <span style={{ color: '#a68b5b' }} aria-hidden="true">🐾</span>
          </h1>

          <Row className="g-5 align-items-stretch">
            {/* KONTAKTNÍ ÚDAJE */}
            <Col lg={5}>
              <div className="p-5 h-100 text-white shadow-lg"
                style={{ backgroundColor: '#46583d', borderRadius: '40px' }}>
                <h2 className="fw-bold mb-4 h3">KDE NÁS NAJDETE?</h2>
                <p className="mb-4 opacity-75">Přijďte si pro svou dávku klidu a kofeinu do naší oázy klidu v centru města.</p>

                <address style={{ fontStyle: 'normal' }}>
                  <div className="mb-4">
                    <h3 className="fw-bold h5" style={{ color: '#e0d8b4' }}>ADRESA</h3>
                    <p>Nějaká ulice 1, Město</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="fw-bold h5" style={{ color: '#e0d8b4' }}>TELEFON</h3>
                    <p>
                      <a href="tel:+420123456789" className="text-white">+420 123 456 789</a>
                    </p>
                  </div>

                  <div className="mb-5">
                    <h3 className="fw-bold h5" style={{ color: '#e0d8b4' }}>EMAIL</h3>
                    <p>
                      <a href="mailto:ahoj@mnaucafe.cz" className="text-white">ahoj@mnaucafe.cz</a>
                    </p>
                  </div>
                </address>

                <div>
                  <h3 className="fw-bold h5 mb-3" style={{ color: '#e0d8b4' }}>OTEVÍRACÍ DOBA</h3>
                  <p className="mb-1 opacity-75">Po – Pá: 08:00 – 20:00</p>
                  <p className="opacity-75">So – Ne: 10:00 – 22:00</p>
                </div>
              </div>
            </Col>

            {/* FORMULÁŘ */}
            <Col lg={7}>
              <div className="p-5 h-100 bg-white shadow-sm" style={{ borderRadius: '40px', border: '1px solid #eee' }}>
                <h2 className="fw-bold mb-4 h3" style={{ color: '#1b262c' }}>NAPIŠTE NÁM ZPRÁVU</h2>

                {success && (
                  <Alert variant="success" className="rounded-pill border-0" role="status">
                    Zpráva byla úspěšně odeslána! Mňau.
                  </Alert>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <Row>
                    <Col md={6} className="mb-3">
                      <label htmlFor="contact-name" className="form-label small fw-bold opacity-50">JMÉNO</label>
                      <input
                        id="contact-name"
                        type="text"
                        className="form-control py-3 border-0 bg-light rounded-4"
                        placeholder="Jan"
                        required
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <label htmlFor="contact-email" className="form-label small fw-bold opacity-50">EMAIL</label>
                      <input
                        id="contact-email"
                        type="email"
                        className="form-control py-3 border-0 bg-light rounded-4"
                        placeholder="jan@email.cz"
                        required
                      />
                    </Col>
                  </Row>

                  <div className="mb-3">
                    <label htmlFor="contact-subject" className="form-label small fw-bold opacity-50">PŘEDMĚT</label>
                    <input
                      id="contact-subject"
                      type="text"
                      className="form-control py-3 border-0 bg-light rounded-4"
                      placeholder="Jak se u vás mají kočky?"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="contact-message" className="form-label small fw-bold opacity-50">ZPRÁVA</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      className="form-control py-3 border-0 bg-light rounded-4"
                      placeholder="Vaše zpráva..."
                      required
                    />
                  </div>

                  <Button type="submit" className="btn-custom py-3 px-5 w-100 fw-bold">
                    ODESLAT DOTAZ
                  </Button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Contacts;
