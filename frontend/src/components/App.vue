<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-6 col-xs-offset-3">
        <main-page></main-page>
      </div>
    </div>

  </div>
</template>

<script>
import MainPage from './MainPage.vue';

export default {
  name: 'App',
  components: {
    MainPage,
  },
};
</script>
