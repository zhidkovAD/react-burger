import { RootState } from "@utils/types";

export const getIngredients = (state: RootState) => state.burger_ingredients;
export const getBurgerConstructor = (state: RootState) => state.burger_constructor;
export const getOrderDetails = (state: RootState) => state.order_details;
export const getAuth = (state: RootState) => state.auth;
export const getOrder = (state: RootState) => state.get_order;
export const getOrdersAll = (state: RootState) => state.orders_all;
export const getOrdersUser = (state: RootState) => state.orders_user;
export const getDisplayIngredient = (state: RootState) => state.ingredient_details.displayIngredient;