import Modal from "../../components/Modalcito/Modal";
import CardDetalleArma from "../../components/CardDetalleArma/CardDetalleArma";
import { useTranslation } from "react-i18next";
import { getArmas } from "../../services/getArmas";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Details = () => {
    const { displayName } = useParams();
    const [arma, setArma] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchArma = async () => {
            try {
            const armas = await getArmas();

            const arma = armas.find(arma =>
                arma.displayName.toLowerCase() === displayName.toLowerCase()
            );

            if (!arma) throw new Error("no encontrada");

            setArma(arma);
        } catch (error){
            navigate("/404", {replace: true});
        }
        };
        fetchArma();
    }, []);

    const onClickModalHandler = () => {
        navigate("/");
    }

    return (
        <div>

        {(arma == null) ? (<div className="flex flex-col items-center justify-center w-full min-h-screen p-4">{t("messages.loading")}</div>) : (
            <Modal cerrarModal={onClickModalHandler}>
                <CardDetalleArma uuid={arma.uuid} />
            </Modal>
        )}
        
        </div>
    )
}

export default Details;