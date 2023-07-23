const _api = {
  //BASE_URL: "http://localhost:5000/",
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

// Api------------------------------------------------------------------> Users
// Инициализация Users
export const getDataUser = () => {
  return _request(_api.BASE_URL + "users/me", {
    method: "GET",
    credentials: "include",
    headers: _api.HEADERS,
  });
};
// Изменение данных User
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
// Изменение аватара User
export const saveProfileAvatar = (profileAvatar) => {
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

// Удаление/Добавление лайка
export const changeLikeCardStatus = (cardId, isLiked) => {
  const method = isLiked ? "PUT" : "DELETE";
  return _request(_api.BASE_URL + `cards/${cardId}/likes`, {
    method: method,
    credentials: "include",
    headers: _api.HEADERS,
  });
};
