import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { InputKakeibo } from '../../../components/FormComponents/InputKakeibo/InputKakeibo'
import { LabelKakeibo } from '../../../components/FormComponents/LabelKakeibo/LabelKakeibo'
import { ButtonsApp } from '../../../components/Buttons/ButtonsApp'
import { KakeiboModal } from "../../../components/Modal/KakeiboModal";
import { validator } from "../../../../Utils/validators";
import { AppContext } from "../../../context/AppContextProvider";
import './ChangePass.scss'

const initialValue = {
	pass1: '',
	pass2: '',
}

export const ChangePass = () => {
	const [password, setPassword] = useState(initialValue)
	const [buttonPressed, setButtonPressed] = useState(false);
	const [errors, setErrors] = useState({});
	const [msgError, setMsgError] = useState("");
	const [showForm, setShowForm] = useState(false)
	const [showModal, setShowModal] = useState(false);
	const { token } = useParams()
	const { logout } = useContext(AppContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target
		setPassword({ ...password, [name]: value })
		setErrors({...errors, [name]: validator(name, value)}) // Actualiza los errores de las validaciones cada vez que se cambian los valores de los input
	}

	useEffect(() => {
		axios
			.get(`http://localhost:3000/users/verifyPass/${token}`)
			.then(() => {
				setShowForm(true)
			})
			.catch()
	}, [token])

	const submitChangePass = (e) => {
		e.preventDefault()
		setButtonPressed(true);

		// Comprueba si hay errores en los input y los mete en el estado Errors:
		const newErrors = {};
		Object.keys(password).forEach(key => {
		const err = validator(key, password[key]);
		if (err) {
			newErrors[key] = err;
		}
		});
		setErrors(newErrors);

		// Comprueba que las contraseñas son iguales y si no coinciden abre el modal: del error
		if (password.pass1 !== password.pass2) {
			setMsgError("Las contraseñas introducidas deben coincidir");
		} 

		else {
			// Solo hace la llamada al back cuando no se detectan errores en el front:
			if (Object.keys(newErrors).length === 0){
				axios
					.patch(`http://localhost:3000/users/changePass`, { token, password })
					.then(() => {
						setShowModal(true);
					})
					.catch(() => {
						setShowForm(false)
						
					})
			}
		}
	}

	const handleShowModal = () => {
		setShowModal(!showModal);
	};

	const loginReturn = () => {
		logout()
		navigate("/login");
	}

	return (
		<main>
			<div className='text-center'>
				<div className='main-title-ppal'>
					<h2 className='m-0'>Cambiar contraseña</h2>
				</div>
					<div className='main-vista-chg-pss'>
						<div className='main-box-chg-pss'>
							{showForm ? 	
								<form>
									<LabelKakeibo htmlFor='pass1'>Nueva contraseña</LabelKakeibo>
									<InputKakeibo
										className={buttonPressed && (errors.pass1 || password.pass1 !== password.pass2) ? "error-style" : ""}
										type='password'
										placeholder='Contraseña'
										value={password.pass1}
										name='pass1'
										id='pass1'
										onChange={handleChange}
										/>
									{buttonPressed && errors.pass1 &&
										<div className="errMsg">{errors.pass1}</div>
									}  

									<LabelKakeibo htmlFor='pass2'>
										Repite la nueva contraseña
									</LabelKakeibo>
									<InputKakeibo 	
										className={buttonPressed && (errors.pass2 || password.pass1 !== password.pass2) ? "error-style" : ""}
										type='password'
										placeholder='Repite Contraseña'
										value={password.pass2}
										name='pass2'
										id='pass2'
										onChange={handleChange}
										/>
									{buttonPressed && errors.pass2 &&
										<div className="errMsg">{errors.pass2}</div>
									} 

									<p>{msgError} </p>
									<ButtonsApp
										color={'gold-kakeibo'}
										textButton={'Cambiar Contraseña'}
										clickar={submitChangePass}
										/>
								</form>
						:
							<>
								<h4>Token expirado o inválido</h4>
								<ButtonsApp
									color="gold-kakeibo"
									clickar={() => navigate("/users/passResetLink")}
									textButton={"Volver a intentar"}
								/>
							</>
						}
					</div>
				</div>
			</div>

			<KakeiboModal
				show={showModal}
				handleShow={handleShowModal}
				title={`Contraseña actualizada`}
			>
				<div className='d-flex flex-column align-items-center'>
					<p>¡Has cambiado tu contraseña! Vuelve a iniciar sesión</p>
					<ButtonsApp
					color="gold-kakeibo"
					clickar={() => loginReturn()}
					textButton={"Aceptar"}
					/>
				</div>
			</KakeiboModal>
		</main>
	)
}
