import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import i18n from '../../i18n';

const Header = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [idiomaActual, setIdiomaActual] = useState(i18n.language);
    const [menuIdiomaAbierto, setMenuIdiomaAbierto] = useState(false);

    const cambiarIdioma = (idioma) => {
        i18n.changeLanguage(idioma);
        setIdiomaActual(idioma);
        setMenuIdiomaAbierto(false);
    };

    return (
        <div className="sticky top-0 bg-zinc-950 z-50">
            <nav className="flex items-center justify-between">
                <ul className="ml-15 flex text-zinc-400 text-lg font-semibold ">

                    <div className='flex justify-center items-center'>
                        <img className='w-15' src='./src/assets/valorant-logo.png' />
                        <p className="font-semibold text-3xl" >VALOPAGE</p>
                    </div>

                    <li className="ml-15 w-50">
                        <p
                            className="cursor-pointer p-6 hover:bg-zinc-900 flex justify-center items-center"
                            onClick={() => navigate('/')}
                        >
                            {t("header.navbar.home")}
                        </p>

                    </li>
                    <li className="w-50">
                        <p
                            className="cursor-pointer p-6 hover:bg-zinc-900 flex justify-center items-center"
                            onClick={() => navigate('/favoritos')}
                        >
                            {t("header.navbar.favorites")}
                        </p>
                    </li>
                </ul>

                <div className="relative">
                    <button
                        className="flex gap-2 cursor-pointer items-center mr-15"
                        aria-label="cambiar idioma"
                        onClick={() => setMenuIdiomaAbierto(!menuIdiomaAbierto)}
                    >
                        <img
                            src={
                                idiomaActual === 'es'
                                    ? './src/assets/flag-argentina.svg'
                                    : '/src/assets/flag-usa.svg'
                            }
                            className="w-5"
                        />
                        <img
                            src="./src/assets/down-icon.svg"
                            className="w-5"
                        />
                    </button>

                    {menuIdiomaAbierto && (
                        <div className="absolute top-12 left-11 bg-zinc-800 shadow-lg rounded-lg p-2 flex flex-col z-50">
                            <img
                                src="./src/assets/flag-argentina.svg"
                                alt="ES"
                                className="w-7 cursor-pointer hover:opacity-70"
                                onClick={() => cambiarIdioma("es")}
                            />
                            <img
                                src="/src/assets/flag-usa.svg"
                                alt="EN"
                                className="w-7 cursor-pointer hover:opacity-70 mt-2"
                                onClick={() => cambiarIdioma("en")}
                            />
                        </div>
                    )}
                </div>
            </nav>
        </div>

    );
};

export default Header;
