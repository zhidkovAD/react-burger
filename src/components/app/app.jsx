import React, { useEffect, useMemo, useState } from 'react';
import styles from './app.module.css';

import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/burger-ingredients';

export const App = () => {
	const dispatch = useDispatch();

	const burgerIngredients = useSelector((store) => store.burger_ingredients);

	useMemo(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<AppHeader />
			{burgerIngredients.loading || burgerIngredients.error ? (
				<h1 className={`${styles.status} text text_type_main-medium`}>
					{burgerIngredients.loading
						? 'Пожалуйста подождите, идет загрузка данных...'
						: burgerIngredients.error}
				</h1>
			) : (
				<>
					<h1
						className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
						Соберите бургер
					</h1>
					<main className={`${styles.main} pl-5 pr-5`}>
						<BurgerIngredients />
						<BurgerConstructor />
					</main>
				</>
			)}
		</div>
	);
};
