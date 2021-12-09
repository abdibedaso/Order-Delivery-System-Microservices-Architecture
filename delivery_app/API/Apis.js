const BASE_URL = "http://35.227.171.14";

export function createUser(user) {
  const url = BASE_URL + "/user/create";
  headers={ 'Content-Type': 'application/json' };
  return _commonForPost(user,url,headers);
}
export function logIn(user) {
  const url = BASE_URL + "/keycloak/token";
  headers={ 'Content-Type': 'application/json' };
  return _commonForPost(user,url,headers);
}
export function makeOrder(order, token) {
  const url = BASE_URL + "/order";
  headers={ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token };
  return _commonForPost(order,url,headers);
}

function _commonForPost(body, url, headers){
  let requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };

  return fetch(url, requestOptions)
    .then((response) => { console.log(response.status); return response.json(); })
    .catch((error) => console.error(error))
}
