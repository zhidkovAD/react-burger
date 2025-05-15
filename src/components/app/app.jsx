import React, { useMemo, useState } from 'react';
import styles from './app.module.css';
// import { ingredients as localIngredient }  from '@utils/ingredients.js';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';

const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients ';

export const App = () => {
	const [state, setState] = useState({
		data: [],
		error: false,
		loading: false,
	});

	useMemo(() => {
		setState({ ...state, loading: true });
		fetch(BASE_URL)
			.then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
			.then((res) => setState({ ...state, loading: false, data: res.data }))
			.catch((error) =>
				setState({
					...state,
					loading: false,
					error: `Ошибка получения ингредиентов: ${error}`,
				})
			);
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			{state.loading || state.error ? (
				<h1 className={`${styles.status} text text_type_main-medium`}>
					{state.loading
						? 'Пожалуйста подождите, идет загрузка данных...'
						: state.error}
				</h1>
			) : (
				<>
					<h1
						className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
						Соберите бургер
					</h1>
					<main className={`${styles.main} pl-5 pr-5`}>
						<BurgerIngredients ingredients={state.data} />
						<BurgerConstructor ingredients={state.data} />
					</main>
				</>
			)}
		</div>
	);
};
