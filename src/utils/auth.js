const _api = {
 // BASE_URL: "http://localhost:5000/",
  BASE_URL: "https://api.nomoredomains.xyz/",
  HEADERS: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

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
  return _request(_api.BASE_URL + "signup",{
    method: "POST",
    credentials: 'include',
    headers: _api.HEADERS,
    body: JSON.stringify({ password, email }),
  })
};

export const authorize = (password, email) => {
  return _request(_api.BASE_URL + "signin", {
    method: "POST",
    credentials: 'include',
    headers: _api.HEADERS,
   body: JSON.stringify({ password, email }),
  })
};

export const logout = () => {
  return _request(_api.BASE_URL + "signout", {
    method: "GET",
    credentials: 'include',
    headers: _api.HEADERS,
  });
};

export const checkToken = () => {
    return _request(_api.BASE_URL + "users/me", {
      method: "GET",
      credentials: 'include',
      headers: _api.HEADERS,
  });
};

