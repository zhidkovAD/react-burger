import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout, authClearErrors } from '../../services/auth';
import { Preloader } from '../../components/preloader/preloader';

function ProfileLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { requestError, requestSuccess, userLoggedIn } = useSelector((store) => store.auth);

    useEffect(() => {
        if (userLoggedIn) {
            dispatch(logout());
            setStarted(true);
        }
    }, [userLoggedIn, dispatch]);

    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (started && requestError) {
            alert(`[Выход] ${requestError}`);
            dispatch(authClearErrors());
            setStarted(false);
        } else if (started && requestSuccess) {
            navigate("/login", { replace: true });
        }
    }, [dispatch, started, requestError, requestSuccess, navigate]);

    return (
        <div className="page-container-inner">
            {started && <Preloader />}
        </div>
    );
}

export default ProfileLogout;