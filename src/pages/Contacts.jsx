import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
};

function Contacts() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFields(prev => ({ ...prev, [id]: value }));
    // Vymazání chyby při psaní
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!fields.name.trim()) newErrors.name = 'Zadejte prosím své jméno.';
    if (!fields.email.trim()) {
      newErrors.email = 'Zadejte prosím e-mail.';
    } else if (!validateEmail(fields.email)) {
      newErrors.email = 'Zadejte platnou e-mailovou adresu (např. jan@email.cz).';
    }
    if (!fields.subject.trim()) newErrors.subject = 'Zadejte prosím předmět zprávy.';
    if (!fields.message.trim()) newErrors.message = 'Napište prosím zprávu.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSuccess(true);
    setFields({ name: '', email: '', subject: '', message: '' });
    setErrors({});
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
                    <p><a href="tel:+420123456789" className="text-white">+420 123 456 789</a></p>
                  </div>
                  <div className="mb-5">
                    <h3 className="fw-bold h5" style={{ color: '#e0d8b4' }}>EMAIL</h3>
                    <p><a href="mailto:ahoj@mnaucafe.cz" className="text-white">ahoj@mnaucafe.cz</a></p>
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
                    Zpráva byla úspěšně odeslána! Mňau. 🐾
                  </Alert>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <Row>
                    <Col md={6} className="mb-3">
                      <label htmlFor="name" className="form-label small fw-bold opacity-50">JMÉNO</label>
                      <input
                        id="name"
                        type="text"
                        className={`form-control py-3 border-0 bg-light rounded-4 ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Jan"
                        value={fields.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </Col>
                    <Col md={6} className="mb-3">
                      <label htmlFor="email" className="form-label small fw-bold opacity-50">EMAIL</label>
                      <input
                        id="email"
                        type="email"
                        className={`form-control py-3 border-0 bg-light rounded-4 ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="jan@email.cz"
                        value={fields.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </Col>
                  </Row>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label small fw-bold opacity-50">PŘEDMĚT</label>
                    <input
                      id="subject"
                      type="text"
                      className={`form-control py-3 border-0 bg-light rounded-4 ${errors.subject ? 'is-invalid' : ''}`}
                      placeholder="Jak se u vás mají kočky?"
                      value={fields.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label small fw-bold opacity-50">ZPRÁVA</label>
                    <textarea
                      id="message"
                      rows={4}
                      className={`form-control py-3 border-0 bg-light rounded-4 ${errors.message ? 'is-invalid' : ''}`}
                      placeholder="Vaše zpráva..."
                      value={fields.message}
                      onChange={handleChange}
                    />
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
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