export const getArmas = async () => {
    try {
        const response = await fetch("https://valorant-api.com/v1/weapons");
        const armas = await response.json();
        return armas.data;
    } catch (error) {
        console.error("Error al traer las armas:", error);
        return [];
    }
};