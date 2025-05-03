import Modal from "../../components/Modalcito/Modal";
import CardDetalleArma from "../../components/CardDetalleArma/CardDetalleArma";
import { getArmas } from "../../services/getArmas";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Details = () => {
    const { displayName } = useParams();
    const [arma, setArma] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArma = async () => {
            const armas = await getArmas();

            const arma = armas.find(arma =>
                arma.displayName.toLowerCase() === displayName.toLowerCase()
            );

            setArma(arma);
        };
        fetchArma();
    }, []);

    const onClickModalHandler = () => {
        navigate("/");
    }


    return (
        <div>

        {(arma == null) ? (<div>loading</div>) : (
            <Modal cerrarModal={onClickModalHandler}>
                <CardDetalleArma uuid={arma.uuid} />
            </Modal>
        )}
        
        </div>
    )
}

export default Details;