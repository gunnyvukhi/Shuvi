import { useNavigate } from 'react-router-dom';
import './Welcome.scss';
const Welcome = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };
    return (
    <div>
        <h1>Welcome!</h1>
        <p>We're glad to have you here. Explore and enjoy your experience.</p>
        <button className="login-button" onClick={handleLogin}>Login</button>
    </div>)
};

export default Welcome;