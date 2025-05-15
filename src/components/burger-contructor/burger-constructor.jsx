import React, { useMemo, useState } from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	ConstructorElement,
	DragIcon,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';

export const BurgerConstructor = ({ ingredients }) => {
	// Имитация выбранной булки и ингридиентов
	const selectedIngredients = useMemo(
		() => ingredients.filter((item) => item.type !== 'bun'),
		[ingredients]
	);
	const selectedBun = useMemo(
		() => ingredients.find((item) => item.type === 'bun'),
		[ingredients]
	);
	const sum = useMemo(
		() =>
			selectedBun.price * 2 +
			selectedIngredients.reduce((sum, item) => (sum += item.price), 0),
		[selectedIngredients, selectedBun]
	);

	const [showOrder, setShowOrder] = useState(false);

	const closeOrder = (e) => {
		e.stopPropagation();
		setShowOrder(false);
	};

	return (
		<section className={styles.burger_constructor}>
			<div className={`${styles.burger} mt-25 ml-4`}>
				{/* Выбранная булка */}
				<ConstructorElement
					type='top'
					isLocked={true}
					text={`${selectedBun.name} (верх)`}
					price={selectedBun.price}
					thumbnail={selectedBun.image}
					extraClass={`${styles.ingredient} ml-8`}
				/>
				{/* Выбранные ингредиенты */}
				<ul className={`${styles.container_ingredients} mt-4 mb-4`}>
					{selectedIngredients.map((item, index) => (
						<li className={`${styles.listItem} mt-4`} key={index}>
							<span>
								<DragIcon type='primary' />
							</span>
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image}
								extraClass={`${styles.ingredient} ml-2`}
							/>
						</li>
					))}
				</ul>
				{/* Выбранная булка */}
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={`${selectedBun.name} (низ)`}
					price={selectedBun.price}
					thumbnail={selectedBun.image}
					extraClass={`${styles.ingredient} ml-8`}
				/>
				{/* Оформление заказа */}
				<div className={`${styles.placeOrder} mr-4 mt-10`}>
					<div className={styles.totalCost}>
						<p className='text text_type_digits-medium mr-2 mb-1'>{sum}</p>
						<div className={`${styles.totalIcon} mr-10`}>
							<CurrencyIcon type='primary' />
						</div>
					</div>
					<Button
						htmlType='button'
						type='primary'
						onClick={() => setShowOrder(true)}>
						Оформить заказ
					</Button>
					{showOrder && (
						<OrderDetails numberOrder={'034536'} onClose={closeOrder} />
					)}
				</div>
			</div>
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
