<template>
  <div class="browse">
    <h1 class="subheading grey--text my-2">Explore Beer</h1>
    <v-container fluid>
      <!-- Handle error if API is down, or unreachable. -->
      <Error v-if="error" :text="error" />
      <!-- Loading spinner -->
      <Loading v-if="loading" text="Grabbing beers!" />
      <!-- Live Search of beers -->
      <v-layout row justify-center="true" v-if="!loading || error === ''">
        <v-flex xs6 class="text-xs-center">
          <v-form>
            <h3 class="subheading">Search beers...</h3>
            <v-text-field
              color="yellow"
              v-model="search"
              type="text"
              placeholder="Find a beer..."
            ></v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <!-- Beer List -->
        <v-flex md6 sm12 xs12 v-for="beer in filteredBeer" :key="beer.id">
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
        <!-- When the bottom is reached, watch:bottom informs API call to run -->
        <!-- Pagination is implemented, page number is incremented on API calls -->
        <v-flex xs12 class="text-xs-center">
          <Loading v-if="pageLoading" text="Loading more beer" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// Components for displaying errors and the loading spinner
import Error from "@/components/Error";
import Loading from "@/components/Loading";

export default {
  name: "browse",
  data() {
    return {
      beers: [],
      loading: true,
      error: "",
      page: 1,
      bottom: false,
      pageLoading: false,
      search: ""
    };
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
    this.getBeer();
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.pageLoading = true;
        this.getBeer();
      }
    }
  },
  computed: {
    filteredBeer() {
      return this.beers.filter(beer => {
        return beer.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    // Main API call to fetch beer
    getBeer() {
      this.$http.plain
        .get(`/beers?page=${this.page}&per_page=50`)
        .then(response => {
          if (this.beers.length === 0) {
            this.beers = response.data;
          } else {
            // this.beers avoids mutation when concat() is used
            let newBeers = this.beers.concat(response.data);
            this.beers = newBeers;
          }
          this.page += 1;
        })
        .then((this.loading = false), (this.pageLoading = false))
        .catch(error => this.setError(error, "Something went wrong"));
      
    },
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    // Find the bottom of the window to implement infinite scroll
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    // Push router to individual beer display
    showBeer(beer) {
      this.$router.push(`/beers/${beer.id}`);
    }
  },
  components: {
    Error,
    Loading
  }
};
</script>

<style>
.browse {
  animation: fadeIn 1s ease-out;
}
</style>
