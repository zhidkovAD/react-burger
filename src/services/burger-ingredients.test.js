import { store } from "./store"
    
import { requestIngredients,
	successRequestIngredients,
	errorRequestIngredients,
	setTab, initialState } from "./burger-ingredients";

const errorMessage = 'fail message';

const data = [
    {
        "_id": "60666c42cc7b410027a1a9b6",
        "name": "Биокотлета из марсианской Магнолии",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        "__v": 0
    },
    {
        "_id": "60666c42cc7b410027a1a9b7",
        "name": "Соус Spicy-X",
        "type": "sauce",
        "proteins": 30,
        "fat": 20,
        "carbohydrates": 40,
        "calories": 30,
        "price": 90,
        "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        "__v": 0
    }
];

describe('burger-ingredients reducer', () => {
    it("should return the initial state", () => {
        const state = store.getState().burger_ingredients
        expect(state).toEqual(initialState)
    });

    it("should handle LOAD_DATA_START", () => {
        store.dispatch(requestIngredients())
        let state = store.getState().burger_ingredients
        expect(state).toEqual({ ...initialState, loading: true, error: false });
    });

    it("should handle LOAD_DATA_SUCCESS", () => {
        store.dispatch(successRequestIngredients(data))
        let state = store.getState().burger_ingredients
        expect(state).toEqual({ ...initialState, loading: false, error: false, ingredients: data });
    });
    
    it("should handle LOAD_DATA_ERROR", () => {
        store.dispatch(errorRequestIngredients(errorMessage))
        let state = store.getState().burger_ingredients
        expect(state).toEqual({ ...initialState, loading: false, error: errorMessage, ingredients: [] });
    });

    it("should handle SET_TAB", () => {
        store.dispatch(setTab("sauce"))
        let state = store.getState().burger_ingredients
        expect(state.tab).toBe("sauce");
    });
    
});
