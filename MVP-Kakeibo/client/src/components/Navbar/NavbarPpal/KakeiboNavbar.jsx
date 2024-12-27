import { AppContext } from "../../../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TbArrowsExchange } from "react-icons/tb";
import { LuLayers } from "react-icons/lu";
import { FaRegFlag } from "react-icons/fa6";
import { RiUser3Line } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { TbLogout, TbBell } from "react-icons/tb";

import "../stylenavbar.scss";

export const KakeiboNavbar = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const [notMobile, setNotMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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
        <Navbar className="nav-ppal px-5" expand="lg">
          <Navbar.Brand>
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
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggle}
          >
            <IoMenu className="iconos" />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={menuOpen ? "show menu-open" : ""}
          >
            <Nav className="d-flex justify-content-evenly w-100 ml-3 position-relative">
              <Nav.Link
                className={`name-logos ${getNavLinkClass("/analisis")}`}
                as={Link}
                to="/analisis"
              >
                <div className="nav-logo">
                  <HiMiniMagnifyingGlass className="iconos" />
                  Análisis
                </div>
              </Nav.Link>
              <Nav.Link
                className={`name-logos ${getNavLinkClass(
                  "/movements/allmovements"
                )}`}
                as={Link}
                to="/movements/allmovements"
              >
                <div className="nav-logo">
                  <TbArrowsExchange className="iconos" />
                  Movimientos
                </div>
              </Nav.Link>
              <Nav.Link
                className={`name-logos ${getNavLinkClass(
                  "/categories/allcategories"
                )}`}
                as={Link}
                to="/categories/allcategories"
              >
                <div className="nav-logo">
                  <LuLayers className="iconos" />
                  Categorías
                </div>
              </Nav.Link>
              <Nav.Link
                className={`name-logos ${getNavLinkClass(
                  "/objetives/allObjetives"
                )}`}
                as={Link}
                to={`/objetives/allObjetives/${user?.user_id}`}
              >
                <div className="nav-logo">
                  <FaRegFlag className="iconos" />
                  Objetivos
                </div>
              </Nav.Link>
              <Nav.Link
                className={`name-logos ${getNavLinkClass("/users")}`}
                as={Link}
                to="/users"
              >
                <div className="nav-logo">
                  <RiUser3Line className="iconos" />
                  Perfil
                </div>
              </Nav.Link>
              <div className="d-flex my-auto gap-2">
                <Nav.Link className={`name-logos`} onClick={() => {}}>
                  <TbBell className="iconos" />
                </Nav.Link>
                <Nav.Link
                  className={`name-logos`}
                  onClick={() => {
                    logout();
                    navigate(`/`);
                  }}
                >
                  <TbLogout className="iconos" />
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
};
