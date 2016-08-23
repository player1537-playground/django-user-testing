<template>
  <div v-if="!$loadingRouteData">
    <div v-if="!posts.count" class="alert alert-warning" role="alert">
      <strong>Warning!</strong> No blog posts found
    </div>

    <div class="panel panel-default" v-for="post in posts.results">
      <div class="panel-heading">
        <h3>
          <span>{{ post.title }}</span>
          <span class="pull-right">
            <span class="label label-default">
              {{ post.tag }}
            </span>
          </span>
        </h3>
      </div>
      <div class="panel-body">
        <pre>{{ post.content }}</pre>

        <a v-link="{'name': 'blog-posts-detail', params: { id: post.id } }">
          Read more...
        </a>
      </div>
    </div>

    <nav class="text-center">
      <ul class="pagination pagination-lg">
        <li :class="{'disabled':!posts.previous}">
          <a v-if="posts.previous" v-link="{'name':'blog-posts-list', query:{page:page-1}}">
            <span>&laquo;</span>
          </a>
          <span v-else>
            &laquo;
          </span>
        </li>

        <li v-for="currentPage in pages" :class="{'active':currentPage===page,'disabled':!currentPage}">
          <a v-if="currentPage" v-link="{'name':'blog-posts-list', query:{page:+currentPage}}">
            {{ currentPage }}
          </a>
          <span v-else>
            &hellip;
          </span>
        </li>

        <li :class="{'disabled':!posts.next}">
          <a v-if="posts.next" v-link="{'name':'blog-posts-list', query:{page:page+1}}">
            <span>&raquo;</span>
          </a>
          <span v-else>
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
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

  computed: {
    page() { return +this.$route.query.page || 1; },
    totalPages() {
      if (!this.posts) return null;
      if (!this.posts.next) return this.page;
      console.log(this.posts.count, this.posts.results.length, this.posts.count / this.posts.results.length);
      return Math.ceil(this.posts.count / this.posts.results.length);
    },
    pages() {
      if (!this.totalPages) return [];
      var pages = new Set(),
          final = this.totalPages,
          current = this.page,
          i;

      pages.add(1);
      pages.add(current - 1);
      pages.add(current);
      pages.add(current + 1);
      pages.add(final);

      if (current <= 4) {
        pages.add(2);
        pages.add(3);
      }

      if (current >= final - 3) {
        pages.add(final - 1);
        pages.add(final - 2);
      }

      console.log(pages);

      pages = Array.from(pages).filter(d => d > 0 && d <= final);
      pages.sort((a, b) => a - b);

      if (current > 4) {
        pages.splice(1, 0, null);
      }

      if (current < final - 3) {
        pages.splice(pages.length - 1, 0, null);
      }

      return pages;
    },
  },

  route: {
    data({ next, abort }) {
      this.retrieveBlogPostsList({ next, abort }, this.$route.query.page);
    },
  },
};
</script>
