import Boton from "../Boton/Boton";
import { useTranslation } from "react-i18next";
import { HeartIcon } from "lucide-react";
import { CircleCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../Modalcito/Modal"

const CardArma = ({ nombreArma, imagenArma, onClick, size = "home", detalle = false, uuid = '',
    tieneFavoritos = false, displayed = false, setDisplay, estamosEnFavoritos = false,
    favorito = false, listaFavoritos = [], favoritosHandler }) => {

    const [unequipModal, setUnequipModal] = useState(false);
    const { t } = useTranslation();

    const sizes = {
        home: "w-80 h-40",
        details: "w-full h-40",
    };

    const dimensiones = sizes[size];

    return (
        <div className={`${dimensiones} relative overflow-hidden group cursor-pointer 
          ${tieneFavoritos ? 'border-b-4 border-red-800' : 'border-zinc-950'}`}>
            {unequipModal && <Modal cerrarModal={() => setUnequipModal(false)} chiquito={true}>{t("card.messages.mustUnequip")}</Modal>}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-zinc-950 opacity-90 z-0" />
            <div className="absolute top-[5px] right-[5px] h-10 z-30">
                <div className="grid grid-row gap-1">
                    {detalle && (
                        <Boton
                            title={`${favorito ? t("card.buttons.notFavorite") : t("card.buttons.favorite")}`}
                            iconStyling={`w-6 h-6 ${favorito ? "fill-red-800/75" : "fill-none"} duration-300 transition hover:fill-red-400/50 stroke-red-800 cursor-pointer`}
                            icon={HeartIcon}
                            onClick={() => {displayed ? setUnequipModal(true) : favoritosHandler(uuid)}}
                        />
                    )}
                    {detalle && estamosEnFavoritos && (
                        <Boton
                            title={`${displayed ? t("card.buttons.remove") : t("card.buttons.equip")}`}
                            icon={CircleCheckIcon}
                            iconStyling={`w-6 h-6 ${displayed ? "fill-red-800/50 stroke-red-800" : "fill-none"} stroke-red-800 cursor-pointer`}
                            onClick={setDisplay}
                        />
                    )}
                </div>
            </div>
            <img
                src={imagenArma}
                alt={nombreArma}
                className="absolute inset-0 w-full h-full object-contain p-4 z-10 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1"
                onClick={onClick}
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/40  px-4 py-1 z-20 group-hover:bg-zinc-950">
                <h3 className="text-white text-sm tracking-widest">{nombreArma.toUpperCase()}</h3>
            </div>
        </div>
    );
};

export default CardArma;
