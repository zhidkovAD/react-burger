import { store } from "./store"
import { ordersUserSuccess, ordersUserError, ordersUserClosed, ordersUserMessage, initialState } from "./orders-user"


const errorMessage = 'fail message';

const message = {
    "success": true,
    "orders": [
        {
            "ingredients": [
                "60d3463f7034a000269f45e7",
                "60d3463f7034a000269f45e9",
                "60d3463f7034a000269f45e8",
                "60d3463f7034a000269f45ea"
            ],
            "_id": "",
            "status": "done",
            "number": 0,
            "createdAt": "2021-06-23T14:43:22.587Z",
            "updatedAt": "2021-06-23T14:43:22.603Z"
        }
    ],
    "total": 1,
    "totalToday": 1
};

describe('orders-user reducer', () => {
    it("should return the initial state", () => {
        const state = store.getState().orders_user
        expect(state).toEqual(initialState)
    });

    it("should handle ORDERS_USER_SUCCESS", () => {
        store.dispatch(ordersUserSuccess())
        let state = store.getState().orders_user
        expect(state).toEqual({ ...initialState, error: null, connected: true });
    });

    it("should handle ORDERS_USER_ERROR", () => {
        store.dispatch(ordersUserError(errorMessage))
        let state = store.getState().orders_user
        expect(state).toEqual({ ...initialState, error: errorMessage });
    });

    it("should handle ORDERS_USER_CLOSED", () => {
        store.dispatch(ordersUserClosed())
        let state = store.getState().orders_user
        expect(state).toEqual({ ...initialState, error: null, connected: false });
    });

    it("should handle ORDERS_USER_MESSAGE", () => {
        store.dispatch(ordersUserMessage(message))
        let state = store.getState().orders_user
        expect(state).toEqual({ ...initialState, error: null, message: message });
    });
});