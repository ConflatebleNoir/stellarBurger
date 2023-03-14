import React from 'react'
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderStyles from './AppHeader.module.css'
import { NavLink } from 'react-router-dom';

function AppHeader() {
    return (
        <header className={AppHeaderStyles.header + ' ' + 'pt-4 pb-4'}>
            <nav className={AppHeaderStyles.container}>
                <ul className={AppHeaderStyles.list}>
                    <li className={AppHeaderStyles.menu__item
                        + ' ' + 'pr-5 pl-5 pt-4 pb-4'}
                        role='button'>
                        <NavLink
                            className={({ isActive }) => isActive ? `${AppHeaderStyles.active} text text_type_main-default` : 'text text_type_main-default text_color_inactive'}
                            to='/'>
                            <BurgerIcon type="secondary" />
                            <span>Конструктор</span>
                        </NavLink>
                    </li>
                    <li className={AppHeaderStyles.menu__item
                        + ' ' + 'pr-5 pl-5 pt-4 pb-4'}
                        role='button'>
                        <NavLink
                            className={({ isActive }) => isActive ? `${AppHeaderStyles.active} text text_type_main-default` : 'text text_type_main-default text_color_inactive'}
                            to={'/feed'}>
                            <ListIcon type="secondary" />
                            <span>Лента заказов</span>
                        </NavLink>
                    </li>
                </ul>
                <NavLink className={AppHeaderStyles.logo__wrapper} to={'/login'}>
                    <Logo />
                </NavLink>
                <li className={AppHeaderStyles.menu__item
                    + ' ' + 'pr-5 pl-5 pt-4 pb-4'}
                    role='button'>
                    <NavLink
                        className={({ isActive }) => isActive ? `${AppHeaderStyles.active} text text_type_main-default` : 'text text_type_main-default text_color_inactive'}
                        to={'/profile'}>
                        <ProfileIcon type="secondary" />
                        <span>Личный кабинет</span>
                    </NavLink>
                </li>
            </nav>
        </header>
    )
}

export default AppHeader;