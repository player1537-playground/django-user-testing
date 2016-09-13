import VueRouter from 'vue-router';
import Vue from 'vue';
import BlogPostsListRoute from './components/BlogPostsListRoute.vue';
import BlogPostsDetailRoute from './components/BlogPostsDetailRoute.vue';
import BlogPostsCreateRoute from './components/BlogPostsCreateRoute.vue';
import UserLoginRoute from './components/UserLoginRoute.vue';
import UserLogoutRoute from './components/UserLogoutRoute.vue';
import store from './vuex/store';
import { loggedIn } from './vuex/getters';

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
    auth: true,
  },

  '/blog/posts/detail/:id': {
    name: 'blog-posts-detail',
    component: BlogPostsDetailRoute,
  },

  '/user/login': {
    name: 'user-login',
    component: UserLoginRoute,
  },

  '/user/logout': {
    name: 'user-logout',
    component: UserLogoutRoute,
  },

});

router.beforeEach(function({ to, next, abort }) {
  if (to.auth) {
    if (loggedIn(store.state)) {
      next();
    } else {
      router.go({ name: 'user-login', query: { next: to.path }});
    }
  } else {
    next();
  }
});

export default router;
