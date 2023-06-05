export const BASE_URL = 'https://auth.nomoreparties.co/';


export const getContent = (jwt) => {
    // console.log(password, email)
    return fetch(`${BASE_URL}users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${jwt}`
        },
    })
        .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
};

export const register = (password, email) => {
    return fetch(`${BASE_URL}signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))

};

export const authorize = (password, email) => {
   // console.log(password, email)
    return fetch(`${BASE_URL}signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
};

