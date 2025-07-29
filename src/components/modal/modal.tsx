import { useEffect, FC  } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

type TProps = {
    caption?: string;
    children: React.ReactNode;
    onClose: (e?: Event) => void;
	classNameTitleModal:string;
	classNameContentModal:string
};

const Modal: FC<TProps> = ({
	caption,
	children,
	onClose,
	classNameTitleModal,
	classNameContentModal,
}) => {
	useEffect(() => {
		const checkEsc = (e: KeyboardEvent) => {
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
			<div className={`modal_dialog ${styles.dialog}`}>
				<div className={classNameTitleModal}>
					{caption && (
						<p className={`${styles.caption} text text_type_main-large`}>
							{caption}
						</p>
					)}
					<CloseIcon className='modal_close' type='primary' onClick={onClose} />
				</div>
				<div className={classNameContentModal}>{children}</div>
			</div>
			<ModalOverlay onClose={onClose} />
		</div>,
		document.getElementById('modal') as Element
	);
}


export default Modal;