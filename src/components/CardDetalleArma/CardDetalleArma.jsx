import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import getArmasByUUID from "../../services/getArmasByUUID";
import CardArma from "../CardArma/CardArma";

const CardDetalleArma = ({ uuid, favoritos = false, reRenderSkinDisplay }) => {
    const [arma, setArma] = useState(null);
    const [skinDisplay, setSkinDisplay] = useState({ displayIcon: '', displayName: '', skinUuid: '' });
    const [skinElegida, setSkinElegida] = useState({ displayIcon: '', displayName: '', skinUuid: '' });
    const { t } = useTranslation();
    const STORAGE_KEY = "preferreddisplayskins";

    useEffect(() => {
        const fetchArma = async () => {
            const armaData = await getArmasByUUID(uuid);
            setArma(armaData);
            const defaultSkin = armaData.displayIcon;
            if (defaultSkin){
                if (favoritos) {
                    const skinsGlobal = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
                    const guardada = skinsGlobal.find(skinGlobal => skinGlobal.uuid === uuid);
                    
                    const skinElegida = guardada?.skin || { displayIcon: defaultSkin, displayName: armaData.displayName, skinUuid: armaData.defaultSkinUuid };
        
                    setSkinDisplay(skinElegida);
                    setSkinElegida(skinElegida);
                } else setSkinDisplay({ displayIcon: defaultSkin, displayName: armaData.displayName, skinUuid: armaData.defaultSkinUuid });
            }
        };
        fetchArma();
    }, [uuid]);

    if (!arma) return <div>loading.</div>;

    const stats = arma.weaponStats;

    const onClickSkinHandler = (skin) => {
        if (skin.uuid == arma.defaultSkinUuid) {
            setSkinDisplay({ displayIcon: arma.displayIcon, displayName: arma.displayName, skinUuid: arma.defaultSkinUuid })
        } else setSkinDisplay({ displayIcon: skin.displayIcon, displayName: skin.displayName, skinUuid: skin.uuid });
    }

    const favs = favoritos? JSON.parse(localStorage.getItem("favoritos") || "[]") : [];

    const skinsFiltradas = arma.skins.filter(skin =>
        skin.displayIcon &&
        !skin.displayName.toLowerCase().includes("random") &&
        (!favoritos || favs.includes(skin.uuid))
    );
    
    const onClickSetDisplayHandler = (skin) => {

            let current;
            try {
                current = JSON.parse(localStorage.getItem(STORAGE_KEY));
                if (!Array.isArray(current)) current = [];
            } catch (e) {
                current = [];
            }

            const nuevaSkin = skin.uuid == skinElegida.skinUuid ? 
                {displayIcon: arma.displayIcon, displayName: arma.displayName, skinUuid: arma.defaultSkinUuid} : 
                {displayIcon: skin.displayIcon, displayName: skin.displayName, skinUuid: skin.uuid};

            const skinsUpdateadas = [...current.filter(skinDisplay => skinDisplay.uuid !== arma.uuid),
                {uuid, skin: nuevaSkin}
            ]

            localStorage.setItem(STORAGE_KEY, JSON.stringify(skinsUpdateadas));

            setSkinElegida(nuevaSkin);
            setSkinDisplay(nuevaSkin);

            if (reRenderSkinDisplay) reRenderSkinDisplay();
    }

    return (
        <div className="card-detalles-arma h-full">
            <div className="nombre-arma justify-center flex">
                {skinDisplay.displayName}
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-center mb-5">
                <div className="flex skin-seleccionada items-center justify-center">   
                    <img
                        src={skinDisplay.displayIcon}
                        alt={`${skinDisplay.displayName} skin`}
                        className="h-50 rounded-lg border my-4 p-5 border-zinc-700"
                    />
                </div>
                {stats && (
                    <div className="grid grid-cols-2 gap-4 text-sm bg-zinc-800 p-4 rounded-xl m-5">
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
            </div>

            <div className="skins-arma grid grid-cols-3 gap-2 p-2 bg-zinc-800 rounded-xl overflow-y-scroll max-h-96">
                {(favoritos && skinsFiltradas.length === 0) ? (
                    <div>no hay favoritos</div>
                ) : (
                    skinsFiltradas.map((skin, index) => {
                        const seleccionada = skin.uuid === skinDisplay.skinUuid;
                        const onDisplay = skin.uuid === skinElegida.skinUuid;
                        return (
                            <div key={index} className={`flex rounded-md overflow-hidden border-2 transition duration-200 max-h-60 
                            ${seleccionada ? "border-blue-500" : "border-transparent"}`}>
                                {skin.uuid === arma.defaultSkinUuid ? (
                                    <CardArma nombreArma={`Standard ${arma.displayName}`} imagenArma={arma.displayIcon} size="details"
                                        onClick={() => onClickSkinHandler(skin)} detalle={true} uuid={skin.uuid} 
                                        setDisplay={() => onClickSetDisplayHandler(skin)} displayed={onDisplay}
                                        estamosEnFavoritos={favoritos}
                                    />
                                ) : (
                                    <CardArma nombreArma={skin.displayName} imagenArma={skin.displayIcon} size="details"
                                        onClick={() => onClickSkinHandler(skin)} detalle={true} uuid={skin.uuid} 
                                        setDisplay={() => onClickSetDisplayHandler(skin)} displayed={onDisplay}
                                        estamosEnFavoritos={favoritos}/>
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