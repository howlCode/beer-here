<template>
  <nav>
    <v-toolbar flat app dark>
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="drawer-link"
      ></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="mr-3">Beer Here</span>
        <span class="mx-2 yellow--text">Craft</span> <span>it</span>
        <span class="mx-2 yellow--text">Pair</span> <span>it</span>
        <span class="mx-2 yellow--text">Share</span> <span>it</span>
      </v-toolbar-title>
      <v-toolbar-title class="text-uppercase"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="grey" router to="/about">
        <span>About</span>
        <v-icon right>code</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app flat dark>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title mb-2 text-uppercase"
            >Beer Here</v-list-tile-title
          >
        </v-list-tile>
        <!-- Cycle through links in data-layer and build menu dynamically -->
        <v-list-tile
          v-for="link in navLinks"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="nav-drawer-link">
              {{ link.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      navLinks: [
        { icon: "local_drink", text: "Browse Beers", route: "/" },
        { icon: "bubble_chart", text: "Brewers Corner", route: "/brewing" },
        {
          icon: "local_dining",
          text: "Food Pairing and Beer",
          route: "/pairing"
        }
      ]
    };
  }
};
</script>

<style scoped>
.v-navigation-drawer > .v-list .v-list__tile--active .v-list__tile__title {
  color: #ffeb3b;
}

.drawer-link {
  animation: attention 2s ease-out;
}

@keyframes attention {
  0% {
    color: red;
    transform: scale(0);
  }
  100% {
    color: red;
    transform: scale(2);
  }
}
</style>
