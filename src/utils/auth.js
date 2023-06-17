export const BASE_URL = "https://auth.nomoreparties.co/";

function _request(url, options) {
  return fetch(url, options).then(_getResponseData);
}

function _getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const getContent = (jwt) => {
  return _request(BASE_URL + "users/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const register = (password, email) => {
  return _request(BASE_URL + "signup",{
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
};

export const authorize = (password, email) => {
  return _request(BASE_URL + "signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
};