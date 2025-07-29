import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { TIngredient, TIngredientConstructor } from "@utils/types"

// Определяем тип для начального состояния
type TBurgerConstructor = {
    ingredients: Array<TIngredientConstructor>;
	bun: null | TIngredient;
	sum: number;
}

type TBurgerConstructorSwap = {
    index1: number;
	index2: number;
}

export const initialState: TBurgerConstructor = {
	ingredients: [],
	bun: null,
	sum: 0,
};

const burgerConstructorReducer = createSlice({
	name: 'burger_constructor',
	initialState,
	reducers: {
		setBun: (state: TBurgerConstructor, action: PayloadAction<null | TIngredient>) => ({
			...state,
			bun: action.payload,
		}),
		addIngredient: {
			reducer: (state: TBurgerConstructor, action: PayloadAction<TIngredientConstructor>) => ({
						...state,
						ingredients: [...state.ingredients, action.payload],
					}),
			prepare: (ingredient: TIngredientConstructor)=>{
				const  uniqueId = uuid()
				return  { payload: {...ingredient, uniqueId } }
			}
		},
		deleteIngredient: (state: TBurgerConstructor, action: PayloadAction<number>) => ({
			...state,
			ingredients: [...state.ingredients].filter(
				(_item, index) => index !== action.payload
			),
		}),
		swapIngredients: (state: TBurgerConstructor, action : PayloadAction<TBurgerConstructorSwap>) => {
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
		setSum: (state: TBurgerConstructor, action: PayloadAction<number>) => ({
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
