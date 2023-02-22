import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from 'react';
import { forgotPassword, setForgotPasswordState } from "../../services/actions/user";
import ForgotPasswordStyles from './ForgotPassword.module.css';
import { useDispatch } from "react-redux";
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPassword = () => {
    const [emailValue, setEmailValue] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!emailValue) {
            return
        }

        dispatch(forgotPassword(emailValue));
        dispatch(setForgotPasswordState(true));
        setEmailValue('');
        navigate.push('/reset-password');
    };

    return (
        <section className={ForgotPasswordStyles.container}>
            <form onSubmit={handleSubmit} className={ForgotPasswordStyles.form}>
                <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
                <Input
                    type={"text"}
                    placeholder={"E-mail"}
                    value={emailValue}
                    onChange={(evt) => setEmailValue(evt.target.value)}
                    name={"e-mail"}
                    error={false}
                    ref={inputRef}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass='mt-6'
                />
                <Button type="primary" size="medium" extraClass='mt-6'>
                    Восстановить
                </Button>
            </form>
            <p className="text text_type_main-default text_color_inactive mt-20">
                {"Вспомнили пароль? "}
                <Link className={ForgotPasswordStyles.link} to="/login">
                    Войти
                </Link>
            </p>
        </section>
    )
}

export default ForgotPassword