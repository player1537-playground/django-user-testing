import VueResource from 'vue-resource';
import Vue from 'vue';
import VueCookie from 'vue-cookie';

Vue.use(VueCookie);
Vue.use(VueResource);

Vue.resource.actions.options = {
  method: 'OPTIONS',
};

Vue.http.options.headers = Vue.http.options.headers || {};
Vue.http.options.headers['X-CSRFToken'] = VueCookie.get('csrftoken');

export default {
  blog: {
    posts: Vue.resource('/api/blog/posts/{id}{?page}'),
    tags: Vue.resource('/api/blog/tags/{id}'),
  },
  user: {
    login: Vue.resource('/api/users/login/'),
  },
};
