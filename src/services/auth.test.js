import { store } from "./store"
import { 
  	authRegisterStart, authRegisterSuccess, authRegisterError,
    authLoginStart, authLoginSuccess, authLoginError,
    authLogoutStart, authLogoutSuccess, authLogoutError,
    authForgotPasswordStart, authForgotPasswordSuccess, authForgotPasswordError,
    authResetPasswordStart, authResetPasswordSuccess, authResetPasswordError,
    authGetUserStart, authGetUserSuccess, authGetUserError,
    authPatchUserStart, authPatchUserSuccess, authPatchUserError, initialState
} from "./auth";
    

const user = {
    name: 'ivanov',
    email: 'ivanov@yandex.ru'
}

const errorMessage = 'fail message';

describe('auth reducer', () => {
    it("should return the initial state", () => {
        const state = store.getState().auth
        expect(state).toEqual(initialState)
    });

    it("should handle AUTH_REGISTER_START", () => {
        store.dispatch(authRegisterStart())
        let state = store.getState().auth
        expect(state).toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });

    it("should handle AUTH_REGISTER_SUCCESS", () => {
        store.dispatch(authRegisterSuccess(user))
        let state = store.getState().auth
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: true, user: user });
    });

    it("should handle AUTH_REGISTER_ERROR", () => {
        store.dispatch(authRegisterError(errorMessage))
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false, userLoggedIn: false, user: {name: "", email: ""} });
    });
    
    it("should handle AUTH_LOGIN_START", () => {
        store.dispatch(authLoginStart())
        let state = store.getState().auth
        expect(state).toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });

    it("should handle AUTH_LOGIN_SUCCESS", () => {
        store.dispatch(authLoginSuccess(user))
        let state = store.getState().auth
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: true, user: user });
    });

    it("should handle AUTH_LOGIN_ERROR", () => {
        store.dispatch(authLoginError(errorMessage))
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false, userLoggedIn: false, user: {name: "", email: ""} });
    });
    
    it("should handle AUTH_LOGOUT_START", () => {
        store.dispatch(authLogoutStart())
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });

    it("should handle AUTH_LOGOUT_SUCCESS", () => {
        store.dispatch(authLogoutSuccess())
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: false, user: {name: "", email: ""} });
    });

    it("should handle AUTH_LOGOUT_ERROR", () => {
        store.dispatch(authLogoutError(errorMessage))
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false, userLoggedIn: false, user: {name: "", email: ""} });
    });
        
    it("should handle AUTH_FORGOT_PASSWORD_START", () => {
        store.dispatch(authForgotPasswordStart())
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false, forgotPassword: false });
    });

    it("should handle AUTH_FORGOT_PASSWORD_SUCCESS", () => {
        store.dispatch(authForgotPasswordSuccess())
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true, forgotPassword: true });
    });

    it("should handle AUTH_FORGOT_PASSWORD_ERROR", () => {
        store.dispatch(authForgotPasswordError(errorMessage))
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false, forgotPassword: false });
    });

    it("should handle AUTH_RESET_PASSWORD_START", () => {
        store.dispatch(authResetPasswordStart())
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });

    it("should handle AUTH_RESET_PASSWORD_SUCCESS", () => {
        store.dispatch(authResetPasswordSuccess())
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true });
    });

    it("should handle AUTH_RESET_PASSWORD_ERROR", () => {
        store.dispatch(authResetPasswordError(errorMessage))
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false });
    });

    it("should handle AUTH_GET_USER_START", () => {
        store.dispatch(authGetUserStart())
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });

    it("should handle AUTH_GET_USER_SUCCESS", () => {
        store.dispatch(authGetUserSuccess(user))
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: true, user: user });
    });

    it("should handle AUTH_GET_USER_ERROR", () => {
        store.dispatch(authGetUserError(errorMessage))
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false, userLoggedIn: false, user: {name: "", email: ""} });
    });

    it("should handle AUTH_PATCH_USER_START", () => {
        store.dispatch(authPatchUserStart())
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });

    it("should handle AUTH_PATCH_USER_SUCCESS", () => {
        store.dispatch(authPatchUserSuccess(user))
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true, user: user });
    });

    it("should handle AUTH_PATCH_USER_ERROR", () => {
        store.dispatch(authPatchUserError(errorMessage))
        let state = store.getState().auth 
        expect(state).toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false, userLoggedIn: false, user: {name: "", email: ""} });
    });
});