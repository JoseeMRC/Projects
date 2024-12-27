import { useEffect, useState, useContext } from "react";
import "./styleFooter.scss";
import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaLinkedin,
  FaSquareXTwitter,
  FaSquareFacebook,
} from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";
import { AppContext } from "../../context/AppContextProvider";

export const FooterKakeibo = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const MenuUser = () => (
    <div className="links-section">
      <Link className="custom-link" to="/analisis">
        Análisis
      </Link>
      <Link className="custom-link" to="/movements/allmovements">
        Movimientos
      </Link>
      <Link className="custom-link" to="/categories/allcategories">
        Categorías
      </Link>
      <Link
        className="custom-link"
        to={`/objetives/allObjetives/${user?.user_id}`}
      >
        Objetivos
      </Link>
      <Link className="custom-link" to="/users">
        Perfil
      </Link>
    </div>
  );

  const MenuAdmin = () => (
    <div className="links-section">
      <Link className="custom-link" to="/admin/allusers">
        Usuarios
      </Link>
      <Link className="custom-link" to="/admin/allcategories">
        Categorías
      </Link>
      <Link className="custom-link" to="/admin/questions">
        Preguntas
      </Link>
      <Link className="custom-link" to="/admin/home">
        Admin
      </Link>
    </div>
  );

  return (
    <>
      {!isMobile && (
        <footer>
          <div className="footer-content">
            <div className="logo-section">
              <img
                src="/assets/logo.png"
                alt="Kakeido logo"
                className="logoFooter"
              />
            </div>

            {user?.rol === 1 && <MenuAdmin />}

            {user?.rol === 2 && <MenuUser />}
          </div>
          <div className="footer-bottom">
            <Link className="custom-link" to="/">
              Condiciones de uso
            </Link>
            <Link className="custom-link" to="/">
              Política de privacidad
            </Link>
            <Link className="custom-link" to="/">
              Acerca de nosotros
            </Link>
            <Link className="custom-link" to="/">
              Información de contacto
            </Link>
            <div className="social-icons">
              <PiInstagramLogoFill size="2.2em" />
              <FaSquareFacebook size="2em" />
              <FaSquareXTwitter size="2em" />
              <FaLinkedin size="2em" />
              <FaYoutube size="2.2em" />
            </div>
          </div>
        </footer>
      )}
    </>
  );
};
