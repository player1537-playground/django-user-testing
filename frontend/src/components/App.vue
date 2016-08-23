<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-10 col-xs-offset-2">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import store from '../vuex/store.js';

export default {
  name: 'App',
  store,
  ready() { console.log('App ready'); },
};
</script>
