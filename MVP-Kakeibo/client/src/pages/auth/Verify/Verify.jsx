import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";

export const Verify = () => {
  const [msg, setMsg] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/verify/${token}`)
      .then((res) => {
        setMsg(res.msg);
      })
      .catch(() => {
        setMsg("Ha ocurrido un error, pruebe de nuevo");
      });
  }, [token]);

  return (
    <>
      <main className="d-flex flex-column justify-content-center align-items-center ">
        <div className="text-center">
          <h2>La verificación de tu cuenta se ha realizado correctamente</h2>
        </div>
        <p>{msg}</p>
        <ButtonsApp
          color={"gold-kakeibo"}
          textButton={"Iniciar sesión"}
          clickar={() => navigate("/login")}
        />
      </main>
    </>
  );
};
