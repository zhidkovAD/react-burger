import {  useMemo } from 'react';
import styles from './main.module.css';

import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/burger-ingredients';

function MainPage() {

    const dispatch = useDispatch();

	const burgerIngredients = useSelector((store:any) => store.burger_ingredients);

	useMemo(() => {
		dispatch(fetchIngredients() as any);
	}, [dispatch]);

    return (
        (burgerIngredients.loading || burgerIngredients.error ? (
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
        ))
    )
}

export default MainPage;