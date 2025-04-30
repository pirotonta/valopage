const CardArma = ({ nombreArma, imagenArma }) => {
    return (
        <div className="w-80 h-40 relative bg-gradient-to-r from-zinc-800 to-zinc-950 border border-zinc-950 shadow-md overflow-hidden group cursor-pointer">
            <img
                src={imagenArma}
                alt={nombreArma}
                className="absolute inset-0 w-full h-full object-contain p-4 z-0 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1"
            />
            <div className="absolute bottom-0 left-0 w-full bg-zinc-950 px-4 py-1 z-10 group-hover:bg-black/40">
                <h3 className="text-white text-sm tracking-widest">{nombreArma.toUpperCase()}</h3>
            </div>
        </div>
    );
};

export default CardArma;
