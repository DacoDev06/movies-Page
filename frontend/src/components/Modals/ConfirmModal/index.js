import { createPortal } from "react-dom"
import './ConfirmModal.css'
const ConfirmModal = ({children})=>{
    return createPortal(
        <div className="ConfirmModal">
            {children}
        </div>
    ,document.getElementById('modal-confirm')
)
}
export {ConfirmModal}