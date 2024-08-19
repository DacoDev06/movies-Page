import React from 'react';
import './BackButton.css'
import { IoArrowBackOutline } from "react-icons/io5";
import { MoviesContext } from '../../../../Context';

function BackButton(){
    const {backButtonInteraction} = React.useContext(MoviesContext)
    return  (
        <button 
        onClick={()=>backButtonInteraction()}
        className="BackButton"> <IoArrowBackOutline/></button>
    )
}
export {BackButton}