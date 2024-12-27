import { useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContextProvider'
import { Form } from 'react-bootstrap'
import { ButtonsApp } from '../Buttons/ButtonsApp'
import { useNavigate, useParams } from 'react-router-dom'
import { KakeiboModal } from '../Modal/KakeiboModal'
import { KakeiboNavbar } from '../Navbar/KakeiboNavbar'
import { KakeiboNavbarMovil } from '../NavbarMovil/KakeiboNavbarMovil'
import { FooterKakeibo } from '../Footer/FooterKakeibo'
import './stylesCreateObjetive.scss'

const initialValue = {
	goal_amount: '',
	limit_date: '',
	goal_name: '',
	goal_status: false,
	goal_icon: {
		name: '',
		component: () => null,
	},
}

export const FormCreateObjetive = () => {
	const { icons } = useContext(AppContext)
	const [objetive, setObjetive] = useState(initialValue)
	const [showModalIcons, setShowModalIcons] = useState(false)
	const [selectedIcon, setSelectedIcon] = useState('')
	const { id } = useParams()
	const navigate = useNavigate()

	const handleChange = (e) => {
		const { name, value } = e.target
		setObjetive({ ...objetive, [name]: value })
	}

	const handleOpenModalIcons = () => {
		setShowModalIcons(true)
	}

	const handleCloseModalIcons = () => {
		setShowModalIcons(false)
	}

	const handleChangeIcon = (icon) => {
		setSelectedIcon(icon)
		setObjetive({ ...objetive, goal_icon: icon.id })
		handleCloseModalIcons()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		axios
			.post(`http://localhost:3000/objetives/create/${id}`, objetive)
			.then((res) => {
				console.log(res)
				navigate(`/objetives/allObjetives/${id}`)
			})
			.catch((err) => console.log(err))
	}

	return (
		<>
    <KakeiboNavbar/>
			<div className='title-center'>
				<div className='main-title'>
					<h2>Formulario de Objetivo</h2>
				</div>
				<div className='main-vista'>
					<div className='main-box'>
						<Form
							className='form-reg'
							onSubmit={handleSubmit}
						>
							<Form.Group
								className='mb-3'
								controlId='formBasicAmount'
							>
								<Form.Label>Cantidad</Form.Label>
								<Form.Control
									type='text'
									placeholder='Induzca una cantidad'
									value={objetive.goal_amount}
									onChange={handleChange}
									name='goal_amount'
								/>
							</Form.Group>
							<Form.Group
								className='mb-3'
								controlId='formBasicLimitDate'
							>
								<Form.Label>Fecha del objetivo</Form.Label>
								<Form.Control
									type='date'
									placeholder='Induzca una fecha'
									value={objetive.limit_date}
									onChange={handleChange}
									name='limit_date'
								/>
							</Form.Group>
							<Form.Group
								className='mb-3'
								controlId='formBasicGoalName'
							>
								<Form.Label>Objetivo</Form.Label>
								<Form.Control
									type='text'
									placeholder='Induzca un nombre del objetivo'
									value={objetive.goal_name}
									onChange={handleChange}
									name='goal_name'
								/>
							</Form.Group>
							{
								<Form.Group
									className='mb-3'
									controlId='formBasicObjetiveIcon'
								>
									<Form.Label>Icono del objetivo</Form.Label>
									<ButtonsApp
										type='button'
										clickar={handleOpenModalIcons}
										textButton={'Seleccionar icono'}
										color={'base'}
									></ButtonsApp>
								</Form.Group>
							}
							<ButtonsApp
								variant='primary'
								type='submit'
								textButton={'Guardar'}
								color={'gold-kakeibo'}
								clickar={handleSubmit}
							></ButtonsApp>

							{selectedIcon.component && (
								<span style={{ marginLeft: '10px', fontSize: '24px' }}>
									{selectedIcon.component({ className: 'icon' })}
								</span>
							)}
						</Form>

						<KakeiboModal
							show={showModalIcons}
							handleShow={handleCloseModalIcons}
							title='Selecciona un Icono'
						>
							<div className='icon-container'>
								{icons.map((icon) => (
									<div
										key={icon.id}
										onClick={() => handleChangeIcon(icon)}
										title={icon.name}
									>
										{icon.component({ className: 'icon' })}
									</div>
								))}
							</div>
						</KakeiboModal>
					</div>
				</div>
			</div>
      <FooterKakeibo/>
      <KakeiboNavbarMovil/>
		</>
	)
}
