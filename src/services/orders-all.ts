import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersList } from "@utils/types"

type TOrdersAllState = {
    connected: boolean;
    message: TOrdersList | null;
    error: string | null;
};

const initialState: TOrdersAllState = {
    connected: false,
    message: null,
    error: null
};


const ordersAllReducer = createSlice({
	name: 'orders_all',
	initialState,
	reducers: {
        ordersAllConnect: (state:TOrdersAllState, action: PayloadAction<{url:string, addToken?:boolean}>)=> ({...state}),
		ordersAllOpen: (state:TOrdersAllState)=> ({...state}),
		ordersAllDisconnect: (state:TOrdersAllState)=> ({...state}),
		ordersAllSuccess: (state:TOrdersAllState) => (
			{ ...state, error: null, connected: true }
		),
		ordersAllError: (state:TOrdersAllState, action: PayloadAction<string | null>) => (
			{ ...state, error: action.payload }
		),
		ordersAllClosed: (state:TOrdersAllState) => (
            { ...state, error: null, connected: false }
        ),
		ordersAllMessage: (state:TOrdersAllState, action: PayloadAction<TOrdersList | null>) => (
            { ...state, error: null, message: action.payload }
        ),
	},
});

export const wsOrdersAllActions = {
    onConnect: ordersAllReducer.actions.ordersAllConnect,
    onOpen: ordersAllReducer.actions.ordersAllOpen,
    onSuccess: ordersAllReducer.actions.ordersAllSuccess,
    onClosed: ordersAllReducer.actions.ordersAllClosed,
    onDisconnect: ordersAllReducer.actions.ordersAllDisconnect,
    onError: ordersAllReducer.actions.ordersAllError,
    onMessage: ordersAllReducer.actions.ordersAllMessage
}; 

export const { ordersAllSuccess, ordersAllError, ordersAllClosed, ordersAllMessage } = ordersAllReducer.actions;

export default ordersAllReducer.reducer;
