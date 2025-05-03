import Boton from "../Boton/Boton";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";


const CardArma = ({ nombreArma, imagenArma, onClick, width = 80, height = 40, detalle = false, uuid = ''}) => {
    const dimensiones = "w-" + width + " h-" + height;
    const [favorito, setFavorito] = useState(false);

    const onClickFavHandler = (uuid) => {
        if (favorito){
            setFavorito(false);
        } else{
            setFavorito(true);
        }

        console.log(uuid);
        // terminar lo de favs...... me sleepi
    }


    return (
        <div className={`${dimensiones} relative bg-gradient-to-r from-zinc-800 to-zinc-950 border border-zinc-950 shadow-md overflow-hidden group cursor-pointer`}>
            <div className="absolute top-0 right-0 h-10 z-99">
            {detalle ? (<Boton iconStyling={`w-6 h-6 ${favorito ? "fill-red-500" : "fill-none"} stroke-white-500 cursor-pointer`} icon={HeartIcon} 
            onClick={() => onClickFavHandler(uuid)}/>) : (' ')}
            </div>
            <img
                src={imagenArma}
                alt={nombreArma}
                className="absolute inset-0 w-full h-full object-contain p-4 z-0 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1"
                onClick={onClick}
            />
            <div className="absolute bottom-0 left-0 w-full bg-zinc-950 px-4 py-1 z-10 group-hover:bg-black/40">
                <h3 className="text-white text-sm tracking-widest">{nombreArma.toUpperCase()}</h3>
            </div>
        </div>
    );
};

export default CardArma;
