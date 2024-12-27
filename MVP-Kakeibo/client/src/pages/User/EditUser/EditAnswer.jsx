import { LabelKakeibo } from "../../../components/FormComponents/LabelKakeibo/LabelKakeibo";
import { TextareaKakeibo } from "../../../components/FormComponents/TextareaKakeibo/TextareaKakeibo";
import { ButtonsApp } from "../../../components/Buttons/ButtonsApp";
import { AppContext } from "../../../context/AppContextProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditAnswer.scss";


export const EditAnswer = () => {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);   
    const [allAnswers, setAllAnswers] = useState([])

    useEffect(() => {
        if (user && user.user_id){
            axios
            .get(`http://localhost:3000/users/editAnswer`, {params: {user_id: user.user_id}} )
            .then((res) => {
                let temporal = res.data.map((e)=>{
                    if (e.answer_text) {
                        return {...e, created: true}
                    }
                    else {
                        return {...e, created: false}                
                    }
                })
                setAllAnswers (temporal);
            })
            .catch();
        }
    }, [user])
    
    const handleChange = (e, index, question_id) => {
        const { name, value } = e.target;
        setAllAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[index] = {
                ...updatedAnswers[index],  
                [name]: value,
                question_id: question_id
            };
            return updatedAnswers;
        });
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
        let data = {user_id: user.user_id, allAnswers}
        axios
        .put(`http://localhost:3000/users/editAnswer`, data)
        .then(() => {
            navigate("/users");
        })
        .catch();
    }

    return (
        <>
            <main>
                <div className='container-fluid container-global'>
                    <div className='row container-title '>
                        <div className='col-xl-12 text-center'>
                            <h2 className="section-title">Asistente Kakeibo</h2>
                        </div>
                    </div>
                    <div className='row container-content'>
                        <div className='col-md-1 col-lg-2 space-column'></div>
						<div className='col-md-10 col-lg-8 content-column'>
                            <form className='p-5'>
                                {allAnswers?.map((elem, index) => {
                                    return (
                                        <div className="d-flex flex-column mb-4" key = {index + 1}>
                                            <h4 className="mb-0">Pregunta {index + 1}:</h4>
                                            <LabelKakeibo htmlFor={"answer_text"}>{elem?.question_title}</LabelKakeibo>
                                            <TextareaKakeibo
                                                className={"areatext"}
                                                rows={4}
                                                placeholder={"Tu respuesta"}
                                                value={elem?.answer_text}
                                                name={"answer_text"}
                                                id={"answer_text"}
                                                onChange={(e) => handleChange( e, index, elem?.question_id)}
                                            >
                                            </TextareaKakeibo>
                                        </div>
                                    )
                                })}
                                <div className="d-flex flex-row-reverse justify-content-evenly">
                                    <ButtonsApp
                                        className={'mt-4'}
                                        color={"gold-kakeibo"}
                                        textButton={"Aceptar"}
                                        clickar={handleSubmit}
                                    />
                                    <ButtonsApp
                                        className={'mt-4'}
                                        color={"green-kakeibo"}
                                        textButton={"Cancelar"}
                                        clickar={() => navigate("/users")}
                                    />
                                </div>
                            </form>  
                        </div>
                        <div className='col-md-1 col-lg-2 space-column'></div>
                    </div>
                </div>
            </main>
        </>
    )
}
