import React from 'react'
import './AddMovie.css'
import { MoviesContext } from '../../../../Context'

const AddMovie = ()=> { 
    const {
        inputTitle,
        setInputTitle,
        inputYear,
        setInputYear,
        inputURL,
        setInputURL,
        inputDescription,
        setInputDescription,
        cancelButton,
        addMovie


    } = React.useContext(MoviesContext)
    return(
        <div className="contenedor">
            <p className="titulo-añadir-pelicula">Agregar Pelicula</p>
            
            <div className="atributo-container">
                <p className="atributo-name title">Título</p>
                
                <input
                    className="atributo-input" 
                    placeholder="Titulo de la pelicula"
                    value={inputTitle}
                    onChange={event=>setInputTitle(event.target.value)
                    }
                ></input> 
            </div>
            <div className="atributo-container">
                <p className="atributo-name year">Año</p>
                <input 
                    className="atributo-input" 
                    placeholder="Año de estreno"
                    onChange={event=>setInputYear(event.target.value)}
                    value={inputYear}
                ></input>
            </div>
            <div className="atributo-container">
                <p className="atributo-name url">URL</p>
                <input 
                    className="atributo-input" 
                    placeholder="URL IMAGEN"
                    onChange={event=>setInputURL(event.target.value)}
                    value={inputURL}
                ></input>
            </div>
            <div className="atributo-container atributo-container-des">
                <p className="atributo-name description">Descripción</p>
                <textarea 
                    className="atributo-input atributo-input-desc" 
                    onChange={event=>setInputDescription(event.target.value)}
                    value={inputDescription}
                ></textarea>
            </div>

            <div className="AddButtonsContainer">
                <button
                    onClick={()=>cancelButton()} 
                    className="CancelMovieButton MovieButton">Cancelar</button>
                <button
                    onClick={()=>addMovie()} 
                    className="AddMovieButton MovieButton">Agregar</button>
            </div>
        
        </div>
    )
}
export {AddMovie}