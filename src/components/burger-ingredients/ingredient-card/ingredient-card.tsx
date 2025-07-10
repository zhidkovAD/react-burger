import { useMemo, useCallback, FC, SyntheticEvent } from 'react';
import styles from './ingredient-card.module.css';

import { useDrag } from 'react-dnd';
import { TIngredient } from '@utils/types';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getBurgerConstructor } from '@/services/selectors';

type TProps = {
    ingredient: TIngredient;
};

export const BurgerIngredientCard:FC<TProps> = ({ ingredient }) => {

    const navigate = useNavigate();
    const location = useLocation();
	const { bun, ingredients } = useSelector(getBurgerConstructor);

	const countIngredient = useMemo(() => {
		if (bun && ingredient._id == bun._id) {
			return 2;
		}
		return ingredients.filter((ingr:TIngredient) => ingr._id == ingredient._id).length;
	}, [bun, ingredients]);

	const showDialogItem = useCallback((e: SyntheticEvent) => {
		e.preventDefault();
        navigate(`/ingredients/${ingredient._id}`, { replace: true, state: { location: location, item: ingredient } });
    
    }, [navigate, location, ingredient]);

	const [, dragRef] = useDrag({
		type: ingredient.type,
		item: ingredient,
	});

	return (
		 <Link className={styles.link} to={`${location.pathname}/${ingredient._id}`} state={{ location: location }} onClick={showDialogItem} ref={dragRef}>
			<div className={styles.ingredient_card}>
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
		</Link>
	);
};
