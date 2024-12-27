import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Charge } from "../Charging/Charge";
import "./styleHome.scss";
import { ButtonsApp } from "../../components/Buttons/ButtonsApp";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Charge />
      ) : (
        <Container fluid>
          <Row className="">
            <Col xs={12} md={6} className="logo d-none d-md-block">
              <div className="d-flex flex-column align-items-center">
                <img src="/assets/logo.png" alt="logo kakeibo" />
                <div>
                  <img
                    className="name"
                    src="/assets/name.png"
                    alt="nombre kakiebo"
                  />
                </div>
              </div>
            </Col>
            <Col xs={12} md={6} className="parte-derecha">
              <img
                className="simbolo-derecha"
                src="/assets/logo.png"
                alt="logo kakeibo"
              />
              <img
                className="nombre-derecha d-block d-md-none "
                src="/assets/name.png"
                alt="logo kakeibo"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
                voluptas a adipisci ipsa laboriosam necessitatibus perferendis
                dolorum consequatur quos ex consequuntur vel mollitia ad
                officiis eos possimus, incidunt quisquam ipsum?
              </p>
              <ButtonsApp
                className='mb-3'
                color="green-kakeibo"
                clickar={() => navigate("/login")}
                textButton={"Iniciar sesión"}
              ></ButtonsApp>

              <ButtonsApp
                color="gold-kakeibo"
                clickar={() => navigate("/register")}
                textButton={"¡Regístrate!"}
              ></ButtonsApp>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
