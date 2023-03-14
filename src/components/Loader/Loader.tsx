import LoaderStyles from './Loader.module.css'
import { FC } from 'react'

const Loader: FC = () => {
    return (
        <div className={LoaderStyles.loaderContainer}>
            <div className={LoaderStyles.loaderGif}>
            </div>
        </div>
    )
}

export default Loader;