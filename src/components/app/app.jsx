import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { setDisplayIngredient } from '../../services/ingredient-details';

import styles from './app.module.css';
import {AppHeader} from '../app-header/app-header';
import { MainPage, IngredientPage, 
    Profile, ProfileEdit, ProfileOrders, ProfileLogout,
    Login, Register, ResetPassword, ForgotPassword, NotFound404 
} from '../../pages';
import ProtectedRoute from '../protected-route';

export const App = () => {
	const dispatch = useDispatch();
    const location = useLocation();
    const stateLocation = location.state && location.state.location;
    const item = location.state && location.state.item;

    useEffect(() => {
        dispatch(setDisplayIngredient(item));
    }, [dispatch, item]);

	return (
		<div className={styles.app}>
			<AppHeader />
			<div className={styles.main}>
				<Routes location={stateLocation || location}>
					<Route path="/" element={<MainPage />} />
					<Route path="/ingredients/:id" element={<IngredientPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/profile" element={<ProtectedRoute element={<Profile />} />}>
						<Route index element={<ProfileEdit />} />
						<Route path="orders" element={<ProfileOrders />} />
						<Route path="logout" element={<ProfileLogout />} />
						<Route path="*" element={<NotFound404 />} />
					</Route>
					<Route path="*" element={<NotFound404 />} />
				</Routes>
			</div>
		</div>
	);
};
