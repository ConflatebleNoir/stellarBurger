import NotFoundStyles from './NotFound.module.css'

const NotFound = () => {
    return (
        <section className={NotFoundStyles.container}>
            <h2 className="text text_type_main-large">Страница не найдена</h2>
        </section>
    )
}

export default NotFound;