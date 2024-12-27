import { useNavigate } from "react-router-dom";
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";
import "./error.scss";
import { Col, Row, Container } from "react-bootstrap";

export const ErrorPage = () => {

  const navigate = useNavigate();
    const handleBack = () => {
    navigate(-1);
  };


  return (
    <main className="errorPag">
      <section className="title-center-det classErr">
        <div className="main">
          <Container fluid="xxl">
            <Row className="py-5">
              <Col xs={12} className="errorRoj p-4 p-lg-5">
              <h3>
                ¡Upss...! Algo ha salido mal...
                </h3>
                <ButtonsApp
                className={'errorBut'}
                textButton={'Volver'}
                color={'gold-kakeibo'}
                clickar={handleBack}
                >
                </ButtonsApp>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </main>
  );
};
