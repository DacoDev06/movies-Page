import React from 'react'
import './Confirm.css'
import { MoviesContext } from '../../../../Context'

function Confirm(){
    const {
        modalInfoDescription,
        setModalConfirm,
        deleteMovie,
        modifying,
        modificarMovie
    } = React.useContext(MoviesContext)
    return  (
        <div className="Confirm">
                <p className='confirm-text'>Desea <span className={modifying?"confirm-text-modifying":"confirm-text-delete"}>{!modifying?"Eliminar?":"Modificar?"}</span></p>
            <div className='confirm-main'>
                <p className='confirm-titulo'>{modalInfoDescription.titulo}</p>
                <p className='confirm-año'>{modalInfoDescription.año}</p>
            </div>
            <img className="mini-img" src={modalInfoDescription.url} alt=""/>
            <div className='confirm-conainter-buttons'>
                <button 
                    onClick={()=>{setModalConfirm(false)}}
                    className='confirm-button-no confirm-buttons'>NO</button>
                <button
                    onClick={()=>{
                        if(modifying){
                            modificarMovie()
                        }else{
                            deleteMovie()
                        }
                        setModalConfirm(false)
                    }} 
                    className={` confirm-buttons ${modifying? "confirm-button-si-modifying":"confirm-button-si"}`}>SI</button>
            </div>
        </div>
    )
}
export {Confirm}