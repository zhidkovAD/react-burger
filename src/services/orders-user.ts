import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersList } from "@utils/types"

type TOrdersUserState = {
    connected: boolean;
    message: TOrdersList | null;
    error: string | null;
};

const initialState: TOrdersUserState = {
    connected: false,
    message: null,
    error: null
};


const ordersUserReducer = createSlice({
	name: 'orders_user',
	initialState,
	reducers: {
		ordersUserConnect: (state:TOrdersUserState, action: PayloadAction<{url:string, addToken?:boolean}>)=> ({...state}),
		ordersUserOpen: (state:TOrdersUserState)=> ({...state}),
		ordersUserDisconnect: (state:TOrdersUserState)=> ({...state}),
		ordersUserSuccess: (state:TOrdersUserState) => (
			{ ...state, error: null, connected: true }
		),
		ordersUserError: (state:TOrdersUserState, action: PayloadAction<string | null>) => (
			{ ...state, error: action.payload }
		),
		ordersUserClosed: (state:TOrdersUserState) => (
            { ...state, error: null, connected: false }
        ),
		ordersUserMessage: (state:TOrdersUserState, action: PayloadAction<TOrdersList | null>) => (
            { ...state, error: null, message: action.payload }
        ),
	},
});

export const wsOrdersUserActions = {
    onConnect: ordersUserReducer.actions.ordersUserConnect,
    onOpen: ordersUserReducer.actions.ordersUserOpen,
    onSuccess: ordersUserReducer.actions.ordersUserSuccess,
    onClosed: ordersUserReducer.actions.ordersUserClosed,
    onDisconnect: ordersUserReducer.actions.ordersUserDisconnect,
    onError: ordersUserReducer.actions.ordersUserError,
    onMessage: ordersUserReducer.actions.ordersUserMessage
}; 

export const { ordersUserSuccess, ordersUserError, ordersUserClosed, ordersUserMessage } = ordersUserReducer.actions;

export default ordersUserReducer.reducer;
