import React, { useMemo, useCallback } from 'react';
import styles from './ingredient-card.module.css';

import { useDrag } from 'react-dnd';
import { ingredientPropType } from '@utils/prop-types.js';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setDisplayIngredient } from '../../../services/ingredient-details';

export const BurgerIngredientCard = ({ ingredient }) => {

    const navigate = useNavigate();
    const location = useLocation();
	const { bun, ingredients } = useSelector((store) => store.burger_constructor);

	const countIngredient = useMemo(() => {
		if (bun && ingredient._id == bun._id) {
			return 2;
		}
		return ingredients.filter((ingr) => ingr._id == ingredient._id).length;
	}, [bun, ingredients]);

	const dispatch = useDispatch();

	const showDialogItem = useCallback(() => {
        navigate(`/ingredients/${ingredient._id}`, { replace: true, state: { location: location, item: ingredient } });
       	dispatch(setDisplayIngredient(ingredient))
    }, [dispatch, navigate, location, ingredient]);

	const [, dragRef] = useDrag({
		type: ingredient.type,
		item: ingredient,
	});

	return (
		<div
			ref={dragRef}
			className={styles.ingredient_card}
			onClick={showDialogItem}>
			{countIngredient > 0 && (
				<Counter count={countIngredient} size='default' extraClass='m-1' />
			)}
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
		</div>
	);
};

BurgerIngredientCard.propTypes = {
	ingredient: ingredientPropType.isRequired,
};
