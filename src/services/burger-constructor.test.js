import { store } from "./store"
import { setBun, addIngredient, deleteIngredient, swapIngredients, setSum, clearBurgerConstructor, initialState} from "./burger-constructor";
    

const ingredient = {
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
};

describe('burger-constructor reducer', () => {
    it("should return the initial state", () => {
        const state = store.getState().burger_constructor
        expect(state).toEqual(initialState)
    });

    it("should handle SET_BUN", () => {
        store.dispatch(setBun(ingredient))
        let state = store.getState().burger_constructor
        expect(state).toEqual({ ...initialState, bun: ingredient });
    });
    
    it("should handle ADD_INGREDIENT", () => {
        store.dispatch(addIngredient(ingredient))
        let state = store.getState().burger_constructor
        expect(state.ingredients).toEqual([{...ingredient, uniqueId: state.ingredients[0].uniqueId }]);
    });
    
    it("should handle DELETE_INGREDIENT", () => {
        store.dispatch(deleteIngredient(0))
        let state = store.getState().burger_constructor
        expect(state.ingredients).toEqual([]);
    });
    
    it("should handle SWAP_INGREDIENTS", () => {
        const ingredient2 = { ...ingredient, name: "abc" };
        store.dispatch(addIngredient(ingredient))
        store.dispatch(addIngredient(ingredient2))
        store.dispatch(swapIngredients({index1: 0, index2: 1}))
        let state = store.getState().burger_constructor
        expect(state.ingredients).toEqual([{...ingredient2, uniqueId: state.ingredients[0].uniqueId }, {...ingredient, uniqueId: state.ingredients[1].uniqueId }]);
    });
    
    it("should handle SET_SUM", () => {
        const sum = 1000;
        store.dispatch(setSum(sum))
        let state = store.getState().burger_constructor
        expect(state.sum).toBe(sum)
    });

    it("should handle CLEAR_CONSTRUCTOR", () => {
        store.dispatch(clearBurgerConstructor())
        let state = store.getState().burger_constructor
        expect(state).toEqual(initialState)
    });
});