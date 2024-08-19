import React from "react"
import { useEffect } from 'react';
import { Movie } from "../schemas/movie.ts"
import { getData } from "../services/getData.js";
import {postData} from '../services/postData.js';
import {isImageURL} from '../utils/isImageUrl.js'
import {deleteData} from '../services/deleteData.js'
import { putData } from "../services/putData.js";

const MoviesContext = React.createContext()

function MoviesContextProvider({children}){
    const [movies,setMovies] = React.useState([])
    const [searchInput,setSearchInput] = React.useState("")
    const [loading,setLoading]= React.useState(true)

    //estado modal menu
    const [modalMenu,setModalMenu] = React.useState(false)
    
    // estados de addMovieModal
    const [modalAddMovie,setModalAddMovie] = React.useState(false)
    const [inputTitle,setInputTitle] = React.useState("")
    const [inputYear,setInputYear] = React.useState("")
    const [inputURL,setInputURL] = React.useState("")
    const [inputDescription,setInputDescription] = React.useState("")

    //estados modalDescription
    const [modalDescriptionOpen,setModalDescriptionOpen] = React.useState(false)
    const [modalInfoDescription,setModalInfoDescription] = React.useState({})

    //estados de modificar
    const [modifying,setModifying] = React.useState(false)

    const [inputTitleModifying,setInputTitleModifying] = React.useState("")
    const [inputYearModifying,setInputYearModifying] = React.useState("")
    const [inputURLModifying,setInputURLModifying] = React.useState("")
    const [inputDescriptionModifiying,setInputDescriptionModifiying] = React.useState("")

    const [modalConfirm,setModalConfirm] = React.useState(false)

    const URLMovies = '/movies'

    const effectRef = React.useRef()

    const filtredMovies = movies.filter(movie=>{
    return movie.titulo.toLowerCase().includes(searchInput.toLowerCase())
    })

    useEffect(()=>{
    effectRef.current = async ()=>{
        try {
            const data = await getData(URLMovies)
            if (typeof(data)==="object"){
                setMovies([data])
                }
                setMovies(data)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    effectRef.current()

    },[])


    const ReloadMovies = ()=>{
    setLoading(true)
    setTimeout(()=>{effectRef.current()},1000)
    
    }

    const MenuButtonInteraction =()=>{
    modalMenu ? setModalMenu(false) : setModalMenu(true)
    if (modalAddMovie){
        setModalMenu(false)
        setModalAddMovie(false)
        cleanData()
        }
    }
    const backButtonInteraction = ()=>{
        setModalMenu(true)
        setModalAddMovie(false)
        cleanData()
    }
    const AddMovieButtonInteraction = ()=> {
        setModalMenu(false)
        setModalAddMovie(true)
    }

    const setSearchInputValue = (value)=>{
        setSearchInput(value)
    }

    const cleanData = ()=>{
        setInputTitle("")
        setInputYear("")
        setInputURL("")
        setInputDescription("")
    }
    const cancelButton = ()=>{
        cleanData()
        setModalAddMovie(false)
    }

    

    const addMovie= ()=>{
        // gregar peli
        if(!inputTitle || !inputYear || !inputURL || !inputDescription){
            alert("Faltan campos")
        }else{
            try{
                const isImage = isImageURL(inputURL)
                const yearIsNumber = !isNaN(Number(inputYear));

                if(!(isImage && yearIsNumber)){
                    if(!yearIsNumber){
                        alert("La fecha debe ser Numerica")
                    }
                    if(!isImage){
                        alert("URL DE IMG NO VALIDA")
                    }
                    return
                }
                 //CAMBIAR EL MOVIES.LENGHT CUANDO SE CREE LA BASE DE DATOS, NO PASAR ID
                 const newMovie = new Movie(movies.length+1,inputTitle.toUpperCase(),Number(inputYear),inputURL,inputDescription)
                 postData(URLMovies, newMovie);
                 cleanData()
                 ReloadMovies()
                 setModalAddMovie(false)

            }catch(error){
                alert(error)
            }
        }
    }

    const openDescription=(id,titulo,año,url,description)=>{
        if(modalInfoDescription.id === id){
            modalDescriptionOpen ? setModalDescriptionOpen(false) :setModalDescriptionOpen(true)
            setModifying(false)
        }else{
            setModifying(false)
            setModalDescriptionOpen(true)
        }
        setModalInfoDescription({id:id,titulo:titulo,año:año,url:url,description:description})
    }

    const closeDescription = ()=>{
        setModalDescriptionOpen (false)
        setModalInfoDescription({})
    }
    const deleteMovie = ()=>{
        deleteData(`${URLMovies}/${modalInfoDescription.id}`)
        ReloadMovies()
        setModalDescriptionOpen(false)
    }
    const openModify = ()=>{
        setModifying(state => !state)
        //quitar luego del modificar
        setInputTitleModifying(modalInfoDescription.titulo)
        setInputYearModifying(modalInfoDescription.año)
        setInputDescriptionModifiying(modalInfoDescription.description)
    }
    const cancelModifyButton=()=>{
        setModifying(false)
        setInputTitleModifying("")
        setInputYearModifying("")
        setInputURLModifying("")
        setInputDescriptionModifiying("")
    }

    //modifica la movie
    const modificarMovie =()=>{
        try{

            if(inputURLModifying===""){
                let newMovie = new Movie(modalInfoDescription.id,inputTitleModifying.toUpperCase(),Number(inputYearModifying),modalInfoDescription.url,inputDescriptionModifiying)
                putData(URLMovies, newMovie);
            }else{
                let newMovie = new Movie(modalInfoDescription.id,inputTitleModifying.toUpperCase(),Number(inputYearModifying),inputURLModifying,inputDescriptionModifiying)
                putData(URLMovies, newMovie);
            }
            
            

        }catch(error){
            console.error(error); 
        }
        ReloadMovies()
        setModalDescriptionOpen(false)
        setInputURLModifying("")
    }

    const modificarMovieLogic=()=>{
        const titulo = modalInfoDescription.titulo===inputTitleModifying
        // eslint-disable-next-line
        const año = modalInfoDescription.año==inputYearModifying
        const url = inputURLModifying === ""
        const descripcion = modalInfoDescription.description===inputDescriptionModifiying

        //Verifica algun cambio
        if(titulo && año && url && descripcion){
            alert("Debes hacer a algun cambio, titulo año o descripcion.")
            return
        }

        //verificar si la url o el año son validos
        const yearIsNumber = !isNaN(Number(inputYearModifying));
        if(!url || !yearIsNumber){
            if(!url){
                const isImage = isImageURL(inputURLModifying)
                if(!isImage){
                    alert("La URL no posee una imagen valida")
                    return
                }
            }
            if(!yearIsNumber){
                console.log(inputYearModifying)
                alert("El AÑO no es un numero")
                return
            }
        }

        setModalConfirm(true)
        
    }


    const values = {
        movies, 
        searchInput,
        loading,
        modalMenu,
        modalAddMovie,
        filtredMovies,
        setSearchInputValue,
        ReloadMovies,
        MenuButtonInteraction,
        AddMovieButtonInteraction,
        effectRef,
        backButtonInteraction,
        inputTitle,
        setInputTitle,
        inputYear,
        setInputYear,
        inputURL,
        setInputURL,
        inputDescription,
        setInputDescription,
        cleanData,
        cancelButton,
        addMovie,
        modalDescriptionOpen,
        openDescription,
        modalInfoDescription,
        closeDescription,
        deleteMovie,
        modifying,
        setModifying,
        openModify,
        inputTitleModifying,
        setInputTitleModifying,
        inputYearModifying,
        setInputYearModifying,
        inputURLModifying,
        setInputURLModifying,
        inputDescriptionModifiying,
        setInputDescriptionModifiying,
        cancelModifyButton,
        modalConfirm,
        setModalConfirm,
        modificarMovieLogic,
        modificarMovie
    } 
    return (
        <MoviesContext.Provider value={values}>
            {children}
        </MoviesContext.Provider>
    )
}

export {MoviesContext,MoviesContextProvider}