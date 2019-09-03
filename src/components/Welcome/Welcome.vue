<template>
  <b-container fluid>
  <section class="content-section" id="portfolio">
    <b-card>
    <div class="container">
      <div>
        <b-jumbotron text-variant="black" border-variant="dark">
          <template slot="header">Estuary</template>

          <template slot="lead">
            Testing as a service with Docker
          </template>

          <hr class="my-4">

          <p>
            View your active deployments and tests for estuary services :
            <a href="https://github.com/dinuta/estuary-deployer">estuary-deployer</a> &
            <a href="https://github.com/dinuta/estuary-testrunner">estuary-testrunner</a>
          </p>
          <b-button variant="info" href="#/admin/estuary-deployer">Deployer</b-button>
          <b-button variant="info" href="#/admin/estuary-testrunner">TestRunner</b-button>
        </b-jumbotron>
      </div>
    </div>
    </b-card>
  </section>
  </b-container>

</template>

<script>
    export default {
        name: "Welcome"
    }
</script>
