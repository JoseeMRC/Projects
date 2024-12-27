import { AppContext } from "../../context/AppContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./galleryCategories.scss";
import { Card } from "react-bootstrap";
import { ButtonsApp } from "../../components/Buttons/ButtonsApp";

export const GalleryCategories = () => {
  const { icons, categories } = useContext(AppContext);
  const navigate = useNavigate();

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
          <div className="col-xl-8 content-column">
            <div className="d-flex justify-content-center mb-3 mt-3 gap-5 flex-wrap">
              {categories?.map((category) => {
                const currentIcon = icons.find(
                  (icon) => icon.id === category.category_icon
                );
                return (
                  <div
                    className="card-container contentCard"
                    key={category.category_id}
                  >
                    <Card className="card d-flex align-items-center flex-column contentCard gap-3 p-4">
                      <ButtonsApp
                        color="btn-icons-obj"
                        variant="primary"
                        clickar={() => {
                          navigate(`/movements/${category.category_id}`);
                        }}
                        textButton={<currentIcon.component />}
                      >
                        <currentIcon.component />
                      </ButtonsApp>
                      <Card.Title className="card-title text-center">
                        {category.category_title}
                      </Card.Title>
                    </Card>
                  </div>
                );
              })}
            </div>
            <div className="col-xl-2 space-column"></div>
          </div>
        </div>
      </div>
    </main>
  );
};
