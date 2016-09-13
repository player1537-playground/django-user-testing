export function authToken(state) {
  return state.auth.token;
};

export function loggedIn(state) {
  return authToken(state) !== null;
};

export default {
  authToken,
  loggedIn,
};
