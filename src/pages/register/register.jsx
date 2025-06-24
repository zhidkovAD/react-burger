import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getUser, register, authClearErrors } from '../../services/auth';
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Preloader } from '../../components/preloader/preloader';
import styles from './register.module.css';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const submitCb = useCallback((state) => {
        dispatch(register(state));
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm({
        name: "",
        email: "",
        password: ""
    }, submitCb);

    const { requestStart, requestError, userLoggedIn } = useSelector((store) => store.auth);

    useEffect(() => {
        if (userLoggedIn) {
            navigate("/", { replace: true });
        } else if (state.wasSubmit && requestError) {
            alert(`[Регистрация] ${requestError}`);
            dispatch(authClearErrors());
        }
    }, [dispatch, state.wasSubmit, userLoggedIn, navigate, requestError]);

    return (
        <main className="page-container">
            <form className={`page-container-inner ${styles.form}`} onSubmit={onSubmit}>
                {requestStart || userLoggedIn ? <Preloader /> : (
                    <>
                        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                        <Input placeholder="Имя" extraClass="mb-6" name="name" value={state.name} onChange={onChange} />
                        <EmailInput extraClass="mb-6" name="email" value={state.email} onChange={onChange} />
                        <PasswordInput extraClass="mb-6" name="password" value={state.password} onChange={onChange} />
                        {requestStart ? <Preloader /> : <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.name === "" || state.email === "" || state.password === ""}>Зарегистрироваться</Button>}
                        <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы? <Link className="page-link" to={"/login"}>Войти</Link></p>
                    </>)}
            </form>
        </main>
    );
}

export default Register;