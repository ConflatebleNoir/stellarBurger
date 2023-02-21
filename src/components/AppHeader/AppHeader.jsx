import React from 'react'
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderStyles from './AppHeader.module.css'
import { elementType, stringType } from '../../utils/types';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ icon, text, linkClass, spanClass, direction }) => {
    return (
        <li className={AppHeaderStyles.menu__item
            + ' ' + 'pr-5 pl-5 pt-4 pb-4'} role='button'>
            <NavLink
                className={linkClass}
                exact to={direction}>
                {icon}
                <span className={spanClass}>{text}</span>
            </NavLink>
        </li>
    )
};

MenuItem.propTypes = {
    icon: elementType.isRequired,
    text: stringType.isRequired,
    spanClass: stringType.isRequired,
    linkClass: stringType.isRequired,
    direction: stringType,
}

function AppHeader() {
    return (
        <header className={AppHeaderStyles.header + ' ' + 'pt-4 pb-4'}>
            <nav className={AppHeaderStyles.container}>
                <ul className={AppHeaderStyles.list}>
                    <MenuItem icon={<BurgerIcon type="secondary" />}
                        text='Конструктор'
                        spanClass={'text text_type_main-default text_color_inactive ml-2'}
                        linkClass={AppHeaderStyles.link}
                        direction={'/'}
                    />
                    <MenuItem icon={<ListIcon type="secondary" />}
                        text='Лента заказов'
                        spanClass={'text text_type_main-default text_color_inactive ml-2'}
                        linkClass={AppHeaderStyles.link}
                        direction={'*'}
                    />
                </ul>
                <NavLink className={AppHeaderStyles.logo__wrapper} exact to={'/login'}>
                    <Logo />
                </NavLink>
                <a>
                    <MenuItem icon={<ProfileIcon type="secondary" />}
                        text='Личный кабинет'
                        spanClass={'text text_type_main-default text_color_inactive ml-2'}
                        linkClass={AppHeaderStyles.link}
                        direction={'/profile'}
                    />
                </a>
            </nav>
        </header>
    )
}

export default AppHeader;