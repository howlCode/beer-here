<template>
  <v-container id="beer-data">
    <v-flex xs12>
      <h4 class="display-1 mb-2 text-xs-center text-uppercase">
        Stats for nerds:
      </h4>
    </v-flex>
    <v-layout>
      <v-flex xs6>
        <v-list>
          <v-subheader>
            <h3 class="display-1 mb-1 text-xs-center">Hop Profile</h3>
          </v-subheader>
          <v-list-tile v-for="hop in hops" :key="hop.name">
            <v-list-tile-content>
              <h4 class="body-2">
                {{ hop.name }} -
                <span class="subheading"
                  >{{ hop.amount.value }} {{ hop.amount.unit }}</span
                >
              </h4>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs6 class="mx-2">
        <v-list>
          <v-subheader>
            <h3 class="display-1 mb-1 text-xs-center">Malt Profile</h3>
          </v-subheader>
          <v-list-tile v-for="malt in malts" :key="malt.value">
            <v-list-tile-content>
              <h4 class="body-2">
                {{ malt.name }} -
                <span class="subheading"
                  >{{ malt.amount.value }} {{ malt.amount.unit }}</span
                >
              </h4>
            </v-list-tile-content>
          </v-list-tile>
          <h4 class="body-2 ml-3 mt-1">
            Yeast: <span class="subheading">{{ beer.ingredients.yeast }}</span>
          </h4>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "BeerData",
  props: ["beer"],
  data() {
    return {
      hops: [...this.beer.ingredients.hops],
      malts: [...this.beer.ingredients.malt]
    };
  }
};
</script>
