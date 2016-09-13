import Vuex from 'vuex';
import Vue from 'vue';
import {authCheck} from './actions';

Vue.use(Vuex);

const state = {
  auth: {
    token: window.localStorage.getItem('token'),
  },
  blog: {
    posts: {
      options: null,
      list: null,
      detail: null,
    }
  },
};

const mutations = {
  'SET_AUTH_TOKEN' (state, token) {
    state.auth.token = token;

    if (token === null) {
      window.localStorage.removeItem('token');
      delete Vue.http.options.headers['Authorization'];
    } else {
      window.localStorage.setItem('token', token);
      Vue.http.options.headers['Authorization'] = 'Token ' + token;
    }
  },

  'SET_BLOG_POSTS_LIST' (state, posts) {
    state.blog.posts.list = posts;
  },

  'SET_BLOG_POSTS_DETAIL' (state, post) {
    state.blog.posts.detail = post;
  },

  'SET_BLOG_POSTS_OPTIONS' (state, options) {
    state.blog.posts.options = options;
  },
};

const store = new Vuex.Store({
  state,
  mutations,
});

authCheck(store);

export default store;
