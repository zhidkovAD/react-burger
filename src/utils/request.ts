
const BASE_URL = 'https://norma.nomoreparties.space/api'

// function checkResponse(res) {
//     if (res.ok) {
//         return res.json();
//     }
//     return Promise.reject(`Ошибка ${res.status}`);
// }

export const WS_URL = "wss://norma.nomoreparties.space";

function checkResponse(res: Response) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export function request(endpoint: string, options?: any) {
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse)
}