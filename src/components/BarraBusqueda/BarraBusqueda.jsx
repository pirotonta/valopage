const BarraBusqueda = ({ setBusqueda }) => {
    const handleChange = (cambio) => {
      setBusqueda(cambio.target.value);
    };
  
    return (
      <div className={"w-full max-w-sm min-w-[200px]"}>
        <input class="w-full bg-transparent placeholder:text-zinc-400 text-white-700 text-sm border border-zinc-200 rounded-md pl-2 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-zinc-400 hover:border-zinc-300 shadow-sm focus:shadow"
          type="text"
          placeholder="buscar..."
          onChange={handleChange}
        />
      </div>
    );
  }
  
  export default BarraBusqueda;