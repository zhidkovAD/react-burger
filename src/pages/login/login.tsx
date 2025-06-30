import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { login } from '../../services/auth';
import styles from './login.module.css';
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Preloader } from '../../components/preloader/preloader';
import { TLoginUser, TSubmit } from '@utils/types';

type TState = TLoginUser & TSubmit;

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const submitCb = useCallback((state:TState) => {
        dispatch(login(state) as any);
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm<TState>({
        email: "",
        password: ""
    }, submitCb);

    const { requestStart, userLoggedIn, requestError } = useSelector((store:any) => store.auth);
    
    useEffect(() => {
        if (userLoggedIn) {
            const { from } = location.state || { from: { pathname: "/" } };
            if (from.pathname === "/profile/logout") {
                from.pathname = "/";
            }
            navigate(from.pathname, { replace: true });
        }
    }, [dispatch, location.state, userLoggedIn, navigate]);

    return (
        <main className="page-container">
            <form className={`page-container-inner ${styles.form}`} onSubmit={onSubmit}>
                {requestStart ? <Preloader /> : (
                    <>
                        <h1 className="text text_type_main-medium mb-6">Вход</h1>
                        <EmailInput extraClass="mb-6" name="email" value={state.email} onChange={onChange} />
                        <PasswordInput extraClass="mb-6" name="password" value={state.password} onChange={onChange} />
                         {!!requestError && state.wasSubmit && <p className={`mb-2 error-text text text_type_main-default`}>{requestError}</p>}
                         <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.email === "" || state.password === ""}>Войти</Button>
                        <p className="text text_type_main-default text_color_inactive mb-4">Вы — новый пользователь? <Link className="page-link" to={"/register"}>Зарегистрироваться</Link></p>
                        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link className="page-link" to={"/forgot-password"}>Восстановить пароль</Link></p>
                    </>)}
            </form>
        </main>
    );
}

export default Login;