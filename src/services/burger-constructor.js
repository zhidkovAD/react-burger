import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
	ingredients: [],
	bun: null,
	sum: 0,
};

const burgerConstructorReducer = createSlice({
	name: 'burger_constructor',
	initialState,
	reducers: {
		setBun: (state, action) => ({
			...state,
			bun: action.payload,
		}),
		addIngredient: {
			reducer: (state, action) => ({
						...state,
						ingredients: [...state.ingredients, action.payload],
					}),
			prepare: (ingredient)=>{
				const  uniqueId = uuid()
				return  { payload: {...ingredient, uniqueId } }
			}
		},
		deleteIngredient: (state, action) => ({
			...state,
			ingredients: [...state.ingredients].filter(
				(_item, index) => index !== action.payload
			),
		}),
		swapIngredients: (state, action) => {
			const newState = { ...state, ingredients: [...state.ingredients] };
			[
				newState.ingredients[action.payload.index1],
				newState.ingredients[action.payload.index2],
			] = [
				newState.ingredients[action.payload.index2],
				newState.ingredients[action.payload.index1],
			];
			return newState;
		},
		setSum: (state, action) => ({
			...state,
			sum: action.payload,
		}),
		clearBurgerConstructor: () => initialState,
	},
});

export const {
	setBun,
	addIngredient,
	deleteIngredient,
	swapIngredients,
	setSum,
	clearBurgerConstructor
} = burgerConstructorReducer.actions;

export default burgerConstructorReducer.reducer;
