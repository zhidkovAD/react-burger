import { forwardRef } from 'react';
import styles from './ingredients-category.module.css';
import { TIngredient } from '@utils/types';
import { BurgerIngredientCard } from '../ingredient-card/ingredient-card';

export const BurgerIngredientsCategory = forwardRef(
	({ name, ingredients_category }:{name:string, ingredients_category:Array<TIngredient>}, ref:React.Ref<HTMLDivElement>) => {
		return (
			<div ref={ref}>
				<h2 className={`${styles.title} text text_type_main-medium`}>{name}</h2>
				<div className={styles.container_ingredients}>
					{ingredients_category.map((ingredient:TIngredient) => (
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

