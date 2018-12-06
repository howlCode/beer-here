<template>
  <v-flex xs12>
    <h1 class="display-1 text-xs-center">Server Error: {{ text }}</h1>
    <h2 class="title text-xs-center mt-2">Please Try Again Later</h2>
  </v-flex>
</template>

<script>
export default {
  name: "error",
  props: ["text"]
};
</script>
