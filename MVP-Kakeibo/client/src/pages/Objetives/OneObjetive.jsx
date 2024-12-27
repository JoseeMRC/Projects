import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { ButtonsApp } from "../../components/Buttons/ButtonsApp";
import { BsArrowUpLeftSquare } from "react-icons/bs";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { IoCheckboxOutline } from "react-icons/io5";
import { ProgressCircle } from "@tremor/react";
import "./OneObjetive.scss";
import { capitalizeFirstLetter } from "../../../Utils/capitalizeFirstLetter";

export const OneObjetive = () => {
  const { icons, user } = useContext(AppContext);
  const [objetiveData, setObjetiveData] = useState(null);
  const [movements, setMovements] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(
          `http://localhost:3000/objetives/oneObjetive/${user.user_id}/${id}`
        )
        .then((res) => {
          const { goal, movements } = res.data;
          const { totalSaved, totalSpent } = res.data.totalAmount[0];
          setObjetiveData(goal);
          setMovements(movements);
          const totalAmount = totalSaved - totalSpent;
          setTotalAmount(totalAmount);
        })
        .catch();
    }
  }, [user, id, icons]);

  let CurrentIcon;

  if (objetiveData) {
    CurrentIcon = icons.find((icon) => icon.id === objetiveData.goal_icon);
  }

  const handleDelete = () => {
    const user_id = objetiveData?.user_id;
    axios
      .delete(`http://localhost:3000/objetives/oneObjetiveDelete/${id}`)
      .then(() => {
        navigate(`/objetives/allObjetives/${user_id}`);
      })
      .catch()
  };

  const handleBack = () => {
    navigate(`/objetives/allObjetives/${user.user_id}`);
  };

  const progressValue =
    100 -
    ((objetiveData?.goal_amount - totalAmount) / objetiveData?.goal_amount) *
      100;

  const progressValuePorc = parseFloat(progressValue.toFixed(2));
  return (
    <main>
      <section className="title-center-det bgObj">
        <Container fluid="xxl">
          <Row className="py-5">
            <Col
              xs={12}
              lg={4}
              className="d-flex justify-content-center align-items-center"
            >
              {objetiveData && (
                <h2 className="fw-bolder">
                  {capitalizeFirstLetter(objetiveData?.goal_name)}
                </h2>
              )}
            </Col>
            <Col
              xs={6}
              lg={4}
              className="d-flex flex-column gap-3 align-items-center align-items-lg-start text-center text-lg-start"
            >
              <div className="d-flex flex-column gap-2 align-items-center align-items-lg-start">
                <div className="d-flex align-items-center gap-1">
                  <BsArrowUpLeftSquare />
                  <span>Objetivo</span>
                </div>
                <h3 className="fw-bolder">{objetiveData?.goal_amount} €</h3>
              </div>
              <div className="d-flex flex-column gap-2 align-items-center align-items-lg-start">
                <div className="d-flex align-items-center gap-1">
                  <BsArrowUpRightSquare />
                  <span>Total ahorrado</span>
                </div>
                <h3 className="fw-bolder totalSaved"> {totalAmount} €</h3>
              </div>
              <span>Fecha límite</span>
              <h3 className="fw-bolder"> {objetiveData?.limit_date}</h3>
              <div>
                <span className="iconCheck">
                  <IoCheckboxOutline />
                </span>
                <span>
                  Lleva un {progressValuePorc}% completado de su objetivo.
                </span>
              </div>
            </Col>
            <Col
              xs={6}
              lg={4}
              className="d-flex align-items-center justify-content-center justify-content-lg-start"
            >
              <div className="flex justify-center items-center btn-icons-obj myButton w-[150px] h-[150px]">
                <ProgressCircle value={progressValue} size="lg">
                  {objetiveData && <CurrentIcon.component />}
                </ProgressCircle>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="title-center-det">
        <div className="main-vista-det">
          <Container fluid="xxl">
            <Row className="py-5">
              <Col xs={12} className="bg-mov p-4 p-lg-5">
                {movements.length ? (
                  <Row className="gy-4">
                    <Col xs={12} lg={{ span: 6, offset: 3 }}>
                      <h3>Movimientos</h3>
                    </Col>

                    {movements.map((movement) => (
                      <Col
                        xs={12}
                        lg={{ span: 6, offset: 3 }}
                        key={movement?.movement_id}
                      >
                        <Row>
                          <Col xs={4} lg={2}>
                            <div className="d-flex justify-content-center align-items-center btn-icons-obj myButton">
                              <CurrentIcon.component />
                            </div>
                          </Col>
                          <Col
                            xs={4}
                            lg={6}
                            className="d-flex flex-column justify-content-center gap-2 ps-0 ps-lg-5 "
                          >
                            <h4 className="mb-0"> {movement?.title} </h4>
                            <p className="mb-0"> {movement?.date} </p>
                          </Col>
                          <Col
                            xs={4}
                            lg={4}
                            className="d-flex align-items-center justify-content-end"
                          >
                            <p
                              className={
                                movement?.movement_type === 1
                                  ? "colorIng"
                                  : "colorGast"
                              }
                            >
                              {movement?.movement_type === 2 && <span>-</span>}
                              {movement?.movement_import} €
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No hay movimientos asociados a este objetivo.</p>
                )}
              </Col>

              <Col
                xs={12}
                className="d-flex justify-content-center align-content-center gap-5 mt-5"
              >
                <ButtonsApp
                  color="gold-kakeibo"
                  textButton="Volver"
                  clickar={handleBack}
                />
                <ButtonsApp
                  color="gold-kakeibo"
                  textButton="Editar"
                  clickar={() =>
                    navigate(`/objetives/editObjetive/${objetiveData?.goal_id}`)
                  }
                />
                <ButtonsApp
                  color="green-kakeibo"
                  textButton="Borrar"
                  clickar={handleDelete}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </main>
  );
};
