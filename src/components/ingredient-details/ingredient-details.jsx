import { useCallback } from 'react';
import styles from './ingredient-details.module.css';
import Modal from '../modal/modal';
import { useSelector, useDispatch } from 'react-redux';

import { setDisplayIngredient } from '../../services/ingredient-details';

function IngredientDetails() {
	const ingredientInfo = useSelector(
		(store) => store.ingredient_details.displayIngredient
	);

	const dispatch = useDispatch();

	const closeIngredientDetail = useCallback(
		(e) => {
			e.stopPropagation();
			dispatch(setDisplayIngredient(null));
		},
		[dispatch]
	);

	return (
		<>
			{ingredientInfo ? (
				<Modal
					caption='Детали ингридиента'
					classNameTitleModal={styles.titleModalIngDetails}
					classNameContentModal={styles.contentModalIngDetails}
					onClose={closeIngredientDetail}>
					<img
						className={`${styles.image} mb-4`}
						src={ingredientInfo.image_large}
						alt='Изображение ингридиента'
					/>
					<p
						className={`${styles.name} text-center text text_type_main-medium mb-8`}>
						{ingredientInfo.name}
					</p>
					<div className={`${styles.detail}`}>
						<div className={styles.parameterItem}>
							<div className='text text_type_main-default text_color_inactive mb-2'>
								Калории,ккал
							</div>
							<div className='text-center text text_type_digits-default text_color_inactive'>
								{ingredientInfo.calories}
							</div>
						</div>
						<div className={styles.parameterItem}>
							<div className='text text_type_main-default text_color_inactive mb-2'>
								Белки, г
							</div>
							<div className='text-center text text_type_digits-default text_color_inactive'>
								{ingredientInfo.proteins}
							</div>
						</div>
						<div className={styles.parameterItem}>
							<div className='text text_type_main-default text_color_inactive mb-2'>
								Жиры, г
							</div>
							<div className='text-center text text_type_digits-default text_color_inactive'>
								{ingredientInfo.fat}
							</div>
						</div>
						<div className={styles.parameterItem}>
							<div className='text text_type_main-default text_color_inactive mb-2'>
								Углеводы, г
							</div>
							<div className='text-center text text_type_digits-default text_color_inactive'>
								{ingredientInfo.carbohydrates}
							</div>
						</div>
					</div>
				</Modal>
			) : null}
		</>
	);
}

export default IngredientDetails;
