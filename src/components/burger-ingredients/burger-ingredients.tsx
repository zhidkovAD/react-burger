import  { useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsCategory } from './ingredients-category/intgredients-category';
import { useDispatch, useSelector } from 'react-redux';

import { setTab } from '../../services/burger-ingredients';

import { TIngredient } from '@/utils/types';
import { getIngredients } from '@/services/selectors';

export const BurgerIngredients = () => {
	const dispatch = useDispatch();

	const {ingredients, tab} = useSelector(getIngredients);


	const headers: Record<string, React.RefObject<HTMLHeadingElement>> = {};
    headers["bun"] = useRef(null);
    headers["sauce"] = useRef(null);
    headers["main"] = useRef(null);


	const refContainer: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

	const tabClick = (value:string) => {
		dispatch(setTab(value));
		// При использовании scrollIntoView({ behavior: "smooth" }) пропадал элемент nav (возможно проблема со стилями), поэтому выполнил реализацию через scrollTo
		let element = headers[value].current;
		if (element && refContainer.current) {
			refContainer.current.scrollTo({
				// block: 'start',
				behavior: 'smooth',
				top: element.offsetTop - refContainer.current.offsetTop,
			});
		}
	};

	function handleScroll(e: React.UIEvent<HTMLDivElement>) {
		const pos = e.currentTarget.scrollTop;
		const distance = [];
		for (let h of Object.values(headers)) {
			if (h.current){
				const hPos = h.current.offsetTop;
				distance.push(Math.abs(pos - hPos));
			}
		}
		const min = Math.min(...distance);
		const minIndex = distance.indexOf(min);
		const newTab = Object.keys(headers)[minIndex];

		if (tab !== newTab) {
			dispatch(setTab(newTab));
		}
	}

	return (
		<section className={styles.burger_ingredients}>
			<nav className='mb-10'>
				<ul className={styles.menu}>
					<Tab value='bun' active={tab == 'bun'} onClick={tabClick}>
						Булки
					</Tab>
					<Tab value='main' active={tab == 'main'} onClick={tabClick}>
						Начинки
					</Tab>
					<Tab value='sauce' active={tab == 'sauce'} onClick={tabClick}>
						Соусы
					</Tab>
				</ul>
			</nav>
			<div
				ref={refContainer}
				className={styles.container_ingredients}
				onScroll={handleScroll}>
				<BurgerIngredientsCategory
					ref={headers['bun']}
					name={'Булки'}
					ingredients_category={ingredients.filter(
						(ingredient:TIngredient) => ingredient.type == 'bun'
					)}
				/>
				<BurgerIngredientsCategory
					ref={headers['main']}
					name={'Начинки'}
					ingredients_category={ingredients.filter(
						(ingredient:TIngredient) => ingredient.type == 'main'
					)}
				/>
				<BurgerIngredientsCategory
					ref={headers['sauce']}
					name={'Соусы'}
					ingredients_category={ingredients.filter(
						(ingredient:TIngredient) => ingredient.type == 'sauce'
					)}
				/>
			</div>
		</section>
	);
};
