import { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import axios from "axios";
import "./createMovementForm.scss";
import { ButtonsApp } from "../../components/Buttons/ButtonsApp";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { KakeiboModal } from "../../components/Modal/KakeiboModal";
import { InputKakeibo } from "../../components/FormComponents/InputKakeibo/InputKakeibo";
import { LabelKakeibo } from "../../components/FormComponents/LabelKakeibo/LabelKakeibo";
import { SelectKakeibo } from "../../components/FormComponents/SelectKakeibo/SelectKakeibo";

const getCurrentDateFormatted = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const initialValue = {
  title: "",
  date: getCurrentDateFormatted(),
  movement_import: "",
  movement_type: 1,
  user_id: "",
  category_id: "",
  goal_id: "",
};

export const CreateMovementForm = () => {
  const { user, goals, icons, reset, setReset } = useContext(AppContext);
  const navigate = useNavigate();
  const [movement, setMovement] = useState(initialValue);
  const [showModalCategories, setShowModalCategories] = useState(false);
  const [showModalGoals, setShowModalGoals] = useState(false);
  const [selectedIconCategory, setSelectedIconCategory] = useState(null);
  const [selectedIconGoal, setSelectedIconGoal] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(""); // Estado para manejar errores

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovement({ ...movement, [name]: value });
  };

  useEffect(() => {
    if (user && user.user_id) {
      setMovement((prevMovement) => ({
        ...prevMovement,
        user_id: user.user_id,
      }));
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/categories/allcategories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => {
        setError("Ocurrió un error al mostrar las categorias.");
      });
  }, []);

  const handleOpenModalCategories = () => {
    setShowModalCategories(true);
  };

  const handleCloseModalCategories = () => {
    setShowModalCategories(false);
  };

  const handleOpenModalGoals = () => {
    setShowModalGoals(true);
  };

  const handleCloseModalGoals = () => {
    setShowModalGoals(false);
  };

  const handChangeGoal = (goal_id) => {
    setMovement((prevMovement) => ({
      ...prevMovement,
      goal_id,
    }));
    handleCloseModalGoals();
  };

  const handChangeCategory = (category) => {
    setMovement((prevMovement) => ({
      ...prevMovement,
      category_id: category.category_id,
    }));
    handleCloseModalGoals();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Comprueba si goal esta seleccionado y el importe es valido
    if (movement.goal_id) {
      const selectGoal = goals.find(
        (goal) => goal.goal_id === movement.goal_id
      );
      const totalAmount = selectGoal.totalSaved - selectGoal.totalSpent;

      if (
        movement.movement_type === "2" &&
        movement.movement_import > totalAmount
      ) {
        setError(
          "El gasto no puede ser superior al total ahorrado en el objetivo seleccionado"
        );
        return; // Para el proceso
      }
    }

    axios
      .post("http://localhost:3000/movements/create", movement)
      .then(() => {
        setReset(!reset);
        navigate("/movements/allmovements");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data.error); // Muestra el mensaje de error
        } else {
          setError("Ocurrió un error al crear el movimiento.");
        }
      });
  };

  const handleBack = () => {
    navigate('/movements/allmovements');
  };

  return (
    <>
      <main>
        <div className="container-fluid container-global">
          <div className="row container-title">
            <div className="col-xl-12 text-center">
              <h2 className="section-title">Añadir movimiento</h2>
            </div>
          </div>
          <div className="row container-content">
            <div className="col-xl-2 space-column"></div>
            <div className="col-xl-8 content-column text-center p-4">
              <div>
                <Form className="form-reg" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <LabelKakeibo className="fw-2">Título(*)</LabelKakeibo>
                    <InputKakeibo
                      type="text"
                      placeholder="Induzca un titulo"
                      value={movement.title}
                      onChange={handleChange}
                      name="title"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <LabelKakeibo className="fw-2">Fecha(*)</LabelKakeibo>
                    <InputKakeibo
                      type="date"
                      value={movement.date}
                      onChange={handleChange}
                      name="date"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicImport">
                    <LabelKakeibo className="fw-2">Importe(*)</LabelKakeibo>
                    <InputKakeibo
                      type="number"
                      placeholder="Importe"
                      value={movement.movement_import}
                      onChange={handleChange}
                      name="movement_import"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicTitle">
                    <LabelKakeibo className="form-title">
                      Tipo de movimiento(*)
                    </LabelKakeibo>

                    <SelectKakeibo name="movement_type" onChange={handleChange}>
                      <option
                        key="ingreso"
                        value={1}
                        defaultValue={1}
                        name="movement_type"
                      >
                        Ingreso
                      </option>
                      <option key="gasto" value={2} name="movement_type">
                        Gasto
                      </option>
                    </SelectKakeibo>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex p-2 justify-content-center"
                    controlId="formBasicCategory"
                  >
                    <Form.Label className="fw-2">Categoria(*)</Form.Label>
                    {selectedIconCategory?.component && (
                      <span style={{ marginLeft: "10px", fontSize: "24px" }}>
                        {selectedIconCategory?.component({ className: "icon" })}
                      </span>
                    )}
                    <ButtonsApp
                      className="my-auto ml-3"
                      type="button"
                      textButton={"Seleccionar categoria"}
                      color={"gold-kakeibo"}
                      clickar={handleOpenModalCategories}
                    ></ButtonsApp>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex p-2 justify-content-center"
                    controlId="formBasicGoal"
                  >
                    <Form.Label className="fw-2">Asociar objetivo</Form.Label>
                    {selectedIconGoal?.component && (
                      <span style={{ marginLeft: "10px", fontSize: "24px" }}>
                        {selectedIconGoal?.component({ className: "icon" })}
                      </span>
                    )}
                    <ButtonsApp
                      className="my-auto ml-3"
                      type="button"
                      textButton={"Seleccionar objetivo"}
                      color={"gold-kakeibo"}
                      clickar={handleOpenModalGoals}
                    ></ButtonsApp>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicGoal">
                    <Form.Label>(*)Campos requeridos</Form.Label>
                    {error && <div className="error-message">{error}</div>}{" "}
                  </Form.Group>
                  <div className="text-center">
                    <ButtonsApp
                      type="submit"
                      textButton={"Guardar"}
                      color={"gold-kakeibo"}
                    ></ButtonsApp>
                    <ButtonsApp
                      className={'mx-5'}
                      textButton={"cancelar"}
                      color={"green-kakeibo"}
                      clickar={handleBack}
                    ></ButtonsApp>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-xl-3 col-lg-2"></div>
          </div>
          <KakeiboModal
            show={showModalCategories}
            handleShow={handleCloseModalCategories}
            title="Selecciona una categoría"
          >
            <div className="categories-container">
              <div className="categories-container d-flex justify-content-center gap-3 flex-wrap">
                {categories?.map((category) => {
                  const currentIcon = icons.find(
                    (icon) => icon.id === category.category_icon
                  );
                  return (
                    <Card
                      key={category.category_id}
                      className="card-category d-flex flex-column"
                    >
                      <div className="d-flex flex-column align-items-center">
                        <ButtonsApp
                          color="btn-icons-obj"
                          variant="primary"
                          clickar={() => {
                            handChangeCategory(category);
                            setSelectedIconCategory(currentIcon);
                            handleCloseModalCategories();
                          }}
                          textButton={<currentIcon.component />}
                        ></ButtonsApp>
                        <Card.Title className="mx-auto text-center">
                          {category.category_title}
                        </Card.Title>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </KakeiboModal>
          <KakeiboModal
            show={showModalGoals}
            handleShow={handleCloseModalGoals}
            title="Selecciona un objetivo"
          >
            <div className="goals-container d-flex justify-content-center gap-3 flex-wrap">
              {goals?.map((goal) => {
                const currentIcon2 = icons.find(
                  (icon) => icon.id === goal.goal_icon
                );
                return (
                  <Card
                    key={goal.goal_id}
                    className="d-flex flex-column align-content-center align-items-center card-objetive"
                  >
                    <div>
                      <ButtonsApp
                        color="btn-icons-obj"
                        variant="primary"
                        clickar={() => {
                          handChangeGoal(goal.goal_id);
                          setSelectedIconGoal(currentIcon2);
                        }}
                        textButton={<currentIcon2.component />}
                      ></ButtonsApp>
                      <Card.Title className="mx-auto text-center">
                        {goal.goal_name}
                      </Card.Title>
                    </div>
                  </Card>
                );
              })}
            </div>
          </KakeiboModal>
        </div>
      </main>
    </>
  );
};
