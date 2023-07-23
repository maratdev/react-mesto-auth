const _api = {
  //BASE_URL = "https://api.nomoredomains.xyz/";
  BASE_URL: "http://localhost:5000/",
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

// Api------------------------------------------------------------------> Users
export const getDataUser = () => {
  return _request(_api.BASE_URL + "users/me", {
    method: "GET",
    credentials: "include",
    headers: _api.HEADERS,
  });
};

export const saveDataInfo = (profileInfo) => {
  return _request(_api.BASE_URL + "users/me", {
    method: "PATCH",
    credentials: "include",
    headers: _api.HEADERS,
    body: JSON.stringify({
      name: profileInfo.name,
      about: profileInfo.about,
    }),
  });
};

export const saveDataProfile = (profileAvatar) => {
  return _request(_api.BASE_URL + "users/me/avatar", {
    method: "PATCH",
    credentials: "include",
    headers: _api.HEADERS,
    body: JSON.stringify({ avatar: profileAvatar.avatar }),
  });
};

// Api------------------------------------------------------------------> Card

// Инициализация Card
export const getInitialCards = () => {
  return _request(_api.BASE_URL + "cards", {
    method: "GET",
    credentials: "include",
    headers: _api.HEADERS,
  });
};

// Добавление карточки
export const saveCardInfo = (cardInfo) => {
  return _request(_api.BASE_URL + "cards", {
    method: "POST",
    credentials: "include",
    headers: _api.HEADERS,
    body: JSON.stringify({
      name: cardInfo.name,
      link: cardInfo.link,
    }),
  });
};

// Удаление карточки
export const deleteCard = (cardId) => {
  return _request(_api.BASE_URL + `cards/${cardId}`, {
    method: "DELETE",
    credentials: "include",
    headers: _api.HEADERS,
  });
};

export const changeLikeCardStatus = (cardId, isLiked) => {
  const method = isLiked ? "PUT" : "DELETE";
  return _request(_api.BASE_URL + `cards/${cardId}/likes`, {
    method: method,
    credentials: "include",
    headers: _api.HEADERS,
  });
};
