import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../context/AppContextProvider";
import { LabelKakeibo } from "../../../components/FormComponents/LabelKakeibo/LabelKakeibo";
import { InputKakeibo } from "../../../components/FormComponents/InputKakeibo/InputKakeibo";
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";
import { Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { SelectCountry } from "../../../components/FormComponents/SelectCountry/SelectCountry";
import countryList from "react-select-country-list";
import { europeanCountries } from "../../../Data/europeanCountries";
import Flag from "react-world-flags";
import { KakeiboModal } from "../../../components/Modal/KakeiboModal";
import { validator } from "../../../../Utils/validators";
import { useNavigate } from "react-router-dom";
import { ImFolderUpload } from "react-icons/im";
import { GiCancel } from "react-icons/gi";
import "./editUser.scss";

const initialValue = {
  name: "",
  lastname: "",
  phone_number: "",
  country: "",
  birth_date: "",
};

export const EditUser = () => {
  const { user, setUser } = useContext(AppContext);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [showDelete, setShowDelete] = useState(false);
  const [file, setFile] = useState();
  const [errors, setErrors] = useState({});
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
    setFormData({ ...formData, country: selectedOption.value });
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors({ ...errors, [name]: validator(name, value) }); // Actualiza los errores de las validaciones cada vez que se cambian los valores de los input
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonPressed(true);

    // Comprueba si hay errores en los input y los mete en el estado Errors:
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validator(key, formData[key]);
      if (err) {
        newErrors[key] = err;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Solo hace la llamada al back y la actualización del context provider cuando no se detectan errores en el front
      const newFormData = new FormData();
      newFormData.append("editUser", JSON.stringify(formData));
      newFormData.append("file", file);

      axios
        .put(`http://localhost:3000/users/editUser`, newFormData)
        .then((res) => {

          if (res.data.img) {
            setUser({ ...formData, img: res.data.img });
          }
          else {
            setUser({ ...formData});
          }
          navigate("/users");
        })
        .catch();
    }
  };

  const showModalDelete = () => {
    setShowDelete(!showDelete);
  };

  // Eliminar cuenta de usuario (se anonimizan los datos)
  const handleDelete = () => {
    axios
      .put(`http://localhost:3000/users/deleteUser`, {
        user_id: formData.user_id,
      })
      .then((res) => {
        setShowDelete(!showDelete);
        if (res.status === 200) {
          setUser(null);
        }
      })
      .catch();
  };

  return (
    <main>
      <section className="main-section pb-md-5">
        <div className="main-title-ppal">
          <h1 className="text-center">Edición de mi Perfil</h1>
        </div>
        <Container>
          <Row className="d-flex justify-content-center align-items-center">
            <Col xl={8} className="content-column position-relative py-5">
              <GiCancel
                className="cancel-icon"
                onClick={() => navigate("/users")}
              />
              <form className="d-flex flex-column justify-content-center align-items-center">
                <LabelKakeibo htmlFor={"name"}>Nombre</LabelKakeibo>
                <InputKakeibo
                  className={buttonPressed && errors.name ? "error-style" : ""}
                  type="text"
                  name="name"
                  id="name"
                  value={formData?.name ? formData?.name : ""}
                  placeholder="Nombre"
                  onChange={handleChange}
                />
                {buttonPressed && errors.name && (
                  <div className="errMsg">{errors.name}</div>
                )}
                <LabelKakeibo htmlFor={"lastname"}>Apellido</LabelKakeibo>
                <InputKakeibo
                  className={
                    buttonPressed && errors.lastname ? "error-style" : ""
                  }
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={formData?.lastname}
                  placeholder="Apellido"
                  onChange={handleChange}
                />
                {buttonPressed && errors.lastname && (
                  <div className="errMsg">{errors.lastname}</div>
                )}
                <LabelKakeibo htmlFor={"phone_number"}>Teléfono</LabelKakeibo>
                <InputKakeibo
                  className={
                    buttonPressed && errors.phone_number ? "error-style" : ""
                  }
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  value={formData?.phone_number}
                  placeholder="Teléfono"
                  onChange={handleChange}
                />
                {buttonPressed && errors.phone_number && (
                  <div className="errMsg">{errors.phone_number}</div>
                )}
                <LabelKakeibo htmlFor={"country"}>Pais</LabelKakeibo>
                <SelectCountry
                  options={filteredOptions}
                  value={filteredOptions.find(
                    (option) => option.value === formData.country
                  )}
                  placeholder="Selecciona un país"
                  name="country"
                  onChange={handleCountryChange}
                />
                <LabelKakeibo htmlFor={"birth_date"}>
                  Fecha de Nacimiento
                </LabelKakeibo>
                <InputKakeibo
                  type="date"
                  name="birth_date"
                  id="birth_date"
                  value={formData?.birth_date ? formData?.birth_date : ""}
                  onChange={handleChange}
                />
                  <LabelKakeibo className="d-flex align-items-center gap-2" htmlFor="file">
                  <ImFolderUpload size='1.5em' />
                    Sube tu foto
                  </LabelKakeibo>
                <Form.Control
                  id="file"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFile}
                />
                <ButtonsApp
                  className="my-3"
                  color={"gold-kakeibo"}
                  textButton={"Actualizar"}
                  clickar={handleSubmit}
                />
              </form>
              <div className="d-flex justify-content-center align-items-center">
                <ButtonsApp
                  className="me-3"
                  color={"green-kakeibo"}
                  textButton={"Cambiar Contraseña"}
                  clickar={() => navigate("/users/passResetLink")}
                />
                <ButtonsApp
                  color={"green-kakeibo"}
                  textButton={"Borrar Cuenta"}
                  clickar={() => showModalDelete(formData.user_id)}
                />
              </div>
            </Col>
          </Row>
        </Container>

        <KakeiboModal
          show={showDelete}
          handleShow={showModalDelete}
          title={`¡Atención!`}
        >
          <p>¿Estás seguro de que quieres borrar tu cuenta?</p>

          <div className="d-flex justify-content-center gap-3">
            <ButtonsApp
              color="gold-kakeibo"
              clickar={showModalDelete}
              textButton={"Cancelar"}
            />
            <ButtonsApp
              color="green-kakeibo"
              clickar={handleDelete}
              textButton={"Borrar"}
            />
          </div>
        </KakeiboModal>
      </section>
    </main>
  );
};
