import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from "@utils/types"

// Определяем тип для начального состояния
export type TIngredientDetail = {
    displayIngredient: TIngredient | null;
}

const initialState: TIngredientDetail = {
	displayIngredient: null,
};


const ingredientDetailsReducer = createSlice({
	name: 'ingredient_details',
	initialState,
	reducers: {
		setDisplayIngredient: (state: TIngredientDetail, action: PayloadAction<TIngredient | null>) => ({
			...state,
			displayIngredient: action.payload,
		}),
	},
});

export const { setDisplayIngredient } = ingredientDetailsReducer.actions;

export default ingredientDetailsReducer.reducer;
