import { useSelector } from "react-redux"
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, ...extra }) => {
    const userData = useSelector(state => state.userData.userData);
    const location = useLocation();

    if (!userData) {
        return <Navigate to={'/login'} state={{ previousLocation: location }} />
    }
    return children;
}

export default ProtectedRoute