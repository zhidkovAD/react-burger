import { createSlice } from '@reduxjs/toolkit';
import { request } from '@utils/request';
import { clearBurgerConstructor } from './burger-constructor';

const initialState = {
	orderNumber: null,
	loading: false,
	error: false,
};

const OrderDetailsReducer = createSlice({
	name: 'order_details',
	initialState: initialState,
	reducers: {
		requestCreateOrder: (state) => ({
			...state,
			loading: true,
			error: false,
		}),
		successRequestCreateOrder: (state, action) => ({
			...state,
			orderNumber: action.payload,
		}),
		errorRequestCreateOrder: (state) => ({
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
export const fetchCreateOrder = (ingredients) => (dispatch) => {
	dispatch(requestCreateOrder());
	
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ ingredients: ingredients.map((ing) => ing._id) }),
	}

	request('/orders', options)
		.then((res) => {
			dispatch(successRequestCreateOrder(res.order.number))
			dispatch(clearBurgerConstructor())
		})
		.catch((error) => {
			alert(`Ошибка создания заказа: ${error}`, error);
			dispatch(errorRequestCreateOrder());
		});
};
