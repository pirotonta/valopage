import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CardArma from "../../components/CardArma/CardArma";
import { getArmas } from "../../services/getArmas";
import getAgruparArmas from "../../services/getAgruparArmas";

const Favoritos = () => {
    const [armas, setArmas] = useState([]);
    const [armasAgrupadas, setArmasAgrupadas] = useState([])
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArmas = async () => {
            const armas = await getArmas();
            const armasAgrupadas = getAgruparArmas(armas);
            setArmas(armas);
            setArmasAgrupadas(armasAgrupadas);
        };
        fetchArmas();
    }, []);

    return (

        // como placeholder le copie y pegue todo lo del home. la idea es que refleje si hay skins favoriteados
        // de cada arma - señalar visualmente que los hay, y que sea posible para el usuario cambiar el arma 
        // displayed on the card - como armar una rep visual del inventario
          
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">

            {armasAgrupadas.length != 0 ? (
                <div className='flex justify-center max-w-screen-xl w-full'>
                    <div className='flex flex-row h-full justify-center'>
                        {armasAgrupadas.map(({ columna, grupos }) => (
                            <div key={columna} className='flex flex-col'>
                                {grupos.map(({categoria, armas}) => 
                                <div key={categoria} className="flex flex-col gap-4 p-4 rounded-xl">
                                    <h2>{categoria.toUpperCase()}</h2>
                                    <div >
                                        {armas.map((arma) => (
                                            <div key={arma.uuid}>
                                                <CardArma
                                                    nombreArma={arma.displayName}
                                                    imagenArma={arma.displayIcon}
                                                    onClick={() => onClickArmaHandler(arma.displayName)}
                                                />
                                            </div>
                                        ))}
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