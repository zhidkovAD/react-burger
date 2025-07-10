import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { authCheckUser } from '../../services/auth';

import styles from './app.module.css';
import {AppHeader} from '../app-header/app-header';
import { MainPage, IngredientPage, 
    Profile, ProfileEdit, ProfileOrders, ProfileLogout,
    Login, Register, ResetPassword, ForgotPassword, NotFound404, FeedPage, OrderPage
} from '../../pages';
import ProtectedRoute from '../protected-route';
import OrderInfo from '../order-info/order-info';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

export const App = () => {
	const dispatch = useDispatch();
    const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
        dispatch(authCheckUser() as any);
    }, [dispatch]);

     const stateLocation = location.state && location.state.location;

    const handleCloseModalIngredient = () => {
        navigate("/", { replace: true });
    }
    const handleCloseModalDetail = () => {
        navigate(-1);
    }


	return (
		<div className={styles.app}>
			<AppHeader />
			<div className={styles.main}>
				<Routes location={stateLocation || location}>
					<Route path="/" element={<MainPage />} />
					<Route path="/feed" element={<FeedPage />} />
					<Route path="/ingredients/:id" element={<IngredientPage />} />
					<Route path="/feed/:id" element={<OrderPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<ProtectedRoute anonymous element={<Register />} />} />
                    <Route path="/reset-password" element={<ProtectedRoute anonymous element={<ResetPassword />} />} />
                    <Route path="/forgot-password" element={<ProtectedRoute anonymous element={<ForgotPassword />} />} />
					<Route path="/profile" element={<ProtectedRoute element={<Profile />} />}>
						<Route index element={<ProfileEdit />} />
						<Route path="orders" element={<ProfileOrders />} />
						<Route path="orders/:id" element={<OrderPage />} />
						<Route path="logout" element={<ProfileLogout />} />
						<Route path="*" element={<NotFound404 />} />
					</Route>
					<Route path="*" element={<NotFound404 />} />
				</Routes>
				{stateLocation &&
                    <Routes>
                        <Route path="/ingredients/:id" element={
                            <div>
                                <Modal onClose={handleCloseModalIngredient} caption="Детали ингредиента" classNameTitleModal={styles.titleModalIngDetails}
									classNameContentModal={styles.contentModalIngDetails}>
                                    <IngredientDetails />
                                </Modal>
                            </div>
                        } />
                        <Route path={`/feed/:id`} element={
                            <Modal onClose={handleCloseModalDetail} caption="Детали заказа" classNameTitleModal={styles.titleModalOrdersDetails}
									classNameContentModal={styles.contentModalOrdersDetails}>
                                <OrderInfo />
                            </Modal>
                        } />
                        <Route path={`/profile/orders/:id`} element={
                            <Modal onClose={handleCloseModalDetail} caption="Детали заказа" classNameTitleModal={styles.titleModalOrdersDetails}
									classNameContentModal={styles.contentModalOrdersDetails}>
                                <OrderInfo />
                            </Modal>
                        } />
                    </Routes>
                }
			</div>
		</div>
	);
};
