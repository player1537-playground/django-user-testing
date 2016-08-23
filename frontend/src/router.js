import VueRouter from 'vue-router';
import Vue from 'vue';
import BlogPostsListRoute from './components/BlogPostsListRoute.vue';
import BlogPostsDetailRoute from './components/BlogPostsDetailRoute.vue';
import BlogPostsCreateRoute from './components/BlogPostsCreateRoute.vue';

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
  '/': {
    name: 'index',
    component: {
      name: 'Index',
      template: `<a v-link="{'name':'blog-posts-list'}">View all blog posts</a>`,
    },
  },
  '/blog/posts/list': {
    name: 'blog-posts-list',
    component: BlogPostsListRoute,
  },
  '/blog/posts/create': {
    name: 'blog-posts-create',
    component: BlogPostsCreateRoute,
  },
  '/blog/posts/detail/:id': {
    name: 'blog-posts-detail',
    component: BlogPostsDetailRoute,
  },
});

export default router;
