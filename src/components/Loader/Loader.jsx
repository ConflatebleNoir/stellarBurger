import LoaderStyles from './Loader.module.css'

const Loader = () => {
    return (
        <div className={LoaderStyles.loaderContainer}>
            <div className={LoaderStyles.loaderGif}>
            </div>
        </div>
    )
}

export default Loader;