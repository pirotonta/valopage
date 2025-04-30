export const getAgruparArmas = ({ armas }) => {

    const categorias = {
        heavy: [],
        rifle: [],
        shotgun: [],
        sidearm: [],
        sniper: [],
        smg: [],
        melee: [],
    };

    armas.forEach((arma) => {
        const categoriaArmaActual = arma.category?.split("::")[1]?.toLowerCase();

        if (categoriaArmaActual && categorias[categoriaArmaActual]) {
            categorias[categoriaArmaActual].push(arma);
        }
    });

    return categorias;
}