import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../const/routes";
// el header el inventario y el footer

const Home = () => {
    const [armas, setArmas] = useState([]);
    const [armasFiltradas, setArmasFiltradas] = useState([]);
    // const [favoritos, setFavoritos] = useState([])
    // const [inventario, setInventario] = useState([])

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
        <>
            <h1>chumbos</h1>
            {armas ? (
                <div>
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
        </>

    );
}

export default Home;