import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../const/routes";

const Home = () => {
    const [armas, setArmas] = useState([]);
    const [armasFiltradas, setArmasFiltradas] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [inventario, setInventario] = useState([]);

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
            <h1>chumbos</h1>
            {armas.length != 0 ? (
                <div className='center'>
                    {armas.map((arma) => (
                        <div key={arma.uuid}>
                            <h2>{arma.displayName}</h2>
                            <img
                                src={arma.displayIcon}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export default Home;