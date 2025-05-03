const getArmasByUUID = async (weaponUuid) => {
    try {
        const response = await fetch(`https://valorant-api.com/v1/weapons/${weaponUuid}`);
        const arma = await response.json();
        return arma.data;
    } catch (error) {
        console.error("Error al traer el arma:", error);
        return [];
    }
};


export default getArmasByUUID