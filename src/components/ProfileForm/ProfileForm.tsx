import { useDispatch, useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState, FC, ChangeEvent, FormEvent } from "react";
import { updateUserData } from "../../services/actions/user";
import ProfileFormStyles from './ProfileForm.module.css'

const ProfileForm: FC = () => {
    const dispatch = useDispatch();
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passValue, setPassValue] = useState('');
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const userData = useSelector((state: Array<object> | any) => state.userData.userData);
    const accessToken = useSelector((state: string | any) => state.userData.accessToken);
    const [isInfoChanged, setInInfoChanged] = useState(false);

    const onNameInputClick = () => null !== nameRef.current && nameRef.current.focus();
    const onEmailInputClick = () => null !== emailRef.current && emailRef.current.focus();

    const onNameValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setNameValue(evt.target.value);
        evt.target.value === userData.name ? setInInfoChanged(false) : setInInfoChanged(true);
    };

    const onEmailValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(evt.target.value);
        evt.target.value === userData.email ? setInInfoChanged(false) : setInInfoChanged(true);
    };

    const onPasswordValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setPassValue(evt.target.value);
        evt.target.value === passValue ? setInInfoChanged(false) : setInInfoChanged(true);
    };

    const cancelEdit = () => {
        setNameValue(userData.name);
        setEmailValue(userData.email);
        setPassValue('');
    };

    const onSubmitEdit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        //@ts-ignore
        dispatch(updateUserData(nameValue, emailValue, passValue, accessToken))
    };

    useEffect(() => {
        if (userData) {
            setNameValue(userData.name);
            setEmailValue(userData.email);
            setPassValue('');
        }
    }, [userData]);

    return (
        <form className={ProfileFormStyles.form} onSubmit={onSubmitEdit}>
            <Input
                type={"text"}
                placeholder={"??????"}
                onChange={onNameValueChange}
                icon={"EditIcon"}
                value={nameValue}
                name={"name"}
                error={false}
                ref={nameRef}
                onIconClick={onNameInputClick}
                errorText={"????????????"}
                size={"default"}
            />
            <Input
                type={"text"}
                placeholder={"??????????"}
                onChange={onEmailValueChange}
                icon={"EditIcon"}
                value={emailValue}
                name={"name"}
                error={false}
                ref={emailRef}
                onIconClick={onEmailInputClick}
                errorText={"????????????"}
                size={"default"}
                extraClass='mt-6'
            />
            <PasswordInput
                onChange={onPasswordValueChange}
                value={passValue}
                name={"password"}
                extraClass='mt-6'
            />
            <div className={`${ProfileFormStyles.buttons_wrapper} mt-4`}>
                <Button
                    type="secondary"
                    size="large"
                    htmlType="button"
                    onClick={cancelEdit}
                >
                    ????????????????
                </Button>
                <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                >
                    ??????????????????
                </Button>
            </div>
        </form>
    )
}

export default ProfileForm