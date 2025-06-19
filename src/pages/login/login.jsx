import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { login, getUser, authClearErrors } from '../../services/auth';
import styles from './login.module.css';
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Preloader } from '../../components/preloader/preloader';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const submitCb = useCallback((state) => {
        dispatch(login(state));
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm({
        email: "",
        password: ""
    }, submitCb);

    const { requestStart, requestError, userLoggedIn } = useSelector((store) => store.auth);
    
    useEffect(() => {
        if (userLoggedIn) {
            const { from } = location.state || { from: { pathname: "/" } };
            if (from.pathname === "/profile/logout") {
                from.pathname = "/";
            }
            navigate(from.pathname, { replace: true });
        } else if (state.wasSubmit && requestError) {
            alert(`[Вход] ${requestError}`);
            dispatch(authClearErrors());
        }
    }, [dispatch, location.state, state.wasSubmit, userLoggedIn, navigate, requestError]);

    return (
        <main className="page-container">
            <form className={`page-container-inner ${styles.form}`} onSubmit={onSubmit}>
                {requestStart || userLoggedIn ? <Preloader /> : (
                    <>
                        <h1 className="text text_type_main-medium mb-6">Вход</h1>
                        <EmailInput extraClass="mb-6" name="email" value={state.email} onChange={onChange} />
                        <PasswordInput extraClass="mb-6" name="password" value={state.password} onChange={onChange} />
                        {requestStart ? <Preloader /> : <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.email === "" || state.password === ""}>Войти</Button>}
                        <p className="text text_type_main-default text_color_inactive mb-4">Вы — новый пользователь? <Link className="page-link" to={"/register"}>Зарегистрироваться</Link></p>
                        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link className="page-link" to={"/forgot-password"}>Восстановить пароль</Link></p>
                    </>)}
            </form>
        </main>
    );
}

export default Login;