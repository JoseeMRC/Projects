import { useContext, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { AppContext } from "../../../context/AppContextProvider"; // Importar el contexto
import { KakeiboModal } from "../../../components/Modal/KakeiboModal"; // Importar el modal reutilizable
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";
import { ImFolderUpload } from "react-icons/im";
import "./editCategoryModal.scss";
import { LabelKakeibo } from "../../../components/FormComponents/LabelKakeibo/LabelKakeibo";

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
    handleCloseModalIcons();
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Editar categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="form-reg">
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label className="form-title">Titulo</Form.Label>
            <Form.Control
              type="text"
              value={data?.category_title}
              onChange={editCategoryHandleChange}
              name="category_title"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicIcon"
            type="button"
            onClick={handleOpenModalIcons}
          >
            <LabelKakeibo
              className="d-flex align-items-center gap-2"
              htmlFor="file"
            >
              <ImFolderUpload size="1.5em" />
              Editar icono
            </LabelKakeibo>
            {/* Mostrar icono seleccionado */}
            {selectedIcon && (
              <span
                className="d-flex justify-content-center"
                style={{ fontSize: "16px" }}
              >
                {selectedIcon.component({ className: "icon" })}
              </span>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column text-center align-items-center">
        <ButtonsApp
          className="border-none"
          color="gold-kakeibo"
          type="button"
          clickar={onSubmit}
          textButton={"Guardar"}
        />
        <div className="d-flex gap-3">
          <ButtonsApp
            className="responsiveButtons"
            color="green-kakeibo"
            type="button"
            clickar={() => deleteCategory(data?.category_id)}
            textButton={"Eliminar"}
          />
          <ButtonsApp
            className="responsiveButtons border-none"
            color="green-kakeibo"
            type="button"
            clickar={() => {
              closeModal();
            }}
            textButton={"Cancelar"}
          />
        </div>
      </Modal.Footer>

      {/* Mostramos el modal de lista de iconos */}
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
    </Modal>
  );
};
