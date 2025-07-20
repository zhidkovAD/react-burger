import {  useMemo } from 'react';
import styles from './main.module.css';

import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { useDispatch, useSelector } from '../../hooks/redux';
import { fetchIngredients } from '@/services/burger-ingredients';
import { getIngredients } from '@/services/selectors';

function MainPage() {

    const dispatch = useDispatch();

	const { error, loading } = useSelector(getIngredients);

	useMemo(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

    return (
        (loading || error ? (
            <h1 className={`${styles.status} text text_type_main-medium`}>
                {loading
                    ? 'Пожалуйста подождите, идет загрузка данных...'
                    : error}
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