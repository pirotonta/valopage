import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import getArmasByUUID from "../../services/getArmasByUUID";
import CardArma from "../CardArma/CardArma";
import BarraBusqueda from "../BarraBusqueda/BarraBusqueda";

const CardDetalleArma = ({ uuid, favoritos = false, reRenderSkinDisplay }) => {
    const [arma, setArma] = useState(null);
    const [skinDisplay, setSkinDisplay] = useState({ displayIcon: '', displayName: '', skinUuid: '' });
    const [skinElegida, setSkinElegida] = useState({ displayIcon: '', displayName: '', skinUuid: '' });
    const [busqueda, setBusqueda] = useState("");
    const [listaFavs, setListaFavs] = useState([]);
    const [actualizarFavs, setActualizarFavs] = useState(false);
    const { t } = useTranslation();
    const STORAGE_KEY = "preferreddisplayskins";

    useEffect(() => {
        const fetchArma = async () => {
            const armaData = await getArmasByUUID(uuid);
            setArma(armaData);
        };
        fetchArma();
    }, [uuid]);

    useEffect(() => {
        if (!arma) return;

        const skinDefault = {
            displayIcon: arma.displayIcon,
            displayName: arma.displayName,
            skinUuid: arma.defaultSkinUuid
        };

        if (favoritos) {
            const skinsGlobal = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            const guardada = skinsGlobal.find(skin => skin.uuid === uuid);
            const equipada = guardada?.skin || skinDefault;

            setSkinDisplay(equipada);
            setSkinElegida(equipada);
        } else {
            setSkinDisplay(skinDefault);
            setSkinElegida(skinDefault);
        }
    }, [arma, listaFavs]);

    useEffect(() => {
        if (favoritos) {
            const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");
            setListaFavs(favs);
        }
    }, [favoritos, actualizarFavs]);

    if (!arma) return <div>{t("messages.loading")}</div>;

    const stats = arma.weaponStats;

    const onClickSkinHandler = (skin) => {
        if (skin.uuid == arma.defaultSkinUuid) {
            setSkinDisplay({ displayIcon: arma.displayIcon, displayName: arma.displayName, skinUuid: arma.defaultSkinUuid })
        } else setSkinDisplay({ displayIcon: skin.displayIcon, displayName: skin.displayName, skinUuid: skin.uuid });
    }

    const reRenderFavs = () => {
        setActualizarFavs(prev => !prev)
    };

    const onClickSetDisplayHandler = (skin) => {

        let current;
        try {
            current = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!Array.isArray(current)) current = [];
        } catch (e) {
            current = [];
        }

        const nuevaSkin = skin.uuid == skinElegida.skinUuid ?
            { displayIcon: arma.displayIcon, displayName: arma.displayName, skinUuid: arma.defaultSkinUuid } :
            { displayIcon: skin.displayIcon, displayName: skin.displayName, skinUuid: skin.uuid };

        const skinsUpdateadas = [...current.filter(skinDisplay => skinDisplay.uuid !== arma.uuid),
        { uuid, skin: nuevaSkin }
        ]

        localStorage.setItem(STORAGE_KEY, JSON.stringify(skinsUpdateadas));

        setSkinElegida(nuevaSkin);
        setSkinDisplay(nuevaSkin);

        if (reRenderSkinDisplay) reRenderSkinDisplay();
    }

    const busquedaHandler = (texto) => {
        setBusqueda(texto.toLowerCase());
    }

    const skinsFiltradas = arma.skins.filter(skin =>
        skin.displayIcon &&
        !skin.displayName.toLowerCase().includes("random") &&
        (!favoritos || listaFavs.includes(skin.uuid)) &&
        skin.displayName.toLowerCase().includes(busqueda)).sort((a, b) => {
            if (a.uuid === skinElegida.skinUuid) return -1;
            if (b.uuid === skinElegida.skinUuid) return 1;
            return 0;
        })



    return (
        <div className="card-detalles-arma h-full">
            <div className="text-2xl nombre-arma justify-center flex my-5">
                {skinDisplay.displayName.toUpperCase()}
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-center mb-5">
                <div className="flex h-50 w-150 skin-seleccionada items-center justify-center ">
                    {skinDisplay.displayIcon ? (
                        <img
                            src={skinDisplay.displayIcon}
                            alt={`${skinDisplay.displayName} skin`}
                            className="w-full h-full object-contain rounded-lg bg-zinc-950 my-4 p-5"
                        />
                    ) : null}
                </div>
                <div className="text-sm bg-zinc-950 p-4 rounded-xl m-5">
                    {stats && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-zinc-400">  {t("card.details.fireRate")}</span>
                                <div>{stats.fireRate}</div>
                            </div>
                            <div>
                                <span className="text-zinc-400">  {t("card.details.magazineSize")}</span>
                                <div>{stats.magazineSize}</div>
                            </div>
                            <div>
                                <span className="text-zinc-400">  {t("card.details.reloadTime")}</span>
                                <div>{stats.reloadTimeSeconds}s</div>
                            </div>
                            <div>
                                <span className="text-zinc-400">  {t("card.details.equipTime")}</span>
                                <div>{stats.equipTimeSeconds}s</div>
                            </div>
                        </div>
                    )}
                    <div className="place-self-center col-span-2 mt-5">
                        <BarraBusqueda setBusqueda={busquedaHandler} />
                    </div>
                </div>
            </div>

            <div className="skins-arma grid grid-cols-3 gap-2 p-2  rounded-xl overflow-y-scroll max-h-96">
                {(skinsFiltradas.length === 0) ? (
                    <div>{busqueda ? t("favorites.noSkinFound") : t("favorites.message")}</div>
                ) : (
                    skinsFiltradas.map((skin, index) => {
                        const seleccionada = skin.uuid === skinDisplay.skinUuid;
                        const onDisplay = skin.uuid === skinElegida.skinUuid;
                        return (
                            <div key={index} className={`flex overflow-hidden border-2 transition duration-200 max-h-60 
                            ${seleccionada ? "border-red-800" : "border-transparent"}`}>
                                {skin.uuid === arma.defaultSkinUuid ? (
                                    <CardArma nombreArma={`Standard ${arma.displayName}`} imagenArma={arma.displayIcon} size="details"
                                        onClick={() => onClickSkinHandler(skin)} detalle={true} uuid={skin.uuid}
                                        setDisplay={() => onClickSetDisplayHandler(skin)} displayed={onDisplay}
                                        estamosEnFavoritos={favoritos} reRenderFavs={reRenderFavs}
                                    />
                                ) : (
                                    <CardArma nombreArma={skin.displayName} imagenArma={skin.displayIcon} size="details"
                                        onClick={() => onClickSkinHandler(skin)} detalle={true} uuid={skin.uuid}
                                        setDisplay={() => onClickSetDisplayHandler(skin)} displayed={onDisplay}
                                        estamosEnFavoritos={favoritos} reRenderFavs={reRenderFavs} />
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )


};

export default CardDetalleArma;