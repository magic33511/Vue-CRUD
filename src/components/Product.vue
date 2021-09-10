<template>
  <div class="products">
    <h3>Products</h3>
    <!-- ประกาศ div ให้เป็น card -->
    <div class="card">
      <!-- ตั้ง card header -->
      <div class="card-header">
        Add a new product
      </div>

      <!-- เนื้อหาในcard -->
      <div class="card-body">
        <!-- ประกาศ div ให้เป็น form สำหรับเก็บinput field -->
        <form class="form-inline" v-on:submit.prevent="addSubmit">
          <!-- ประกาศให้ input field เป็นgroupเดียวกัน จะได้ดูสวยงาม -->
          <div class="form-group">
            <label>ID</label>
            <!-- v-model คือการ bind ค่าของช่อง inputนี้ให้เข้ากับ productData.product_id -->
            <input
              v-model="product_id"
              type="text"
              class="form-control ml-sm-2 mr-sm-4 my-2"
              required
            />
          </div>
          <div class="form-group">
            <label>Name</label>
            <input
              v-model="product_name"
              type="text"
              class="form-control ml-sm-2 mr-sm-4 my-2"
              required
            />
          </div>
          <div class="form-group">
            <label>Price</label>
            <input
              v-model="product_price"
              type="text"
              class="form-control ml-sm-2 mr-sm-4 my-2"
              required
            />
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Product List
      </div>
      <div class="card-body">
        <!-- ประกาศ ตารางในเป็น ปรับขนาดตามจอ(responsive) -->
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <!-- scope="col" นั้นใส่เพื่อบอกว่า col ด้านล่างคือ ข้อมูล ของ head นี้ -->
                <th scope="col">Product ID</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <!-- แสดง table row ตามจำนวน ของ product.product_id -->
              <tr
                v-for="product in sortedProducts"
                v-bind:key="product.product_id"
              >
                <template v-if="editId == product.id">
                  <td>
                    <input v-model="editProductData.product_id" type="text" />
                  </td>
                  <td>
                    <input v-model="editProductData.product_name" type="text" />
                  </td>
                  <td>
                    <input
                      v-model="editProductData.product_price"
                      type="text"
                    />
                  </td>
                  <td>
                    <span class="icon">
                      <i @click="onEditSubmit(product)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{ product.product_id }}
                  </td>
                  <td>
                    {{ product.product_name }}
                  </td>
                  <td>
                    {{ product.product_price }}
                  </td>
                  <td>
                    <a href="#" class="icon">
                      <i
                        v-on:click="onDelete(product.id)"
                        class="fa fa-trash"
                      ></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(product)" class="fa fa-pencil"></i>
                    </a>
                    <router-link
                      :to="{
                        name: 'ProductPage',
                        params: { id: product.id },
                      }"
                      class="icon"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      product_id: "",
      product_name: "",
      product_price: "",
      editId: undefined,
      editProductData: {
        id: "",
        product_id: "",
        product_name: "",
        product_price: "",
      },
    };
  },
  methods: {
    addSubmit() {
      //ใข้ if เช็ค เพื่อป้องกันการส่งค่าว่างเข้ามา
      if (this.product_id) {
        let payload = {
          id: this.currentId,
          product_id: this.product_id,
          product_name: this.product_name,
          product_price: this.product_price,
        };
        this.$store.dispatch("addProduct", payload);
      }
    },
    onDelete(index) {
      this.$store.dispatch("deleteProduct", index);
    },
    onEdit(product) {
      this.editId = product.id;
      this.editProductData.product_id = product.product_id;
      this.editProductData.product_name = product.product_name;
      this.editProductData.product_price = product.product_price;
    },
    onCancel() {
      this.editId = -1;
      this.editProductData.product_id = "";
      this.editProductData.product_name = "";
      this.editProductData.product_price = "";
    },
    onEditSubmit() {
      let payload = {
        id: this.editId,
        product_id: this.editProductData.product_id,
        product_name: this.editProductData.product_name,
        product_price: this.editProductData.product_price,
      };
      this.$store.dispatch("editProduct", payload).then(this.onCancel());
    },
  },
  //ให้แสดงผล product realtime
  computed: {
    sortedProducts() {
      return this.$store.getters.products;
    },
    currentId() {
      return Object.keys(this.$store.getters.products).length;
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.icon {
  margin-right: 10px;
}
.icon i {
  cursor: pointer;
}
</style>
