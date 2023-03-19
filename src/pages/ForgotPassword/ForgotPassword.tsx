import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, FC, FormEvent } from 'react';
import { forgotPassword, setForgotPasswordState } from "../../services/actions/user";
import ForgotPasswordStyles from './ForgotPassword.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "../../services/hooks/hooks";

const ForgotPassword: FC = () => {
    const [emailValue, setEmailValue] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (!emailValue) {
            return
        }
        dispatch(forgotPassword(emailValue));
        dispatch(setForgotPasswordState(true));
        setEmailValue('');
        navigate('/reset-password');
    };

    return (
        <section className={ForgotPasswordStyles.container}>
            <form onSubmit={handleSubmit} className={ForgotPasswordStyles.form}>
                <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
                <Input
                    type={"text"}
                    placeholder={"Укажите e-mail"}
                    value={emailValue}
                    onChange={(evt) => setEmailValue(evt.target.value)}
                    name={"e-mail"}
                    error={false}
                    ref={inputRef}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass='mt-6'
                />
                <Button htmlType='submit' type="primary" size="medium" extraClass='mt-6'>
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