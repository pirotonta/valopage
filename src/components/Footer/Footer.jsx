const Footer = () => {
    return (
        <div className="bg-red-900 sepia-30 h-70 flex flex-col justify-center items-center p-6 mt-4">
            <div className="text-center mt-5">
                <p className="text-white text-lg font-medium">Tené en tu lista de favoritos todas aquellas skins que querés, con nosotros, con Valopage.</p>
            </div>

            <div className="flex justify-center mt-10">
                <p className="text-white">Página fundada por las siguientes colaboradoras:</p>
            </div>

            <div className="flex justify-center space-x-15">
                <div className="flex items-center space-x-2 mt-5">
                    <img className="w-10" src="./src/assets/github.svg" alt="icono-github" />
                    <a className="text-white hover:underline"
                        href="https://github.com/pirotonta"
                        target="_blank">
                        pirotonta
                    </a>
                </div>
                <div className="flex items-center space-x-2 mt-5">
                    <img className="w-10" src="./src/assets/github.svg" alt="icono-github" />
                    <a className="text-white hover:underline"
                        href="https://github.com/MorenoGise"
                        target="_blank">
                        MorenoGise
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer;