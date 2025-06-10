import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
        return <Navigate to="/user-login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;