import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../services/auth';
import { Preloader } from '../../components/preloader/preloader';

function ProfileLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { requestError, requestStart, userLoggedIn } = useSelector((store:any) => store.auth);

    useEffect(() => {
        if (userLoggedIn) {
            dispatch(logout() as any);
        } else {
            navigate("/login", { replace: true });
        }
    }, [dispatch, userLoggedIn, navigate]);


    return (
        <div className="page-container-inner">
            {requestStart && <Preloader />}
            {!!requestError && <p className={`error-text text text_type_main-default`}>{requestError}</p>}
        </div>
    );
}

export default ProfileLogout;