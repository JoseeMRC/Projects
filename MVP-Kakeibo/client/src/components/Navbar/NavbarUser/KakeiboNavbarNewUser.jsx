import { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import "./KakeiboNavbarNewUser.scss";
import { Link } from "react-router-dom";

export const KakeiboNavbarNewUser = () => {
  const [notMobile, setNotMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setNotMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!notMobile && (
        <Navbar className="nav-ppal ps-5">
          <Navbar.Brand>
            <Link to='/home'>
            <div className="d-flex m-0 p-0">
              <img
                className="m-auto kakeibo-logo"
                alt="logo" src="/assets/logo.png"
              />
              <img
                className="m-auto kakeibo-letters"
                src="/assets/name.png" alt="name" 
              />
            </div>
            </Link>
          </Navbar.Brand>
        </Navbar>
      )}
    </>
  );
};
