<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-flex>
        <v-card-text>
          <v-autocomplete
                  v-model="from"
                  :items="symbols"
                  :loading="isLoadingSymbols"
                  @change="convert()"
                  dense
                  filled
                  :item-text="item =>`${item.id} - ${item.currencyName}`"
                  :item-value="item => item"
                  label="From"
          ></v-autocomplete>
        </v-card-text>
      </v-flex>

      <v-flex>
        <v-card-text>
          <v-autocomplete
                  v-model="to"
                  :items="symbols"
                  :loading="isLoadingSymbols"
                  @change="convert()"
                  dense
                  filled
                  :item-text="item =>`${item.id} - ${item.currencyName}`"
                  :item-value="item => item"
                  label="To"
          ></v-autocomplete>
        </v-card-text>
      </v-flex>
    </v-row>

    <v-row align="center"
           justify="center"
    >
      <v-card
              color="#00695C"
              dark
              height="100"
              width="150"
              v-if="!isLoadingConvert"
      >
        <p style="font-size: 60px; text-align: center; padding-top: 4%;">
          {{ result }}
        </p>
      </v-card>

      <v-progress-circular
              v-if="isLoadingConvert"
              indeterminate
              color="#00695C"
              :size="80"
              :width="7"
      ></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CurrencyConverter",
  data: () => ({
    from: {
      currencyName: "United States Dollar",
      currencySymbol: "$",
      id: "USD"
    },
    to: {
      currencyName: "Brazilian Real",
      currencySymbol: "R$",
      id: "BRL"
    },
    result: 0,
    isLoadingSymbols: true,
    isLoadingConvert: true,
    symbols: []
  }),
  mounted() {
    this.isLoadingSymbols = true;

    // Lazily load input items
    fetch("http://127.0.0.1:5000/symbols")
            .then(res => res.json())
            .then(res => {
              this.symbols = [];

              Object.values(res.results).forEach(symbol => {
                this.symbols.push(symbol);
              });
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              this.isLoadingSymbols = false;

              this.convert();
            })
  },
  methods: {
    convert() {
      this.isLoadingConvert = true;

      // Lazily load input items
      fetch("http://localhost:5000/convert?from=" + this.from.id + "&to=" + this.to.id)
              .then(res => res.json())
              .then(res => {
                Object.values(res.results).forEach(result => {
                  this.result = result.val.toFixed(2);
                });
              })
              .catch(err => {
                console.log(err);
              })
              .finally(() => (this.isLoadingConvert = false))
    }
  }
};
</script>
