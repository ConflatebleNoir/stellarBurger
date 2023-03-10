import { useSelector } from "react-redux"
import { useLocation, Navigate, RouteProps } from "react-router-dom";
import { FC } from 'react'
import { IProtectedRouteProps } from "../../services/types";


const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, anonymous = false }) => {
    const userData = useSelector((state: Array<object> | any) => state.userData.userData);
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