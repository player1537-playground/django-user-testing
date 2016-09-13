<template>
  <p>Logging you out now...</p>
</template>

<script>
import { authLogout } from '../vuex/actions';

export default {
  name: 'UserLogoutRoute',

  vuex: {
    actions: {
      authLogout,
    },
  },

  ready() {
    console.log('UserLogoutRoute.ready');

    this.authLogout({
      next: () => {
        this.$router.go({'name': 'index'});
      },
    });
  },

}
</script>
