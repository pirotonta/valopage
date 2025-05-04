import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CardArma from "../../components/CardArma/CardArma";
import { getArmas } from "../../services/getArmas";
import getAgruparArmas from "../../services/getAgruparArmas";
import Modal from "../../components/Modalcito/Modal";
import CardDetalleArma from "../../components/CardDetalleArma/CardDetalleArma";

const Favoritos = () => {
    const [armas, setArmas] = useState([]);
    const [armasAgrupadas, setArmasAgrupadas] = useState([])
    const [favoritos, setFavoritos] = useState([]);
    const [modal, setModal] = useState(false);
    const [armaSeleccionada, setArmaSeleccionada] = useState(null);
    const [displayFavs, setDisplayFavs] = useState([]);
    const { t } = useTranslation();
    const STORAGE_KEY = "preferreddisplayskins";

    useEffect(() => {
        const fetchArmas = async () => {
            const armas = await getArmas();
            setArmas(armas);
            const armasAgrupadas = getAgruparArmas(armas);
            setArmasAgrupadas(armasAgrupadas);
        };
        fetchArmas();

        const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");
        setFavoritos(favs);

    }, []);

    useEffect(() => {
        reRenderSkinDisplay();
    }, []);

    const onClickModalHandler = () => {
        setModal(false);
        setArmaSeleccionada(null);
    };

    const onClickCardArmaHandler = (uuid) => {
        setArmaSeleccionada(uuid);
        setModal(true);
    };

    const reRenderSkinDisplay = () => {
        const actualizado = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        setDisplayFavs(actualizado);
    }

    return (

        // como placeholder le copie y pegue todo lo del home. la idea es que refleje si hay skins favoriteados
        // de cada arma - señalar visualmente que los hay, y que sea posible para el usuario cambiar el arma 
        // displayed on the card - como armar una rep visual del inventario
          
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">

            {modal && <Modal cerrarModal={onClickModalHandler}>
                <CardDetalleArma uuid={armaSeleccionada} favoritos={true} reRenderSkinDisplay={reRenderSkinDisplay}/>
            </Modal>}

            {armasAgrupadas.length != 0 ? (
                <div className='flex justify-center max-w-screen-xl w-full'>
                    <div className='flex flex-row h-full justify-center'>
                        {armasAgrupadas.map(({ columna, grupos }) => (
                            <div key={columna} className='flex flex-col'>
                                {grupos.map(({categoria, armas}) => 
                                <div key={categoria} className="flex flex-col gap-4 p-4 rounded-xl">
                                    <h2>{categoria.toUpperCase()}</h2>
                                    <div >
                                        {armas.map((arma) => {
                                            const skinDisplayPreferida = displayFavs.find(skinGuardadita => skinGuardadita.uuid == arma.uuid);
                                            const displayIcon = skinDisplayPreferida?.skin?.displayIcon || arma.displayIcon;
                                            return (<div key={arma.uuid} className="mt-2">
                                                <CardArma
                                                    nombreArma={arma.displayName}
                                                    imagenArma={displayIcon}
                                                    onClick={() => onClickCardArmaHandler(arma.uuid)}
                                                    tieneFavoritos={arma.skins?.some(skin => favoritos.includes(skin.uuid))}
                                                />
                                            </div>)
                                        }
                                        )}
                                    </div>
                                </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>{t("loading")}</p>
            )}

        </div>
    );
}

export default Favoritos;