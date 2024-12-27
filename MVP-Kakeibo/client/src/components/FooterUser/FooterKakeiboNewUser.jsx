import { useEffect, useState } from "react";
import "./FooterKakeiboNewUser.scss";
import { Link } from "react-router-dom";
import { FaYoutube, FaLinkedin, FaSquareXTwitter, FaSquareFacebook } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";

export const FooterKakeiboNewUser = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!isMobile && (
        <footer>
          <div className="footer-content">
              <img
                src="/assets/logo.png"
                alt="Kakeido logo"
                className="logoFooter"
              />
          </div>
          <div className="footer-bottom">
            <Link className="custom-link" to="">
              Condiciones de uso
            </Link>
            <Link className="custom-link" to="">
              Política de privacidad
            </Link>
            <Link className="custom-link" to="">
              Acerca de nosotros
            </Link>
            <Link className="custom-link" to="">
              Información de contacto
            </Link>
            <div className="social-icons">
                <PiInstagramLogoFill size="2.2em"/>
				<FaSquareFacebook size="2em" />
                <FaSquareXTwitter size="2em" />
                <FaLinkedin size="2em"/>
                <FaYoutube size="2.2em"/>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};
