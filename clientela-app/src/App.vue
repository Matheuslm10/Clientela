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
      <v-snackbar
        v-model="snackbar"
        bottom
        color="success"
        right
        :timeout="0"
        vertical
        >
        {{text}}
        <v-btn
            dark
            text
            @click="closeSnackBar"
        >
            Close
        </v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    
  }),
  computed: {
    snackbar() {
      return this.$store.state.snackbar.show
    },
    text() {
      return this.$store.state.snackbar.text
    },
    color() {
      return this.$store.state.snackbar.color
    }
  },
  methods: {
    closeSnackBar() {
      this.$store.dispatch('closeSnackBar')
    }
  }
};
</script>
