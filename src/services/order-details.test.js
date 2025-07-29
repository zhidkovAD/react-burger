import { store } from "./store"
import { requestCreateOrder,
	    successRequestCreateOrder,
	    errorRequestCreateOrder, initialState } from "./order-details"

const errorMessage = 'fail message';

describe('create-order reducer', () => {
    it("should return the initial state", () => {
         const state = store.getState().order_details
        expect(state).toEqual(initialState)
    });

    it("should handle CREATE_ORDER_START", () => {
        store.dispatch(requestCreateOrder())
        let state = store.getState().order_details
        expect(state).toEqual({ ...initialState, loading: true, error: false });
    });
    it("should handle CREATE_ORDER_SUCCESS", () => {
        const orderNumber = 1234;
        store.dispatch(successRequestCreateOrder(orderNumber))
        let state = store.getState().order_details
        expect(state).toEqual({ ...initialState, loading: false, error: false, orderNumber: orderNumber });
    });
    it("should handle CREATE_ORDER_ERROR", () => {
        store.dispatch(errorRequestCreateOrder())
        let state = store.getState().order_details
        expect(state).toEqual({ ...initialState, loading: false, error: true, orderNumber: null });
    });
});