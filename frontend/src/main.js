import Vue from 'vue';
import App from './components/App.vue';
import router from './router';

router.start({
  template: '<div><app></app></div>',
  components: {
    App,
  },
}, '#app');
