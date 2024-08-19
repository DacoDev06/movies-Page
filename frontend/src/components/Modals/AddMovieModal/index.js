import './AddMovieModal.css'

import { createPortal } from "react-dom"

const AddMovieModal = ({children})=>{
    return createPortal(
    <div className="AddMovieModal">
        {children}
    </div>
        ,document.getElementById('addMovie-modal'))

}
export {AddMovieModal}