import Vue from 'vue';
import App from './components/App.vue';
import VueCookie from 'vue-cookie';
import router from './router';

router.start({
  template: '<div><app></app></div>',
  components: {
    App,
  },
}, '#app');
