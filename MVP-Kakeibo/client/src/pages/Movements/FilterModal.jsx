import { Modal, Form } from "react-bootstrap";
import { ButtonsApp } from "../../components/Buttons/ButtonsApp";

export const FilterModal = ({
  showFilterModal,
  closeFilterModal,
  filterCriteria,
  setFilterCriteria,
  applyFilter,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  return (
    <Modal show={showFilterModal} onHide={closeFilterModal}>
      <Modal.Header closeButton>
        <Modal.Title>Filtrar Movimientos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="filterName">
            <Form.Label>Buscar por nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre"
              name="name"
              value={filterCriteria.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="filterFrom">
            <Form.Label>Desde</Form.Label>
            <Form.Control
              type="date"
              name="from"
              value={filterCriteria.from}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="filterTo">
            <Form.Label>Hasta</Form.Label>
            <Form.Control
              type="date"
              name="to"
              value={filterCriteria.to}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <ButtonsApp
          clickar={closeFilterModal}
          color={"green-kakeibo"}
          textButton={"Cancelar"}
        ></ButtonsApp>
        <ButtonsApp
          clickar={applyFilter}
          color={"gold-kakeibo"}
          textButton={"Aplicar filtro"}
        ></ButtonsApp>
      </Modal.Footer>
    </Modal>
  );
};
