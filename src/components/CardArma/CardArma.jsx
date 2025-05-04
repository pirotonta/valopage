import Boton from "../Boton/Boton";
import { HeartIcon } from "lucide-react";
import { CircleCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";


const CardArma = ({ nombreArma, imagenArma, onClick, size="home", detalle = false, uuid = '', 
    tieneFavoritos = false, displayed = false, setDisplay, estamosEnFavoritos = false}) => {
    const [favorito, setFavorito] = useState(false);

    const sizes = {
        home: "w-80 h-40",
        details: "w-full h-40",
    };

    const dimensiones = sizes[size];

    useEffect(() => {
        const faveados = JSON.parse(localStorage.getItem("favoritos") || "[]");
        setFavorito(faveados.includes(uuid));
    }, [uuid]);

    const onClickFavHandler = (uuid) => {
        const faveados = JSON.parse(localStorage.getItem("favoritos") || "[]");
        let nuevosFaveados;

        if (favorito) {
            nuevosFaveados = faveados.filter(id => id !== uuid);
        } else {
            nuevosFaveados = [...faveados, uuid];
        }

        localStorage.setItem("favoritos", JSON.stringify(nuevosFaveados));
        setFavorito(!favorito);
    }

    return (
        <div className={`${dimensiones} relative bg-gradient-to-r from-zinc-800 to-zinc-950 border shadow-md overflow-hidden 
        group cursor-pointer ${tieneFavoritos? 'shadow-blue-700/45 border-zinc-950' : 'border-zinc-950'}`}>
            <div className="absolute top-[5px] right-[5px] h-10 z-99">
            <div className="grid grid-row gap-1">
                {detalle && (<Boton title={`${favorito ? "sacar de favoritos" : "favoritear"}`} iconStyling={`w-6 h-6 ${favorito ? "fill-red-500" : "fill-none"} stroke-white-500 cursor-pointer`} icon={HeartIcon} 
            onClick={() => onClickFavHandler(uuid)}/>)}
                {detalle && estamosEnFavoritos && (<Boton title={`${displayed ? "volver al default" : "usar esta skin"}`} icon={CircleCheckIcon} 
                iconStyling={`w-6 h-6 ${displayed ? "fill-green-500" : "fill-none"} stroke-white-500 cursor-pointer`} onClick={setDisplay}/>)
                }
            </div>
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
