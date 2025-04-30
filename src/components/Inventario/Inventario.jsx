import CardArma from "../CardArma/CardArma";
import { getAgruparArmas } from "../../services/getAgruparArmas";

const Inventario = (armas) => {

    const categorias = getAgruparArmas(armas);

    // aca pone categorias.smg o lo q sea para chusmear (están todas las categorias en la función
    // de agrupar armas) te retorna objetos correspondientes a cada categoria
    console.log(categorias.rifle);

    return <h1>llaves de mierda</h1>;
}

export default Inventario;