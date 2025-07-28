import { store } from "@/services/store";
import { Action } from "redux";
// import { Action, ActionCreator } from "redux";
import { ThunkDispatch } from 'redux-thunk'; // ThunkAction, 

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type TIngredientQty = TIngredient & {
    qty: number;
}

export type TIngredientConstructor = TIngredient & {
    uniqueId: string;
    index: number;
};

export type TUser = {
    name: string;
    email: string;
};

export type TRegisterUser = TUser & {
    password: string;
};

export type TLoginUser = {
    email: string;
    password: string;
};

export type TForgotPassword = {
    email: string;
};

export type TSubmit = {
    wasSubmit?: boolean;
};

export type TResetPassword = {
    password: string;
    token: string;
};

export type TPatchUser = TUser & {
    password: string;
};

export type TOrder = {
    ingredients: Array<string>;
    _id: string;
    status: string;
    name: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export type TOrdersList = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}

export type RootState = ReturnType<typeof store.getState>;

export type TDispatch = typeof store.dispatch;

export type AppDispatch = ThunkDispatch<RootState, never, Action>;

// export type AppThunk< ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, Action> >;