import { useState, useRef, useEffect, FC, FormEvent, ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ResetPasswordStyles from './ResetPassword.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword, setForgotPasswordState } from "../../services/actions/user";
import { useDispatch, useSelector } from "../../services/hooks/hooks";

const ResetPassword: FC = () => {
    const [passValue, setPassValue] = useState('');
    const [codeValue, setCodeValue] = useState('');
    const userData = useSelector((state) => state.userData.userData);
    const isPasswordForgot = useSelector((state) => state.userData.isPassForgot);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (!passValue && !codeValue) {
            return;
        };
        dispatch(resetPassword(passValue, codeValue));
        setPassValue('');
        setCodeValue('');
        dispatch(setForgotPasswordState(false));
        navigate('/');
    }

    const handlePassChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setPassValue(evt.target.value);
    };

    useEffect(() => {
        if (userData) {
            (location.state && location.state.previousLocation) ? navigate(location.state.previousLocation.pathname) : navigate('/');
        } else {
            !isPasswordForgot && navigate('/forgot-password');
        }
    }, [userData, isPasswordForgot, navigate, location]);

    return (
        <section className={ResetPasswordStyles.container}>
            <form onSubmit={handleSubmitForm} className={ResetPasswordStyles.form}>
                <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
                <PasswordInput
                    onChange={handlePassChange}
                    value={passValue}
                    name={"password"}
                    placeholder={"Введите новый пароль"}
                    extraClass='mt-6'
                />
                <Input
                    type={"text"}
                    placeholder={"Введите код из письма"}
                    value={codeValue}
                    onChange={(evt) => setCodeValue(evt.target.value)}
                    name={"e-mail"}
                    error={false}
                    ref={inputRef}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass='mt-6'
                />
                <Button htmlType='submit' type="primary" size="medium" extraClass='mt-6'>
                    Войти
                </Button>
            </form>
            <p className="text text_type_main-default text_color_inactive mt-20">
                {"Вспомнили пароль? "}
                <Link className={ResetPasswordStyles.link} to="/register">
                    Войти
                </Link>
            </p>
        </section>
    )
}

export default ResetPassword