import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("authentication");

    if (!token) {
        return <Navigate to="/user-login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;