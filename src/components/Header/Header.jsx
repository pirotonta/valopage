import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="sticky top-0 bg-red-900 sepia-30 h-30 flex flex-col justify-center items-center p-6">
            <div className="flex justify-center space-x-10 mt-2">
                <p
                    className="text-white text-lg font-semibold hover:underline cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    Home
                </p>
                <p
                    className="text-white text-lg font-semibold hover:underline cursor-pointer"
                    onClick={() => navigate('/details')}
                >
                    Detalles
                </p>
                <p
                    className="text-white text-lg font-semibold hover:underline cursor-pointer"
                    onClick={() => navigate('/favoritos')}
                >
                    Favoritos
                </p>
            </div>
        </div>
    );
};

export default Header;
