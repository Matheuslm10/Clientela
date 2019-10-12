<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline">
        <span>Clientela</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">
        <span>Home</span>
      </v-btn>
      <v-btn text to="/clientes">
        <span>Clientes</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
