<template>
  <div v-if="options">
    <div class="panel panel-default" v-for="(key, option) in options.actions.POST" v-if="!option.read_only">
      <div class="panel panel-heading">
        <span>{{ key }}</span>
      </div>
      <div class="panel-body">
        <pre>{{ option | json }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { retrieveBlogPostsOptions } from '../vuex/actions';

export default {
  name: 'BlogPostsCreateRoute',

  vuex: {
    getters: {
      options(state) { return state.blog.posts.options; },
    },
    actions: {
      retrieveBlogPostsOptions,
    },
  },

  route: {
    data({ next, abort }) {
      this.retrieveBlogPostsOptions({ next, abort });
    },
  },
};
</script>
