import React from 'react';
import { Container, Navbar, Nav, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

function Header() {
  const { totalItems, user, setUser } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('mnau_cafe_user');
    setUser(null);
    navigate('/');
  };

  return (
    <header>
      <Navbar expand="lg" sticky="top" style={{ backgroundColor: '#1b262c', padding: '1rem 0' }} variant="dark" className="shadow">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-3" style={{ color: '#e0d8b4' }}>
            MŇAU CAFÉ <span style={{ color: '#a68b5b' }} aria-hidden="true">🐾</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navigation" aria-label="Otevřít navigaci" />

          <Navbar.Collapse id="main-navigation">
            <Nav className="ms-auto align-items-center gap-3" as="nav" aria-label="Hlavní navigace">
              <Nav.Link as={Link} to="/catalog" className="text-uppercase small fw-bold">Menu &amp; Kočky</Nav.Link>
              <Nav.Link as={Link} to="/contacts" className="text-uppercase small fw-bold">Kontakt</Nav.Link>

              {user ? (
                <div className="d-flex align-items-center gap-3">
                  <span className="text-uppercase small fw-bold" style={{ color: '#a68b5b' }}>
                    Ahoj, {user.email.split('@')[0]}
                  </span>
                  <Button
                    onClick={handleLogout}
                    variant="link"
                    className="text-uppercase small fw-bold text-decoration-none p-0"
                    style={{ color: '#dc3545', border: 'none' }}
                  >
                    Odhlásit
                  </Button>
                </div>
              ) : (
                <Nav.Link as={Link} to="/login" className="text-uppercase small fw-bold">Login</Nav.Link>
              )}

              <Link to="/cart" aria-label={`Košík, ${totalItems} položek`}>
                <Button variant="outline-light" className="position-relative border-2 px-4 fw-bold">
                  KOŠÍK
                  {totalItems > 0 && (
                    <Badge
                      pill
                      style={{ backgroundColor: '#a68b5b' }}
                      className="position-absolute top-0 start-100 translate-middle"
                      aria-hidden="true"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
