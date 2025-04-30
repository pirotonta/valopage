import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Inventario from "../../components/Inventario/Inventario";
import CardArma from "../../components/CardArma/CardArma";
import { getArmas } from "../../services/getArmas";

const Home = () => {
    const [armas, setArmas] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchArmas = async () => {
            const armas = await getArmas();
            setArmas(armas);
        };
        fetchArmas();
    }, []);

    return (
        <div className="m-10">

            {/* lo comento xq todavia no anda xd */}
            {/* {armas.length != 0 ? (
                <Inventario armas={armas} />
            ) : (
                <p>{t("loading")}</p>
            )} */}

            {armas.length != 0 ? (
                <div className='flex flex-wrap justify-center items-center gap-6 p-6'>
                    {armas.map((arma) => (
                        <div key={arma.uuid}>
                            <CardArma nombreArma={arma.displayName} imagenArma={arma.displayIcon} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>{t("loading")}</p>
            )}

        </div>
    );
}

export default Home;