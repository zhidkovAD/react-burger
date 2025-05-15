import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';
import Modal from '../modal/modal';
import { ingredientPropType } from '@utils/prop-types.js';

function IngredientDetails({ ingredientInfo, onClose }) {

	return (
		<Modal
			caption='Детали ингридиента'
			classNameTitleModal={styles.titleModalIngDetails}
			classNameContentModal={styles.contentModalIngDetails}
			onClose={onClose}>
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
	);
}

IngredientDetails.propTypes = {
	ingredientInfo: ingredientPropType.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
