<template>
  <form v-if="values">
    <div v-for="(key, data) in values"
         v-if="data.config.required"
         class="form-group clearfix">
      <template v-if="data.config.type==='string'">
        <label :for="'BlogPostsCreateRoute-' + key">
          {{ data.config.label }}
        </label>
        <input v-if="!data.config.max_length || data.config.max_length < 256"
               v-model="data.value"
               type="text"
               :id="'BlogPostsCreateRoute-' + key"
               class="form-control" />
        <div v-else
             style="display:table;width:100%">
          <div style="display:table-cell;width:50%">
            <textarea v-model="data.value"
                      :id="'BlogPostsCreateRoute-' + key"
                      style="height:100%;width:100%;min-height:20em"
                      class="form-control"></textarea>
          </div>
          <div style="display:table-cell;width:50%;background-color:#eee">
            {{{ marked(data.value) }}}
          </div>
        </div>
        <p v-if="data.config.help_text"
           class="help-block">
          {{ data.config.help_text }}
        </p>
      </template>
      <template v-if="data.config.type==='boolean'">
        <input v-model="data.value"
               type="checkbox"
               :id="'BlogPostsCreateRoute-' + key" />
        <label :for="'BlogPostsCreateRoute-' + key">
          {{ data.config.label }}
        </label>
      </template>
    </div>
    <button @click.prevent="createPost"
            class="btn btn-default"
            type="submit">
      Submit
    </button>
  </form>
</template>

<style>

</style>

<script>
import { retrieveBlogPostsOptions,
         createBlogPost } from '../vuex/actions';
import marked from 'marked';

export default {
  name: 'BlogPostsCreateRoute',

  data() {
    return {
      values: null,
    };
  },

  vuex: {
    getters: {
      options(state) { return state.blog.posts.options; },
    },
    actions: {
      retrieveBlogPostsOptions,
      createBlogPost,
    },
  },

  methods: {
    marked,

    inputType(option) {
      if (option.type === 'string') return 'text';
      if (option.type === 'boolean') return 'checkbox';
    },

    createPost() {
      this.createBlogPost({
        next: (response) => {
          console.log('next', response);
          this.$router.go({ 'name': 'blog-posts-list' });
        },
        abort(response) {
          console.warn('abort', response);
        },
      }, this.values);

      console.log(this);
    },
  },

  route: {
    data({ next, abort }) {
      this.retrieveBlogPostsOptions({
        next: () => {
          var values = {},
              actions = this.options.actions.POST;

          for (var key in actions) {
            values[key] = {
              value: '',
              config: actions[key],
            };
          }

          next({ values });
        },
        abort,
      });
    },
  },
};
</script>
