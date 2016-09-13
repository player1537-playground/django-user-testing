<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" v-link="{'name':'index'}">Vue Blog Example</a>
        </div>
        <ul class="nav navbar-nav">
          <li :class="{'active':$route.name==='blog-posts-list'}">
            <a v-link="{'name':'blog-posts-list'}">Posts</a>
          </li>
          <li :class="{'active':$route.name==='blog-posts-create'}">
            <a v-link="{'name':'blog-posts-create'}">Create</a>
          </li>
          <li v-if="loggedIn" :class="{'active':$route.name==='user-logout'}">
            <a v-link="{'name':'user-logout'}">Logout</a>
          </li>
          <li v-else :class="{'active':$route.name==='user-login'}">
            <a v-link="{'name':'user-login'}">Login</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col-xs-10 col-xs-offset-2">
          <router-view></router-view>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import store from '../vuex/store';
import { authToken } from '../vuex/getters';

export default {
  name: 'App',
  store,

  vuex: {
    getters: {
      authToken,
    },
  },

  computed: {
    loggedIn() {
      return this.authToken !== null;
    },
  },

  ready() { console.log('App ready'); },
};
</script>
