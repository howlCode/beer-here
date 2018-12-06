<template>
  <div class="pairing">
    <h1 class="subheading grey--text my-2">Pair With Care</h1>
    <v-container fluid>
      <!-- Search in food-pairings -->
      <v-layout row justify-center="true" v-if="!loading || error === ''">
        <v-flex xs6 class="text-xs-center">
          <v-form>
            <h3 class="subheading">
              Search beers for your suggested pairing...
            </h3>
            <v-text-field
              color="yellow"
              v-model="search"
              type="text"
              placeholder="Search for entree, ingredient, meat, etc..."
            ></v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <!-- Handle error if API is down, or unreachable. -->
        <Error v-if="error" :text="error" />
        <!-- Loading spinner -->
        <Loading v-if="loading" text="Finding beers!" />
        <!-- Beer List -->
        <v-flex
          md6
          sm12
          xs12
          v-for="(beer, index) in filteredBeer"
          :key="index"
        >
          <v-card
            flat
            :hover="true"
            :ripple="true"
            class="ma-2"
            height="225px"
            @click="showBeer(beer)"
          >
            <v-layout row>
              <v-flex xs4>
                <v-img
                  :src="beer.image_url"
                  :contain="true"
                  height="200px"
                  class="mt-2"
                ></v-img>
              </v-flex>
              <v-flex xs8>
                <v-card-title
                  primary-title
                  class="ml-2 mt-3 pa-0"
                  style="min-height: 125px; max-height: 125px;"
                >
                  <div>
                    <h3 class="subtitle">{{ beer.name }}</h3>
                    <h4 class="body-2">{{ beer.tagline }}</h4>
                    <p class="mt-1">ABV: {{ beer.abv }}%</p>
                  </div>
                </v-card-title>
                <v-card-actions style="width: 75%;">
                  <v-btn @click="showBeer(beer)" block light color="yellow"
                    >See More!</v-btn
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
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default {
  name: "brewing",
  data() {
    return {
      beers: [],
      loading: true,
      error: "",
      search: ""
    };
  },
  created() {
    this.$http
      .plain("/beers?page=1&per_page=80")
      .then(response => {
        this.beers = response.data;
      })
      .then((this.loading = false))
      .catch(error => (this.error = error));
  },
  computed: {
    filteredBeer() {
      let newSearch = [];

      this.beers.map(beer => {
        beer.food_pairing.map(food => {
          if (food.toLowerCase().includes(this.search.toLowerCase())) {
            if (!newSearch.includes(beer)) {
              newSearch.push(beer);
            }
          }
        });
      });
      return newSearch;
    }
  },
  methods: {
    showBeer(beer) {
      this.$router.push(`/beers/${beer.id}`);
    }
  },
  components: {
    Loading,
    Error
  }
};
</script>

<style>
.pairing {
  animation: fadeIn 1s ease-out;
}
</style>
