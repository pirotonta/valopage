import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className="text-zinc-400 bg-zinc-950 h-70 flex flex-col justify-center items-center p-6 mt-4">
            <div className="text-center mt-5">
                <p className="text-lg font-bold">
                    {t("footer.message")}
                </p>
            </div>

            <div className="flex justify-center mt-10">
                <p>
                    {t("footer.collaborators")}
                </p>
            </div>

            <div className="flex justify-center space-x-15">
                <div className="flex items-center space-x-1 mt-2">
                    <img className="w-15" src="./src/assets/github.svg" alt="icono-github" />
                    <a className="font-semibold "
                        href="https://github.com/pirotonta"
                        target="_blank">
                        pirotonta
                    </a>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                    <img className="w-15" src="./src/assets/github.svg" alt="icono-github" />
                    <a className="font-semibold "
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