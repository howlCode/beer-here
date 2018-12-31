<template>
  <v-dialog 
    v-model="dialog"
    id="beer-data"
  >
    <v-btn
      slot="activator"
      color="yellow"
      :large="large"
      :small="small"
      block
    >
      Expanded Info
    </v-btn>
    <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Stats for Nerds:
        </v-card-title>

        <v-card-text>
          <v-layout>
            <v-flex xs6>
              <v-list>
                <v-subheader>
                  <h3 class="display-1 mb-1 text-xs-center">Hop Profile</h3>
                </v-subheader>
                <v-list-tile v-for="(hop, index) in beer.ingredients.hops" :key="index">
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
            <v-flex xs6>
              <v-list>
                <v-subheader>
                  <h3 class="display-1 mb-1 text-xs-center">Malt Profile</h3>
                </v-subheader>
                <v-list-tile v-for="(malt, index) in beer.ingredients.malt" :key="index">
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
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "BeerData",
  props: ["beer", "large", "small"],
  data() {
    return {
      dialog: false,
    };
  }
};
</script>
