import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ButtonGroup } from 'react-bootstrap';
import Header from '../components/Header';
import { useCart } from '../components/CartContext';

function ProductCatalog() {
  const { addToCart } = useCart();
  const [products] = useState([
    { id: 1, name: 'Kocour Mourek', description: 'Klidný senior, miluje spánek na klíně.', price: 0, category: 'kočky', img: '/image/kocour1.jpg' },
    { id: 2, name: 'Kočka Líza', description: 'Hravá a zvědavá, ráda loví provázky.', price: 0, category: 'kočky', img: '/image/kocour2.jpg' },
    { id: 3, name: 'Cappuccino Mňau', description: 'Bohatá pěna s posypem ve tvaru tlapky.', price: 75, category: 'nápoje', img: '/image/kava.jpg' },
    { id: 4, name: 'Domácí Cheesecake', description: 'Lehký tvarohový dort s čerstvými malinami.', price: 95, category: 'jídlo', img: '/image/cheescake.jpg' },
    { id: 5, name: 'Horká čokoláda', description: 'Hustá belgická čokoláda se šlehačkou.', price: 85, category: 'nápoje', img: '/image/horkacokolada.jpg' },
    { id: 6, name: 'Slaný muffin', description: 'Domácí muffin se sýrem a bylinkami.', price: 65, category: 'jídlo', img: '/image/muffin.jpg' },
    { id: 7, name: 'Kocour Míša', description: 'Šibal, který nikdy nedá pokoj hračkám.', price: 0, category: 'kočky', img: '/image/kocoursmyskou.jpg' },
    { id: 8, name: 'Kocour Cappuccino', description: 'Elegán kavárny, ladí s latte macchiato.', price: 0, category: 'kočky', img: '/image/kocourbile.jpg' },
    { id: 9, name: 'Kocour Pán', description: 'Chodí jako by vlastnil celé místo.', price: 0, category: 'kočky', img: '/image/kocour_cernebile.jpg' },
  ]);

   const [filter, setFilter] = useState('vše');
  const [toast, setToast] = useState(null); // { name, id }
  const categories = ['vše', 'kočky', 'nápoje', 'jídlo'];
  const filtered = filter === 'vše' ? products : products.filter(p => p.category === filter);
 
  const handleAddToCart = (product) => {
    addToCart(product);
    setToast(product.name);
    setTimeout(() => setToast(null), 2500);
  };
 
  return (
    <div style={{ backgroundColor: '#FFF8F0', minHeight: '100vh' }}>
      <Header />
 
      {/* TOAST NOTIFIKACE */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 9999,
            backgroundColor: '#46583d',
            color: 'white',
            padding: '14px 24px',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            fontWeight: 600,
            fontSize: '15px',
            animation: 'fadeInUp 0.3s ease',
          }}
        >
          🛒 <strong>{toast}</strong> byl přidán do košíku!
        </div>
      )}
 
      <main>
        <Container className="py-5">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#5D4037' }}>Naše nabídka</h1>
            <p className="text-muted">Vyberte si dobrotu nebo si objednejte pamlsek pro naše kočky.</p>
 
            <nav aria-label="Filtr kategorií">
              <ButtonGroup className="shadow-sm rounded-pill overflow-hidden mt-3">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    variant={filter === cat ? 'warning' : 'light'}
                    className="text-capitalize px-4 py-2 border-0"
                    style={filter === cat ? { backgroundColor: '#FF8C61', color: '#fff' } : {}}
                    aria-pressed={filter === cat}
                  >
                    {cat}
                  </Button>
                ))}
              </ButtonGroup>
            </nav>
          </div>
 
          <Row className="g-4" as="ul" style={{ listStyle: 'none', padding: 0 }}>
            {filtered.map(p => (
              <Col key={p.id} md={4} as="li">
                <article>
                  <Card className="border-0 shadow h-100 rounded-4 overflow-hidden">
                    <div style={{ height: '250px', overflow: 'hidden' }}>
                      <Card.Img
                        variant="top"
                        src={p.img}
                        alt={p.name}
                        className="h-100 w-100 object-fit-cover"
                      />
                    </div>
                    <Card.Body className="d-flex flex-column p-4">
                      <div className="d-flex justify-content-between mb-2">
                        <Card.Title as="h2" className="fw-bold mb-0 h5">{p.name}</Card.Title>
                        <Badge
                          bg={p.category === 'kočky' ? 'success' : 'secondary'}
                          className="align-self-center rounded-pill"
                        >
                          {p.category}
                        </Badge>
                      </div>
                      <Card.Text className="text-muted flex-grow-1">{p.description}</Card.Text>
                      <hr className="opacity-25" />
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fs-4 fw-bold" style={{ color: '#5D4037' }}>
                          {p.price > 0 ? `${p.price} Kč` : 'Mazlení zdarma'}
                        </span>
                        <Button
                          onClick={() => handleAddToCart(p)}
                          style={{ backgroundColor: '#5D4037', border: 'none' }}
                          className="rounded-pill px-4"
                          aria-label={`Přidat ${p.name} do košíku`}
                        >
                          {p.category === 'kočky' ? 'Koupit pamlsek' : 'Do košíku'}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </article>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
 
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default ProductCatalog;
