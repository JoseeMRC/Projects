import { useState, useEffect, useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TbArrowsExchange } from "react-icons/tb";
import { LuLayers } from "react-icons/lu";
import { FaRegFlag } from "react-icons/fa6";
import { RiUser3Line } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import "./stylenavbar.scss";
import { AppContext } from "../../context/AppContextProvider";

export const KakeiboNavbar = () => {
  const { user } = useContext(AppContext)
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
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <>
      {!notMobile && (
        <Navbar className="nav-ppal ps-5" expand="lg">
          <Navbar.Brand>
            <img alt="logo" src="/assets/logo.png" width="55" height="40" />
            <img src="/assets/name.png" alt="name" width="150" />
          </Navbar.Brand>
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
            <Nav className="ms-auto">
              <Nav.Link
                className={`name-logos ${getNavLinkClass("/")}`}
                as={Link}
                to="/"
              >
                <div className="nav-logo">
                  <IoHomeOutline className="iconos" />
                  Home
                </div>
              </Nav.Link>
              <Nav.Link
                className={`name-logos ${getNavLinkClass("")}`}
                as={Link}
                to="/"
              >
                <div className="nav-logo">
                  <HiMiniMagnifyingGlass className="iconos" />
                  Análisis
                </div>
              </Nav.Link>
              <Nav.Link
                className={`name-logos ${getNavLinkClass("")}`}
                as={Link}
                to="/"
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
                className={`name-logos ${getNavLinkClass("/objetives")}`}
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
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
};
