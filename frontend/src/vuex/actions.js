import resource from '../resource';
import getters from './getters';

export function retrieveBlogPostsList({ dispatch }, { next, abort }, page) {
  dispatch('SET_BLOG_POSTS_DETAIL', null);
  dispatch('SET_BLOG_POSTS_LIST', null);

  resource.blog.posts.get({page}).then((response) => {
    dispatch('SET_BLOG_POSTS_LIST', response.json());
    if (next) next();
  }, (response) => {
    abort(response.statusText);
  });
}

export function retrieveBlogPostsOptions({ dispatch }, { next, abort }) {
  dispatch('SET_BLOG_POSTS_OPTIONS', null);

  resource.blog.posts.options().then((response) => {
    dispatch('SET_BLOG_POSTS_OPTIONS', response.json());
    if (next) next();
  }, (response) => {
    abort(response.statusText);
  });
}

export function retrieveBlogPostsDetail({ dispatch }, { next, abort }, id) {
  dispatch('SET_BLOG_POSTS_DETAIL', null);
  dispatch('SET_BLOG_POSTS_LIST', null);

  resource.blog.posts.get({id})
    .then((response) => {
      console.log('retrieveBlogPostsDetail.then', response);

      dispatch('SET_BLOG_POSTS_DETAIL', response.json());

      if (next) next();
    }).catch((response) => {
      console.log('retrieveBlogPostsDetail.catch', response);


      abort(response.statusText);
    });
};


export function createBlogPost({ dispatch }, { next, abort }, values) {
  var toPost = {};

  for (var key in values) {
    if (values[key].config.required) {
      toPost[key] = values[key].value;
    }
  }

  console.log(JSON.stringify(toPost, true, 2));

  resource.blog.posts.save({}, toPost).then((response) => {
    if (next) next(response.json());
  }, (response) => {
    if (abort) abort(response.json());
  });
}

export function authLogin({ dispatch }, { next, abort }, creds) {
  resource.user.login.save({}, creds)
    .then((response) => {
      console.log('login.then', response);

      var json = response.json(),
          token = json.token;

      dispatch('SET_AUTH_TOKEN', token);

      if (next) next(json);
    }).catch((response) => {
      console.log('login.catch', response);

      if (abort) abort(response.json());
    });
};

export function authLogout({ dispatch }, { next, abort }) {
  dispatch('SET_AUTH_TOKEN', null);

  if (next) next();
};

export function authCheck({ dispatch, state }, { next, abort }={}) {
  var token = getters.authToken(state);

  resource.user.authCheck.save({}, {token})
    .then((response) => {
      console.log('authCheck.then', response);

      var json = response.json();

      if (json.username !== null) {
        console.log('authCheck: user logged in');
        dispatch('SET_AUTH_TOKEN', token);

        if (next) next(json);
      } else {
        console.log('authCheck: user not logged in');

        dispatch('SET_AUTH_TOKEN', null);

        if (abort) abort(json);
      }
    })
}
