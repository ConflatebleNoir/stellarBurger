import React from 'react'
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Typography,
    Box
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeaderStyles from './AppHeader.module.css'

const Menu = ({ children }) => {
    return (
        <ul className={AppHeaderStyles.menu}>
            {children}
        </ul>
    )
};

const MenuItem = ({ icon, text, spanClass }) => {
    return (
        <li className={AppHeaderStyles.menu__item
            + ' ' + 'pr-5 pl-5'} role='button'>
            {icon}
            <span className={spanClass}>{text}</span>
        </li>
    )
};

function AppHeader() {
    return (
        <header className={AppHeaderStyles.header + ' ' + 'pt-4 pb-4'}>
            <nav className={AppHeaderStyles.container}>
                <Menu>
                    <MenuItem icon={<BurgerIcon type="primary" />}
                        text='Конструктор' spanClass={'text text_type_main-default ml-2'} />
                    <MenuItem icon={<ListIcon type="secondary" />}
                        text='Лента заказов' spanClass={'text text_type_main-default text_color_inactive ml-2'} />
                    <li className={AppHeaderStyles.logo__wrapper}>
                        <a href="/"><Logo /></a>
                    </li>
                    <MenuItem icon={<ProfileIcon type="secondary" />}
                        text='Личный кабинет' spanClass={'text text_type_main-default text_color_inactive ml-2'} />
                </Menu>
            </nav>
        </header>
    )
}

export default AppHeader;