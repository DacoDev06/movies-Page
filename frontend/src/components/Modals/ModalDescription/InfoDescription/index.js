import React from 'react'
import './InfoDescription.css'
import { MoviesContext } from '../../../../Context'
function InfoDescription(){
    const {
        modalInfoDescription,
        setModalConfirm,
        openModify
    } = React.useContext(MoviesContext)
    return(
        <div className="info-description-container">
            <div className="main-info">
                <p className="main-info-title">{modalInfoDescription.titulo}</p>
                <p className="main-info-año">{modalInfoDescription.año}</p>
            </div>
            
            <img className='img-portada' src={modalInfoDescription.url} alt="Imagen"/> 
            <div className="description-container">
                <p className="main-description">{modalInfoDescription.description}</p> 
            </div>   
            
            <div className="description-buttons">
                <button 
                    onClick={()=>{openModify()}}
                    className="description-modify-button description-button">Modificar</button>
                <button 
                    onClick={()=>{
                        setModalConfirm(true)
                    }}
                className="description-delete-button description-button">Eliminar</button>
            </div>



        </div>
    )
}
export {InfoDescription}