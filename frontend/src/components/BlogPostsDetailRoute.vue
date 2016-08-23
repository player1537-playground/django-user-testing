<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <span>{{ post ? post.title : 'Loading...' }}</span>
    </div>
    <div class="panel-body">
      <p v-for="par in paragraphs">
        {{ par }}
      </p>
    </div>
  </div>
</template>

<script>
import { retrieveBlogPostsDetail } from '../vuex/actions';

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

  computed: {
    paragraphs() {
      return this.post ? this.post.content.split('\n') : [];
    },
  },

  route: {
    data({ next, abort }) {
      this.retrieveBlogPostsDetail({ next, abort }, this.$route.params.id);
    },
  },
};
</script>
