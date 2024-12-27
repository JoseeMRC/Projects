import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../../context/AppContextProvider";
import { Form } from "react-bootstrap";
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";
import { useNavigate, useParams } from "react-router-dom";
import { KakeiboModal } from "../../../components/Modal/KakeiboModal";
import { LabelKakeibo } from "../../../components/FormComponents/LabelKakeibo/LabelKakeibo";
import { InputKakeibo } from "../../../components/FormComponents/InputKakeibo/InputKakeibo";

import "./stylesCreateObjetive.scss";

const initialValue = {
  goal_amount: "",
  limit_date: "",
  goal_name: "",
  goal_status: false,
  goal_icon: {
    name: "",
    component: () => null,
  },
};

export const CreateObjetive = () => {
  const { icons, user, setGoals } = useContext(AppContext);
  const [objetive, setObjetive] = useState(initialValue);
  const [showModalIcons, setShowModalIcons] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObjetive({ ...objetive, [name]: value });
  };

  const handleOpenModalIcons = () => {
    setShowModalIcons(true);
  };

  const handleCloseModalIcons = () => {
    setShowModalIcons(false);
  };

  const handleChangeIcon = (icon) => {
    setSelectedIcon(icon);
    setObjetive({ ...objetive, goal_icon: icon.id });
    handleCloseModalIcons();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar si hay campos vacíos
    if (
      !objetive.goal_amount ||
      !objetive.limit_date ||
      !objetive.goal_name ||
      !selectedIcon
    ) {
      setErrMsg("Todos los campos son obligatorios.");
      return;
    }
    axios
      .post(`http://localhost:3000/objetives/create/${user.user_id}`, objetive)
      .then((res) => {
        setGoals((prevGoals) => [...prevGoals, res.data]);
        navigate(`/objetives/allObjetives/${id}`);
      })
      .catch();
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <main>
        <div className="container-fluid container-global">
          <div className="row container-title">
            <div className="col-xl-12 text-center">
              <h2 className="section-title">Formulario de Objetivo</h2>
            </div>
          </div>
          <div className="row container-content">
            <div className="col-xl-2 space-column"></div>
            <div className="col-xl-8 content-column text-center p-4">
              <Form className="form-reg" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicAmount">
                  <LabelKakeibo>Cantidad</LabelKakeibo>
                  <InputKakeibo
                    type="text"
                    placeholder="Inserte la cantidad a ahorrar"
                    value={objetive.goal_amount}
                    onChange={handleChange}
                    name="goal_amount"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLimitDate">
                  <LabelKakeibo>Fecha del objetivo</LabelKakeibo>
                  <InputKakeibo
                    type="date"
                    placeholder="Induzca una fecha"
                    value={objetive.limit_date}
                    onChange={handleChange}
                    name="limit_date"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicGoalName">
                  <LabelKakeibo>Objetivo</LabelKakeibo>
                  <InputKakeibo
                    type="text"
                    placeholder="Introduzca el nombre del objetivo"
                    value={objetive.goal_name}
                    onChange={handleChange}
                    name="goal_name"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 d-flex p-2 justify-content-center"
                  controlId="formBasicObjetiveIcon"
                >
                  <LabelKakeibo>Icono del objetivo</LabelKakeibo>
                  {selectedIcon.component && (
                    <span style={{ marginLeft: "10px", fontSize: "24px" }}>
                      {selectedIcon.component({ className: "icon" })}
                    </span>
                  )}
                  <ButtonsApp
                    className="my-auto ml-3"
                    type="button"
                    clickar={handleOpenModalIcons}
                    textButton={"Seleccionar icono"}
                    color={"base"}
                  ></ButtonsApp>
                </Form.Group>
                <ButtonsApp
                  variant="primary"
                  type="submit"
                  textButton={"Guardar"}
                  color={"gold-kakeibo"}
                  clickar={handleSubmit}
                ></ButtonsApp>
                <ButtonsApp
                  className={"mx-5"}
                  textButton={"Cancelar"}
                  color={"green-kakeibo"}
                  clickar={handleBack}
                ></ButtonsApp>
                <p className="error-message pt-4">{errMsg}</p>
              </Form>

              <KakeiboModal
                show={showModalIcons}
                handleShow={handleCloseModalIcons}
                title="Selecciona un Icono"
              >
                <div className="icon-container">
                  {icons.map((icon) => (
                    <div
                      key={icon.id}
                      onClick={() => handleChangeIcon(icon)}
                      title={icon.name}
                      className='d-flex icons-CML align-items-center flex-column gap-1'
                    >
                      <ButtonsApp
                      color='btn-icons-obj'
                      textButton={icon.component()}
                      >
                      </ButtonsApp>
                    </div>
                  ))}
                </div>
                <div className="col-xl-2 space-column"></div>
              </KakeiboModal>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
