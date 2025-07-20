import { AppDispatch, TIngredient } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { request } from '@utils/request';
import { clearBurgerConstructor } from './burger-constructor';
import { getCookie } from '@/utils/cookie';

// Определяем тип для начального состояния
type TCreateOrderState = {
    orderNumber: number | null;
    loading: boolean;
    error: boolean;
}

const initialState: TCreateOrderState = {
	orderNumber: null,
	loading: false,
	error: false,
};


const OrderDetailsReducer = createSlice({
	name: 'order_details',
	initialState: initialState,
	reducers: {
		requestCreateOrder: (state:TCreateOrderState) => ({
			...state,
			loading: true,
			error: false,
		}),
		successRequestCreateOrder: (state:TCreateOrderState, action: PayloadAction<number | null>) => ({
			...state,
			orderNumber: action.payload,
		}),
		errorRequestCreateOrder: (state:TCreateOrderState) => ({
			...state,
			loading: false,
			error: true,
		}),
		closeWinOrder: () => initialState,
	},
});

export const {
	requestCreateOrder,
	successRequestCreateOrder,
	errorRequestCreateOrder,
	closeWinOrder,
} = OrderDetailsReducer.actions;

export default OrderDetailsReducer.reducer;


// усилитель
export const fetchCreateOrder = (ingredients:Array<TIngredient>) => (dispatch:AppDispatch) => {
	dispatch(requestCreateOrder());
	
	const options = {
		method: 'POST',
		headers: {
			Authorization: "Bearer " + getCookie("accessToken"),
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ ingredients: ingredients.map((ing) => ing._id) }),
	}
	request('/orders', options)
		.then((res) => {
			dispatch(successRequestCreateOrder(res.order.number))
			dispatch(clearBurgerConstructor())
		})
		.catch((error:any) => {
			alert(`Ошибка создания заказа: ${error}`);
			dispatch(errorRequestCreateOrder());
		});
};
