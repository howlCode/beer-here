<template>
  <v-flex xs12 class="text-xs-center display-1">
    <h1 class="my-4">{{ text }}</h1>
    <v-progress-circular
      indeterminate
      :size="70"
      :width="7"
      color="yellow"
    ></v-progress-circular>
  </v-flex>
</template>

<script>
export default {
  name: "loading",
  props: ["text"]
};
</script>
