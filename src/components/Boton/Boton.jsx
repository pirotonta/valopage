// import Style from './Boton.module.css';

const Boton = ({ texto, className = '', icon: Icon, onClick, iconStyling, ...props}) => {
    return (
        <button className={className} onClick={onClick} {...props}>
            <Icon alt={texto} className={iconStyling}/>
        </button>
    );
}

export default Boton;