class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }


  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    return this._request(this._baseUrl + `/cards/${cardId}/likes`, {
      headers: this._headers,
      method: method,
    });
  }


}

const api = new Api({
//  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  baseUrl: "http://localhost:5000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
