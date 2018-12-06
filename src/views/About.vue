<template>
  <div class="about">
    <v-container>
      <v-layout>
        <v-flex xs12>
          <h4 class="display-2 text-xs-center text-uppercase">Beer Here</h4>
        </v-flex>
      </v-layout>
      <v-layout class="mt-4">
        <v-flex xs12 class="text-xs-center mt-4">
          <img
            style="border-radius: 50%;"
            src="../../public/img/portrait-self.jpg"
            alt
          />
          <p class="title mt-2">
            Hi! I'm Matt, and I created this application using the
            <a href="https://punkapi.com/documentation/v2" target="_blank"
              >punk beer API</a
            >.
          </p>
          <p class="title">I hope you enjoy using it!</p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "about"
};
</script>

<style>
.about {
  animation: fadeIn 1s ease-out;
}
</style>
