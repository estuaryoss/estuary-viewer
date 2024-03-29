<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content" id="deployers-total">
              <p class="card-category">Estuary Deployer(s)</p>
              <h4 class="card-title">{{ deployersTotal.length }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Refresh unit: {{ refreshTimer / 1000 }} sec
            </div>
          </stats-card>
        </div>
        <!-- <b-tooltip target="deployers-total">{{ deployersTotal }}</b-tooltip> -->

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content" id="agents-total">
              <p class="card-category">Estuary Agent(s)</p>
              <h4 class="card-title">{{ agentsTotal.length }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Refresh unit: {{ refreshTimer / 1000 }} sec
            </div>
          </stats-card>
        </div>
        <!-- <b-tooltip target="agents-total">{{ agentsTotal }}</b-tooltip> -->

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <div slot="content" id="discovery-total">
              <p class="card-category">Estuary Discovery(s)</p>
              <h4 class="card-title">{{ discoveryTotal.length }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Refresh unit: {{ refreshTimer / 1000 }} sec
            </div>
          </stats-card>
        </div>
       <!-- <b-tooltip target="discovery-total">{{ discoveryTotal }}</b-tooltip> -->

      </div>

      <div class="row">
        <div class="col-md-6">
          <chart-card id="stack-barchart"
                      v-if="loaded"
                      :chart-data="barChart.data"
                      :chart-options="barChart.options"
                      :chart-responsive-options="barChart.responsiveOptions"
                      chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">Estuary stack stats</h4>
              <p class="card-category">Overview</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Total
              </div>
              <hr>
            </template>
          </chart-card>
        </div>
      </div>
    </div>
    <div><p>Version: {{getAppVersion}}</p></div>
  </div>
</template>
<script>
import ChartCard from 'src/components/Cards/ChartCard.vue'
import StatsCard from 'src/components/Cards/StatsCard.vue'
import LTable from 'src/components/Table.vue'
import * as axios from "axios";

export default {
  components: {
    LTable,
    ChartCard,
    StatsCard
  },
  data() {
    return {
      eurekaApps: {},
      deployersTotal: [],
      agentsTotal: [],
      discoveryTotal: [],
      refreshTimer: 20000,
      loaded: false,
      barChart: {
        data: {},
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: '245px'
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc(value) {
                return value[0]
              }
            }
          }]
        ]
      }
    }
  },
  created() {
    this.loadData();
    setInterval(async function () {
      this.loadData();
      this.loaded = false;
      this.barChart.data = await this.loadChart();
      this.loaded = true;
    }.bind(this), this.refreshTimer);
  },
  async mounted() {
    this.loaded = false;
    this.barChart.data = await this.loadChart();
    this.loaded = true;
  },
  computed:{
    getAppVersion(){
      return process.env.PACKAGE_VERSION
    }
  },
  methods: {
    loadData: async function () {
      this.eurekaApps = await this.loadTotalEurekaApps();
      this.agentsTotal = this.loadAgentsTotal();
      this.deployersTotal = this.loadDeployersTotal();
      this.discoveryTotal = this.loadDiscoveryTotal();
    },
    loadChart: async function () {
      let dataSeries = {
        labels: ['Active Deployments', 'Active commands', 'Eureka apps'],
        series: [
          [0, 0, 0]
        ]
      };
      try {
        let deployments = await this.loadTotalDeployments();
        let activeTests = await this.loadTotalBackgroundCmdsRunning();
        let activeEurekaApps = await this.loadTotalEurekaApps();
        if (deployments && activeTests) {
          dataSeries.series = [[deployments.length, activeTests.length, activeEurekaApps.length]];
        }
      } catch (e) {
        console.error(e);
      }
      return dataSeries;
    },
    loadApps: function (appName) {
      let apps = [];
      for (let i = 0; i < this.eurekaApps.length; i++) {
        if (this.eurekaApps[i].app.includes(appName)) {
            apps.push(this.eurekaApps[i]);
        }
      }

      return apps;
    },
    apiServiceGet: function (url) {
      return axios({
        method: 'get',
        url: url,
        headers: {
          Token: process.env.VUE_APP_HTTP_AUTH_TOKEN
        }
      })
        .then((response) => {
          if (undefined == response) {
            return {};
          }
          return response.data.description;
        });
    },
    loadAgentsTotal: function () {
      return this.loadApps("agent");
    },
    loadDeployersTotal: function () {
      return this.loadApps("deployer");
    },
    loadDiscoveryTotal: function () {
      return this.loadApps("discovery");
    },
    addDeploymentsUrl: function (elem) {
      return elem + "/deployments";
    },
    loadTotalDeployments: async function () {
      let discovery_list = process.env.VUE_APP_ESTUARY_DISCOVERY.split(",")
      let deployments = [];
      for (let i = 0; i < discovery_list.length; i++) {
          let url = this.addDeploymentsUrl(discovery_list[i])
          let deploymentsList = await this.apiServiceGet(url);
          for (let j = 0; j < deploymentsList.length; j++) {
              deployments.push(deploymentsList[j]);
          }
      }

      return deployments;
    },
    addCommandsUrl: function (elem) {
      return elem + "/commandsdetached";
    },
    loadTotalBackgroundCmdsRunning: async function () {
      let discovery_list = process.env.VUE_APP_ESTUARY_DISCOVERY.split(",")
      let commandsDetached = [];
      for (let i = 0; i < discovery_list.length; i++) {
          let url = this.addCommandsUrl(discovery_list[i])
          let commandsDetachedList = await this.apiServiceGet(url);
          for (let j = 0; j < commandsDetachedList.length; j++) {
            if (commandsDetachedList[j].started == true) {
              commandsDetached.push(commandsDetachedList[j]);
            }
          }
      }

      return commandsDetached;
    },
    addEurekaAppsUrl: function (elem) {
        return elem + "/eurekaapps";
    },
    loadTotalEurekaApps: async function () {
      let discovery_list = process.env.VUE_APP_ESTUARY_DISCOVERY.split(",")
      let activeEurekaApps = [];
      for (let i = 0; i < discovery_list.length; i++) {
        let url = this.addEurekaAppsUrl(discovery_list[i])
        let eurekaAppsList = await this.apiServiceGet(url);
        let eureka_apps_keys = Object.keys(eurekaAppsList);
        for (let j = 0; j < eureka_apps_keys.length; j++) {
          for (let k = 0; k < eurekaAppsList[eureka_apps_keys[j]].length; k++) {
            activeEurekaApps.push(eurekaAppsList[eureka_apps_keys[j]][k]);
          }
        }
      }

      return activeEurekaApps;
    }
  }
}
</script>
<style>

</style>
