const getAgruparArmas = (armas) => {

    const categorias = {
        sidearm: [],
        smg: [],
        shotgun: [],
        rifle: [],
        melee: [],
        sniper: [],
        heavy: [],
    };

    armas.forEach((arma) => {
        const categoriaArmaActual = arma.category?.split("::")[1]?.toLowerCase();

        if (categoriaArmaActual && categorias[categoriaArmaActual]) {
            categorias[categoriaArmaActual].push(arma);
        }
    });

    const columnas = {
        columna1: [
            { categoria: 'sidearm', armas: categorias.sidearm }
        ],
        columna2: [
            { categoria: 'smg', armas: categorias.smg},
            { categoria: 'shotgun', armas: categorias.shotgun }
        ],
        columna3: [
            { categoria: 'rifle', armas: categorias.rifle },
            { categoria: 'melee', armas: categorias.melee }
        ],
        columna4: [
            { categoria: 'sniper', armas: categorias.sniper },
            { categoria: 'heavy', armas: categorias.heavy }
        ]
    };

    const armasAgrupadas = Object.entries(columnas).map(([columna, grupos]) => ({columna, grupos,}));

    return armasAgrupadas;
}

export default getAgruparArmas;