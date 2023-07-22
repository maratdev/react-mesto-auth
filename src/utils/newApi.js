//export const BASE_URL = "https://api.nomoredomains.xyz/";
export const BASE_URL = "http://localhost:5000/";

function _request(url, options) {
    return fetch(url, options).then(_getResponseData);
}

function _getResponseData(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}


// Api---------------------------------------------------------> Users
export const getDataUser = () => {
    return _request(BASE_URL + "users/me", {
        method: "GET",
        credentials: 'include',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
};

export const saveDataInfo = (profileInfo) => {
    return _request(BASE_URL+ "users/me", {
        method: "PATCH",
        credentials: 'include',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: profileInfo.name,
            about: profileInfo.about,
        }),
    });
}


















export const getInitialCards = () => {
    return _request(BASE_URL + "cards", {
        method: "GET",
        credentials: 'include',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
};

