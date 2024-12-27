import { useState, useEffect } from "react";
import { Nav, Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./KakeiboNavbarMovil.scss";
import { IoHomeOutline } from "react-icons/io5";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TbArrowsExchange } from "react-icons/tb";
import { LuLayers } from "react-icons/lu";
import { FaRegFlag } from "react-icons/fa";

export const KakeiboNavbarMovil = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <>
      {!isMobile && (
        <Navbar className="nav-movil">
          <Nav>
            <Nav.Link
              className={`name-logos ${getNavLinkClass("/")}`}
              as={Link}
              to="/"
            >
              <div className="nav-logo">
              <IoHomeOutline className="logos-movil"/>
              </div>
            </Nav.Link>
            <Nav.Link
              className={`name-logos ${getNavLinkClass("")}`}
              as={Link}
              to="/"
            >
              <div className="nav-logo">
              <HiMiniMagnifyingGlass className="logos-movil" />
              </div>
            </Nav.Link>
            <Nav.Link
              className={`name-logos ${getNavLinkClass("")}`}
              as={Link}
              to="/"
            >
              <div className="nav-logo">
              <TbArrowsExchange className="logos-movil" />
              </div>
            </Nav.Link>
            <Nav.Link
              className={`name-logos ${getNavLinkClass("")}`}
              as={Link}
              to="/"
            >
              <div className="nav-logo">
              <LuLayers className="logos-movil"/>
              </div>
            </Nav.Link>
            <Nav.Link
              className={`name-logos ${getNavLinkClass("")}`}
              as={Link}
              to="/"
            >
              <div className="nav-logo">
              <FaRegFlag className="logos-movil"/>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar>
      )}
    </>
  );
};
