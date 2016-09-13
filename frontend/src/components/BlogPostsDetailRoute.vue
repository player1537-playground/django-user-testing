<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <span>{{ post ? post.title : 'Loading...' }}</span>
    </div>
    <div class="panel-body">
      {{{ marked(post.content) }}}
    </div>
  </div>
</template>

<script>
import { retrieveBlogPostsDetail } from '../vuex/actions';
import marked from 'marked';

export default {
  name: 'BlogPostsDetailRoute',

  vuex: {
    getters: {
      post(state) { return state.blog.posts.detail; },
    },
    actions: {
      retrieveBlogPostsDetail,
    },
  },

  methods: {
    marked,
  },

  route: {
    data({ next, abort }) {
      this.retrieveBlogPostsDetail({ next, abort }, this.$route.params.id);
    },
  },
};
</script>
