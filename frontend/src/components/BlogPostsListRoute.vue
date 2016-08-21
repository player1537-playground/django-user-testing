<template>
  <div>
    <div v-if="!posts.length" class="alert alert-warning" role="alert">
      <strong>Warning!</strong> No blog posts found
    </div>
    <div class="panel panel-default" v-for="post in posts">
      <div class="panel-heading">
        <span>{{ post.title }}</span>
        <span class="pull-right">
          <a :v-link=""></a>
        </span>
      </div>
      <div class="panel-body">
        <pre>{{ post.content }}</pre>

        <a v-link="{'name': 'blog-posts-detail', params: { id: post.id } }">
          Read more...
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { retrieveBlogPostsList } from '../vuex/actions';

export default {
  name: 'BlogPostsListRoute',
  vuex: {
    getters: {
      posts(state) { return state.blog.posts.list; },
    },
    actions: {
      retrieveBlogPostsList,
    },
  },
  route: {
    data({ next, abort }) {
      this.retrieveBlogPostsList({ next, abort });
    },
  },
};
</script>
