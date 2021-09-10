<template>
  <div id="app">
    <!-- เพิ่ม Navbar ลงใน HTML -->
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar"; //ประกาศ Navbar
import { store } from "./store/store";
export default {
  name: "App",
  store,
  components: {
    Navbar, // เรียกใช้ Navbar
  },
};
</script>
