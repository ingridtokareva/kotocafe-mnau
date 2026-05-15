import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import Header from '../components/Header';


const formatCardNumber = (value) => {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
};


const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
};

const validateCardNumber = (num) => num.replace(/\s/g, '').length === 16;
const validateExpiry = (exp) => {
  const [mm, yy] = exp.split('/');
  if (!mm || !yy || mm.length !== 2 || yy.length !== 2) return false;
  const month = parseInt(mm, 10);
  const year = parseInt('20' + yy, 10);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expDate = new Date(year, month - 1, 1);
  return expDate >= new Date(now.getFullYear(), now.getMonth(), 1);
};
const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv);
const validateName = (name) => name.trim().split(' ').length >= 2;

function Payment() {
  const { cart, totalPrice, setCart } = useCart();
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    let { id, value } = e.target;
    if (id === 'cardNumber') value = formatCardNumber(value);
    if (id === 'expiry') value = formatExpiry(value);
    if (id === 'cvv') value = value.replace(/\D/g, '').slice(0, 4);
    setFields(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!validateName(fields.name)) e.name = 'Zadejte jméno a příjmení (např. Jan Novák).';
    if (!validateCardNumber(fields.cardNumber)) e.cardNumber = 'Číslo karty musí mít 16 číslic.';
    if (!validateExpiry(fields.expiry)) e.expiry = 'Zadejte platné datum (MM/RR) a karta nesmí být prošlá.';
    if (!validateCVV(fields.cvv)) e.cvv = 'CVV musí mít 3 nebo 4 číslice.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSuccess(true);

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (cart.length === 0 && !success) {
    return (
      <div style={{ backgroundColor: '#f4f2e9', minHeight: '100vh' }}>
        <Header />
        <main>
          <Container className="py-5 text-center">
            <h1 className="fw-bold mb-4" style={{ color: '#1b262c' }}>Košík je prázdný</h1>
            <p className="text-muted mb-4">Nejprve si vyberte položky z našeho menu.</p>
            <Button className="btn-custom py-3 px-5" onClick={() => navigate('/catalog')}>
              DO MENU
            </Button>
          </Container>
        </main>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f4f2e9', minHeight: '100vh', fontFamily: 'Outfit, sans-serif' }}>
      <Header />

      <main>
        <Container className="py-5">
          <h1 className="fw-bold mb-5" style={{ color: '#1b262c' }}>Platební údaje</h1>

          {success ? (
            <div className="text-center py-5">
              <div style={{ fontSize: '64px' }}>🐾</div>
              <h2 className="fw-bold mt-3 mb-2" style={{ color: '#46583d' }}>Platba proběhla úspěšně!</h2>
              <p className="text-muted">Děkujeme za vaši objednávku. Za chvíli vás přesměrujeme domů.</p>
            </div>
          ) : (
            <Row className="g-5">
              {/* FORMULÁŘ */}
              <Col lg={7}>
                <div className="bg-white p-5 rounded-5 shadow-sm">
                  <h2 className="fw-bold mb-4 h4" style={{ color: '#1b262c' }}>Údaje karty</h2>

                  <form onSubmit={handleSubmit} noValidate>
                    {/* Jméno na kartě */}
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label small fw-bold opacity-50">
                        JMÉNO NA KARTĚ
                      </label>
                      <input
                        id="name"
                        type="text"
                        className={`form-control py-3 border-0 bg-light rounded-4 ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Jan Novák"
                        value={fields.name}
                        onChange={handleChange}
                        autoComplete="cc-name"
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    {/* Číslo karty */}
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="form-label small fw-bold opacity-50">
                        ČÍSLO KARTY
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        inputMode="numeric"
                        className={`form-control py-3 border-0 bg-light rounded-4 ${errors.cardNumber ? 'is-invalid' : ''}`}
                        placeholder="1234 5678 9012 3456"
                        value={fields.cardNumber}
                        onChange={handleChange}
                        autoComplete="cc-number"
                      />
                      {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                    </div>

                    <Row>
                      {/* Expirace */}
                      <Col md={6} className="mb-4">
                        <label htmlFor="expiry" className="form-label small fw-bold opacity-50">
                          PLATNOST (MM/RR)
                        </label>
                        <input
                          id="expiry"
                          type="text"
                          inputMode="numeric"
                          className={`form-control py-3 border-0 bg-light rounded-4 ${errors.expiry ? 'is-invalid' : ''}`}
                          placeholder="08/27"
                          value={fields.expiry}
                          onChange={handleChange}
                          autoComplete="cc-exp"
                        />
                        {errors.expiry && <div className="invalid-feedback">{errors.expiry}</div>}
                      </Col>

                      {/* CVV */}
                      <Col md={6} className="mb-4">
                        <label htmlFor="cvv" className="form-label small fw-bold opacity-50">
                          CVV
                        </label>
                        <input
                          id="cvv"
                          type="password"
                          inputMode="numeric"
                          className={`form-control py-3 border-0 bg-light rounded-4 ${errors.cvv ? 'is-invalid' : ''}`}
                          placeholder="•••"
                          value={fields.cvv}
                          onChange={handleChange}
                          autoComplete="cc-csc"
                        />
                        {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                      </Col>
                    </Row>

                    <Button type="submit" className="btn-custom py-3 w-100 fw-bold fs-5 mt-2">
                      ZAPLATIT {totalPrice} Kč
                    </Button>

                    <p className="text-center small opacity-50 mt-3">
                      🔒 Platba je simulována. Žádné reálné údaje nejsou odesílány.
                    </p>
                  </form>
                </div>
              </Col>

              {/* SHRNUTÍ OBJEDNÁVKY */}
              <Col lg={5}>
                <div className="bg-white p-4 rounded-5 shadow-sm">
                  <h2 className="fw-bold mb-4 h4" style={{ color: '#1b262c' }}>Shrnutí objednávky</h2>
                  <ul className="list-unstyled">
                    {cart.map(item => (
                      <li key={item.id} className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                        <div>
                          <span className="fw-bold">{item.name}</span>
                          <span className="text-muted small ms-2">×{item.qty}</span>
                        </div>
                        <span className="fw-bold">{item.price * item.qty} Kč</span>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between mt-2">
                    <span className="fw-bold fs-5">Celkem</span>
                    <span className="fw-bold fs-5" style={{ color: '#46583d' }}>{totalPrice} Kč</span>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </main>
    </div>
  );
}

export default Payment;