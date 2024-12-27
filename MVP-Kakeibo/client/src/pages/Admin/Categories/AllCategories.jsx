import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../../context/AppContextProvider";
import { EditCategoryModal } from "./EditCategoryModal";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";
import { GiCancel } from "react-icons/gi";

export const AllCategories = () => {
  const navigate = useNavigate();
  const [categoryToEdit, setCategoryToEdit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { icons } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(""); // Estado para manejar errores

  useEffect(() => {
    axios
      .get(`http://localhost:3000/categories/allcategories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch();
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const editCategoryHandleChange = (e) => {
    const { name, value } = e.target;
    setCategoryToEdit({ ...categoryToEdit, [name]: value });
  };

  const editCategoryIconHandleChange = (icon) => {
    setCategoryToEdit({ ...categoryToEdit, category_icon: icon.id });
  };

  const onEditClick = (category) => {
    openModal();
    setCategoryToEdit(category);
  };

  const saveChanges = () => {
    axios
      .put("http://localhost:3000/admin/editCategory", categoryToEdit)
      .then(() => {
        setShowModal(false);
        setCategories(
          categories.map((elem) => {
            let res = elem;
            if (elem.category_id === categoryToEdit.category_id) {
              res = categoryToEdit;
            }
            return res;
          })
        );
      })
      .catch();
  };

  const deleteCategory = (id) => {
    axios
      .delete(`http://localhost:3000/admin/delcategory/${id}`)
      .then(() => {
        setShowModal(false);
        setCategories(categories.filter((e) => e.category_id !== id));
      })
      .catch()
  };

  return (
    <main>
      <div className="container-fluid container-global">
        <div className="row container-title">
          <div className="col-xl-12 text-center">
            <h2 className="section-title">Listado de categorías</h2>
          </div>
        </div>
        <div className="row container-content">
          <div className="col-xl-2 space-column"></div>
          <div className="col-xl-8 content-column relative text-center pt-5">
            <GiCancel
                  className="cancel-icon-admin"
                  onClick={() => navigate("/admin/home")}
                  />
            <ButtonsApp
                  className="border-none"
                  color="gold-kakeibo"
                  type="button"
                  clickar={() => navigate("/admin/createcategory")}
                  textButton={"Añadir categoría"}
                />
            <div className="d-flex justify-content-center mb-3 mt-3 gap-3 flex-wrap">
              {error && <p className="error-message">{error}</p>}
              {categories?.map((category) => {
                const currentIcon = icons.find(
                  (icon) => icon.id === category.category_icon
                );
                return (
                  <div className="card-container contentCard" key={category.category_id}>
                    <Card 
                      className="card-categories d-flex align-items-center flex-column p-4 text-center"
                      style={{ width: "15rem",  height:"100%",backgroundColor: "#ffffff66", cursor:"pointer" }}
                    >
                      <Card.Body
                        className="p-0"
                        onClick={() => onEditClick(category)}
                      >
                        {currentIcon ? (
                          <currentIcon.component className="icon curseIcon" />
                        ) : (
                          "null"
                        )}
                      </Card.Body>
                      <Card.Title>
                        {category.category_title}
                      </Card.Title>
                    </Card>
                  </div>
                );
              })}
              <EditCategoryModal
                showModal={showModal}
                closeModal={closeModal}
                editCategoryHandleChange={editCategoryHandleChange}
                editCategoryIconHandleChange={editCategoryIconHandleChange}
                data={categoryToEdit}
                onSubmit={saveChanges}
                deleteCategory={deleteCategory}
              />
            </div>
          </div>
          <div className="col-xl-3"></div>
        </div>
        <div className="col-xl-2 space-column"></div>
      </div>
    </main>
  );
};
