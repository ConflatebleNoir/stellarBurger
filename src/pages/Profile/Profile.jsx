import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import ProfileStyles from './Profile.module.css';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";

const Profile = () => {
    const dispatch = useDispatch();
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const nameRef = useRef(null);
    const emailRef = useRef(null);

    const onNameInputClick = () => nameRef.current.focus();
    const onEmailInputClick = () => emailRef.current.focus();

    const onNameValueChange = (evt) => {
        const value = evt.target.value;
        setNameValue(value);
    }

    const onEmailValueChange = (evt) => {
        const value = evt.target.value;
        setEmailValue(value);
    }

    const onPasswordValueChange = (evt) => {
        const value = evt.target.value;
        setPassValue(value);
    }

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
                    >
                        Выход
                    </NavLink>
                </nav>
                <p className={`${ProfileStyles.description} text text_type_main-default text_color_inactive mt-20`}>
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            <form className={ProfileStyles.form}>
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
            </form>
        </section>
    )
}

export default Profile