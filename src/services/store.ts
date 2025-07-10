import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './burger-ingredients';
import burgerConstructorReducer from './burger-constructor';
import ingredientDetailsReducer from './ingredient-details';
import orderDetailsReducer from './order-details';
import authReducer from './auth';
import getOrderReducer from "./get-order"
import ordersAllReducer from "./orders-all"
import ordersUserReducer from "./orders-user"

import { socketMiddleware } from './middleware/socket-middleware';
import { wsOrdersAllActions } from './orders-all';
import { wsOrdersUserActions } from './orders-user';

export const store = configureStore({
	reducer: {
		burger_ingredients: ingredientsReducer,
		burger_constructor: burgerConstructorReducer,
		ingredient_details: ingredientDetailsReducer,
		order_details: orderDetailsReducer,
		auth: authReducer,
		get_order: getOrderReducer,
		orders_all: ordersAllReducer,
		orders_user: ordersUserReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(socketMiddleware(wsOrdersAllActions))
			.concat(socketMiddleware(wsOrdersUserActions)),
        devTools: process.env.NODE_ENV !== 'production'
});
