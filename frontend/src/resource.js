import VueResource from 'vue-resource';
import Vue from 'vue';

Vue.use(VueResource);

Vue.resource.actions.options = { method: 'OPTIONS' };

export default {
  blog: {
    posts: Vue.resource('/api/blog/posts{/id}{?page}'),
    tags: Vue.resource('/api/blog/tags{/id}'),
  },
};
