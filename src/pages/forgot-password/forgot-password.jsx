import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getUser, forgotPassword, authClearErrors } from '../../services/auth';
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Preloader } from '../../components/preloader/preloader';
import styles from './forgot-password.module.css';

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const submitCb = useCallback((state) => {
        dispatch(forgotPassword(state));
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm({
        email: ""
    }, submitCb);

    const { requestStart, requestError, requestSuccess, userLoggedIn } = useSelector((store) => store.auth);

    useEffect(() => {
        if (userLoggedIn) {
            navigate("/", { replace: true });
        } else if (state.wasSubmit && requestError) {
            alert(`[Восстановление пароля] ${requestError}`);
            dispatch(authClearErrors());
        } else if (state.wasSubmit && requestSuccess) {
            navigate("/reset-password", { replace: true });
        }
    }, [dispatch, state.wasSubmit, userLoggedIn, requestError, requestSuccess, navigate]);

    return (
        <main className="page-container">
            <form className={`page-container-inner ${styles.form}`} onSubmit={onSubmit}>
                {requestStart || userLoggedIn ? <Preloader /> : (
                    <>
                        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                        <EmailInput extraClass="mb-6" placeholder='Укажите e-mail' name="email" value={state.email} onChange={onChange} />
                        {requestStart ? <Preloader /> : <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.email === ""}>Восстановить</Button>}
                        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className="page-link" to={"/"}>Войти</Link></p>
                    </>)}
            </form>
        </main>
    );
}

export default ForgotPassword;