import { createSlice } from '@reduxjs/toolkit';

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

const BASE_URL = 'https://norma.nomoreparties.space/api/orders';

// усилитель
export const fetchCreateOrder = (ingredients) => (dispatch) => {
	dispatch(requestCreateOrder());
	fetch(BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ ingredients: ingredients.map((ing) => ing._id) }),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка ${res.status}`);
		})
		.then((res) => dispatch(successRequestCreateOrder(res.order.number)))
		.catch((error) => {
			alert(`Ошибка создания заказа: ${error}`, error);
			dispatch(errorRequestCreateOrder());
		});
};
