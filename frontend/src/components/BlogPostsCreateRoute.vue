<template>
  <form v-if="options">
    <div v-for="(key, option) in options.actions.POST" v-if="!option.read_only" class="form-group">
      <template v-if="option.type==='string'">
        <label :for="'BlogPostsCreateRoute-' + key">{{ option.label }}</label>
        <input v-if="!option.max_length || option.max_length < 256" type="text" :id="'BlogPostsCreateRoute-' + key" class="form-control" />
        <textarea v-else :id="'BlogPostsCreateRoute-' + key" class="form-control" rows="20" ></textarea>
        <p v-if="option.help_text" class="help-block">{{ option.help_text }}</p>
      </template>
      <template v-if="option.type==='boolean'">
        <input type="checkbox" :id="'BlogPostsCreateRoute-' + key" />
        <label :for="'BlogPostsCreateRoute-' + key">{{ option.label }}</label>
      </template>
    </div>
    <pre v-for="(key, option) in options.actions.POST">{{ key }}: {{ option | json }}</pre>
  </form>
</template>

<style>

</style>

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

  methods: {
    inputType(option) {
      if (option.type === 'string') return 'text';
      if (option.type === 'boolean') return 'checkbox';
    },
  },

  route: {
    data({ next, abort }) {
      this.retrieveBlogPostsOptions({ next, abort });
    },
  },
};
</script>
