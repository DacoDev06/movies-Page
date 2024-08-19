import './MenuModal.css'
import {createPortal} from 'react-dom';
const MenuModal = ({children})=>{
    return createPortal(
        <div className='MenuModal'>
            {children}
        </div>,document.getElementById('menu-modal')

    )
}
export {MenuModal}