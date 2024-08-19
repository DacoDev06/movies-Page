import React from 'react';
import './MenuButton.css'
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MoviesContext } from '../../Context';

function MenuButton(){
    const {
        MenuButtonInteraction,
        modalAddMovie,
        modalMenu
    }=React.useContext(MoviesContext)
    return(
        <button onClick={()=>MenuButtonInteraction()} 
        className={`MenuButton ${modalMenu && "MenuModal-open Modal-open" } ${modalAddMovie && "AddModal-open Modal-Open"}`}>{(modalMenu || modalAddMovie) ? <RxCross2/>: <FaBars/>}</button>
    )
    
}
export {MenuButton}