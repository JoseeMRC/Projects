import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContextProvider'
import { ButtonsApp } from '../../components/Buttons/ButtonsApp'
import './AllObjetives.scss'

export const AllObjetives = () => {
	const [objetives, setObjetives] = useState({
		short_term: [],
		medium_term: [],
		long_term: [],
	})
	const navigate = useNavigate()
	const { icons, user } = useContext(AppContext)

	useEffect(() => {
		if (user) {
			axios
				.get(`http://localhost:3000/objetives/allObjetives/${user.user_id}`)
				.then((res) => {
					const categorizedObjectives = res.data.reduce(
						(acc, obj) => {
							if (!acc[obj.term]) {
								acc[obj.term] = []
							}
							acc[obj.term].push(obj)
							return acc
						},
						{ short_term: [], medium_term: [], long_term: [] }
					)
					setObjetives(categorizedObjectives)
				})
				.catch()
		}
	}, [user, icons])

	const handleViewObjective = (goalId) => {
		navigate(`/objetives/oneObjetive/${goalId}`)
	}

	const termLabels = {
		short_term: 'Corto Plazo',
		medium_term: 'Medio Plazo',
		long_term: 'Largo Plazo',
	}

	return (
		<>
			<main>
				<div className='container-fluid container-global'>
					<div className='row container-title'>
						<div className='col-xl-12 text-center'>
							<h2 className='section-title'>Todos los objetivos</h2>
						</div>
					</div>
					<div className='row container-content'>
						<div className='col-xl-2 space-column'></div>
						<div className='col-xl-8 content-column text-center'>
							<div>
								<ButtonsApp
									className='mx-auto'
									color='add-more-button'
									textButton={'Añadir más'}
									clickar={() => navigate(`/objetives/create/${user?.user_id}`)}
								></ButtonsApp>
							</div>
							<div className='d-flex justify-content-center mb-3 mt-3 gap-5 flex-wrap flex-column p-3'>
								{['short_term', 'medium_term', 'long_term'].map((term) => (
									<div key={term} className=''>
										<h3>{termLabels[term]}</h3>
										<div className='iconsObjs  flex-wrap gap-5'>
										{objetives[term].map((objetive) => {
											const currentIcon = icons.find(
												(icon) => icon.id === objetive.goal_icon
												)
												return (
													<div
													key={objetive.goal_id}
													className='d-flex icons-CML align-items-center flex-column gap-1'
													>
													<ButtonsApp
														color='btn-icons-obj'
														variant='primary'
														clickar={() =>
															handleViewObjective(objetive.goal_id)
															}
															textButton={<currentIcon.component />}
															>
														<currentIcon.component />
													</ButtonsApp>
													<Card.Title>{objetive.goal_name}</Card.Title>
												</div>
											)
											})}
										</div>
									</div>
								))}
							</div>
						</div>
						<div className='col-xl-2 space-column'></div>
					</div>
				</div>
			</main>
		</>
	)
}
