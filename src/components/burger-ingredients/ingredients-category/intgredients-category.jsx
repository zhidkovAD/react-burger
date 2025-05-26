import React, { forwardRef } from 'react';
import styles from './ingredients-category.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import { BurgerIngredientCard } from '../ingredient-card/ingredient-card';

export const BurgerIngredientsCategory = forwardRef(
	({ name, ingredients_category }, ref) => {
		return (
			<div ref={ref}>
				<h2 className={`${styles.title} text text_type_main-medium`}>{name}</h2>
				<div className={styles.container_ingredients}>
					{ingredients_category.map((ingredient) => (
						<BurgerIngredientCard
							key={ingredient._id}
							ingredient={ingredient}
						/>
					))}
				</div>
			</div>
		);
	}
);

BurgerIngredientsCategory.propTypes = {
	name: PropTypes.string,
	ingredients_category: PropTypes.arrayOf(ingredientPropType.isRequired)
		.isRequired,
};
