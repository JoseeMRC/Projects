import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { ButtonsApp } from "../../components/Buttons/ButtonsApp";
import { FaPenToSquare } from "react-icons/fa6";
import "./User.scss";
import { Col, Container, Row } from "react-bootstrap";
import { Welcome } from "../../components/Welcome/Welcome";
import foto1 from "/assets/hucha-cerdito2.png";
import foto2 from "/assets/movil-dinero.png";
import axios from "axios";

export const Users = () => {
  const { user, setUser } = useContext(AppContext);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState();

  useEffect(() => {
    if (user) {
      if (user.new_user) {
        setWelcome(1);
      }
      setUserData(user);
    }
  }, [user]);

  const paso2Submit = () => {
    axios
      .put(`http://localhost:3000/users/changeNewUser/${userData.user_id}`)
      .then(() => {
        setUser({ ...user, new_user: false });
        navigate(`/users/editAnswer/${userData.user_id}`);
      })
      .catch();
  };

  return (
    <main className="d-flex align-items-center justify-content-center">
      <section>
        <Container fluid="xxl">
          <Row>
            <Col>
              {user?.new_user && welcome === 1 ? (
                <Welcome
                  title="Bienvenidos al asistente Kakeibo"
                  img={foto1}
                  onClick={() => setWelcome(2)}
                  textButton="Siguiente"
                />
              ) : user?.new_user && welcome === 2 ? (
                <Welcome
                  title="¿Estás preparado para tener el control de tus finanzas?"
                  img={foto2}
                  onClick={() => paso2Submit()}
                  textButton="Comenzar"
                />
              ) : null}
            </Col>
            {!user?.new_user && (
              <Col xs={12} className="main-section">
                <div className="main-title-ppal">
                  <h2 className="m-0 text-center section-title">Perfil</h2>
                </div>
                <div className="main-vista-user pb-5">
                  <div className="main-box-user">
                    <FaPenToSquare
                      className="edit-icon"
                      onClick={() =>
                        navigate(`/users/editUser/${userData.user_id}`)
                      }
                    />
                    <div className="info-user">
                      <div className="d-flex justify-content-center m-4">
                        {userData.img && (
                          <img
                            className="img-perfil"
                            src={
                              userData.img === "perfil-default.png"
                                ? `http://localhost:3000/images/${userData.img}`
                                : `http://localhost:3000/images/users/${userData.img}`
                            }
                            alt="img-perfil"
                          />
                        )}
                      </div>
                      <div className="d-flex flex-column align-items-start">
                        <h2 className="mb-4">{userData.name} {userData.lastname}</h2>
                        <p>
                          <span className="fw-bold">Email: </span>
                          {userData.email}
                        </p>
                        <p>
                          <span className="fw-bold">Número de teléfono: </span>
                          {userData.phone_number}
                        </p>
                        {userData.birth_date && 
                        (
                          <p>
                            <span className="fw-bold">Fecha de nacimiento: </span>
                            {userData.birth_date}
                          </p>
                        )}
                      </div>
                    </div>
                    <ButtonsApp
                      color={"green-kakeibo"}
                      textButton={"Asistente Kakeibo"}
                      clickar={() =>
                        navigate(`/users/editAnswer/${userData.user_id}`)
                      }
                    />
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </main>
  );
};
