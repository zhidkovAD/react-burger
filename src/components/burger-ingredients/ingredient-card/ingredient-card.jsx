import React, { useState } from 'react';
import styles from './ingredient-card.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '@components/ingredient-details/ingredient-details';

export const BurgerIngredientCard = ({ ingredient, count }) => {
	const [showDetails, setShowDetails] = useState(false);

	const closeIngredientDetail = (e) => {
		e.stopPropagation();
		setShowDetails(false);
	};

	return (
		<div
			className={styles.ingredient_card}
			onClick={() => setShowDetails(true)}>
			{count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
			<img
				alt={ingredient.name}
				className={styles.ingredient_img}
				src={ingredient.image}
			/>
			<div className={styles.ingredient_price}>
				<p className='text text_type_digits-small mr-1'>{ingredient.price}</p>
				<CurrencyIcon type='primary' />
			</div>
			<div className={styles.ingredient_name}>
				<p className='text text_type_main-default'>{ingredient.name}</p>
			</div>
			{showDetails && (
				<IngredientDetails
					ingredientInfo={ingredient}
					onClose={closeIngredientDetail}
				/>
			)}
		</div>
	);
};

BurgerIngredientCard.propTypes = {
	ingredient: ingredientPropType.isRequired,
	count: PropTypes.number.isRequired,
};
