import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import ProfileStyles from './Profile.module.css';
import { logout } from "../../services/actions/user";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { FC } from 'react'

const Profile: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        const updateToken = localStorage.getItem('refreshToken');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        dispatch(logout(updateToken)
            //@ts-ignore
            .then(() => {
                navigate("/login", { replace: true });
            }));
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
                        className={'text text_type_main-medium text_color_inactive'}
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
                <Route path='' element={<ProfileForm />}
                />
                <Route path='orders' element={<OrderHistory />} />
            </Routes>
        </section>
    )
}

export default Profile