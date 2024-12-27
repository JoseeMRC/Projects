import { BarChart } from "@tremor/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import axios from "axios";
import { ProgressCircle } from "@tremor/react";
import { Col, Container, Row } from "react-bootstrap";
import { BsArrowDownRightSquare } from "react-icons/bs";
import { BsArrowUpRightSquare } from "react-icons/bs";
import "./analisis.scss";

export const Analisis = () => {
  const { user } = useContext(AppContext);
  const [totalCount, setTotalCount] = useState({
    totalSaved: 0,
    totalSpent: 0,
  });
  const [objetives, setObjetives] = useState();
  const [ingresos, setIngresos] = useState("");
  const [gastos, setGastos] = useState("");

  const chartdata = [
    {
      date: "Jan ",
      ingresos: ingresos[0]?.total_import,
      gastos: gastos[0]?.total_import,
    },
    {
      date: "Feb ",
      ingresos: ingresos[1]?.total_import,
      gastos: gastos[1]?.total_import,
    },
    {
      date: "Mar ",
      ingresos: ingresos[2]?.total_import,
      gastos: gastos[2]?.total_import,
    },
    {
      date: "Apr ",
      ingresos: ingresos[3]?.total_import,
      gastos: gastos[3]?.total_import,
    },
    {
      date: "May ",
      ingresos: ingresos[4]?.total_import,
      gastos: gastos[4]?.total_import,
    },
    {
      date: "Jun ",
      ingresos: ingresos[5]?.total_import,
      gastos: gastos[5]?.total_import,
    },
    {
      date: "Jul ",
      ingresos: ingresos[6]?.total_import,
      gastos: gastos[6]?.total_import,
    },
    {
      date: "Aug ",
      ingresos: ingresos[7]?.total_import,
      gastos: gastos[7]?.total_import,
    },
    {
      date: "Sep ",
      ingresos: ingresos[8]?.total_import,
      gastos: gastos[8]?.total_import,
    },
    {
      date: "Oct ",
      ingresos: ingresos[9]?.total_import,
      gastos: gastos[9]?.total_import,
    },
    {
      date: "Nov ",
      ingresos: ingresos[10]?.total_import,
      gastos: gastos[10]?.total_import,
    },
    {
      date: "Dec ",
      ingresos: ingresos[11]?.total_import,
      gastos: gastos[11]?.total_import,
    },
  ];

  useEffect(() => {
    if (user) {
      axios
        .post(
          `http://localhost:3000/movements/graphicByMonth/${user.user_id}`,
          { id: user?.user_id }
        )
        .then((res) => {
          setIngresos(res.data.result3);
          setGastos(res.data.result4);
          setTotalCount({
            totalSaved: res.data.result3[0].total_ingresos,
            totalSpent: res.data.result4[0].total_gastos,
          });
        })
        .catch();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/objetives/allObjetives/${user.user_id}`, {
          id: user?.user_id,
        })
        .then((res) => {
          setObjetives(res.data); // Aquí establecemos los objetivos devueltos por el servidor
        })
        .catch();
    }
  }, [user]);

  return (
    <main>
      <section className="title-center-det">
        <Container fluid="xxl">
          <Row className="py-5 d-flex justify-content-center align-items-center bg-analisis">
            <Col xs={12} className="text-center mb-4">
              <h2 className="fw-bolder mb-0 section-title">Análisis</h2>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="title-center-det">
        <Container fluid="xxl main-vista-det">
          <Row className="py-5">
            <Col xs={12} className=" bg-mov p-4 p-lg-5 botnGraf ">
             <h3 className="titleAnalisis">Análisis Mensual</h3>

              <Row className="mt-4">
                <Col xs={12} lg={6}>
                  <BarChart
                    data={chartdata}
                    index="date"
                    categories={["ingresos", "gastos"]}
                    colors={["#FBF197", "#FC0606"]}
                    yAxisWidth={30}
                  />
                </Col>
                <Col xs={12} lg={6}>
                  <div className="mt-md-0 mt-5">
                    <h3 className="text-center fw-bolder">Mis objetivos</h3>
                  </div>
                  <div className="flex flex-wrap justify-center">
                    {objetives?.map((objetive) => {
                      const progressValue =
                        ((objetive.totalSaved - objetive.totalSpent) /
                          objetive.goal_amount) *
                        100;
                      const roundProgressValue = parseFloat(
                        progressValue.toFixed(2)
                      );
                      return (
                        <div
                          key={objetive.goal_id}
                          className="flex flex-col justify-center items-center btn-icons-obj myButton w-[150px] h-[150px] m-2"
                        >
                          <ProgressCircle value={roundProgressValue} size="lg">
                            {objetive && (
                              <span className="fs-6">
                                {roundProgressValue}%
                              </span>
                            )}
                          </ProgressCircle>
                          <span className="fs-5">{objetive.goal_name}</span>
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row>
              <Col xs={6}>
                <div className="d-flex justify-content-center d-flex numIngGast">
                  <div className="me-5 ingGast">
                    <BsArrowUpRightSquare className="mb-2 colorIng" />
                    <h4>Ingresos</h4>
                    <span className="colorIng">{totalCount.totalSaved} €</span>
                  </div>
                  <div className="mx-5 ingGast">
                    <BsArrowDownRightSquare className="colorGast mb-2" />
                    <h4>Gastos</h4>
                    <span className="colorGast">{totalCount.totalSpent} €</span>
                  </div>
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
