<template>
  <b-container fluid>
    <div>
      <download-csv
        :data="items">
        Download deployments csv
        <img src="../../../public/img/icons/favicon-16x16.png">
      </download-csv>
    </div>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            <b-input-group>
              <b-button :disabled="!filter" @click="filter = ''" variant="outline-primary">Clear</b-button>
            </b-input-group>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- none --</option>
            </b-form-select>

            <b-form-select v-model="sortDesc" :disabled="!sortBy">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">
          <b-form-select v-model="sortDirection">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
            <option value="last">Last</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>


    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template v-slot:cell(name)="row">
        {{ row.TestType }}
      </template>

      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="row.toggleDetails" class="details">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
        <b-button size="sm" @click="getLogs(row.item)" class="mr-1 logs">
          Logs
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          {{row.item}}
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
    import Vue from 'vue'
    import * as axios from "axios";
    import JsonCSV from 'vue-json-csv'

    Vue.component('downloadCsv', JsonCSV);

    export default {

        name: "Deployer",
        activeDeployments: null,
        data() {
            return {
                refreshTimer: 10000,
                items: [],
                activeDeployments: [],
                fields: [
                    {key: 'id', label: 'Deployment_Id', sortable: true, sortDirection: 'desc'},
                    {key: 'containers', label: 'Containers', sortable: true, class: 'text-center'},
                    {key: 'homePageUrl', label: 'homePageUrl', sortable: true, sortDirection: 'desc'},
                    {key: 'actions', label: 'Actions'}
                ],
                totalRows: 1,
                currentPage: 1,
                perPage: 10,
                pageOptions: [5, 10, 15, 30],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                filterOn: [],
                infoModal: {
                    id: 'info-modal',
                    title: '',
                    content: ''
                }
            }
        },
        computed: {
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => {
                        return {text: f.label, value: f.key}
                    })
            }
        },
        created() {
            this.items = this.loadData();
            this.interval = setInterval(function () {
                this.items = this.loadData();
            }.bind(this), this.refreshTimer);
        },
        mounted() {
            // Set the initial number of items
            this.totalRows = this.items.length;
        },
        methods: {
            getLogs(item, button) {
                var vm = this;
                axios({
                    method: 'get',
                    url: "http://" + item.ip_port + "/docker/deployments/logs/" + item.id,
                    timeout: 2000,
                    headers: {
                      Token: process.env.VUE_APP_HTTP_AUTH_TOKEN
                    }
                }).then(function (response) {
                    vm.infoModal.content = response.data.description;
                });

                this.infoModal.title = "Compose id: " + item.id;
                this.$root.$emit('bv::show::modal', this.infoModal.id, button);
            },
            getIndex(row) {
                let index = 0;
                for (let i = 0; i < this.items.length; i++) {
                    //something
                }
                return index;
            },
            deleteRow(row) {
                this.items.splice(this.getIndex(row), 1);
            },
            info(item, index, button) {
                this.infoModal.title = `Row index: ${index}`;
                this.infoModal.content = JSON.stringify(item, null, 2);
                this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            },
            resetInfoModal() {
                this.infoModal.title = '';
                this.infoModal.content = ''
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.updateRowLength(filteredItems.length);
                this.currentPage = 1;
            },
            apiServiceGet: function (url) {
                return axios({
                method: 'get',
                url: url,
                headers: {
                  Token: process.env.VUE_APP_HTTP_AUTH_TOKEN
                }
                }).then((response) => {
                    return response.data.description;
                });
            },
            addUrl: function (elem) {
              return elem + "/deployments"
            },
            loadData: function () {
                let table_list = [];
                let deployments_list = process.env.VUE_APP_ESTUARY_DISCOVERY.split(",").map(this.addUrl)
                for (let i = 0; i < deployments_list.length; i++) {
                    let url = deployments_list[i]
                    this.apiServiceGet(url)
                        .then(response => {
                            for (let i = 0; i < response.length; i++) {
                                response[i].commands = JSON.stringify(response[i].commands);
                                response[i]._rowVariant = "success";
                                table_list.push(response[i]);
                            }
                        }).catch(function (error) {
                        console.log("Could not get a response from: " + url)
                    });
                }
                return table_list;
            },
            updateRowLength: function (len) {
                this.totalRows = len;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
