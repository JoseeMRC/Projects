import { Modal, Form } from "react-bootstrap";
import { ButtonsApp } from "../../components/Buttons/ButtonsApp";
import "./editMovementModal.scss";


export const EditMovementModal = ({
  showModal,
  closeModal,
  data,
  editMovementHandleChange,
  onSubmit,
  deleteMovement,
  allCategories,
  editMovementCategory,
}) => {


  return (
    <Modal
      show={showModal}
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar movimiento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="form-reg">
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label className="form-title">Titulo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Induzca un titulo"
              value={data?.title}
              onChange={editMovementHandleChange}
              name="title"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label className="form-title">Fecha</Form.Label>
            <Form.Control
              type="date"
              placeholder="Induzca una fecha"
              value={data?.date}
              onChange={editMovementHandleChange}
              name="date"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label className="form-title">Importe</Form.Label>
            <Form.Control
              type="number"
              placeholder="Induzca un importe"
              value={data?.movement_import}
              onChange={editMovementHandleChange}
              name="movement_import"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label className="form-title">Categoria</Form.Label>
            {/* <Form.Control
              type="text"
              placeholder="Induzca la categoría"
              value={data?.category}
              onChange={editMovementHandleChange}
              name="category_id"
            /> */}
            {<select name="category_id" id=""
                      onChange={editMovementCategory}>
                        <option>Elige una categoría</option>
              {allCategories?.map((category)=>{
              
                return(
              <option key={category.category_id}
              
                      value={category.category_id}
                      name="category_id">
                {category.category_title}
                </option>
                );
              })}
            </select>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column text-center align-items-center">
        <div>
          <ButtonsApp
            color="green-kakeibo"
            type="button"
            clickar={() => deleteMovement(data?.movement_id)}
            textButton={"Eliminar"}
          />
        </div>

        <div>
          <ButtonsApp
            color="gold-kakeibo"
            type="button"
            clickar={onSubmit}
            textButton={"Guardar"}
          />
          <ButtonsApp
            color="gold-kakeibo"
            type="button"
            clickar={closeModal}
            textButton={"Cancelar"}

          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};
