import { useNavigate, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import i18n from '../../i18n';
import { ChevronDown } from 'lucide-react';
import style from './Header.module.css';

const Header = () => {
    const { t } = useTranslation();
    const [idiomaActual, setIdiomaActual] = useState(i18n.language);

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
                            className='flex items-center transition-transform duration-300 hover:scale-105'
                        >
                            <img className='w-15' src='https://i.imgur.com/D1KD0mW.png' />
                            <img className='mt-1 w-60' src='https://i.imgur.com/XRZn3gu.png' />
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

                <div className="relative mr-15 w-fit">
                    <select
                        className="bg-zinc-800 text-white rounded-md px-4 py-2 pr-10 border border-zinc-700 focus:outline-none hover:bg-zinc-700 cursor-pointer appearance-none"
                        value={idiomaActual}
                        onChange={(e) => cambiarIdioma(e.target.value)}
                        aria-label="Seleccionar idioma"
                    >
                        <option value="es">ES</option>
                        <option value="en">EN</option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3 top-2.5" />
                </div>
            </nav>
        </div>

    );
};

export default Header;
