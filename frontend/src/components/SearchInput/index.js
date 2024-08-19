import './SearchInput.css'
import { MoviesContext } from '../../Context'
import React from 'react'

function SearchInput(){
    const {searchInput,
        setSearchInputValue
    } = React.useContext(MoviesContext)
    return  (
        <div 
            
            className="SearchInputContainer">
            <input 
                className="SearchInput" 
                placeholder="Filtra Peliculas"
                value={searchInput}
                onChange={event =>{
                    setSearchInputValue(event.target.value)
                    console.log(searchInput);
                    
                }
                
                }
            ></input>
        </div>
    )
}

export {SearchInput}