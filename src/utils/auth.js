export const BASE_URL = 'https://auth.nomoreparties.co/';

export const register = (password, email) => {
    return fetch(`${BASE_URL}signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((response) => {
            return response.json();
        })
        .then((res) => {
           //console.log(res)
            return res;
        })
        .catch((err) => console.log(err));
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
        .then((response => response.json()))
        .then((data) => {
            //console.log(data.token)
            if (data.token){
                localStorage.setItem('jwt', data.token);
                return data;
            }
        })
        .catch(err => console.log(err))
};