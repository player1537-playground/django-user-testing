<template>
  <div class="panel panel-default">
    <div class="panel-heading"><span>Title</span></div>
    <div class="panel-body">
      <h1>{{ message }}</h1>
      <input type="text" v-model="message"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      message: 'Hello World',
    };
  },
};
</script>
