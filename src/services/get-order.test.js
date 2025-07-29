import { store } from "./store"
import { requestGetOrder, successRequestGetOrder, errorRequestGetOrder, initialState} from "./get-order";
    

const errorMessage = 'fail message';

describe('get-order reducer', () => {
    it("should return the initial state", () => {
        const state = store.getState().get_order
        expect(state).toEqual(initialState)
    });

    it("should handle GET_ORDER_START", () => {
        store.dispatch(requestGetOrder())
        let state = store.getState().get_order
        expect(state).toEqual({ ...initialState, requestStart: true, requestError: null });
    });

    it("should handle GET_ORDER_SUCCESS", () => {
        const order = 1234;
        store.dispatch(successRequestGetOrder(order))
        let state = store.getState().get_order
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: null, order: order });
    });
    it("should handle GET_ORDER_ERROR", () => {
        store.dispatch(errorRequestGetOrder(errorMessage))
        let state = store.getState().get_order
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: errorMessage, order: null });
    });
});