import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import {KakeiboModal} from "../../components/Modal/KakeiboModal"
import "./createCategoryForm.scss";
import { ButtonsApp } from "../../components/Buttons/ButtonsApp";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";

const initialValue = {
  category_title: "",
  category_icon: {
    id: "",
    name: "",
    component: () => null,
  },
};

export const CreateCategoryForm = () => {
  const navigate = useNavigate();
  const { icons } = useContext(AppContext);
  const [category, setCategory] = useState(initialValue);
  const [showModalIcons, setShowModalIcons] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleOpenModalIcons = () => {
    setShowModalIcons(true);
  };

  const handleCloseModalIcons = () => {
    setShowModalIcons(false);
  };

  const handleChangeIcon = (icon) => {
    setSelectedIcon(icon);
    setCategory({ ...category, category_icon: icon.id });
    handleCloseModalIcons();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/categories/create", category)
      .then((res) => {
        console.log(res.data);
        setError(""); // Limpiar el error si la solicitud es exitosa
        navigate("/categories/allcategories");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data.error); // Mostrar el mensaje de error del servidor
        } else {
          setError("Ocurrió un error al crear la categoría.");
        }
        console.log(err);
      });
  };

  return (
    <div className="general-div container-fluid">
      <div className="row">
        <h1 className="text-center">Añadir categoría</h1>
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-2"></div>
        <div className="col-xl-6 col-lg-8 p-5">
          <div className="formularioCreate">
            <Form className="form-reg" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label className="fw-2">Título</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Induzca un titulo"
                  value={category.category_title}
                  onChange={handleChange}
                  name="category_title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicIcon">
                {selectedIcon.component && (
                  <span style={{ margin: "10px", fontSize: "24px" }}>
                    {selectedIcon.component({ className: "icon", size: "3em" })}
                  </span>
                )}

                <ButtonsApp
                  type="button"
                  clickar={handleOpenModalIcons}
                  textButton={"Añadir Icono"}
                />
              </Form.Group>
              {error && <div className="error-message">{error}</div>}{" "}
              {/* Mostrar mensaje de error */}
              <div className="text-center">
                <ButtonsApp
                  type="submit"
                  textButton={"Guardar"}
                  color={"gold-kakeibo"}
                  clickar={()=>navigate(`/categories/allcategories`)}
                >
                  Guardar
                </ButtonsApp>
              </div>
            </Form>
          </div>
        </div>
        <div className="col-xl-3 col-lg-2"></div>
      </div>

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
  );
};
