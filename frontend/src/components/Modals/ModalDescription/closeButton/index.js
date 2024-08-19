import React from 'react';
import './CloseButton.css'
import { RxCross2 } from "react-icons/rx";
import { MoviesContext } from '../../../../Context';
function CloseButton(){
    const {
        closeDescription
    }= React.useContext(MoviesContext)
    return (
        <button 
            onClick={()=>{closeDescription()}}
        className="CloseButton"> <RxCross2/></button>
    )
}

export {CloseButton}