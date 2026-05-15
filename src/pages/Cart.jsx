import React from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import Header from '../components/Header';

const Cart = () => {
  const { cart, totalPrice, removeFromCart, user } = useCart();

  return (
    <div style={{ backgroundColor: '#f4f2e9', minHeight: '100vh' }}>
      <Header />

      <main>
        <Container className="py-5">
          <h1 className="fw-bold mb-4" style={{ color: '#1b262c' }}>Váš nákupní seznam</h1>

          {cart.length === 0 ? (
            <Alert variant="info" className="rounded-4 border-0 shadow-sm" role="status">
              Váš košík je zatím prázdný. Vyberte si něco z našeho menu!
            </Alert>
          ) : (
            <div className="bg-white p-4 rounded-5 shadow-sm">
              <Table borderless responsive aria-label="Obsah košíku">
                <thead>
                  <tr className="border-bottom opacity-50">
                    <th scope="col">POLOŽKA</th>
                    <th scope="col">POČET</th>
                    <th scope="col">CENA</th>
                    <th scope="col">AKCE</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id} className="align-middle">
                      <td className="fw-bold">{item.name}</td>
                      <td>{item.qty}x</td>
                      <td>{item.price * item.qty} Kč</td>
                      <td>
                        <Button
                          variant="link"
                          className="text-danger p-0"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Odstranit ${item.name} z košíku`}
                        >
                          Odstranit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="text-end mt-5">
                <h2 className="fw-bold mb-4">Celkem: {totalPrice} Kč</h2>

                {!user ? (
                  <div className="d-flex flex-column align-items-end gap-3">
                    <Alert variant="warning" className="rounded-pill border-0 px-4 mb-0" role="status">
                      Pro dokončení objednávky se musíte nejdříve <Link to="/login">přihlásit</Link>!
                    </Alert>
                    <Button className="btn-custom py-3 px-5 opacity-50" disabled aria-disabled="true">
                      ZAPLATIT OBJEDNÁVKU
                    </Button>
                  </div>
                ) : (
                  <Link to="/payment">
                    <Button className="btn-custom py-3 px-5">
                      ZAPLATIT OBJEDNÁVKU
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Cart;