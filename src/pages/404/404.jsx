import styles from "./404.module.css"

function NotFound404() {
    return (
        <div className="page-container">
            <p className={`page-container-inner text text_type_main-medium ${styles.error}`}>404, Страница не найдена</p>
        </div>
    );
}

export default NotFound404;