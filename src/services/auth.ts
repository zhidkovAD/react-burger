import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { request } from '@utils/request';
import { setCookie, getCookie, deleteCookie } from "@utils/cookie"
import { AppDispatch, TForgotPassword, TLoginUser, TPatchUser, TRegisterUser, TResetPassword, TUser } from "@utils/types"

// Определяем тип для начального состояния
type TAuth = {
    requestStart: boolean;
	requestError: null | string;
	requestSuccess: boolean;
    userLoggedIn: boolean;
    user: TUser;
    forgotPassword: boolean;
}

const initialState: TAuth = {
    requestStart: false,
    requestError: null,
    requestSuccess: false,
    userLoggedIn: false,
    user: {
        name: "",
        email: ""
    },
    forgotPassword: false
};

const authReducer = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		authRegisterStart: (state: TAuth) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false }),
		authRegisterSuccess: (state: TAuth, action: PayloadAction<TUser>) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true, user: { name: action.payload.name, email: action.payload.email }, userLoggedIn: true }),
		authRegisterError: (state: TAuth, action: PayloadAction<string>) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false, userLoggedIn: false }),

        authLoginStart: (state: TAuth) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false }),
		authLoginSuccess: (state: TAuth, action: PayloadAction<TUser>) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true, user: { name: action.payload.name, email: action.payload.email }, userLoggedIn: true }),
		authLoginError: (state: TAuth, action: PayloadAction<string>) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false, userLoggedIn: false }),
		
        authLogoutStart: (state: TAuth) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false }),
		authLogoutSuccess: (state: TAuth) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: false }),
		authLogoutError: (state: TAuth, action: PayloadAction<string>) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false, userLoggedIn: false }),

        authForgotPasswordStart: (state: TAuth) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false, forgotPassword: false }),
		authForgotPasswordSuccess: (state: TAuth) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true, forgotPassword: true }),
		authForgotPasswordError: (state: TAuth, action: PayloadAction<string>) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false, forgotPassword: false }),

        authResetPasswordStart: (state: TAuth) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false }),
		authResetPasswordSuccess: (state: TAuth) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true }),
		authResetPasswordError: (state: TAuth, action: PayloadAction<string>) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false }),

        authGetUserStart: (state: TAuth) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false, user: initialState.user }),
		authGetUserSuccess: (state: TAuth, action: PayloadAction<TUser>) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true, user: { name: action.payload.name, email: action.payload.email }, userLoggedIn: true }),
		authGetUserError: (state: TAuth, action: PayloadAction<string>) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false, user: initialState.user, userLoggedIn: false }),

        authPatchUserStart: (state: TAuth) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false }),
		authPatchUserSuccess: (state: TAuth) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true }),
		authPatchUserError: (state: TAuth, action: PayloadAction<string>) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false }),

        authClearErrors: (state: TAuth) => ({ ...state, requestStart: false, requestError: null, requestSuccess: false }),
	},
});

export const {
	authRegisterStart, authRegisterSuccess, authRegisterError,
    authLoginStart, authLoginSuccess, authLoginError,
    authLogoutStart, authLogoutSuccess, authLogoutError,
    authForgotPasswordStart, authForgotPasswordSuccess, authForgotPasswordError,
    authResetPasswordStart, authResetPasswordSuccess, authResetPasswordError,
    authGetUserStart, authGetUserSuccess, authGetUserError,
    authPatchUserStart, authPatchUserSuccess, authPatchUserError,
	authClearErrors,
} = authReducer.actions;

export default authReducer.reducer;


export const register = (form: TRegisterUser) => (dispatch:AppDispatch) => {
    dispatch(authRegisterStart());

    const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ ...form }),
	}

    request('/auth/register', options)
        .then(result => {
            const accessToken = result.accessToken.split("Bearer ")[1];
            const refreshToken = result.refreshToken;
            if (accessToken) {
                setCookie("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
            }
            dispatch(authRegisterSuccess({...result.user}));
        })
        .catch(err => {
            dispatch(authRegisterError(err.message));
        });
}

export const login = (form: TLoginUser) => (dispatch: AppDispatch) => {
    dispatch(authLoginStart());

    const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ ...form }),
	}
    request('/auth/login', options)
        .then(result => {
            const accessToken = result.accessToken.split("Bearer ")[1];
            const refreshToken = result.refreshToken;
            if (accessToken) {
                setCookie("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
            }
            dispatch(authLoginSuccess({...result.user}));
        })
        .catch(err => {
            dispatch(authLoginError(err.message));
        });
}

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(authLogoutStart());
   
    const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({token: localStorage.getItem("refreshToken")}),
	}
    request('/auth/logout', options)
        .then(() => {
            dispatch(authLogoutSuccess());
        })
        .catch(err => {
            dispatch(authLogoutError(err.message));
        })
        .finally(() => {
            localStorage.removeItem("refreshToken");
            deleteCookie("accessToken");
        });
}


export const forgotPassword = (form:TForgotPassword) => (dispatch: AppDispatch) => {
    dispatch(authForgotPasswordStart());
    const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ ...form }),
	}

    request('/password-reset', options)
        .then(() => {
            dispatch(authForgotPasswordSuccess());
        })
        .catch(err => {
            dispatch(authForgotPasswordError(err.message));
        });
}

export const resetPassword = (form:TResetPassword) => (dispatch: AppDispatch) => {
    dispatch(authResetPasswordStart());
    const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ ...form }),
	}

    request('/password-reset/reset', options)
        .then(() => {
            dispatch(authResetPasswordSuccess());
        })
        .catch(err => {
            dispatch(authResetPasswordError(err.message));
        });
}


export function refreshToken() {
    return request(`/auth/token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        })
    });
}



function requestWithRefresh(url:string, options: any) {
    return request(url, options)
        .catch(err => {
            if (err.message === "jwt expired") {
                return refreshToken().then(refreshData => {
                    if (!refreshData.success) {
                        return Promise.reject(refreshData);
                    }
                    localStorage.setItem("refreshToken", refreshData.refreshToken);
                    setCookie("accessToken", refreshData.accessToken);
                    options.headers.authorization = refreshData.accessToken;
                    return request(url, options);
                });
            } else {
                return Promise.reject(err);
            }
        });
}

export function getUser() {
    return function (dispatch:AppDispatch) {
        dispatch(authGetUserStart());
        requestWithRefresh(`/auth/user`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: "Bearer " + getCookie("accessToken")
                }
            })
        .then(result => {
            dispatch(authGetUserSuccess({...result.user}));
        })
        .catch(err => {
            dispatch(authGetUserError(err.message));
        });
    }
}

export function authCheckUser() {
    return function (dispatch:AppDispatch) {
        if (getCookie("accessToken")) {
            dispatch(getUser())
        }
    }
}


export function patchUser(form: TPatchUser) {
    return function (dispatch:AppDispatch) {
        dispatch(authPatchUserStart());
        requestWithRefresh(`/auth/user`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: "Bearer " + getCookie("accessToken")
                },
                body: JSON.stringify({ ...form })
            })
        .then(() => {
                dispatch(authPatchUserSuccess());
            })
        .catch(err => {
                dispatch(authPatchUserError(err.message));
            });
    }
}
