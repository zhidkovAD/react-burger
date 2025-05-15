import React, { useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import * as PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';
import { BurgerIngredientsCategory } from './ingredients-category/intgredients-category';

export const BurgerIngredients = ({ ingredients }) => {
	const [category, setCategory] = useState('bun');

	const refBun = useRef(null);
	const refMain = useRef(null);
	const refSauce = useRef(null);
	const refContainer = useRef(null);

	const tabClick = (value) => {
		setCategory(value);
		// При использовании scrollIntoView({ behavior: "smooth" }) пропадал элемент nav (возможно проблема со стилями), поэтому выполнил реализацию через scrollTo
		let element;
		if (value == 'bun') element = refBun.current;
		else if (value == 'main') element = refMain.current;
		else if (value == 'sauce') element = refSauce.current;
		refContainer.current.scrollTo({
			block: 'start',
			behavior: 'smooth',
			top: element.offsetTop - refContainer.current.offsetTop,
		});
	};

	return (
		<section className={styles.burger_ingredients}>
			<nav className='mb-10'>
				<ul className={styles.menu}>
					<Tab value='bun' active={category == 'bun'} onClick={tabClick}>
						Булки
					</Tab>
					<Tab value='main' active={category == 'main'} onClick={tabClick}>
						Начинки
					</Tab>
					<Tab value='sauce' active={category == 'sauce'} onClick={tabClick}>
						Соусы
					</Tab>
				</ul>
			</nav>
			<div ref={refContainer} className={styles.container_ingredients}>
				<BurgerIngredientsCategory
					ref={refBun}
					name={'Булки'}
					ingredients_category={ingredients.filter(
						(ingredient) => ingredient.type == 'bun'
					)}
				/>
				<BurgerIngredientsCategory
					ref={refMain}
					name={'Начинки'}
					ingredients_category={ingredients.filter(
						(ingredient) => ingredient.type == 'main'
					)}
				/>
				<BurgerIngredientsCategory
					ref={refSauce}
					name={'Соусы'}
					ingredients_category={ingredients.filter(
						(ingredient) => ingredient.type == 'sauce'
					)}
				/>
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
