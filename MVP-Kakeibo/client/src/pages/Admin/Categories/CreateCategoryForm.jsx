import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { KakeiboModal } from "../../../components/Modal/KakeiboModal";
import "./createCategoryForm.scss";
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContextProvider";
import "./createCategoryForm.scss";

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
      .post("http://localhost:3000/admin/createcategory", category)
      .then(() => {
        setError(""); // Limpiar el error si la solicitud es exitosa
        navigate("/admin/allcategories");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data.error); // Mostrar el mensaje de error del servidor
        } else {
          setError("Ocurrió un error al crear la categoría.");
        }
      });
  };

  return (
    <main>
      <div className="container-fluid container-global">
        <div className="row container-title">
          <div className="col-xl-12 text-center">
            <h2 className="section-title">Añadir categorías</h2>
          </div>
        </div>
        <div className="row container-content">
          <div className="col-xl-2 space-column"></div>
          <div className="col-xl-8 content-column">
            <Form
              className="d-flex flex-column justify-content-center align-items-center py-4 gap-2"
              onSubmit={handleSubmit}
            >
              <Form.Group controlId="formBasicTitle">
                <Form.Control
                  type="text"
                  placeholder="Título de la categoría"
                  value={category.category_title}
                  onChange={handleChange}
                  name="category_title"
                />
              </Form.Group>
              <Form.Group
                className="d-flex justify-content-center"
                controlId="formBasicIcon"
              >
                {selectedIcon.component && (
                  <span style={{ margin: "10px", fontSize: "24px" }}>
                    {selectedIcon.component({
                      className: "icon",
                      size: "3rem",
                    })}
                  </span>
                )}
              </Form.Group>
              {/* Mostrar mensaje de error */}
              <ButtonsApp
                className="border-none"
                color="gold-kakeibo"
                type="button"
                clickar={handleOpenModalIcons}
                textButton={"Añadir Icono"}
              />
              <div className="d-flex gap-4">
                <ButtonsApp
                  type="submit"
                  textButton={"Guardar"}
                  color={"green-kakeibo"}
                >
                </ButtonsApp>
                <ButtonsApp
                  className="styleBordButton my-auto"
                  type="submit"
                  textButton={"Cancelar"}
                  color={"green-kakeibo"}
                  clickar={() => navigate("/admin/allcategories")}
                >
              </ButtonsApp>
              </div>
              {error && <div className="error-message">{error}</div>}{" "}
            </Form>
          </div>
          <div className="col-xl-3 col-lg-2"></div>
        </div>
        <KakeiboModal
          show={showModalIcons}
          handleShow={handleCloseModalIcons}
          title="Selecciona un Icono"
        >
          <div className="icon-container d-flex justify-content-between">
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
    </main>
  );
};
