import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

import { resetPassword, authClearErrors } from '../../services/auth';

import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Preloader } from '../../components/preloader/preloader';
import styles from './reset-password.module.css';
function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitCb = useCallback((state) => {
        dispatch(resetPassword(state));
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm({
        password: "",
        token: ""
    }, submitCb);

    const { requestStart, requestError, requestSuccess, userLoggedIn, forgotPassword } = useSelector((store) => store.auth);

    useEffect(() => {
        if (userLoggedIn) {
            navigate("/", { replace: true });
        } else if (!forgotPassword) {
            navigate("/forgot-password", { replace: true });
        } else if (state.wasSubmit && requestError) {
            alert(`[Сброс пароля] ${requestError}`);
            dispatch(authClearErrors());
        } else if (state.wasSubmit && requestSuccess) {
            navigate("/login", { replace: true });
        }
    }, [dispatch, state.wasSubmit, userLoggedIn, forgotPassword, requestError, requestSuccess, navigate]);

    return (
        <main className="page-container">
            <form className={`page-container-inner ${styles.form}`} onSubmit={onSubmit}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <PasswordInput placeholder='Введите новый пароль' name="password" value={state.password} onChange={onChange} extraClass="mb-6" />
                <Input placeholder='Введите код из письма' name="token" value={state.token} onChange={onChange} extraClass="mb-6" />
                {requestStart ? <Preloader /> : <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.password === "" || state.token === ""}>Сохранить</Button>}
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className="page-link" to={"/login"}>Войти</Link></p>
            </form>
        </main>
    );
}

export default ResetPassword;