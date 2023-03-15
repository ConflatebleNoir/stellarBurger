import { useLocation, Navigate } from "react-router-dom";
import { FC } from 'react'
import { IProtectedRouteProps } from "../../services/types/types";
import { useSelector } from "../../services/hooks/hooks";


const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, anonymous = false }) => {
    const userData = useSelector((state) => state.userData.userData);
    const location = useLocation();
    const previousLocation = location.state?.from || '/';

    if (anonymous && userData) {
        return <Navigate to={previousLocation} />
    }

    if (!userData) {
        return <Navigate to={'/login'} state={{ previousLocation: location }} />
    }
    return children;
}

export default ProtectedRoute;