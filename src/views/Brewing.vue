<template>
  <div class="brewing">
    <h1 class="subheading grey--text my-2">Brewers Corner</h1>
    <v-container fluid>
      <!-- Filter by Hop Varietals and Malts Used -->
      <v-layout row justify-center="true" v-if="!loading && error === ''">
        <v-flex md6 xs12 class="mx-2">
          <v-form>
            <v-select
              v-model="search"
              color="yellow"
              :items="hopFilters"
              label="Search Beers by Hop Varietals"
            ></v-select>
          </v-form>
        </v-flex>
        <v-flex md6 xs12 class="mx-2">
          <v-form>
            <v-select
              v-model="search"
              color="yellow"
              :items="maltFilters"
              label="Search Beers by Malt Type"
            ></v-select>
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
      search: "",
      hopFilters: [],
      maltFilters: []
    };
  },
  async created() {
    await this.$http
      .plain("/beers?page=1&per_page=80")
      .then(response => {
        this.beers = response.data;
      })
      .then((this.loading = false))
      .catch(error => (this.error = error));
    await this.setUpFilters();
  },
  computed: {
    filteredBeer() {
      if (this.hopFilters.includes(this.search)) {
        return this.filterByHops();
      }
      return this.filterByMalt();
    }
  },
  methods: {
    setUpFilters() {
      let hopVarieties = [];
      this.beers.map(beer => {
        beer.ingredients.hops.map(hop => {
          if (!hopVarieties.includes(hop.name)) {
            hopVarieties.push(hop.name);
          }
        });
        return hopVarieties;
      });
      this.hopFilters = hopVarieties.sort();

      let maltVarieties = [];
      this.beers.map(beer => {
        beer.ingredients.malt.map(malt => {
          if (!maltVarieties.includes(malt.name)) {
            maltVarieties.push(malt.name);
          }
        });
        return hopVarieties;
      });
      this.maltFilters = maltVarieties.sort();
    },
    filterByHops() {
      let newSearch = this.search;
      let filtered = [];
      // Iterate over beers grabbed, and pull out those that match filter by Hop varietal
      this.beers.map(beer => {
        beer.ingredients.hops.map(hop => {
          if (hop.name.toLowerCase() === newSearch.toLowerCase()) {
            if (!filtered.includes(beer)) {
              filtered.push(beer);
            }
          }
          return filtered;
        });
      });
      return filtered;
    },
    filterByMalt() {
      // Iterate over beers grabbed, and pull out those that match filter by Malt type
      let newSearch = this.search;
      let filtered = [];
      this.beers.map(beer => {
        beer.ingredients.malt.map(malt => {
          if (malt.name.toLowerCase() === newSearch.toLowerCase()) {
            if (!filtered.includes(beer)) {
              filtered.push(beer);
            }
          }
          return filtered;
        });
      });
      return filtered;
    },
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
.brewing {
  animation: fadeIn 1s ease-out;
}
</style>
