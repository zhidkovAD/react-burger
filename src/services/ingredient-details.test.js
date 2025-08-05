import { store } from "./store"
import { setDisplayIngredient, initialState } from "./ingredient-details";
    
const ingredient = {
		_id: '60666c42cc7b410027a1a9b1',
		name: 'Краторная булка N-200i',
		type: 'bun',
		proteins: 80,
		fat: 24,
		carbohydrates: 53,
		calories: 420,
		price: 1255,
		image: 'https://code.s3.yandex.net/react/code/bun-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
		__v: 0,
	}

describe('ingredient_details reducer', () => {
    it("should return the initial state", () => {
        const state = store.getState().ingredient_details
        expect(state).toEqual(initialState)
    });

    it("should handle SET_DISPLAY_Ingredient", () => {
        store.dispatch(setDisplayIngredient(ingredient))
        let state = store.getState().ingredient_details
        expect(state).toEqual({ ...initialState, displayIngredient: ingredient });
        
    });
  
});