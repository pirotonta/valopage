const Titulo = ({ texto }) => {
    return (
        <div className="text-2xl p-2 m-3 w-full text-center bg-[linear-gradient(to_right,rgba(9,9,11,0)_0%,rgba(9,9,11,1)_30%,rgba(9,9,11,1)_70%,rgba(9,9,11,0)_100%)]">
            {texto}
        </div>
    );
};

export default Titulo;
