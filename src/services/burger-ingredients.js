import { createSlice } from '@reduxjs/toolkit';

import { request } from '@utils/request';

const initialState = {
	ingredients: [],
	loading: false,
	error: false,
	tab: 'bun',
};

const ingredientsReducer = createSlice({
	name: 'burger_ingredients',
	initialState,
	reducers: {
		requestIngredients: (state) => ({
			...state,
			loading: true,
			error: false,
		}),
		successRequestIngredients: (state, action) => ({
			...state,
			loading: false,
			ingredients: action.payload,
		}),
		errorRequestIngredients: (state, action) => ({
			...state,
			loading: false,
			error: action.payload,
			ingredients: [],
		}),
		setTab: (state, action) => ({
			...state,
			tab: action.payload,
		}),
	},
});

export const {
	requestIngredients,
	successRequestIngredients,
	errorRequestIngredients,
	setTab,
} = ingredientsReducer.actions;

export default ingredientsReducer.reducer;


// усилитель
export const fetchIngredients = () => (dispatch) => {
	dispatch(requestIngredients());
	request("/ingredients")
		.then((res) => dispatch(successRequestIngredients(res.data)))
		.catch((error) =>
			dispatch(
				errorRequestIngredients(`Ошибка получения ингредиентов: ${error}`)
			)
		);
};
