import { useNavigate, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import i18n from '../../i18n';
import style from './Header.module.css';

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
                <ul className="ml-15 flex text-lg font-semibold ">

                    <div className='flex justify-center items-center'>
                        <NavLink
                            to="/"
                            className='flex items-center gap-2'
                        >
                            <img className='w-15' src='./src/assets/valorant-logo.png' />
                            <p className="font-semibold text-3xl text-zinc-400">VALOPAGE</p>
                        </NavLink>
                    </div>

                    <li className="ml-15 w-50">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `cursor-pointer p-6 flex justify-center items-center ${isActive && 'border-b-4 border-red-800 text-zinc-200 bg-zinc-900'}`
                            }
                        >
                            {t("header.navbar.home")}
                        </NavLink>
                    </li>
                    <li className="w-50">
                        <NavLink
                            to="/inventory"
                            end
                            className={({ isActive }) =>
                                `cursor-pointer p-6 flex justify-center items-center ${isActive && 'border-b-4 border-red-800 text-zinc-200 bg-zinc-900'}`
                            }
                        >
                            {t("header.navbar.inventory")}
                        </NavLink>
                    </li>
                </ul>

                <div className="relative">
                    <button
                        className="idiomas flex gap-2 cursor-pointer items-center mr-15"
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
                        <div className="idiomas absolute top-12 left-5 bg-zinc-800 shadow-lg rounded-lg p-2 flex flex-col z-50">
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
