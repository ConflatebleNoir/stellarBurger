import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/actions/user";
import RegisterStyles from './Register.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const Register = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const dispatch = useDispatch;
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const userData = useSelector((state) => state.userData.userData);

    const handleSubmitForm = (evt) => {
        evt.preventDefault();
        if (!nameValue || !passValue || !emailValue) {
            return;
        };

        dispatch(signUp(emailValue, passValue, nameValue));
    }

    const handlePassChange = (evt) => {
        setPassValue(evt.target.value);
    };

    useEffect(() => {
        userData && navigate.push('/')
    }, [userData, navigate]);

    return (
        <section className={RegisterStyles.container}>
            <form className={RegisterStyles.form}>
                <h1>Регистрация</h1>
                <Input
                    type={"text"}
                    placeholder={"Name"}
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    name={"name"}
                    error={false}
                    ref={inputRef}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass='mt-6'
                />
                <Input
                    type={"text"}
                    placeholder={"E-mail"}
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
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
                    Зарегистрироваться
                </Button>
            </form>
            <p className="text text_type_main-default text_color_inactive mt-20">
                {"Уже зарегистрированы? "}
                <Link className={RegisterStyles.link} to="/login">
                    Войти
                </Link>
            </p>
        </section>
    )
}

export default Register