import VueResource from 'vue-resource';
import Vue from 'vue';

Vue.use(VueResource);

export default {
  blog: {
    posts: Vue.resource('/api/blog/posts{/id}'),
    tags: Vue.resource('/api/blog/tags{/id}'),
  },
};
