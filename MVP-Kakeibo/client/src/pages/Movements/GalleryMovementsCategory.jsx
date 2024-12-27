import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContextProvider";
import { ButtonsApp } from "../../components/Buttons/ButtonsApp";
import { EditMovementModal } from "./EditMovementModal";
import { FilterModal } from "./FilterModal";
import "./galleryMovements.scss";

export const GalleryMovementsCategory = () => {
  const navigate = useNavigate();
  const { icons, categories, movements, setMovements, user } =
    useContext(AppContext);
  const [movementToEdit, setMovementToEdit] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [allCategories, setAllCategories] = useState();
  const [selectedMovements, setSelectedMovements] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    name: "",
    from: "",
    to: "",
    user_id: user?.user_id || "",
  });

  let { selectedCategory_id } = useParams();
  selectedCategory_id = Number(selectedCategory_id);

  useEffect(() => {
    setSelectedMovements(
      movements.filter(
        (movement) => movement.category_id === selectedCategory_id
      )
    );
  }, [movements, selectedCategory_id]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories/allcategories")
      .then((res) => {
        setAllCategories(res.data);
      })
      .catch();
  }, []);

  useEffect(() => {
    if (filterCriteria) {
      axios
        .get("http://localhost:3000/movements/filter", {
          params: filterCriteria,
        })
        .then((res) => {
          setMovements(res.data);
          setSelectedMovements(
            res.data.filter(
              (movement) => movement.category_id === selectedCategory_id
            )
          );
        })
        .catch();
    }
  }, [filterCriteria]);

  const applyFilter = () => {
    axios
      .get("http://localhost:3000/movements/filter", { params: filterCriteria })
      .then((res) => {
        setMovements(res.data);
        setSelectedMovements(
          res.data.filter(
            (movement) => movement.category_id === selectedCategory_id
          )
        );
        closeFilterModal();
      })
      .catch();
  };

  const resetFilter = () => {
    setFilterCriteria({
      name: "",
      from: "",
      to: "",
      user_id: user?.user_id || "",
    });
  };

  const deleteMovement = (id) => {
    axios
      .delete(`http://localhost:3000/movements/delMovement/${id}`)
      .then(() => {
        setShowModal(false);
        setMovements(movements.filter((e) => e.movement_id !== id));
      })
      .catch();
  };

  const saveChanges = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/movements/edit", movementToEdit)
      .then(() => {
        setShowModal(false);
        setMovements(
          movements.map((elem) =>
            elem.movement_id === movementToEdit.movement_id
              ? movementToEdit
              : elem
          )
        );
      })
      .catch();
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openFilterModal = () => setShowFilterModal(true);
  const closeFilterModal = () => setShowFilterModal(false);

  const onEditClick = (movement) => {
    openModal();
    setMovementToEdit(movement);
  };

  const editMovementHandleChange = (e) => {
    const { name, value } = e.target;
    setMovementToEdit({ ...movementToEdit, [name]: value });
  };

  const editMovementCategory = (e) => {
    const { name, value } = e.target;
    setMovementToEdit({ ...movementToEdit, [name]: Number(value) });
  };

  const groupByMonthAndYear = (data) => {
    return data.reduce((acc, movement) => {
      const date = new Date(movement.date);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "short" });
      const key = `${month} ${year % 100}`;

      if (!acc[key]) {
        acc[key] = { date: key, 2023: 0, 2024: 0 };
      }

      acc[key][year] +=
        movement.movement_import * (movement.movement_type === 1 ? 1 : -1);
      return acc;
    }, {});
  };

  const groupedData = groupByMonthAndYear(movements);
  const chartData = Object.values(groupedData);

  return (
    <main>
      <div className="container-fluid container-global">
        <div className="row container-title">
          <div className="col-xl-12 text-center">
            <h2 className="section-title">
              Listado de movimientos de categoria
            </h2>
          </div>
        </div>
        <div className="row container-content">
          <div className="col-xl-2 space-column"></div>
          <div className="col-xl-8 content-column content-column-movements">
            <div className="d-flex buttons-container">
              <ButtonsApp
                className="button-app"
                color="gold-kakeibo"
                type="button"
                clickar={openFilterModal}
                textButton={"Filtrar"}
              />
              <ButtonsApp
                className="button-app"
                color="gold-kakeibo"
                type="button"
                clickar={resetFilter}
                textButton={"Resetear filtro"}
              />
              <ButtonsApp
                className="button-app"
                color="gold-kakeibo"
                type="button"
                clickar={() => navigate("/movements/create")}
                textButton={"Añadir"}
              />
            </div>
            <tbody className="table-movements">
              {selectedMovements?.map((movement) => {
                const currentCategory = categories.find(
                  (category) => category.category_id === movement.category_id
                );
                const currentIcon = icons.find(
                  (icon) => icon.id === currentCategory?.category_icon
                );
                const IconComponent = currentIcon?.component;

                return (
                  <tr
                    className="movement"
                    key={movement.movement_id}
                    onClick={() => onEditClick(movement)}
                  >
                    <td className="td-10">
                      <div className="btn-icons-obj myButton icon-container">
                        {IconComponent ? <IconComponent /> : null}
                      </div>
                    </td>
                    <td className="td-30">
                      <div>{movement.title}</div>
                      <div>{movement.date}</div>
                    </td>
                    <td className="border-left-row full-height-container td-30 mr-0">
                      {currentCategory
                        ? currentCategory.category_title
                        : "Categoría no encontrada"}
                    </td>
                    <td className="border-left-row full-height-container td-30">
                      <p
                        className={
                          movement?.movement_type === 1
                            ? "colorIng"
                            : "colorGast"
                        }
                      >
                        {movement?.movement_type === 2 && <span>-</span>}
                        {movement?.movement_import} €
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </div>
          <div className="col-xl-2 space-column"></div>
        </div>
        <EditMovementModal
          showModal={showModal}
          closeModal={closeModal}
          editMovementHandleChange={editMovementHandleChange}
          data={movementToEdit}
          onSubmit={saveChanges}
          deleteMovement={deleteMovement}
          allCategories={allCategories}
          editMovementCategory={editMovementCategory}
        />
        <FilterModal
          showFilterModal={showFilterModal}
          closeFilterModal={closeFilterModal}
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          applyFilter={applyFilter}
        />
      </div>
    </main>
  );
};
