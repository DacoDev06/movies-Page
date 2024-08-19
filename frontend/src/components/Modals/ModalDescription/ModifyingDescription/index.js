import React from "react"
import { MoviesContext } from "../../../../Context"
import './ModifyingDescription.css'

const ModifyingDescription = ()=> {
    const {
        modalInfoDescription,
        inputTitleModifying,
        setInputTitleModifying,
        inputYearModifying,
        setInputYearModifying,
        inputURLModifying,
        setInputURLModifying,
        inputDescriptionModifiying,
        setInputDescriptionModifiying,
        cancelModifyButton,
        modificarMovieLogic

    }= React.useContext(MoviesContext)
    return (
        <div className="info-modifying-container">
            <p className="modify-title">Modificar Pelicula
            </p>
            <div className="main-info-modifying">
                <textarea
                    value={inputTitleModifying}
                    onChange={event => {
                        setInputTitleModifying(event.target.value)
                    }} 
                    className="main-info-title-modifying"></textarea>
                <input
                    value={inputYearModifying}
                    onChange={event=>{
                        setInputYearModifying(event.target.value)
                    }}
                    className="main-info-año-modifying"></input>
            </div>
            
            <img 
                className='img-portada' src={modalInfoDescription.url}  alt="Imagen"/> 
            <div className="url-modify-container">
                <p className="url-modify-text">URL</p>
                <input
                    className="url-modify-input"
                    placeholder="Nueva URL"
                    value={inputURLModifying}
                    onChange={event=>{
                        setInputURLModifying(event.target.value)
                    }}></input>
            </div>
            <div className="description-modifying-container">
                <textarea 
                    value={inputDescriptionModifiying}
                    onChange={event=>{
                        setInputDescriptionModifiying(event.target.value)
                    }}
                    className="main-description-modify"></textarea> 
            </div>   
            
            <div className="description-buttons">
                <button
                    onClick={()=>{cancelModifyButton()}}
                    className="cancel-button description-button">Cancelar</button>
                <button 
                    onClick={()=>{
                        modificarMovieLogic()
                    }}
                    className="modificar-button description-button">Modificar</button>
            </div>
        </div>
    )
}
export {ModifyingDescription}