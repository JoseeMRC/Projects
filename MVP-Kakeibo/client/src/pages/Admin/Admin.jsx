import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";

export const Admin = () => {
  const navigate = useNavigate();

  return (
    <>
      <main>
        <div className="container-fluid container-global">
          <div className="row container-title">
            <div className="col-xl-12 text-center">
              <p className="section-title">Administración Kakeibo</p>
            </div>
          </div>
          <div className="row container-content">
            <div className="col-xl-2 space-column"></div>
            <div className="col-xl-8 content-column admin-ppal d-flex justify-content-center text-center">
              <Card 
                className="p-3 adminIcons" 
                style={{ width: "15rem", backgroundColor: "#ffffff66", cursor:"pointer" }}
                onClick={() => navigate("/admin/allusers")}
              >
							<span 
								style={{ cursor: "pointer"}}
								className="mx-auto ">&#128100;
							</span>
                <Card.Body>
                  <Card.Title className="fw-bold">Usuarios</Card.Title>
                </Card.Body>
              </Card>
							<Card 
                className="p-3 adminIcons" 
                style={{ width: "15rem", backgroundColor: "#ffffff66", cursor:"pointer" }}
                onClick={() => navigate("/admin/allcategories")}
              >
							<span 
								style={{ cursor: "pointer"}}
                onClick={() => navigate("/admin/allcategories")}
								className="mx-auto">&#9776;
							</span>
                <Card.Body>
                  <Card.Title className="fw-bold">Categorías</Card.Title>
                </Card.Body>
              </Card>
							<Card 
                className="p-3 adminIcons" 
                style={{ width: "15rem", backgroundColor: "#ffffff66", cursor:"pointer" }}
                onClick={() => navigate("/admin/questions")}
              >
							<span 
								style={{ cursor: "pointer"}}
                onClick={() => navigate("/admin/questions")}
								className="mx-auto">&#10067;
							</span>
                <Card.Body>
                  <Card.Title className="fw-bold">Preguntas</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className="col-xl-2 space-column"></div>
          </div>
        </div>
      </main>
    </>
  );
};

