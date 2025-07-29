import { useEffect, useCallback, useRef, FC } from 'react';
import styles from './burger-constructor.module.css';
import { useDispatch, useSelector } from '../../hooks/redux';
import { useDrop, useDrag } from 'react-dnd';

import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import {  TIngredientConstructor } from '@/utils/types';
import {
	setSum,
	setBun,
	addIngredient,
	deleteIngredient,
	swapIngredients,
} from '../../services/burger-constructor';

import { getBurgerConstructor } from '@/services/selectors';

export const BurgerConstructor: FC  = () => {
	const dispatch = useDispatch();

	const { bun, ingredients } = useSelector(getBurgerConstructor);

	useEffect(() => {
		let sum = 0;
		if (bun) sum += bun.price * 2;
		sum += ingredients.reduce((sum:number, item:TIngredientConstructor) => (sum += item.price), 0);
		dispatch(setSum(sum));
	}, [ingredients, bun, dispatch]);

	const [, dropTargetBunUp] = useDrop({
		accept: 'bun',
		drop(item:TIngredientConstructor) {
			dispatch(setBun(item));
		},
	});

	const [, dropTargetBunDown] = useDrop({
		accept: 'bun',
		drop(item:TIngredientConstructor) {
			dispatch(setBun(item));
		},
	});

	const [, dropTargetIngredient] = useDrop({
		accept: ['sauce', 'main'],
		drop(item:TIngredientConstructor) {
			dispatch(addIngredient(item));
		},
	});

	const handleDeleteIngredient = useCallback(
		(index:number) => {
			dispatch(deleteIngredient(index));
		},
		[dispatch]
	);

	return (
		<section className={styles.burger_constructor}>
			<div className={`cy_constructor_test ${styles.burger} mt-25 ml-4`}>
				{/* Выбранная булка */}
				<div ref={dropTargetBunUp}>
					{bun ? (
						<ConstructorElement
							type='top'
							isLocked={true}
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image}
							extraClass={`${styles.ingredient} ml-8`}
						/>
					) : (
						<div
							className={`${styles.emptyElement} constructor-element constructor-element_pos_top ml-8`}>
							<div
								className={`${styles.emptyElementText} text text_type_main-default`}>
								Добавьте булку
							</div>
						</div>
					)}
				</div>
				{/* Выбранные ингредиенты */}
				<ul
					className={`${styles.container_ingredients} mt-4 mb-4`}
					ref={dropTargetIngredient}>
					{ingredients && ingredients.length > 0 ? (
						ingredients.map((ingredient:TIngredientConstructor, index:number) => (
							<BurgerConstructorIngredient
								key={ingredient.uniqueId }
								ingredient={ingredient}
								index={index}
								onDelete={handleDeleteIngredient}
							/>
						))
					) : (
						<div className={`${styles.emptyElement} constructor-element ml-8`}>
							<div
								className={`${styles.emptyElementText} text text_type_main-default`}>
								Добавьте ингридиенты
							</div>
						</div>
					)}
				</ul>
				{/* Выбранная булка */}
				<div ref={dropTargetBunDown}>
					{bun ? (
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image}
							extraClass={`${styles.ingredient} ml-8`}
						/>
					) : (
						<div
							className={`${styles.emptyElement} constructor-element constructor-element_pos_bottom ml-8`}>
							<div
								className={`${styles.emptyElementText} text text_type_main-default`}>
								Добавьте булку
							</div>
						</div>
					)}
				</div>
				{/* Оформление заказа */}
				<OrderDetails />
			</div>
		</section>
	);
};

type TProps = {
    ingredient: TIngredientConstructor;
    index: number;
    onDelete: (index: number) => void;
};

const BurgerConstructorIngredient: FC<TProps> = ({ ingredient, index, onDelete }) => {
	const ref = useRef<HTMLLIElement>(null);

	const dispatch = useDispatch();

	const [, drag] = useDrag({
		type: 'sort',
		item: { index },
	});

	const [, drop] = useDrop({
		accept: 'sort',
		drop(item:TIngredientConstructor) {
			if (index !== item.index) {
				dispatch(swapIngredients({ index1: index, index2: item.index }));
			}
		},
	});

	drag(drop(ref));

	return (
		<li className={`${styles.listItem} mt-4`} key={index} ref={ref}>
			<span>
				<DragIcon type='primary' />
			</span>
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				extraClass={`${styles.ingredient} ml-2`}
				handleClose={() => onDelete(index)}
			/>
		</li>
	);
}
