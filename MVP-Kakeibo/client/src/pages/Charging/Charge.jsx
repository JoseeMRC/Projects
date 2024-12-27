import { Col, Row, Container } from "react-bootstrap"
import './styleCharge.scss'


export const Charge = () => {
  return (
    <Container fluid>
      <Row className="bg-carga">
        <Col>
          <div className="carga">
            <img
            className="logo-carga"
            src="/assets/logo.png"
            alt="" />
          </div>

      <div className="contenedor-loader">
        <div className="loader1"></div>
        <div className="loader2"></div>
        <div className="loader3"></div>
        <div className="loader4"></div>
      </div>
      <div className="cargando">Cargando...</div>  
        </Col>
      </Row>
  </Container>
  )
}