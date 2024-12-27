import { AppContext } from "../../../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { LuLayers, LuUsers } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import "../stylenavbar.scss";

export const KakeiboNavbarAdmin = () => {
  const [notMobile, setNotMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setNotMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const getNavLinkClass = (path) => {
    return location.pathname.startsWith(path) ? "active-link" : "";
  };

  return (
    <>
      {!notMobile && (
        <Navbar className="nav-ppal ps-5" expand="lg">
          <Link to="/home">
            <div className="d-flex m-0 p-0">
              <img
                className="m-auto kakeibo-logo"
                alt="logo"
                src="/assets/logo.png"
              />
              <img
                className="m-auto kakeibo-letters"
                src="/assets/name.png"
                alt="name"
              />
            </div>
          </Link>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="menu-ppal"
            onClick={handleToggle}
          >
            <IoMenu className="iconos" />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={menuOpen ? "show menu-open" : ""}
          >
            <Nav className="d-flex justify-content-evenly w-100 ml-3">
              <Nav.Link
                className={`name-logos ${getNavLinkClass("/admin/allusers")}`}
                as={Link}
                to="/admin/allusers"
              >
                <div className="nav-logo">
                  <LuUsers className="iconos" />
                  Usuarios
                </div>
              </Nav.Link>
              <Nav.Link
                className={`name-logos ${getNavLinkClass(
                  "/admin/allcategories"
                )}`}
                as={Link}
                to="/admin/allcategories"
              >
                <div className="nav-logo">
                  <LuLayers className="iconos" />
                  Categorías
                </div>
              </Nav.Link>
              <Nav.Link
                className={`name-logos ${getNavLinkClass("/admin/questions")}`}
                as={Link}
                to="/admin/questions"
              >
                <div className="nav-logo">
                  <MdOutlineQuestionAnswer className="iconos" />
                  Preguntas
                </div>
              </Nav.Link>
              <Nav.Link
                className={`name-logos ${getNavLinkClass("/admin/home")}`}
                as={Link}
                to="/admin/home"
              >
                <div className="nav-logo">
                  <RiAdminLine className="iconos" />
                  Admin
                </div>
              </Nav.Link>
              <Nav.Link
                className={`name-logos`}
                onClick={() => {
                  logout();
                  navigate(`/`);
                }}
              >
                <div className="nav-logo">
                  <TbLogout className="iconos" />
                  Cerrar sesión
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
};
