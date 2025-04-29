const CardArma = ({ nombreArma, imagenArma }) => {
    return (
        <div className="bg-gradient-to-b from-zinc-100 to-zinc-200 rounded-2xl shadow-lg w-56 hover:shadow-2xl transition-shadow duration-300 border border-zinc-300">
            <img
                src={imagenArma}
                alt={nombreArma}
                className="w-full h-36 object-contain p-4 bg-white rounded-t-2xl"
            />
            <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-gray-700">{nombreArma}</h3>
            </div>
        </div>
    );
};

export default CardArma;
