<template>
  <div class="single-product">
    <div v-if="loaded">
      <h3>Product details</h3>
      <div class="card">
        <div class="card-header">
          header
        </div>
        <div class="card-body">
          <p>ID: {{ productId }}</p>
          <p>Product Name: {{ productName }}</p>
          <p>Product Price: ${{ productPrice }}</p>
          <button class="btn btn-success">Buy Now</button>
          <router-link :to="'/'" class="btn btn-primary"> Back </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>Loading...</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductPage",
  data() {
    return {
      productId: "",
      productName: "",
      productPrice: "",
      loaded: false,
    };
  },
  created() {
    let stateProduct = this.$store.getters.products[
      this.$router.currentRoute.params.id
    ];
    this.productId = stateProduct.product_id;
    this.productName = stateProduct.product_name;
    this.productPrice = stateProduct.product_price;
    this.loaded = true;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
