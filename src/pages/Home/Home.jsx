import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import CardArma from "../../components/CardArma/CardArma";
import { getArmas } from "../../services/getArmas";
import getAgruparArmas from "../../services/getAgruparArmas";

const Home = () => {
    const [armas, setArmas] = useState([]);
    const [armasAgrupadas, setArmasAgrupadas] = useState([])
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchArmas = async () => {
            const armas = await getArmas();
            const armasAgrupadas = getAgruparArmas(armas);
            setArmas(armas);
            setArmasAgrupadas(armasAgrupadas);
        };
        fetchArmas();
    }, []);

    const onClickArmaHandler = (nombre) => {
        navigate(`/details/${nombre}`, {
            state: { backgroundLocation: location },
          });;
    }

    return (


          
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">

            {/* jadkjak no cache lo q querias hacer con el inventario y vomité todo acá..... SAWRY..... hay q cambiarlo*/}


            {armasAgrupadas.length != 0 ? (
                <div className='flex justify-center max-w-screen-xl w-full'>
                    <div className='flex flex-row h-full justify-center'>
                        {armasAgrupadas.map(({ columna, grupos }) => (
                            <div key={columna} className='flex flex-col '>
                                {grupos.map(({categoria, armas}) => 
                                <div key={categoria} className="flex flex-col p-4 rounded-xl">
                                    <h2 className="text-lg">{categoria.toUpperCase()}</h2>
                                    <div >
                                        {armas.map((arma) => (
                                            <div key={arma.uuid} className="mt-2">
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

export default Home;