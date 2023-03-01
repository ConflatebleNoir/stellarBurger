import { NavLink, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import ProfileStyles from './Profile.module.css';
import { logout } from "../../services/actions/user";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

const Profile = () => {
    const dispatch = useDispatch();

    const onLogout = () => {
        const updateToken = localStorage.getItem('refreshToken');
        dispatch(logout(updateToken));
    }

    return (
        <section className={ProfileStyles.container}>
            <div className={ProfileStyles.wrapper}>
                <nav className={ProfileStyles.menu}>
                    <NavLink
                        className={({ isActive }) => isActive ? `${ProfileStyles.active} text text_type_main-medium` : 'text text_type_main-medium text_color_inactive'}
                        to=""
                    >
                        Профиль
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive ? `${ProfileStyles.active} text text_type_main-medium` : 'text text_type_main-medium text_color_inactive'}
                        to="orders"
                    >
                        История заказов
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive ? `${ProfileStyles.active} text text_type_main-medium` : 'text text_type_main-medium text_color_inactive'}
                        to='/login'
                        onClick={onLogout}
                    >
                        Выход
                    </NavLink>
                </nav>
                <p className={`${ProfileStyles.description} text text_type_main-default text_color_inactive mt-20`}>
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            <Routes>
                <Route exact path='' element={<ProfileForm />}
                />
                <Route path='orders' element={<OrderHistory />} />
            </Routes>
        </section>
    )
}

export default Profile