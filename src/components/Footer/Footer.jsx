import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className="text-zinc-400 bg-zinc-950 h-100 flex flex-col justify-center items-center p-6 mt-4">
            <div className="text-center mt-15">
                <p className="text-xl font-bold">
                    {t("footer.message")}
                </p>
            </div>

            <div className="text-lg flex justify-center mt-10">
                <p>
                    {t("footer.collaborators")}
                </p>
            </div>

            <div className="flex justify-center space-x-15 mb-5">
                <div className="flex items-center space-x-1 mt-2">
                    <img className="w-15" src="https://i.imgur.com/3RlDwQF.png" alt="icono-github" />
                    <a className="font-semibold "
                        href="https://github.com/pirotonta"
                        target="_blank">
                        pirotonta
                    </a>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                    <img className="w-15" src="https://i.imgur.com/3RlDwQF.png" alt="icono-github" />
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