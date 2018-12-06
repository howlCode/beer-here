<template>
  <div class="beer-info">
    <v-btn router to="/" color="yellow">Go Back and Explore Beer</v-btn>
    <v-container fluid class="mt-2">
      <!-- Handle error if API is down, or unreachable. -->
      <Error v-if="error" :text="error" />
      <!-- Loading spinner -->
      <Loading v-if="loading" text="Grabbing beer info!" />
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-layout row wrap>
              <v-flex md4 sm12 xs12>
                <v-img
                  :src="beer.image_url"
                  :contain="true"
                  height="500px"
                  class="mt-2"
                ></v-img>
              </v-flex>
              <v-flex md8 sm12 xs12>
                <v-card-title primary-title>
                  <div>
                    <h3 class="display-1">{{ beer.name }}</h3>
                    <h4 class="subtitle font-italic my-2">
                      {{ beer.tagline }}
                    </h4>
                    <p class="subheading mt-1">
                      ABV: {{ beer.abv }}% | IBU's: {{ beer.ibu }}
                    </p>
                  </div>
                </v-card-title>
                <v-card-text>
                  <h3 class="subtitle">Description</h3>
                  <p class="body-1 my-1">{{ beer.description }}</p>
                  <h3 class="subtitle my-3">Suggested Food Pairings</h3>
                  <p
                    class="body-2 mt-1"
                    v-for="pairing in beer.food_pairing"
                    :key="pairing"
                  >
                    - {{ pairing }}
                  </p>
                </v-card-text>
                <v-layout>
                  <v-flex>
                    <div class="social-links" v-if="showSocials">
                      <vue-goodshare></vue-goodshare>
                    </div>
                  </v-flex>

                  <BeerData v-if="expanded" :beer="beer" />
                </v-layout>
                <v-card-actions>
                  <v-btn
                    @click="expanded = !expanded"
                    class="mx-4 hidden-sm-and-down"
                    large
                    block
                    color="yellow"
                    >Expanded Info</v-btn
                  >
                  <v-btn
                    @click="showSocials = !showSocials"
                    class="mx-4 hidden-sm-and-down"
                    large
                    block
                    dark
                    color="black"
                    >Share It</v-btn
                  >
                  <v-btn
                    href="https://vinepair.com/beer-101/beer-and-food-pairing-basics/"
                    target="_blank"
                    class="mx-4 hidden-sm-and-down"
                    large
                    block
                    color="yellow"
                    >Pairing Tips</v-btn
                  >
                  <v-btn
                    small
                    class="hidden-md-and-up"
                    @click="expanded = !expanded"
                    block
                    color="yellow"
                    >More Info</v-btn
                  >
                  <v-btn
                    @click="showSocials = !showSocials"
                    small
                    class="hidden-md-and-up"
                    block
                    dark
                    color="black"
                    >Share It</v-btn
                  >
                  <v-btn
                    small
                    class="hidden-md-and-up"
                    href="https://vinepair.com/beer-101/beer-and-food-pairing-basics/"
                    target="_blank"
                    block
                    color="yellow"
                    >Pair It</v-btn
                  >
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// Components for displaying errors and the loading spinner
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import BeerData from "@/components/BeerData";
// Display social links for sharing page to social media
import VueGoodshare from "vue-goodshare";

export default {
  name: "beer-info",
  data() {
    return {
      beer: [],
      error: "",
      loading: true,
      expanded: false,
      showSocials: false
    };
  },
  created() {
    this.$http.plain
      .get(`/beers/${this.$route.params.id}`)
      .then(response => {
        this.beer = response.data;
        this.beer = this.beer[0];
      })
      .then((this.loading = false))
      .catch(error => this.setError(error, "Something went wrong"));
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    }
  },
  components: {
    Loading,
    Error,
    BeerData,
    VueGoodshare
  }
};
</script>

<style>
.social-links {
  animation: socialReveal 1s ease-out;
  width: 100%;
}

@keyframes socialReveal {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.beer-info {
  animation: fadeIn 1s ease-out;
}
</style>
