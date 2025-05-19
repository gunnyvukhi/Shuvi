import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

function PrivateRoute() {
    // Use the useAuth hook to check if the user is authenticated
    // If authenticated, render the child components (Outlet)
    // If not authenticated, redirect to the login page
    const auth = useAuth();
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;