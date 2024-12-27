import { AppContext } from "../../../context/AppContextProvider";
import { useState, useEffect, useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HiMiniMagnifyingGlass, HiUsers } from "react-icons/hi2";
import { LuLayers } from "react-icons/lu";
import { FaRegFlag} from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { TbLogout, TbArrowsExchange } from "react-icons/tb";
import "./KakeiboNavbarMovil.scss";

export const KakeiboNavbarMovil = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();
  const { user, logout } = useContext(AppContext);

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
    return location.pathname.startsWith(path) ? "active-link-movil" : "";
  };

  return (
    <>
      {!isMobile && (
        <Navbar className="nav-movil">
          <Nav className="d-flex justify-content-evenly w-100 ml-3">
            {user?.rol === 1 && (
              <>
                <Nav.Link
                  className={`name-logos ${getNavLinkClass("/admin/allUsers")}`}
                  as={Link}
                  to="/admin/allUsers"
                >
                  <div className="nav-logo">
                    <HiUsers className="logos-movil" />
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
                    <LuLayers className="logos-movil" />
                  </div>
                </Nav.Link>
                <Nav.Link
                  className={`name-logos ${getNavLinkClass(
                    "/admin/questions"
                  )}`}
                  as={Link}
                  to="/admin/questions"
                >
                  <div className="nav-logo">
                    <MdOutlineQuestionAnswer className="logos-movil" />
                  </div>
                </Nav.Link>
                <Nav.Link
                  className={`name-logos ${getNavLinkClass("/admin/home")}`}
                  as={Link}
                  to="/admin/home"
                >
                  <div className="nav-logo">
                    <RiAdminLine className="logos-movil" />
                  </div>
                </Nav.Link>
              </>
            )}
            {user?.rol === 2 && (
              <>
                <Nav.Link
                  className={`name-logos ${getNavLinkClass("/analisis")}`}
                  as={Link}
                  to="/analisis"
                >
                  <div className="nav-logo">
                    <HiMiniMagnifyingGlass className="logos-movil" />
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
                    <TbArrowsExchange className="logos-movil" />
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
                    <LuLayers className="logos-movil" />
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
                    <FaRegFlag className="logos-movil" />
                  </div>
                </Nav.Link>
                <Nav.Link 
                  className={`name-logos ${getNavLinkClass(
                    "/users"
                  )}`}
                  as={Link}
                  to={`/users`}
                >
                  <div className="nav-logo">
                    <RiUser3Line className="logos-movil" />
                  </div>
                </Nav.Link>
              </>
            )}

            <Nav.Link
              className={`name-logos`}
              onClick={() => {
                logout();
                navigate(`/home`);
              }}
            >
              <div className="nav-logo">
                <TbLogout className="logos-movil" />
              </div>
            </Nav.Link>
          </Nav>
        </Navbar>
      )}
    </>
  );
};
