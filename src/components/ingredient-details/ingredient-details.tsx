import styles from './ingredient-details.module.css';
import { request } from '@utils/request';
import { useSelector } from '../../hooks/redux';
import { useParams } from 'react-router';
import { useState, useMemo, FC  } from 'react';

import { TIngredient } from '@utils/types';
import { getDisplayIngredient } from '@/services/selectors';


const IngredientDetails:FC = () => {
	
	const ingredientInfo: TIngredient | null  = useSelector(getDisplayIngredient);

	const [viewIngredient, setViewIngredient] = useState<TIngredient | null>(null) 

	const { id } = useParams();

	useMemo(() => {
        if (ingredientInfo) {
            setViewIngredient(ingredientInfo);
        } else if (id) {
			request("/ingredients")
			.then((res)=> setViewIngredient(res.data.find((i: TIngredient) => i._id === id) ))
        }
    }, [ingredientInfo, id]);

	return (
		(
		 viewIngredient && 
			<>
				<img
					className={`${styles.image} mb-4`}
					src={viewIngredient.image_large}
					alt='Изображение ингридиента'
				/>
				<p
					className={`${styles.name} text-center text text_type_main-medium mb-8`}>
					{viewIngredient.name}
				</p>
				<div className={`${styles.detail}`}>
					<div className={styles.parameterItem}>
						<div className='text text_type_main-default text_color_inactive mb-2'>
							Калории,ккал
						</div>
						<div className='text-center text text_type_digits-default text_color_inactive'>
							{viewIngredient.calories}
						</div>
					</div>
					<div className={styles.parameterItem}>
						<div className='text text_type_main-default text_color_inactive mb-2'>
							Белки, г
						</div>
						<div className='text-center text text_type_digits-default text_color_inactive'>
							{viewIngredient.proteins}
						</div>
					</div>
					<div className={styles.parameterItem}>
						<div className='text text_type_main-default text_color_inactive mb-2'>
							Жиры, г
						</div>
						<div className='text-center text text_type_digits-default text_color_inactive'>
							{viewIngredient.fat}
						</div>
					</div>
					<div className={styles.parameterItem}>
						<div className='text text_type_main-default text_color_inactive mb-2'>
							Углеводы, г
						</div>
						<div className='text-center text text_type_digits-default text_color_inactive'>
							{viewIngredient.carbohydrates}
						</div>
					</div>
				</div>
		</>
		)
	);
}

export default IngredientDetails;

