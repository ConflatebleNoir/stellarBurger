import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ProfileStyles from './Profile.module.css';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { logout, updateUserData } from "../../services/actions/user";

const Profile = () => {
    const dispatch = useDispatch();
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const userData = useSelector(state => state.userData.userData);
    const accessToken = useSelector(state => state.userData.accessToken);
    const [isInfoChanged, setInInfoChanged] = useState(false);

    const onNameInputClick = () => nameRef.current.focus();
    const onEmailInputClick = () => emailRef.current.focus();

    const onNameValueChange = (evt) => {
        setNameValue(evt.target.value);
        evt.target.value === userData.name ? setInInfoChanged(false) : setInInfoChanged(true);
    };

    const onEmailValueChange = (evt) => {
        setEmailValue(evt.target.value);
        evt.target.value === userData.email ? setInInfoChanged(false) : setInInfoChanged(true);
    };

    const onPasswordValueChange = (evt) => {
        setPassValue(evt.target.value);
        evt.target.value === passValue ? setInInfoChanged(false) : setInInfoChanged(true);
    };

    const cancelEdit = (evt) => {
        evt.preventDefault();
        setNameValue(userData.name);
        setEmailValue(userData.email);
        setPassValue('');
    };

    const onSubmitEdit = (evt) => {
        evt.preventDefault();
        dispatch(updateUserData(nameValue, emailValue, passValue, accessToken))
    };

    const onLogout = () => {
        const updateToken = localStorage.getItem('refreshToken');
        dispatch(logout(updateToken));
    }

    useEffect(() => {
        if (userData) {
            setNameValue(userData.name);
            setEmailValue(userData.email);
            setPassValue('');
        }
    }, [userData]);

    return (
        <section className={ProfileStyles.container}>
            <div className={ProfileStyles.wrapper}>
                <nav className={ProfileStyles.menu}>
                    <NavLink
                        className={({ isActive }) => isActive ? `${ProfileStyles.active} text text_type_main-medium` : 'text text_type_main-medium text_color_inactive'}
                        to="/profile"
                    >
                        Профиль
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive ? `${ProfileStyles.active} text text_type_main-medium` : 'text text_type_main-medium text_color_inactive'}
                        to="/profile/orders"
                    >
                        История заказов
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive ? `${ProfileStyles.active} text text_type_main-medium` : 'text text_type_main-medium text_color_inactive'}
                        to='/login'
                        onClick={onLogout}
                        replace
                    >
                        Выход
                    </NavLink>
                </nav>
                <p className={`${ProfileStyles.description} text text_type_main-default text_color_inactive mt-20`}>
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            <form className={ProfileStyles.form} onSubmit={onSubmitEdit}>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={onNameValueChange}
                    icon={"EditIcon"}
                    value={nameValue}
                    name={"name"}
                    error={false}
                    ref={nameRef}
                    onIconClick={onNameInputClick}
                    errorText={"Ошибка"}
                    size={"default"}
                />
                <Input
                    type={"text"}
                    placeholder={"Логин"}
                    onChange={onEmailValueChange}
                    icon={"EditIcon"}
                    value={emailValue}
                    name={"name"}
                    error={false}
                    ref={emailRef}
                    onIconClick={onEmailInputClick}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass='mt-6'
                />
                <PasswordInput
                    onChange={onPasswordValueChange}
                    value={passValue}
                    name={"password"}
                    extraClass='mt-6'
                />
                <div className={`${ProfileStyles.buttons_wrapper} mt-4`}>
                    <Button
                        type="secondary"
                        size="large"
                        htmlType="button"
                        onClick={cancelEdit}
                    >
                        Отменить
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default Profile