import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal({
	caption,
	children,
	onClose,
	classNameTitleModal,
	classNameContentModal,
}) {
	useEffect(() => {
		const checkEsc = (e) => {
			if (e.key === 'Escape') {
				onClose(e);
			}
		};

		document.addEventListener('keydown', checkEsc, false);

		return () => {
			document.removeEventListener('keydown', checkEsc, false);
		};
	}, []);

	return ReactDOM.createPortal(
		<div className={styles.container}>
			<div className={styles.dialog}>
				<div className={classNameTitleModal}>
					{caption && (
						<p className={`${styles.caption} text text_type_main-large`}>
							{caption}
						</p>
					)}
					<CloseIcon type='primary' onClick={onClose} />
				</div>
				<div className={classNameContentModal}>{children}</div>
			</div>
			<ModalOverlay onClose={onClose} />
		</div>,
		document.getElementById('modal')
	);
}

Modal.propTypes = {
	caption: PropTypes.string,
	children: PropTypes.element,
	onClose: PropTypes.func.isRequired,
	classNameTitleModal: PropTypes.string,
	classNameContentModal: PropTypes.string,
};

export default Modal;
