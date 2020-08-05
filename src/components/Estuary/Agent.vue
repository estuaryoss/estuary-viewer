<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <div>
      <download-csv
        :data="items">
        Download tests csv
        <img src="../../../public/img/icons/favicon-16x16.png">
      </download-csv>
    </div>
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
      <template v-slot:cell(progress)="row">
        <b-progress class="mt-2" :max="getTotalTests(row.item)" show-value>
          <b-progress-bar :value="getTestStatus(row.item).finished" variant="success" v-b-tooltip.hover
                          title="finished"></b-progress-bar>
          <b-progress-bar :value="getTestStatus(row.item).inprogress" variant="warning" v-b-tooltip.hover
                          title="in progress"></b-progress-bar>
          <b-progress-bar :value="getTestStatus(row.item).scheduled" variant="info" v-b-tooltip.hover
                          title="scheduled"></b-progress-bar>
        </b-progress>
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

    <b-modal :id="infoModal.id" size="xl" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <p class="my-4">{{ infoModal.content }}</p>
    </b-modal>

  </b-container>
</template>

<script>
    import Vue from 'vue'
    import * as axios from "axios"
    import JsonCSV from 'vue-json-csv'

    Vue.component('downloadCsv', JsonCSV);

    export default {
        name: "Agent",
        data() {
            return {
                refreshTimer: 10000,
                items: [],
                fields: [
                    {key: 'id', label: 'Test_Id', sortable: true, sortDirection: 'desc'},
                    {key: 'started', label: 'Started', sortable: true, class: 'text-center'},
                    {key: 'finished', label: 'Finished', sortable: true, sortDirection: 'desc'},
                    {key: 'commands', label: 'Commands', sortable: true, sortDirection: 'desc'},
                    {key: 'processes', label: 'Processes', sortable: true, sortDirection: 'desc'},
                    {key: 'homePageUrl', label: 'homePageUrl', sortable: true, sortDirection: 'desc'},
                    {key: 'progress', label: 'Test_Progress'}
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
                    id: 'modal-tall',
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
            this.totalRows = this.items.length;
        },
        methods: {
            getTestStatus(item) {
                let test_status = {
                    "finished": 0,
                    "scheduled": 0,
                    "inprogress": 0
                }
                let commands = JSON.parse(item.commands);
                let command_keys = Object.keys(commands);
                for (let i = 0; i < command_keys.length; i++) {
                    if (commands[command_keys[i]]["status"] === "finished") {
                        test_status["finished"]++;
                    } else if (commands[command_keys[i]]["status"] === "scheduled") {
                        test_status["scheduled"]++;
                    } else if (commands[command_keys[i]]["status"] === "in progress") {
                        test_status["inprogress"]++;
                    }
                }
                return test_status;
            },
            getTotalTests(item) {
                return Object.keys(JSON.parse(item.commands)).length;
            },
            resetInfoModal() {
                this.infoModal.title = '';
                this.infoModal.content = '';
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.updateRowLength(filteredItems.length);
                this.currentPage = 1;
            },
            updateRowLength: function (len) {
                this.totalRows = len;
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
            loadData: function () {
                let table_list = [];
                let url = "http://" + process.env.VUE_APP_ESTUARY_DISCOVERY + "/tests";
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
                return table_list;
            }
        },
        beforeDestroy: function () {
            clearInterval(this.interval);
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
