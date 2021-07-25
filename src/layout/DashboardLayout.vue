<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-notes"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin/estuary-deployer">
          <i class="nc-icon nc-notes"></i>
          <p>Deployments</p>
      </sidebar-link>
      <sidebar-link to="/admin/estuary-agent">
        <i class="nc-icon nc-notes"></i>
        <p>Commands</p>
      </sidebar-link>
      <sidebar-link to="/admin/estuary-discovery">
        <i class="nc-icon nc-notes"></i>
        <p>Eureka apps</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
<!--      <top-navbar></top-navbar>-->

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

<!--      <content-footer></content-footer>-->
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  // import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      // ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
