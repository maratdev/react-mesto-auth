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

export const register = (password, email) => {
  return _request(BASE_URL + "signup",{
    method: "POST",
    credentials: 'include',
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
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
   body: JSON.stringify({ password, email }),
  })
};

export const logout = () => {
  return _request(BASE_URL + "signout", {
    method: "GET",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const checkToken = () => {
    return _request(BASE_URL + "users/me", {
      method: "GET",
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
  });
};

