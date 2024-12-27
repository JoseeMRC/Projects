import { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AppContext } from "../../context/AppContextProvider"; // Importar el contexto
import { KakeiboModal } from "../../components/Modal/KakeiboModal"; // Importar el modal reutilizable
import { ButtonsApp } from "../../components/Buttons/ButtonsApp";
import "./editCategoryForm.scss";

export const EditCategoryModal = ({
  showModal,
  closeModal,
  data,
  editCategoryIconHandleChange,
  editCategoryHandleChange,
  onSubmit,
  deleteCategory,
}) => {
  const { icons } = useContext(AppContext); // Obtener los iconos del contexto
  const [showModalIcons, setShowModalIcons] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleOpenModalIcons = () => {
    setShowModalIcons(true);
  };

  const handleCloseModalIcons = () => {
    setShowModalIcons(false);
  };

  const handleChangeIcon = (icon) => {
    setSelectedIcon(icon);
    editCategoryIconHandleChange(icon);
    console.log("estoy en handle selection");
    handleCloseModalIcons();
  };

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      contentLabel="Seleccionar Icono"
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="form-reg">
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label className="form-title">Titulo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Induzca un titulo"
              value={data?.category_title}
              onChange={editCategoryHandleChange}
              name="category_title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicIcon">
            <Button
              type="button"
              className="gold-kakeibo"
              onClick={handleOpenModalIcons}
            >
              Añadir icono
            </Button>

            {/* Mostrar icono seleccionado */}
            {selectedIcon.component && (
              <span style={{ marginLeft: "10px", fontSize: "24px" }}>
                {selectedIcon.component({ className: "icon" })}
              </span>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <ButtonsApp
          type="button"
          clickar={() => deleteCategory(data?.category_id)}
          textButton={"Eliminar"}
        />

        <ButtonsApp
          color="gold-kakeibo"
          type="button"
          clickar={onSubmit}
          textButton={"Guardar"}
        />

        <ButtonsApp
          color="gold-kakeibo"
          type="button"
          clickar={() => {
            closeModal;
          }}
          textButton={"Cancelar"}
        />
      </Modal.Footer>

      {/* Mostramos el modal de lista de iconos */}
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
    </Modal>
  );
};
