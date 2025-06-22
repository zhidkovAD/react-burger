import { useCallback } from 'react';
import Modal from '../modal/modal';
import styles from './order-details.module.css';
import {
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { fetchCreateOrder, closeWinOrder } from '../../services/order-details';

function OrderDetails() {
	const { orderNumber, loading } = useSelector((store) => store.order_details);
	const { sum, ingredients, bun } = useSelector(
		(store) => store.burger_constructor
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
    const { userLoggedIn, requestStart } = useSelector((store) => store.auth);
	const createOrder = useCallback(() => {
		if (requestStart) {
            return;
        }

        if (!userLoggedIn) {
            navigate("/login", { replace: true });
        }
		else {
			const orderIngredients = [...ingredients];
			if (bun) {
				orderIngredients.push(bun, bun);
			}

			if (orderIngredients.length == 0) {
				alert('Нет выбранных ингредиентов!');
				return;
			}
			dispatch(fetchCreateOrder(ingredients));
		}
	}, [requestStart, userLoggedIn, navigate, ingredients, bun, dispatch]);

	const closeOrder = (e) => {
		e.stopPropagation();
		dispatch(closeWinOrder());
	};

	return (
		<div className={`${styles.placeOrder} mr-4 mt-10`}>
			<div className={styles.totalCost}>
				<p className='text text_type_digits-medium mr-2 mb-1'>{sum}</p>
				<div className={`${styles.totalIcon} mr-10`}>
					<CurrencyIcon type='primary' />
				</div>
			</div>
			<Button
				disabled={loading || !bun}
				htmlType='button'
				type='primary'
				onClick={createOrder}>
				Оформить заказ
			</Button>
			{orderNumber && (
				<Modal
					onClose={closeOrder}
					classNameTitleModal={styles.titleModalOrdDetails}
					classNameContentModal={styles.contentModalOrdDetails}>
					<p
						className={`${styles['order-number']} text text_type_digits-large mb-8`}>
						{orderNumber}
					</p>
					<p className='text text_type_main-medium mb-15 text-center'>
						идентификатор заказа
					</p>
					<img
						src={'/done.svg'}
						className={`${styles.image} mb-15 text-center`}
						alt='Заказ принят'
					/>
					<p className='text text_type_main-default mb-2 text-center'>
						Ваш заказ начали готовить
					</p>
					<p
						className={`${styles['last-p']} text text_type_main-default text_color_inactive text-center`}>
						Дождитесь готовности на орбитальной станции
					</p>
				</Modal>
			)}
		</div>
	);
}

export default OrderDetails;
