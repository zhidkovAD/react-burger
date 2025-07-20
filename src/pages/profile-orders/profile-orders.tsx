import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../hooks/redux';
import { getOrdersUser } from '@/services/selectors';
import { wsOrdersUserActions } from '@/services/orders-user';
import { WS_URL } from '@utils/request';

import styles from './profile-orders.module.css';
import {Preloader} from '../../components/preloader/preloader';
import OrdersList from '../../components/orders-list/orders-list';
import { fetchIngredients } from '@/services/burger-ingredients';
import { TOrdersList } from '@utils/types';

function ProfileOrders() {

    const dispatch = useDispatch();
    const { connected, error, message } = useSelector(getOrdersUser);
    useMemo(() => {
         dispatch(fetchIngredients());
    }, [dispatch]);
    //заказы пользователя почему-то приходят в прямом порядке
    const messageSorted: TOrdersList | null = useMemo(() => {
        if (!message) {
            return null;
        }
        let orders = [...message.orders];
        return { ...message, orders: orders.sort((a, b) => b.number - a.number) };
    }, [message]);

    useEffect(() => {
        dispatch(wsOrdersUserActions.onConnect({url: `${WS_URL}/orders`,  addToken: true }));
        return () => {
            dispatch(wsOrdersUserActions.onDisconnect());
        };
    }, [dispatch]);

    return (
        <div className={styles.container}>
            {!connected && <Preloader />}
            {!!error && <p className={`mb-2 error-text text text_type_main-default`}>{error}</p>}
            {connected && !!messageSorted && (
                <OrdersList data={messageSorted!} isPerson />
            )}
        </div>
    );
}

export default ProfileOrders;