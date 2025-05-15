import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import styles from './order-details.module.css';

function OrderDetails({ numberOrder, onClose }) {
	return (
		<Modal
			onClose={onClose}
			classNameTitleModal={styles.titleModalOrdDetails}
			classNameContentModal={styles.contentModalOrdDetails}>
			<p
				className={`${styles['order-number']} text text_type_digits-large mb-8`}>
				{numberOrder}
			</p>
			<p className='text text_type_main-medium mb-15 text-center'>
				идентификатор заказа
			</p>
			<img
				src={'/done.svg'}
				className={`${styles.image} mb-15 text-center`}
				alt='Заказ принят'
			/>
			<p className='text text_type_main-default mb-2 text-center'>
				Ваш заказ начали готовить
			</p>
			<p
				className={`${styles['last-p']} text text_type_main-default text_color_inactive text-center`}>
				Дождитесь готовности на орбитальной станции
			</p>
		</Modal>
	);
}

OrderDetails.propTypes = {
	numberOrder: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default OrderDetails;
