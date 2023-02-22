import { useState, useRef, useEffect } from 'react';
import LoginStyles from './Login.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../services/actions/user';

const Login = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const inputRef = useRef(null);
    const userData = useSelector((state) => state.userData.userData);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!emailValue || !passValue) {
            return;
        }
        dispatch(signIn(emailValue, passValue))
    };

    const handlePassChange = evt => {
        setPassValue(evt.target.value)
    }

    useEffect(() => {
        if (userData) {
            (location.state && location.state.previousLocation)
                ? navigate.push(location.state.previousLocation.pathname)
                : navigate.push('/');
        };
    }, [userData, location, navigate]);

    return (
        <section className={`${LoginStyles.container}`}>
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
                <Button type="primary" size="medium" extraClass='mt-6'>
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