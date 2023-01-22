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
        <nav className={AppHeaderStyles.menu}>
            {children}
        </nav>
    )
};

const MenuItem = ({ icon, text }) => {
    return (
        <button className={AppHeaderStyles.button + ' ' + 'text text_type_main-default text_color_inactive'} type='button'>
            {icon}
            {text}
        </button>
    )
};

function AppHeader() {
    return (
        <header className={AppHeaderStyles.header + ' ' + 'p-4'}>
            <div className={AppHeaderStyles.container}>
                <Menu>
                    <MenuItem icon={<BurgerIcon type="primary" />}
                        text='Конструктор' />
                    <MenuItem icon={<ListIcon type="secondary" />}
                        text='Лента заказов' />
                </Menu>
                <Logo />
                <Menu>
                    <MenuItem icon={<ProfileIcon type="secondary" />}
                        text='Личный кабинет' />
                </Menu>
            </div>
        </header>
    )
}

export default AppHeader;