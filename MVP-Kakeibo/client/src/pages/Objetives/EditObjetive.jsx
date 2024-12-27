import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContextProvider";
import { Form } from "react-bootstrap";
import { ButtonsApp } from "../../components/Buttons/ButtonsApp";
import { useNavigate, useParams } from "react-router-dom";
import { KakeiboModal } from "../../components/Modal/KakeiboModal";
import { InputKakeibo } from "../../components/FormComponents/InputKakeibo/InputKakeibo";
import { LabelKakeibo } from "../../components/FormComponents/LabelKakeibo/LabelKakeibo";

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



export const EditObjetive = () => {
  const { icons, user } = useContext(AppContext);
  const [objetive, setObjetive] = useState(initialValue);
  const [showModalIcons, setShowModalIcons] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
      .get(
          `http://localhost:3000/objetives/oneObjetive/${user.user_id}/${id}`
        )
        .then((res) => {
          setObjetive(res.data.goal);

          //Traer el icono elegido
          const icon = icons.find((icon) => icon.id === res.data.goal_icon);
          setSelectedIcon(icon);
          })
          .catch();
    }
    }, [id, icons, user]);
    
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
      axios
      .put(`http://localhost:3000/objetives/editObjetive/${id}`, objetive)
      .then(() => {
        navigate(`/objetives/oneObjetive/${id}`);
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
            <div className="col-xl-8 content-column text-center">
              <Form className="form-reg" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <LabelKakeibo>Cantidad</LabelKakeibo>
                  <InputKakeibo
                    type="text"
                    placeholder="Inserte una cantidad"
                    value={objetive?.goal_amount ? objetive.goal_amount : ""}
                    onChange={handleChange}
                    name="goal_amount"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLimitDate">
                  <LabelKakeibo>Fecha del objetivo</LabelKakeibo>
                  <InputKakeibo
                    type="date"
                    placeholder="Inserte la fecha límite"
                    value={objetive?.limit_date ? objetive.limit_date : ""}
                    onChange={handleChange}
                    name="limit_date"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicGoalName">
                  <LabelKakeibo htmlFor={"goal_name"}>Objetivo</LabelKakeibo>
                  <InputKakeibo
                    type="text"
                    placeholder="Inserte el nombre del objetivo"
                    value={objetive?.goal_name ? objetive.goal_name : ""}
                    id="goal_name"
                    onChange={handleChange}
                    name="goal_name"
                  />
                </Form.Group>
                {
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicObjetiveIcon"
                  >
                    <LabelKakeibo>Icono del objetivo</LabelKakeibo>
                    <ButtonsApp
                      type={"button"}
                      clickar={handleOpenModalIcons}
                      textButton={"Seleccionar icono"}
                      color={"base"}
                    ></ButtonsApp>
                  </Form.Group>
                }
                <ButtonsApp
                  variant="primary"
                  type={"submit"}
                  textButton={"Guardar"}
                  color={"gold-kakeibo"}
                  clickar={handleSubmit}
                ></ButtonsApp>
                <ButtonsApp
                  className={'mx-5'}
                  color="gold-kakeibo"
                  textButton="Volver"
                  clickar={handleBack}
                />

                {selectedIcon?.component && (
                  <span style={{ marginLeft: "10px", fontSize: "24px" }}>
                    {selectedIcon.component({ className: "icon" })}
                  </span>
                )}
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
                    >
                      {icon.component({ className: "icon" })}
                    </div>
                  ))}
                </div>
              </KakeiboModal>
            </div>
            <div className="col-xl-2 space-column"></div>
          </div>
        </div>
      </main>
    </>
  );
};
