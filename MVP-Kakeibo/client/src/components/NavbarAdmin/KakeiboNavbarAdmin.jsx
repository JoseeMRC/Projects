import { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { LuLayers } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import "./stylenavbarAdmin.scss";

export const KakeiboNavbarAdmin = () => {
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
                className={`name-logos ${getNavLinkClass("/questions")}`}
                as={Link}
                to="/questions"
              >
                <div className="nav-logo">
                <MdOutlineQuestionAnswer className="iconos"/>
                  Preguntas
                </div>
              </Nav.Link>
              <Nav.Link
                className={`name-logos ${getNavLinkClass("/admin")}`}
                as={Link}
                to="/admin"
              >
                <div className="nav-logo">
                  <RiAdminLine className="iconos" />
                  Admin
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
};
