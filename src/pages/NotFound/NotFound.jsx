import { useTranslation } from "react-i18next";

const NotFound = () => {
    const { t } = useTranslation();

    return(
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
            <div>
            <h1>404 - {t("notFound.message")}</h1>
            </div> 
        </div>
    )
}

export default NotFound;