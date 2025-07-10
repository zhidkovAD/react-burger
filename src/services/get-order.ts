import { AppDispatch, TOrder } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { request } from '@utils/request';


type TGetOrderState = {
    requestStart: boolean;
    requestError: string | null;
    order: TOrder | null;
}

const initialState : TGetOrderState = {
    requestStart: false,
    requestError: null,
    order: null
}


const getOrderReducer = createSlice({
	name: 'get_order',
	initialState: initialState,
	reducers: {
		requestGetOrder: (state:TGetOrderState) => ({ ...state, requestStart: true, requestError: null }),
		successRequestGetOrder: (state:TGetOrderState, action: PayloadAction<TOrder | null>) => (
			{ ...state, requestStart: false, requestError: null, order: action.payload }
		),
		errorRequestGetOrder: (state:TGetOrderState, action: PayloadAction<string | null>) => (
			{ ...state, requestStart: false, requestError: action.payload, order: null }
		),
		closeWinGetOrder: () => initialState,
	},
});

export const {
	requestGetOrder,
	successRequestGetOrder,
	errorRequestGetOrder,
	closeWinGetOrder,
} = getOrderReducer.actions;

export default getOrderReducer.reducer;


// усилитель
export function fetchGetOrder(orderNum?: string) {
    return function(dispatch: AppDispatch) {
        dispatch(requestGetOrder());
		
		request(`/orders/${orderNum}`)
			.then(result => {
				dispatch(successRequestGetOrder(result.orders[0]));
			})
			.catch(err => {
				dispatch(errorRequestGetOrder(err.message));
			});
    }
}
