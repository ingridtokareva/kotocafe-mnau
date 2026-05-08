import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function Home() {
  const cats = [
    { name: "Mourek", desc: "Mistr spánku", img: "/image/kocour1.jpg" },
    { name: "Líza", desc: "Princezna kavárny", img: "/image/kocour2.jpg" },
    { name: "Blesk", desc: "Lovec dobrot", img: "/image/kocour3.jpg" },
    { name: "Micka", desc: "Milovnice kávy", img: "/image/kocour4.jpg" },
    { name: "Snížek", desc: "Bílý nadýchanec", img: "/image/kocourbile.jpg" },
  ];

  return (
    <div style={{ backgroundColor: '#f4f2e9', minHeight: '100vh', fontFamily: 'Outfit, sans-serif' }}>
      <Header />

      <main>
        {/* 1. HERO SEKCE */}
        <section className="py-5" style={{ background: 'linear-gradient(180deg, #25333b 0%, #25333d 100%)', color: '#e0d8b4' }}>
          <Container>
            <Row className="align-items-center" style={{ minHeight: '70vh' }}>
              <Col lg={6} className="text-start pe-lg-5">
                <h1 className="display-2 fw-bold mb-3" style={{ lineHeight: 1.1 }}>
                  Káva, klid a <br />
                  <span style={{ color: '#a68b5b' }}>kočičí předení.</span>
                </h1>
                <p className="fs-4 mb-5 opacity-75 fw-light">
                  Objevte unikátní prostor v srdci města, kde se čas na chvíli zastaví a káva chutná o kapku lépe.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Button className="btn-custom py-3 px-5 fs-5" as={Link} to="/catalog">
                    VSTOUPIT
                  </Button>
                  <Button variant="outline-light" as={Link} to="/contacts" className="py-3 px-5 fs-5 rounded-3 border-2">
                    KDE NÁS NAJÍT?
                  </Button>
                </div>
              </Col>

              <Col lg={6} className="mt-5 mt-lg-0 text-center">
                <div className="position-relative">
                  <div
                    className="position-absolute top-50 start-50 translate-middle"
                    style={{ width: '110%', height: '110%', background: 'radial-gradient(circle, rgba(166,139,91,0.2) 0%, transparent 70%)', zIndex: 0 }}
                    aria-hidden="true"
                  />
                  <img
                    src="/image/kot.jpg"
                    alt="Jedna z našich koček v kavárně"
                    className="img-fluid position-relative shadow-lg"
                    style={{ borderRadius: '30px', zIndex: 1, border: '4px solid #e0d8b4', transform: 'rotate(2deg)' }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* 2. KARTY S VLASTNOSTMI */}
        <section className="py-5" style={{ backgroundColor: '#e0d8b4' }} aria-label="Co nabízíme">
          <Container className="py-5">
            <Row className="g-4 justify-content-center">
              <Col md={4}>
                <article className="p-4 h-100 text-center shadow-sm hover-scale-card"
                  style={{ backgroundColor: '#f4f2e9', borderRadius: '40px', border: '1px solid rgba(70, 88, 61, 0.1)' }}>
                  <div className="mb-4 overflow-hidden" style={{ borderRadius: '25px', height: '220px' }}>
                    <img src="/image/kava.jpg" alt="Šálek výběrové kávy" className="w-100 h-100 object-fit-cover" />
                  </div>
                  <h2 className="fw-bold mb-3 h3" style={{ color: '#46583d' }}>VÝBĚROVÁ KÁVA</h2>
                  <p className="mb-0 fw-light">Láska k zrnu v každém šálku.</p>
                </article>
              </Col>

              <Col md={4}>
                <article className="p-4 h-100 text-center shadow-sm hover-scale-card"
                  style={{ backgroundColor: '#f4f2e9', borderRadius: '40px', border: '1px solid rgba(70, 88, 61, 0.1)' }}>
                  <div className="mb-4 overflow-hidden" style={{ borderRadius: '25px', height: '220px' }}>
                    <img src="/image/kocour_cernebile.jpg" alt="Kočka v kavárně" className="w-100 h-100 object-fit-cover" />
                  </div>
                  <h2 className="fw-bold mb-3 h3" style={{ color: '#46583d' }}>10 CHLUPÁČŮ</h2>
                  <p className="mb-0 fw-light">Naši hostitelé se na vás těší.</p>
                </article>
              </Col>

              <Col md={4}>
                <article className="p-4 h-100 text-center shadow-sm hover-scale-card"
                  style={{ backgroundColor: '#f4f2e9', borderRadius: '40px', border: '1px solid rgba(70, 88, 61, 0.1)' }}>
                  <div className="mb-4 overflow-hidden" style={{ borderRadius: '25px', height: '220px' }}>
                    <img src="/image/cheescake.jpg" alt="Domácí dezerty" className="w-100 h-100 object-fit-cover" />
                  </div>
                  <h2 className="fw-bold mb-3 h3" style={{ color: '#46583d' }}>DOMÁCÍ DEZERTY</h2>
                  <p className="mb-0 fw-light">Pečeme denně s láskou.</p>
                </article>
              </Col>
            </Row>
          </Container>
        </section>

        {/* 3. KARUSEL KOČEK */}
        <section className="py-5 bg-white overflow-hidden" aria-label="Naši rezidenti">
          <Container fluid className="px-0">
            <h2 className="text-center mb-5 fw-bold display-5" style={{ color: '#1b262c' }}>
              NAŠI REZIDENTI
            </h2>

            <div className="cat-marquee-wrapper">
              <div className="cat-marquee-content">
                {/* Duplikace pro plynulý nekonečný efekt */}
                {[...cats, ...cats].map((cat, index) => (
                  <div className="cat-card-mini shadow-sm" key={index}>
                    <img src={cat.img} alt={cat.name} />
                    <div className="cat-card-info">
                      <h3 className="mb-0 fw-bold h5">{cat.name}</h3>
                      <p className="small mb-0 opacity-75">{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* 4. FOOTER */}
      <footer className="py-5 text-white" style={{ backgroundColor: '#1b262c' }}>
        <Container>
          <Row className="text-center text-md-start">
            <Col md={4} className="mb-4 mb-md-0">
              <h2 className="fw-bold h4" style={{ color: '#a68b5b' }}>MŇAU CAFÉ 🐾</h2>
              <p className="opacity-75">Vaše útočiště v centru města.</p>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <h3 className="fw-bold mb-3 h5">KONTAKT</h3>
              <address>
                <p className="mb-1 opacity-75">Nějaká ulice 1, Město</p>
                <p className="opacity-75">
                  <a href="mailto:ahoj@mnaucafe.cz" className="text-white opacity-75">ahoj@mnaucafe.cz</a>
                </p>
              </address>
            </Col>
            <Col md={4}>
              <h3 className="fw-bold mb-3 h5">OTEVŘENO</h3>
              <p className="mb-1 opacity-75">Po – Pá: 08:00 – 20:00</p>
              <p className="opacity-75">So – Ne: 10:00 – 22:00</p>
            </Col>
          </Row>
          <hr className="my-4 opacity-25" />
          <p className="mb-0 text-center opacity-50 small text-uppercase">© 2026 Mňau Café</p>
        </Container>
      </footer>
    </div>
  );
}

export default Home;
