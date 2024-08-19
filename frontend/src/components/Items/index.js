import React from 'react'
import './items.css'



function Item({titulo,año,url,descripcion,onclick}){

    return(
        <div
            onClick={onclick} 
            className="Item">
            <img className='portada' src={url} alt="Imagen"/> 
            <p className="p titulo">{titulo}</p>
            <p className="p año">{año}</p>
        </div>
    )
}

export {Item}