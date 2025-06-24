import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './burger-ingredients';
import burgerConstructorReducer from './burger-constructor';
import ingredientDetailsReducer from './ingredient-details';
import orderDetailsReducer from './order-details';
import AuthReducer from './auth';

export const store = configureStore({
	reducer: {
		burger_ingredients: ingredientsReducer,
		burger_constructor: burgerConstructorReducer,
		ingredient_details: ingredientDetailsReducer,
		order_details: orderDetailsReducer,
		auth: AuthReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			...(process.env.NODE_ENV !== 'production' ? [] : [])
		),
});
