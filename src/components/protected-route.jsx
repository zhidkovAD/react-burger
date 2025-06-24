import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';

import { getUser } from '../services/auth';
import {Preloader} from './preloader/preloader';

function ProtectedRoute({ element }) {
    const { requestStart, requestError, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.name === "") {
            dispatch(getUser());
        }
    }, [dispatch, user.name]);

    useEffect(() => {
        if (requestError) {
            navigate("/login", { replace: true, state: { from: location } });
            return undefined;
        }
    }, [requestError, navigate, location]);

    return requestStart || user.name === "" ? <Preloader/> : element;
}

ProtectedRoute.propTypes = {
    element: propTypes.element.isRequired
}

export default ProtectedRoute;