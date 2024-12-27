import axios from "axios";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import countryList from "react-select-country-list";
import { Col, Row } from "react-bootstrap";
import Flag from "react-world-flags";
import { europeanCountries } from "../../../Data/europeanCountries";
import "./register.scss";
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";
import { InputKakeibo } from "../../../components/FormComponents/InputKakeibo/InputKakeibo";
import { SelectCountry } from "../../../components/FormComponents/SelectCountry/SelectCountry";
import { LabelKakeibo } from "../../../components/FormComponents/LabelKakeibo/LabelKakeibo";
import { KakeiboModal } from "../../../components/Modal/KakeiboModal";
import { validator } from "../../../../Utils/validators";

const initialValue = {
  name: "",
  lastname: "",
  email: "",
  pass1: "",
  pass2: "",
  country: "",
  phone_number: "",
};

export const Register = () => {
  const [register, setRegister] = useState(initialValue);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [errors, setErrors] = useState({});
  const [msgError, setMsgError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const allCountries = countryList().getData();
  const navigate = useNavigate();

  const filteredOptions = useMemo(() => {
    return allCountries
      .filter((country) => europeanCountries.includes(country.value))
      .map((country) => ({
        ...country,
        label: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Flag
              code={country.value}
              style={{ marginRight: 10, width: 20, height: 15 }}
            />
            {country.label} ({country.value})
          </div>
        ),
      }));
  }, [allCountries]);

  const handleCountryChange = (selectedOption) => {
    setRegister({ ...register, country: selectedOption.value });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegister({ ...register, [name]: value });

    setErrors({ ...errors, [name]: validator(name, value) }); // Actualiza los errores de las validaciones cada vez que se cambian los valores de los input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonPressed(true);

    // Comprueba si hay errores en los input y los mete en el estado Errors:
    const newErrors = {};
    Object.keys(register).forEach((key) => {
      const err = validator(key, register[key]);
      if (err) {
        newErrors[key] = err;
      }
    });
    setErrors(newErrors);

    // Comprueba que las contraseñas son iguales y si no coinciden abre el modal: del error
    if (register.pass1 !== register.pass2) {
      setMsgError("Las contraseñas introducidas no coinciden");
      setShowErrorModal(true);
    } else {
      // Solo hace la llamada al back cuando no se detectan errores en el front:
      if (Object.keys(newErrors).length === 0) {
        axios
          .post("http://localhost:3000/users/register", register)
          .then(() => {
            setShowModal(true);
          })
          .catch((err) => {
            if (err.response.data.errno === 1062) {
              setMsgError("Ya estás registrado con este correo electrónico");
            } else {
              setMsgError(
                "Ups! Ha ocurrido un error. Por favor, revise que los campos están bien cumplimentados"
              );
            }
            setShowErrorModal(true);
          });
      }
    }
  };

  const handleShowErrorModal = () => {
    setShowErrorModal(!showErrorModal);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <main>
      <section className="main-section">
        <div className="main-title-createUser">
          <h2 className="m-0 text-center">Crear Cuenta</h2>
        </div>
        <div className="main-createUser pt-0 pb-5">
          <div className="main-box-createUser d-flex align-items-center justify-content-center">
            <form>
                  <LabelKakeibo>Pais</LabelKakeibo>
                  <SelectCountry
                    className=""
                    options={filteredOptions}
                    value={filteredOptions.find(
                      (option) => option.label === register.country
                    )}
                    placeholder="Selecciona un país"
                    name="country"
                    onChange={handleCountryChange}
                  />
              <Row>
                <Col>
                  <LabelKakeibo htmlFor="name">Nombre*</LabelKakeibo>
                  <InputKakeibo
                    className={
                      buttonPressed && errors.name ? "error-style" : ""
                    }
                    type="text"
                    placeholder="Nombre"
                    value={register.name}
                    name="name"
                    id="name"
                    onChange={handleChange}
                    autofocus
                  />
                  {buttonPressed && errors.name && (
                    <div className="errMsg">{errors.name}</div>
                  )}
                </Col>
                <Col>
                  <LabelKakeibo htmlFor="lastname">Apellido</LabelKakeibo>
                  <InputKakeibo
                    className={
                      buttonPressed && errors.lastname ? "error-style" : ""
                    }
                    type="text"
                    placeholder="Apellido(s)"
                    value={register.lastname}
                    name="lastname"
                    id="lastname"
                    onChange={handleChange}
                  />
                  {buttonPressed && errors.lastname && (
                    <div className="errMsg">{errors.lastname}</div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <LabelKakeibo htmlFor="phone_number">Teléfono</LabelKakeibo>
                  <InputKakeibo
                    className={
                      buttonPressed && errors.phone_number ? "error-style" : ""
                    }
                    type="text"
                    placeholder="+34 111 111 111"
                    value={register.phone_number}
                    name="phone_number"
                    id="phone_number"
                    onChange={handleChange}
                  />
                  {buttonPressed && errors.phone_number && (
                    <div className="errMsg">{errors.phone_number}</div>
                  )}
                </Col>
                <Col>
                  <LabelKakeibo htmlFor="email">Email*</LabelKakeibo>
                  <InputKakeibo
                    className={
                      buttonPressed && errors.email ? "error-style" : ""
                    }
                    type="email"
                    placeholder="ejemplo@ejemplo.com"
                    value={register.email}
                    name="email"
                    id="email"
                    onChange={handleChange}
                  />
                  {buttonPressed && errors.email && (
                    <div className="errMsg">{errors.email}</div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <LabelKakeibo htmlFor="pass1">Contraseña*</LabelKakeibo>
                  <InputKakeibo
                    className={
                      buttonPressed &&
                      (errors.pass1 || register.pass1 !== register.pass2)
                        ? "error-style"
                        : ""
                    }
                    type="password"
                    placeholder="Contraseña"
                    value={register.pass1}
                    name="pass1"
                    id="pass1"
                    onChange={handleChange}
                  />
                  {buttonPressed && errors.pass1 && (
                    <div className="errMsg">{errors.pass1}</div>
                  )}
                </Col>
                <Col>
                  <LabelKakeibo htmlFor="pass2">
                    Repetir Contraseña*
                  </LabelKakeibo>
                  <InputKakeibo
                    className={
                      buttonPressed &&
                      (errors.pass2 || register.pass1 !== register.pass2)
                        ? "error-style"
                        : ""
                    }
                    type="password"
                    placeholder="Contraseña"
                    value={register.pass2}
                    name="pass2"
                    id="pass2"
                    onChange={handleChange}
                  />
                  {buttonPressed && errors.pass2 && (
                    <div className="errMsg">{errors.pass2}</div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col className="d-flex flex-column gap-3">
                  <span className="msg-error mt-3">
                    Los campos marcados con * son obligatorios
                  </span>
                  <div className='d-flex justify-content-center gap-3'>
                    <ButtonsApp
                      color={"gold-kakeibo"}
                      textButton={"Registrarse"}
                      clickar={handleSubmit}
                    />
										<ButtonsApp
											color='green-kakeibo'
											clickar={() => navigate('/')}
											textButton={'Cancelar'}
										/>
                  </div>
                  <p>
                    ¿Ya estás registrado?{" "}
                    <Link style={{ color: "black" }} to="/login">
                      Inicia sesión aquí
                    </Link>
                  </p>
                </Col>
              </Row>
            </form>

            <KakeiboModal
              show={showErrorModal}
              handleShow={handleShowErrorModal}
              title={`Error`}
            >
              <div className="d-flex flex-column align-items-center gap-3 mt-3">
                <p> {msgError} </p>
                <ButtonsApp
                  color="gold-kakeibo"
                  clickar={handleShowErrorModal}
                  textButton={"Aceptar"}
                />
              </div>
            </KakeiboModal>

            <KakeiboModal
              show={showModal}
              handleShow={handleShowModal}
              title={`Registro completado`}
            >
              <div className="d-flex flex-column align-items-center gap-3 mt-3">
                <p>
                  Haz clik en el enlace de tu email, para verificar tu cuenta
                </p>
                <ButtonsApp
                  color="gold-kakeibo"
                  clickar={() => navigate("/login")}
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
