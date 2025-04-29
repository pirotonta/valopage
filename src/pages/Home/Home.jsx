import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Titulo from "../../components/Titulo/Titulo";
import CardArma from "../../components/CardArma/CardArma";

const Home = () => {
    const [armas, setArmas] = useState([]);
    const [armasFiltradas, setArmasFiltradas] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [inventario, setInventario] = useState([]);
    const { t } = useTranslation();

    const getArmas = async () => {
        try {
            const response = await fetch("https://valorant-api.com/v1/weapons");
            const data = await response.json();
            setArmas(data.data);
            setArmasFiltradas(data.data);
        } catch (error) {
            console.error("Error al traer las armas:", error);
        }
    }

    useEffect(() => {
        getArmas();
    }, []);

    return (
        <div>
            <Titulo texto={t("title")} />

            {armas.length != 0 ? (
                <div className='flex flex-wrap justify-center items-center gap-6 p-6'>
                    {armas.map((arma) => (
                        <div key={arma.uuid}>
                            {/* cards provisorias xd */}
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