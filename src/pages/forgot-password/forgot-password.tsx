import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { forgotPassword } from '@/services/auth';
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Preloader } from '../../components/preloader/preloader';
import { TForgotPassword, TSubmit } from '@utils/types';
import styles from './forgot-password.module.css';

type TState = TForgotPassword & TSubmit;

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitCb = useCallback((state:TState) => {
        dispatch(forgotPassword(state));
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm<TState>({
        email: ""
    }, submitCb);

    const { requestStart, requestSuccess, requestError, userLoggedIn } = useSelector((store:any) => store.auth);

    useEffect(() => {
        if (userLoggedIn) {
            navigate("/", { replace: true });
        } else if (state.wasSubmit && requestSuccess) {
            navigate("/reset-password", { replace: true });
        }
    }, [dispatch, state.wasSubmit, userLoggedIn, requestSuccess, navigate]);

    return (
        <main className="page-container">
            <form className={`page-container-inner ${styles.form}`} onSubmit={onSubmit}>
                {requestStart ? <Preloader /> : (
                    <>
                        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                        <EmailInput extraClass="mb-6" placeholder='Укажите e-mail' name="email" value={state.email} onChange={onChange} />
                        {!!requestError && state.wasSubmit && <p className={`mb-2 error-text text text_type_main-default`}>{requestError}</p>}
                        {requestStart ? <Preloader /> : <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.email === ""}>Восстановить</Button>}
                        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className="page-link" to={"/login"}>Войти</Link></p>
                    </>)}
            </form>
        </main>
    );
}

export default ForgotPassword;

