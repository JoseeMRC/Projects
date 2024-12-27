import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AppContext } from "../../../context/AppContextProvider";
import { LabelKakeibo } from "../../../components/FormComponents/LabelKakeibo/LabelKakeibo";
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";
import { InputKakeibo } from "../../../components/FormComponents/InputKakeibo/InputKakeibo";
import { KakeiboModal } from "../../../components/Modal/KakeiboModal";
import "./Login.scss";

const initialValue = { email: "", password: "" };

export const Login = () => {
  const { setUser, setIsLogged, setTokenApp } = useContext(AppContext);
  const [msgError, setMsgError] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showVerifyMsg, setShowVerifytMsg] = useState(false);
  const [login, setLogin] = useState(initialValue);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!login.email || !login.password) {
      setMsgError("Los campos son obligatorios");
    } else {
      axios
        .post("http://localhost:3000/users/login", login)
        .then((res) => {
          const { token } = res.data;
          const id = jwtDecode(token).id;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          axios
            .get(`http://localhost:3000/users/oneUser/${id}`)
            .then((result) => {
              localStorage.setItem("token", token);
              setTokenApp(token);
              setUser(result.data.user);
              setIsLogged(true);

              if (result.data.user.rol === 1) {
                navigate("/admin/home");
              } else {
                navigate("/users");
              }
            })
            .catch(() => setMsgError("Credenciales incorrectas"));
        })

        .catch((err) => {
          if (err.response.status === 401) {
            setMsgError("Credenciales incorrectas");
          } else if (err.response.status === 403) {
            setShowVerifyModal(!showVerifyModal);
            setMsgError("Cuenta no verificada");
          } else {
            setMsgError("Ups, algo malo ha ocurrido!!");
          }
        });
    }
  };

  const handleShowVerifyModal = () => {
    setShowVerifyModal(!showVerifyModal);
  };

  const handleShowVerifysMsg = () => {
    setShowVerifytMsg(!showVerifyMsg);
    if (login != initialValue) {
      setLogin(initialValue);
      setMsgError("");
    }
  };

  const resendVerification = () => {
    axios
      .get(`http://localhost:3000/users/resendVerification`, { params: login })
      .then(() => {
        setShowVerifytMsg(!showVerifyMsg);
      })
      .catch();
    setShowVerifyModal(false);
  };

  return (
    <main>
      <section className="main-section">
        <div className="main-title-ppal">
          <h2 className="m-0 text-center">Iniciar Sesión</h2>
        </div>
        <div className="main-login pb-5">
          <div className="main-box-login">
            <form className="form-reg">
              <LabelKakeibo htmlFor="email">Correo electrónico*</LabelKakeibo>
              <InputKakeibo
                type="email"
                placeholder="ejemplo@ejemplo.com"
                value={login.email}
                name="email"
                id="email"
                onChange={handleChange}
              />
              <LabelKakeibo htmlFor="password">Contraseña*</LabelKakeibo>
              <InputKakeibo
                type="password"
                placeholder="Contraseña"
                value={login.password}
                name="password"
                id="password"
                onChange={handleChange}
              />
              <div className="d-flex flex-column align-items-center my-3 gap-3">
                <ButtonsApp
                  color={"gold-kakeibo"}
                  textButton={"Iniciar Sesión"}
                  clickar={handleSubmit}
                />
                <ButtonsApp
                  color={"green-kakeibo"}
                  textButton={"Cancelar"}
                  clickar={() => navigate("/")}
                />
              </div>
              {msgError}
            </form>

            <div className="d-flex flex-column text-center">
              <p>
                ¿Aún no tienes una cuenta?{" "}
                <Link to="/register" style={{ color: "black" }}>
                  {" "}
                  Regístrate aquí
                </Link>
              </p>
              <Link to="/users/passResetLink" style={{ color: "black" }}>
                ¿Haz olvidado tu contraseña?{" "}
              </Link>
            </div>

            <KakeiboModal
              show={showVerifyModal}
              handleShow={handleShowVerifyModal}
              title={`Cuenta no Verificada`}
            >
              <div className="d-flex flex-column mt-3 gap-3">
                <p>
                  ¿Desea volver a recibir el email de verificación al correo
                  electrónico {login.email}?
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <ButtonsApp
                    color="gold-kakeibo"
                    clickar={handleShowVerifyModal}
                    textButton={"Cancelar"}
                  />
                  <ButtonsApp
                    color="green-kakeibo"
                    textButton={"Volver a Enviar"}
                    clickar={resendVerification}
                  />
                </div>
              </div>
            </KakeiboModal>
            <KakeiboModal
              show={showVerifyMsg}
              handleShow={handleShowVerifysMsg}
              title={`Email Enviado Correctamente`}
            >
              <div className="d-flex flex-column align-items-center gap-3 mt-3">
                <p>
                  Haz click en el enlace de tu email, para verificar tu cuenta.
                </p>
                <ButtonsApp
                  color="gold-kakeibo"
                  clickar={handleShowVerifysMsg}
                  textButton={"Aceptar"}
                />
              </div>
            </KakeiboModal>
          </div>
        </div>
      </section>
    </main>
  );
};
