<template>
  <div id="app">
    <div class="wrapper">
      <AdminHeader />

      <AdminSidebar />
      <AdminContent />
    </div>
  </div>
</template>

<script>
import AdminHeader from "./components/AdminHeader.vue";
import AdminSidebar from "./components/AdminSidebar.vue";
import AdminContent from "./components/AdminContent.vue";

export default {
  name: "App",
  components: {
    AdminHeader,
    AdminSidebar,
    AdminContent,
  },
};
</script>

<style>
.wrapper {
  position: static;
}
</style>
