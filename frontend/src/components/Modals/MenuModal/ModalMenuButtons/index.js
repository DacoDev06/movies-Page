
import React from 'react'
import './ModalMenuButtons.css'
import { MoviesContext } from '../../../../Context'

function ModalMenuButtons(){
    const {
        AddMovieButtonInteraction,
        ReloadMovies
    } = React.useContext(MoviesContext)

    return(
        <div className="ModalMenuButtons">
            <button 
                onClick={()=>ReloadMovies()}
            className="RealoadMoviesButton MenuButton-modal">Recargar Peliculas</button>
            <button 
            onClick={()=>AddMovieButtonInteraction()}
            className="AddMovieButtonMenu MenuButton-modal">Agregar Pelicula</button>
        </div>
    )
}
export {ModalMenuButtons}