import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CardArma from "../../components/CardArma/CardArma";
import Titulo from "../../components/Titulo/Titulo";
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
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 mb-4">

            {modal && <Modal cerrarModal={onClickModalHandler}>
                <CardDetalleArma uuid={armaSeleccionada} favoritos={true} reRenderSkinDisplay={reRenderSkinDisplay} />
            </Modal>}

            {armasAgrupadas.length != 0 ? (
                <>
                    <Titulo texto={t("inventory.title")} />
                    <div className='mt-2 flex justify-center max-w-screen-xl w-full'>
                        <div className='flex flex-row h-full justify-center'>
                            {armasAgrupadas.map(({ columna, grupos }) => (
                                <div key={columna} className='flex flex-col'>
                                    {grupos.map(({ categoria, armas }) =>
                                        <div key={categoria} className="flex flex-col p-4 rounded-xl">
                                            <h2 className="text-center text-xl text-shadow-lg"> {t(`categories.${categoria}`)}</h2>
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
                </>
            ) : (
                <h1>{t("messages.loading")}</h1>
            )}

        </div>
    );
}

export default Favoritos;