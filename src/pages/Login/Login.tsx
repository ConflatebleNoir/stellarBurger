import { useState, useRef, useEffect, FC, FormEvent, ChangeEvent } from 'react';
import LoginStyles from './Login.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signIn } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../services/hooks/hooks';

const Login = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const inputRef = useRef(null);
    const userData = useSelector((state) => state.userData.userData);

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (!emailValue || !passValue) {
            return;
        }
        dispatch(signIn(emailValue, passValue))
        localStorage.setItem('email', emailValue);
        localStorage.setItem('password', passValue);
    };

    const handlePassChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setPassValue(evt.target.value)
    }

    useEffect(() => {
        const localEmail = localStorage.getItem('email');
        const localPassword = localStorage.getItem('password');
        if (localEmail && localPassword) {
            setEmailValue(localEmail);
            setPassValue(localPassword);
            dispatch(signIn(localEmail, localPassword));
        };
        if (userData) {
            (location.state && location.state.previousLocation)
                ? navigate(location.state.previousLocation.pathname)
                : navigate('/');
        };
    }, [userData, location, navigate]);

    return (
        <section className={LoginStyles.container}>
            <form onSubmit={handleSubmit} className={LoginStyles.form}>
                <h1 className='text text_type_main-medium'>Вход</h1>
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
                <PasswordInput
                    onChange={handlePassChange}
                    value={passValue}
                    name={"password"}
                    extraClass='mt-6'
                />
                <Button htmlType='submit' type="primary" size="medium" extraClass='mt-6'>
                    Войти
                </Button>
            </form>
            <p className="text text_type_main-default text_color_inactive mt-20">
                {"Вы — новый пользователь? "}
                <Link className={LoginStyles.link} to="/register">
                    Зарегистрироваться
                </Link>
            </p>
            <p className="text text_type_main-default text_color_inactive mt-4">
                {"Забыли пароль? "}
                <Link className={LoginStyles.link} to="/forgot-password">
                    Восстановить пароль
                </Link>
            </p>
        </section>
    )
}

export default Login;