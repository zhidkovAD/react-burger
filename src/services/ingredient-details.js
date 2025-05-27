import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	displayIngredient: null,
};

const ingredientDetailsReducer = createSlice({
	name: 'ingredient_details',
	initialState,
	reducers: {
		setDisplayIngredient: (state, action) => ({
			...state,
			displayIngredient: action.payload,
		}),
	},
});

export const { setDisplayIngredient } = ingredientDetailsReducer.actions;

export default ingredientDetailsReducer.reducer;
