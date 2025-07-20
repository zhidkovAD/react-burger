import OrderInfo from '../../components/order-info/order-info';
import { useDispatch } from '../../hooks/redux';
import { useMemo } from 'react';
import { fetchIngredients } from '@/services/burger-ingredients';

function OrderPage() {

    const dispatch = useDispatch();
    useMemo(() => {
                dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <main className="mt-15">
            <OrderInfo />
        </main>
    );
}

export default OrderPage;