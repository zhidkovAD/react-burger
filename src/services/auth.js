import { createSlice } from '@reduxjs/toolkit';
import { request } from '@utils/request';
import { setCookie, getCookie, deleteCookie } from "@utils/cookie"

const initialState = {
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

const AuthReducer = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		authRegisterStart: (state) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false }),
		authRegisterSuccess: (state, action) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true, user: { name: action.payload.name, email: action.payload.email }, userLoggedIn: true }),
		authRegisterError: (state, action) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false, userLoggedIn: false }),

        authLoginStart: (state) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false }),
		authLoginSuccess: (state, action) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true, user: { name: action.payload.name, email: action.payload.email }, userLoggedIn: true }),
		authLoginError: (state, action) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false, userLoggedIn: false }),
		
        authLogoutStart: (state) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false }),
		authLogoutSuccess: (state) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: false }),
		authLogoutError: (state, action) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false, userLoggedIn: false }),

        authForgotPasswordStart: (state) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false, forgotPassword: false }),
		authForgotPasswordSuccess: (state) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true, forgotPassword: true }),
		authForgotPasswordError: (state, action) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false, forgotPassword: false }),

        authResetPasswordStart: (state) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false }),
		authResetPasswordSuccess: (state) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true }),
		authResetPasswordError: (state, action) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false }),

        authGetUserStart: (state) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false, user: initialState.user }),
		authGetUserSuccess: (state, action) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true, user: { name: action.payload.name, email: action.payload.email }, userLoggedIn: true }),
		authGetUserError: (state, action) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false, user: initialState.user, userLoggedIn: false }),

        authPatchUserStart: (state) => ({ ...state, requestStart: true, requestError: null, requestSuccess: false }),
		authPatchUserSuccess: (state) => ({ ...state, requestStart: false, requestError: null, requestSuccess: true }),
		authPatchUserError: (state, action) => ({ ...state, requestStart: false, requestError: action.payload, requestSuccess: false }),

        authClearErrors: (state) => ({ ...state, requestStart: false, requestError: null, requestSuccess: false }),
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
} = AuthReducer.actions;

export default AuthReducer.reducer;


export const register = (form) => (dispatch) => {
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

export const login = (form) => (dispatch) => {
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

export const logout = () => (dispatch) => {
    dispatch(authLogoutStart());
   
    const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({token: localStorage.getItem("refreshToken")}),
	}
    request('/auth/logout', options)
        .then(result => {
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


export const forgotPassword = (form) => (dispatch) => {
    dispatch(authForgotPasswordStart());
    const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ ...form }),
	}

    request('/password-reset', options)
        .then(result => {
            dispatch(authForgotPasswordSuccess());
        })
        .catch(err => {
            dispatch(authForgotPasswordError(err.message));
        });
}

export const resetPassword = (form) => (dispatch) => {
    dispatch(authResetPasswordStart());
    const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ ...form }),
	}

    request('/password-reset/reset', options)
        .then(result => {
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



function requestWithRefresh(url, options) {
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
    return function (dispatch) {
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
    return function (dispatch) {
        if (getCookie("accessToken")) {
            dispatch(getUser())
        }
    }
}


export function patchUser(form) {
    return function (dispatch) {
        dispatch(authPatchUserStart());
        requestWithRefresh(`/auth/user`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: "Bearer " + getCookie("accessToken")
                },
                body: JSON.stringify({ ...form })
            })
        .then(result => {
                dispatch(authPatchUserSuccess());
            })
        .catch(err => {
                dispatch(authPatchUserError(err.message));
            });
    }
}
