<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <pre v-if="error">{{ error | json }}</pre>
      <form>
        <div class="form-group">
          <label for="UserLoginRoute-username">Username</label>
          <input class="form-control" type="text" id="UserLoginRoute-username" v-model="username"/>
        </div>
        <div class="form-group">
          <label for="UserLoginRoute-password">Password</label>
          <input class="form-control" type="password" id="UserLoginRoute-password" v-model="password"/>
        </div>
        <button class="btn btn-default" type="submit" @keydown.enter.prevent="submit" @click.prevent="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { authToken } from '../vuex/getters';
import { authLogin } from '../vuex/actions';

export default {
  name: 'UserLoginRoute',

  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },

  vuex: {
    getters: {
      authToken,
    },
    actions: {
      authLogin,
    },
  },

  methods: {
    submit() {
      console.log('UserLoginRoute.submit');

      this.authLogin({
        next: (data) => {
          this.$router.go(this.$route.query.next || {'name': 'index'});
        },
        abort: (data) => {
          this.error = data;
        },
      }, {
        username: this.username,
        password: this.password,
      });
    },
  },
}
</script>
