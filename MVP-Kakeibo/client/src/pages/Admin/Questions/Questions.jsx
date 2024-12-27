import { useState, useEffect } from "react";
import { TextareaKakeibo } from "../../../components/FormComponents/TextareaKakeibo/TextareaKakeibo";
import { KakeiboModal } from "../../../components/Modal/KakeiboModal";
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa6";
import { Table } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import "./questions.scss";
import { useNavigate } from "react-router-dom";

export const Questions = () => {
  /* const [checkbox, setCheckbox] = useState() */
  const [showDelete, setShowDelete] = useState(false);
  const [showEnabled, setShowEnabled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [questionId, setQuestionId] = useState();
  const [questionStatus, setQuestionStatus] = useState();
  const [refreshTable, setRefreshTable] = useState(true);
  const [allQuestions, setAllQuestions] = useState();
  const navigate = useNavigate();

  // Llamada a base de datos de todas las preguntas:
  useEffect(() => {
    if (refreshTable) {
      getQuestions();
    }
  }, [refreshTable]);

  const getQuestions = () => {
    axios
      .get(`http://localhost:3000/questions/allQuestions`)
      .then((res) => {
        setAllQuestions(res.data);
      })
      .catch()
      .finally(() => setRefreshTable(false));
  };

  // Funcionalidad eliminar pregunta:
  const showModalDelete = (question_id) => {
    setQuestionId(question_id);
    setShowDelete(!showDelete);
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:3000/questions/deleteQuestion", {
        data: { question_id: questionId },
      })
      .then((res) => {
        setShowDelete(!showDelete);
        if (res.status === 200) {
          setRefreshTable(true);
        }
      })
      .catch();
  };

  // Funcionalidad deshabilitar visualización de pregunta:
  const showModalEnabled = (question_id, status) => {
    setQuestionId(question_id);
    setQuestionStatus(status);
    setShowEnabled(!showEnabled);
  };

  const changeEnabledQuestion = () => {
    axios
      .patch("http://localhost:3000/questions/changeEnabledQuestion", {
        question_id: questionId,
      })
      .then((res) => {
        setShowEnabled(!showEnabled);
        if (res.status === 200) {
          setRefreshTable(true);
        }
      })
      .catch();
  };

  // Funcionalidad añadir pregunta:
  const showModalForm = () => {
    setShowForm(!showForm);
    if (showForm == false) {
      setQuestion("");
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setQuestion(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/questions/addQuestion", {
        question_title: question,
      })
      .then((res) => {
        setShowForm(!showForm);
        if (res.status === 200) {
          setRefreshTable(true);
        }
      })
      .catch();
  };
  return (
    <main>
      <div className="container-fluid container-global">
        <div className="row container-title">
          <div className="col-xl-12 text-center">
            <p className="section-title">Preguntas para los usuarios</p>
          </div>
        </div>
        <div className="row container-content">
          <div className="col-xl-2 space-column"></div>
          <div className="col-xl-8 content-column box-admin relative pt-5">
            <ButtonsApp
              className="btn-admin-qs mb-3"
              color="gold-kakeibo"
              clickar={showModalForm}
              textButton={"Añadir pregunta"}
            />
            <GiCancel
              className="cancel-icon-admin"
              onClick={() => navigate("/admin/home")}
            />
            <div className="question-table">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Preguntas a los usuarios</th>
                    <th className="text-center">Nº Respuestas</th>
                    <th className="text-center">Visible</th>
                    <th className="text-center">Borrar</th>
                  </tr>
                </thead>
                <tbody>
                  {allQuestions?.map((elem) => {
                    return (
                      <tr key={elem.question_id}>
                        <td>{elem.question_title}</td>
                        <td className="text-center">
                          {elem.number_of_answers}
                        </td>
                        <td>
                          <div className="d-flex justify-content-center">
                            {elem.enabled === 1 ? (
                              <FaEye
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  showModalEnabled(
                                    elem.question_id,
                                    elem.enabled
                                  )
                                }
                              />
                            ) : (
                              <FaEyeSlash
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  showModalEnabled(
                                    elem.question_id,
                                    elem.enabled
                                  )
                                }
                              />
                            )}
                          </div>
                        </td>
                        <td>
                          <div
                            className="d-flex justify-content-center"
                            style={{ cursor: "pointer" }}
                          >
                            <FaTrash
                              onClick={() => showModalDelete(elem.question_id)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            <KakeiboModal
              show={showDelete}
              handleShow={showModalDelete}
              title={`¡Atención!`}
            >
              <p>
                ¿Estás seguro de que quieres borrar la pregunta? Si las hay,
                todas las respuestas de los usuarios asociadas a esta pregunta
                se eliminarán de forma permanente.
              </p>

              <div className="d-flex justify-content-center gap-3 pt-3">
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

            <KakeiboModal
              show={showEnabled}
              handleShow={showModalEnabled}
              title={`¡Atención!`}
            >
              {questionStatus === 1 ? (
                <>
                  <p>
                    Si cambia el estado de la pregunta a invisible, el usuario
                    no podrá visualizar esta pregunta ni responderla, así como
                    no podrá ver su respuesta guardada si la hubiese
                  </p>
                  <p>¿Desea ocultar esta pregunta para los usuarios?</p>
                </>
              ) : (
                <>
                  <p>
                    Si cambia el estado de la pregunta a visible, el usuario
                    podrá visualizar esta pregunta y responderla
                  </p>
                  <p>¿Desea hacer visible esta pregunta para los usuarios?</p>
                </>
              )}

              <div className="d-flex justify-content-center gap-3 pt-3">
                <ButtonsApp
                  color="green-kakeibo"
                  clickar={showModalEnabled}
                  textButton={"Cancelar"}
                />
                <ButtonsApp
                  color="gold-kakeibo"
                  clickar={changeEnabledQuestion}
                  textButton={"Actualizar"}
                />
              </div>
            </KakeiboModal>

            <KakeiboModal
              show={showForm}
              handleShow={showModalForm}
              title={`Añadir pregunta`}
            >
              <form className="d-flex flex-column">
                <label htmlFor="question"> Pregunta: </label>
                <TextareaKakeibo
                  className="mb-4"
                  rows="5"
                  placeholder="Insertar pregunta"
                  value={question}
                  name="question"
                  id="question"
                  onChange={handleChange}
                />

                <div className="d-flex justify-content-center gap-3">
                  <ButtonsApp
                    color="green-kakeibo"
                    clickar={showModalForm}
                    textButton={"Cancelar"}
                  />
                  <ButtonsApp
                    color="gold-kakeibo"
                    clickar={handleSubmit}
                    textButton={"Añadir"}
                  />
                </div>
              </form>
            </KakeiboModal>
          </div>
        </div>
      </div>
    </main>
  );
};

// Cambiar mensajes
// Cambiar nombres de las variables.
// Cambiar los nombres de la base de datos.
