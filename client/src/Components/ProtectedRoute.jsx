import { Navigate } from "react-router-dom";


// function ProtectedRoute() {
function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    // return null;
    if (!isAuthenticated) {
    return <Navigate to="/login" />;
}
    return children;
    
}

export default ProtectedRoute;