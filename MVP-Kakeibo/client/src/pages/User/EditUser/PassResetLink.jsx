import axios from "axios";
import { useContext, useState } from "react";
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";
import { InputKakeibo } from "../../../components/FormComponents/InputKakeibo/InputKakeibo";
import { LabelKakeibo } from "../../../components/FormComponents/LabelKakeibo/LabelKakeibo";
import { KakeiboModal } from "../../../components/Modal/KakeiboModal";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContextProvider";

export const PassResetLink = () => {
  const { user, tokenApp } = useContext(AppContext)
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [infoMail, setInfoMail] = useState({ email: "" });
  const [msg, setMsg] = useState({});
  const navigate = useNavigate();

  const handleShowMsgModal = () => {
    setShowMsgModal(!showMsgModal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoMail({ [name]: value });
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    if (!infoMail.email) {
      setMsg({
        title: "No has introducido ninguna dirección de correo",
        msg: "Es necesario que introduzcas tu dirección de correo electrónico para poder cambiar la contraseña de tu cuenta de Kakeibo.",
      });
      setShowMsgModal(!showMsgModal);
    } else {
      axios
        .get(`http://localhost:3000/users/passResetLink`, { params: infoMail })
        .then((result) => {
          setMsg(result.data);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setMsg(err.response.data);
          } else {
            setMsg(err.response.data);
          }
        })
        .finally(() => {
          setShowMsgModal(!showMsgModal);
        });
    }
  };

  return (
    <main>
      <section className="text-center">
        <div className="main-title-ppal">
          <h2 className="m-0">Restablecer contraseña</h2>
        </div>
        <div className="main-login p-0">
          <div className="main-box-login">
            <p>
              Para restablecer tu contraseña, introduce tu email para que te
              enviemos un correo
            </p>
            <form className="form-reg">
              <LabelKakeibo htmlFor="email">Correo electrónico</LabelKakeibo>
              <InputKakeibo
                type="email"
                placeholder="ejemplo@ejemplo.com"
                value={infoMail.email}
                name="email"
                id="email"
                onChange={handleChange}
              />
              <div className="d-flex gap-3 mt-3 justify-content-center">
                <ButtonsApp
                  color={"gold-kakeibo"}
                  textButton={"Enviar email"}
                  clickar={(e) => handleSendMail(e)}
                />
                <ButtonsApp
                    color={"green-kakeibo"}
                    textButton={"Cancelar"}
                    clickar={() => tokenApp ? navigate(`/users/editUser/${user.user_id}`) : navigate('/login')}
                  />
              </div>
            </form>
          </div>
        </div>
      </section>
      <KakeiboModal
        show={showMsgModal}
        handleShow={handleShowMsgModal}
        title={msg.title}
      >
					<p>{msg.msg}</p>
					<div className="d-flex justify-content-center gap-3">
						<ButtonsApp
							color="gold-kakeibo"
							clickar={handleShowMsgModal}
							textButton={"Aceptar"}
						/>
					</div>
      </KakeiboModal>
    </main>
  );
};
