import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import getArmasByUUID from "../../services/getArmasByUUID";
import CardArma from "../CardArma/CardArma";

const CardDetalleArma = ({ uuid }) => {
    const [arma, setArma] = useState(null);
    const [skin, setSkin] = useState({ displayIcon: '', displayName: '' });
    const { t } = useTranslation();

    useEffect(() => {
        const fetchArma = async () => {
            const armaData = await getArmasByUUID(uuid);
            setArma(armaData);
            const defaultSkin = armaData.displayIcon;
            if (defaultSkin) {
                setSkin({ displayIcon: defaultSkin, displayName: armaData.displayName });
            }
        };

        fetchArma();
    }, [uuid]);

    if (!arma) return <div>loading.</div>;

    const stats = arma.weaponStats;

    const onClickSkinHandler = (skin) => {
        if (skin.uuid == arma.defaultSkinUuid) {
            setSkin({ displayIcon: arma.displayIcon, displayName: arma.displayName })
        } else setSkin({ displayIcon: skin.displayIcon, displayName: skin.displayName });
    }


    return (
        <div className="card-detalles-arma h-full">
            <div className="nombre-arma justify-center flex">
                {skin.displayName}
            </div>
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-center mb-5">
                <div className="flex skin-seleccionada items-center justify-center">
                    <img
                        src={skin.displayIcon}
                        alt={`${skin.displayName} skin`}
                        className="h-50 rounded-lg border my-4 p-5 border-zinc-700"
                    />
                    { }
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
                {arma.skins.filter(skin => skin.displayIcon &&
                    !skin.displayName.toLowerCase().includes("random")).map((skin, index) => (
                        <div className="flexrounded-md overflow-hidden border-2 transition duration-200 max-h-60">
                            {skin.uuid == arma.defaultSkinUuid ? (
                                <CardArma key={index} nombreArma={`Standard ${arma.displayName}`} imagenArma={arma.displayIcon} width={1 / 3}
                                    onClick={() => onClickSkinHandler(skin)} detalle={true} uuid={skin.uuid} />
                            ) : (
                                <CardArma key={index} nombreArma={skin.displayName} imagenArma={skin.displayIcon} width={1 / 3}
                                    onClick={() => onClickSkinHandler(skin)} detalle={true} uuid={skin.uuid} />
                            )}

                        </div>
                    )
                    )}
            </div>
        </div>
    )


};

export default CardDetalleArma;