import axios from "axios";
import { useState, useEffect } from "react";
import { KakeiboModal } from "../../../components/Modal/KakeiboModal";
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";
import { FaTrash } from "react-icons/fa6";
import "./AllUsers.scss";
import { Table } from "react-bootstrap";
import "../Admin.scss";
import { GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export const AllUsers = () => {
  const [allUsers, setAllUsers] = useState();
  const [refreshTable, setRefreshTable] = useState(true);
  const [userId, setUserId] = useState("");
  const [modalDelete, setModalDelete] = useState(false);
  const [filters, setFilters] = useState({
    active: true,
    deleted: false,
    verified: true,
    notVerified: true,
  });
  const navigate = useNavigate()

  useEffect(() => {
    if (refreshTable) {
      getAllUsers();
    }
  }, [refreshTable]);

  const getAllUsers = () => {
    axios
      .get(`http://localhost:3000/admin/allUsers`)
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch()
      .finally(() => setRefreshTable(false));
  };

  // Borrar usuario (anonimizar los datos)
  const showModalDelete = (user_id) => {
    setUserId(user_id);
    setModalDelete(!modalDelete);
  };

  const deleteUser = () => {
    axios
      .put(`http://localhost:3000/users/deleteUser`, { user_id: userId })
      .then((res) => {
        if (res.status === 200) {
          setRefreshTable(true);
        }
      })
      .catch()
      .finally(() => {
        setModalDelete(!modalDelete);
      });
  };

  // Filtrar usuarios por Verificado/No verificado y Activo/Eliminado
  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };
  const filteredUsers = allUsers?.filter((user) => {
    const { active, deleted, verified, notVerified } = filters;

    const matchesStatus =
      (active && user.deleted === 0) || (deleted && user.deleted === 1);

    const matchesVerification =
      (verified && user.enabled === 1) || (notVerified && user.enabled === 0);

    return matchesStatus && matchesVerification;
  });

  return (
    <>
      <main>
        <div className="container-fluid container-global">
          <div className="row container-title">
            <div className="col-xl-12 text-center">
              <h2 className="section-title">Administración Kakeibo</h2>
            </div>
          </div>
          <div className="row container-content">
            <div className="col-xl-2 space-column"></div>
            <div className="tabla-users col-xl-8 content-column admin-ppal d-flex flex-wrap justify-content-center text-center relative pt-5">
                  <GiCancel
                    className="cancel-icon-admin"
                    onClick={() => navigate("/admin/home")}
                  />
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={filters.active}
                    onChange={handleFilterChange}
                    className="me-3"
                  />
                  Activo
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="deleted"
                    checked={filters.deleted}
                    onChange={handleFilterChange}
                    className="me-3"
                  />
                  Eliminado
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="verified"
                    checked={filters.verified}
                    onChange={handleFilterChange}
                    className="me-3"
                  />
                  Verificado
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="notVerified"
                    checked={filters.notVerified}
                    onChange={handleFilterChange}
                    className="me-3"
                  />
                  No Verificado
                </label>
              </div>
              <div className="table-users">
                    <Table 
                      responsive
                    >
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Nombre</th>
                          <th>Apellidos</th>
                          <th>Email</th>
                          <th>Telefono</th>
                          <th>Fecha de Nacimiento</th>
                          <th>País</th>
                          <th>Verificado</th>
                          <th>Status</th>
                          <th>Borrar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers?.map((elem) => (
                          <tr key={elem.user_id}>
                            <td>{elem.user_id}</td>
                            <td>{elem.name}</td>
                            <td>{elem.lastname}</td>
                            <td>{elem.email}</td>
                            <td>{elem.phone_number}</td>
                            <td>{elem.birth_date}</td>
                            <td>{elem.country}</td>
                            <td>{elem.enabled ? "Verificado" : "No verificado"}</td>
                            <td>{elem.deleted ? "Usuario elimidado" : "Activo"}</td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <FaTrash
                                  onClick={() => showModalDelete(elem.user_id)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
              </div>
              <KakeiboModal
                show={modalDelete}
                handleShow={showModalDelete}
                title={`¡Atención!`}
              >
                <p>
                  ¿Estás seguro de que quieres borrar los datos de este usuario?
                  No se podrán recuperar, y también se eliminarán todos sus
                  movimientos y objetivos.
                </p>
                <p>
                  El usuario podrá volver a registrarse, pero tampoco podrá
                  recuperar sus datos.
                </p>

                <div className="d-flex justify-content-center gap-3">
                  <ButtonsApp
                    color="gold-kakeibo"
                    clickar={showModalDelete}
                    textButton={"Cancelar"}
                  />
                  <ButtonsApp
                    color="green-kakeibo"
                    clickar={deleteUser}
                    textButton={"Borrar"}
                  />
                </div>
              </KakeiboModal>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
