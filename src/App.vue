<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        Currency Converter
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/Danehko" target="_blank" text>
        <span class="mr-2">
          GitHub
        </span>

        <v-icon>
          mdi-git
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
