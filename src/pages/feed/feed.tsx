import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../hooks/redux';

import { WS_URL } from '@/utils/request';
import { getOrdersAll } from '@/services/selectors';

import styles from './feed.module.css';
import OrdersList from '../../components/orders-list/orders-list';
import OrdersStatus from '../../components/orders-status/orders-status';
import {Preloader} from '../../components/preloader/preloader';
import { fetchIngredients } from '@/services/burger-ingredients';
import { wsOrdersAllActions } from '@/services/orders-all';

function FeedPage() {
    const dispatch = useDispatch();
    const { connected, error, message } = useSelector(getOrdersAll);
    useMemo(() => {
            dispatch(fetchIngredients());
    }, [dispatch]);

    useEffect(() => {
        dispatch(wsOrdersAllActions.onConnect({url: `${WS_URL}/orders/all` }));
        return () => {
            dispatch(wsOrdersAllActions.onDisconnect());
        };
    }, [dispatch]);

    return (
        <div className="feed">
            {!connected && <Preloader />}
            {!!error && <p className={`mb-2 error-text text text_type_main-default`}>{error}</p>}
            {connected && !!message && (
                <main className={styles.content}>
                    <section className={styles.left_section}>
                        <p className="text text_type_main-large mt-6">Лента заказов</p>
                        <OrdersList data={message} />
                    </section>
                    <section className={styles.right_section}>
                        <OrdersStatus data={message} />
                    </section>
                </main>
            )}
        </div>
    );
}

export default FeedPage;