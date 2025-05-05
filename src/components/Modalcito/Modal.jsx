import Style from './Modal.module.css';
import Boton from '../Boton/Boton';
import { CircleX } from 'lucide-react';

const Modal = ({ children, cerrarModal, chiquito = false }) => {

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs`} onClick={cerrarModal}>
            <div className={`${chiquito ? "w-120" : "w-[60vw]"} rounded-md bg-zinc-900 shadow-lg max-h-[90vh] overflow-hidden p-6`}>
                <div className={"relative"}>
                    <Boton className={"absolute top-0 right-0"} texto="Cerrar" icon={CircleX} onClick={cerrarModal} iconStyling={`${chiquito ? "w-[20px] h-[20px]" : "w-[30px] h-[30px]"}stroke-zinc-300 cursor-pointer`} />
                </div>
                <div className={Style["el-contenido-fr"]} onClick={(event) => event.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;