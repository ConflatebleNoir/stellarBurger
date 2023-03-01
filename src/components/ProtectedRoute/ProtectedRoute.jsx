import { useSelector } from "react-redux"
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from 'prop-types'

const ProtectedRoute = ({ children }) => {
    const userData = useSelector(state => state.userData.userData);
    const location = useLocation();

    if (!userData) {
        return <Navigate to={'/login'} state={{ previousLocation: location }} />
    }
    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
}

export default ProtectedRoute