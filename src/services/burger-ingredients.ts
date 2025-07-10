import { AppDispatch, TIngredient } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { request } from '@utils/request';

// Определяем тип для начального состояния
type TBurgerIngredients = {
    ingredients: Array<TIngredient>;
	loading: boolean;
	error: string | boolean;
	tab: string;
}

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
		requestIngredients: (state:TBurgerIngredients) => ({
			...state,
			loading: true,
			error: false,
		}),
		successRequestIngredients: (state:TBurgerIngredients, action: PayloadAction<Array<TIngredient>>) => ({
			...state,
			loading: false,
			ingredients: action.payload,
		}),
		errorRequestIngredients: (state:TBurgerIngredients, action: PayloadAction<string | boolean>) => ({
			...state,
			loading: false,
			error: action.payload,
			ingredients: [],
		}),
		setTab: (state:TBurgerIngredients, action: PayloadAction<string>) => ({
			...state,
			tab: action.payload,
		})
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
export const fetchIngredients = () => (dispatch:AppDispatch) => {
	dispatch(requestIngredients());
	request("/ingredients")
		.then((res) => dispatch(successRequestIngredients(res.data)))
		.catch((error) =>
			dispatch(
				errorRequestIngredients(`Ошибка получения ингредиентов: ${error}`)
			)
		);
};
