import React, { useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import Header from '../components/Header';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useCart();
  const navigate = useNavigate();

  const handleAction = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('mnau_cafe_users_db')) || [];

    if (isRegistering) {
      if (users.find(u => u.email === email)) {
        setError('Uživatel s tímto e-mailem již existuje!');
        return;
      }
      const newUser = { email, password };
      localStorage.setItem('mnau_cafe_users_db', JSON.stringify([...users, newUser]));
      setIsRegistering(false);
      alert('Registrace proběhla úspěšně! Nyní se můžete přihlásit.');
    } else {
      const foundUser = users.find(u => u.email === email && u.password === password);
      if (foundUser) {
        localStorage.setItem('mnau_cafe_user', JSON.stringify(foundUser));
        setUser(foundUser);
        navigate('/');
      } else {
        setError('Neplatný e-mail nebo heslo!');
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f2e9', minHeight: '100vh' }}>
      <Header />

      <main>
        <Container className="d-flex justify-content-center pt-5">
          <div
            className="p-4 shadow border-0 hover-scale-card bg-white"
            style={{ width: '400px', borderRadius: '30px' }}
          >
            <h1 className="text-center mb-4 h2" style={{ color: '#1b262c' }}>
              {isRegistering ? 'Nová registrace' : 'Vítejte zpět'}
            </h1>

            {error && (
              <Alert variant="danger" role="alert">{error}</Alert>
            )}

            <form onSubmit={handleAction} noValidate>
              <div className="mb-3">
                <label htmlFor="login-email" className="form-label fw-bold opacity-75">
                  E-mailová adresa
                </label>
                <input
                  id="login-email"
                  type="email"
                  className="form-control py-3"
                  required
                  placeholder="např. kote@email.cz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderRadius: '15px', backgroundColor: '#f4f2e9', border: 'none' }}
                  autoComplete="email"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="login-password" className="form-label fw-bold opacity-75">
                  Heslo
                </label>
                <input
                  id="login-password"
                  type="password"
                  className="form-control py-3"
                  required
                  placeholder="Vaše heslo"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderRadius: '15px', backgroundColor: '#f4f2e9', border: 'none' }}
                  autoComplete={isRegistering ? 'new-password' : 'current-password'}
                />
              </div>

              <Button className="w-100 btn-custom py-3 mb-3" type="submit">
                {isRegistering ? 'Vytvořit účet' : 'Přihlásit se'}
              </Button>

              <Button
                variant="link"
                className="w-100 text-dark text-decoration-none fw-bold"
                onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
                type="button"
              >
                {isRegistering ? 'Již máte účet? Přihlaste se' : 'Ještě u nás nejste? Zaregistrujte se'}
              </Button>
            </form>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Login;
