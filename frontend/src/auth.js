import resource from './resource';
import Vue from 'vue';

export function login({ next, abort }, { username, password }) {
  console.log('login', username);

  resource.user.login.save({}, { username, password })
    .then((response) => {
      console.log('login.then', response);

      var json = response.json(),
          token = json.token;

      setToken(token);

      if (next) next(json);
    }).catch((response) => {
      console.log('login.abort', response);

      if (abort) abort(response.json());
    });
}

export function isLoggedIn() {
  return getToken() !== null;
}

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  Vue.http.options.headers['Authorization'] = 'Token ' + token;

  return localStorage.setItem('token', token);
}
