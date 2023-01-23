import React from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeaderStyles from './AppHeader.module.css'

const Menu = ({ children }) => {
    return (
        <ul className={AppHeaderStyles.menu}>
            {children}
        </ul>
    )
};

const MenuItem = ({ icon, text }) => {
    return (
        <li className={AppHeaderStyles.menu__item
            + ' ' + 'text text_type_main-default text_color_inactive'
            + ' ' + 'pr-5 pl-5'} role='button'>
            {icon}
            <span className='text text_type_main-default ml-2'>{text}</span>
        </li>
    )
};

function AppHeader() {
    return (
        <header className={AppHeaderStyles.header + ' ' + 'pt-4 pb-4'}>
            <nav className={AppHeaderStyles.container}>
                <Menu>
                    <MenuItem icon={<BurgerIcon type="primary" />}
                        text='Конструктор' />
                    <MenuItem icon={<ListIcon type="secondary" />}
                        text='Лента заказов' />
                    <a className={AppHeaderStyles.logo} href="/"><Logo /></a>
                    <MenuItem icon={<ProfileIcon type="secondary" />}
                        text='Личный кабинет' />
                </Menu>
            </nav>
        </header>
    )
}

export default AppHeader;