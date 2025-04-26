import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../const/routes"
// el header el inventario y el footer


const Home = () => {
    const [armas, setArmas] = useState([])
    const [armasFiltradas, setArmasFiltradas] = useState([])
    const [favoritos, setFavoritos] = useState([])
    const [inventario, setInventario] = useState([])


    useEffect(() => {

        // lo basico de lo basico
        const fetchArmas = async () => {
            try {
                const response = await fetch("https://valorant-api.com/v1/weapons")
                const data = await response.json()
                setArmas(data.data) 
                setArmasFiltradas(data.data)
            } catch (error) {
                console.error("Error al traer las armas:", error)
            }
        }
        fetchArmas()
    }, [])
}


export default Home