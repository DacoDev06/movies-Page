import { createPortal } from "react-dom";
import './modalDescription.css'

function ModalDescription({children}){
    return createPortal(
        <div className="ModalDescription">
            {children}
        </div>
        ,document.getElementById('Description-modal')
    )
}

export {ModalDescription}