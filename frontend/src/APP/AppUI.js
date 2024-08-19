import React from 'react';
import {Titulo} from '../components/Titulo'
import { Item } from '../components/Items';
import {ListMovies} from '../components/ListMovies'
import { SearchInput } from '../components/SearchInput';
import {MenuButton} from '../components/MenuButton'
import {MenuModal} from '../components/Modals/MenuModal'
import {ModalMenuButtons} from '../components/Modals/MenuModal/ModalMenuButtons'
import {AddMovieModal} from '../components/Modals/AddMovieModal'
import {BackButton} from '../components/Modals/AddMovieModal/BackButton'
import {AddMovie} from '../components/Modals/AddMovieModal/AddMovie'
import { ModalDescription } from '../components/Modals/ModalDescription';
import {InfoDescription} from '../components/Modals/ModalDescription/InfoDescription'
import {ModifyingDescription} from '../components/Modals/ModalDescription/ModifyingDescription'
import {ConfirmModal} from '../components/Modals/ConfirmModal'
import { Confirm } from '../components/Modals/ConfirmModal/Confirm';


import {MoviesContext} from'../Context'
import { CloseButton } from '../components/Modals/ModalDescription/closeButton';



function AppUI(){
    const {
        loading,
        filtredMovies,
        modalMenu,
        modalAddMovie,
        modalDescriptionOpen,
        openDescription,
        modifying,
        modalConfirm,
        setModalConfirm
      }=React.useContext(MoviesContext)
    return (
        <div className="App">
          <Titulo/>

          <SearchInput/>

          {/* EFECTO DE CARGAR PELIS */}
          {loading && <p> Cargando Peliculas ...</p>}
          {(!loading && (filtredMovies.length===0)) && <p>NO HAY PELICULAS</p>}
          {(!loading && filtredMovies) && <ListMovies> 
            {filtredMovies.map(data => <Item
              key={data.id}
              titulo={data.titulo}
              año={data.año}
              url = {data.url}
              descripcion={data.description}
              onclick={()=>{
                openDescription(data.id,data.titulo,data.año,data.url,data.description)
              }}
            />)}
          </ListMovies>}
          
          {/* PRIMER BOTON DE MENU */}
          <MenuButton/>
          {modalMenu && 
            <MenuModal>
              <MenuButton/>
            {/* BOTONES AGREGAR Y RECARGAR */}
              <ModalMenuButtons/>
          </MenuModal>}

          {modalAddMovie && 
                <AddMovieModal>
                    <BackButton/>
                    <MenuButton/>
                    <AddMovie/>
                </AddMovieModal>
          }
          {(modalDescriptionOpen && !modifying) && 
            <ModalDescription>
              <CloseButton/>
              <InfoDescription/>
            </ModalDescription>
          }
          {(modalDescriptionOpen && modifying)&&
            <ModalDescription>
              <CloseButton/>
              <ModifyingDescription/>
            </ModalDescription>
          }
          {modalConfirm && 
          <ConfirmModal>
            <Confirm/>
            <button onClick={()=>{setModalConfirm(false)}}></button>
          </ConfirmModal>
          }

      </div>
    )
}
export {AppUI}