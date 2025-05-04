import Style from './Modal.module.css';
import Boton from '../Boton/Boton';
import { CircleX } from 'lucide-react';

const Modal = ({ children, cerrarModal }) => {

    return (
        <div className={"fixed inset-0 z-50 flex items-center justify-center bg-black/50"} onClick={cerrarModal}>
            <div className={"bg-zinc-900 rounded-xl w-[60vw] shadow-lg max-h-[90vh] overflow-hidden p-6"}>
                <div className={Style["el-boton"]}>
                    <Boton texto="Cerrar" icon={CircleX} onClick={cerrarModal} />
                </div>
                <div className={Style["el-contenido-fr"]} onClick={(event) => event.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;