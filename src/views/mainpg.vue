<template >
  <app>
    <v-navigation-drawer app>

      <v-card height="80px" elevation="0">

        <v-list-item style="padding-left:0">
          <v-list-item-icon>
            <router-link to="./main" style="text-decoration: none;">
              <v-icon large>{{mdiTrafficLight}}</v-icon>
            </router-link>
          </v-list-item-icon>
          <router-link to="./video" style="text-decoration: none;color: black;">
            <v-list-item-title style="font-size:18px">智能信号灯控制系统</v-list-item-title>
          </router-link>
        </v-list-item>
      </v-card>
      <v-card elevation="0">
        <v-divider></v-divider>
        <div v-for="(value,k) in values" :key="k" link>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>{{mdiFormatListBulleted}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{value.name}}</v-list-item-title>
            </template>
            <v-list nav dense>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item :to="{name:'Videopg',query:{idvalues:value.id}}">
                  <v-list-item-title>Video</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon mdi>{{mdiVideo}}</v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <template>

                  <v-list-item :to="{name:'Setting',query:{idvalues:value.id}}">
                    <v-list-item-title v-bind="attrs" v-on="on" >Settings</v-list-item-title>
                    <v-list-item-icon>
                      <v-icon mdi>mdi-cog-outline</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </template>

              </v-list-item-group>
            </v-list>
          </v-list-group>
        </div>
      </v-card>
      <div id="app" style="margin-top:10px">
        <v-row justify="center">
          <v-dialog v-model="dialog1" persistent max-width="600px" append-to-body="true">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-3" text icon color="dark" v-bind="attrs" v-on="on" @click="handler()">
                <v-icon x-large>{{mdiPlusCircleOutline}}</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">添加新的智能信号灯：</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="name of the lights*" id="name" required :rules="rules"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="location of the lights*" id="location" required :rules="rules"></v-text-field>
                    </v-col>
                    <div style="height:80px"></div>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>lightLat(该信号灯组的lat值):</v-list-item-title>
                        <v-list-item-subtitle>{{center.lat}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>lightLng(该信号灯组的lng值):</v-list-item-title>
                        <v-list-item-subtitle>{{center.lng}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-row>
                  <div style="height:40px"></div>
                  <baidu-map class="bm-views" :center="centers" :zoom="zooms" @ready="handlers" :scroll-wheel-zoom="true" @moving="syncCenterAndZooms" @moveend="syncCenterAndZooms" @zoomend="syncCenterAndZooms">
                    <bm-traffic :predictDate="{weekday: 7, hour: 12}">
                    </bm-traffic>
                    <bm-marker v-for="(value,k) in values" :key="k" :position="{lat: value.lat,lng: value.lng}">
                      <bm-label :content="value.name" :labelStyle="{color: 'red', fontSize : '10px'}" :offset="{width: -35, height: 30}"></bm-label>
                    </bm-marker>
                    <bm-marker :position="{lat:this.centers.lat,lng:this.centers.lng}" animation="BMAP_ANIMATION_BOUNCE">
                    </bm-marker>
                    <v-row style="margin:0">
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="lng" v-model="centers.lng"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="lat" v-model="centers.lat"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="zoom" v-model="zooms"></v-text-field>
                      </v-col>
                    </v-row>
                  </baidu-map>
                </v-container>
                <div style="height:20px"></div>
                <div style="height:40px"></div>
                <div style="height:20px"></div>
                <v-row>
                  <v-col style="margin-left:50px;width:50px">
                    <v-btn class="ma-3" icon v-on="on" @click="addit(centers.lng,centers.lat,idk)">
                      <v-icon large style="margin-left:10px">{{mdiMapMarkerPlusOutline}}</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col style="margin-top:20px">click to add a new trafficlight</v-col>
                </v-row>

                <div v-for="(valuea,k) in this.formData.powerAttrList" :key="k">
                  <v-row style="margin-left:20px">
                    <v-col cols="7" sm="6" md="3">
                      <v-text-field label="lng" v-model="valuea.lng" disabled></v-text-field>
                    </v-col>
                    <v-col cols="7" sm="6" md="3">
                      <v-text-field label="lat" v-model="valuea.lat" disabled></v-text-field>
                    </v-col>
                    <v-col cols="7" sm="6" md="3">
                      <v-text-field label="id" v-model="valuea.id" disabled></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="2">
                      <v-btn class="ma-3" text icon color="dark" v-bind="attrs" v-on="on" @click="deleteit(k)">
                        <v-icon>{{mdiCloseCircleOutline}}</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
                <div style="height:80px"></div>
                <div style="margin-left:20px"><small>*indicates required field</small></div>
                <div style="height:80px"></div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog1 = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="addnewLight(),dialog1 = false">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </v-navigation-drawer>
    <v-app-bar app>
      <span style="font-size:25px">
        <router-link to="./mainpg.vue"></router-link>智能信号灯-交通流疏导控制系统【融创软通】
      </span>
      <v-container fluid style="width:500px;margin-top:10px;margin-right: 0px;">
        <v-row style="margin:0">
          <v-col cols="12" sm="6" md="6">
            <v-autocomplete label="输入红绿灯id" v-model="select" :loading="loading" :items="aitems" :search-input.sync="search" cache-items class="mx-4" flat hide-no-data hide-details @change="searchname()"></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-autocomplete label="输入红绿灯组地区" v-model="keyword" :loading="loading" :items="bitems" :search-input.sync="search2" cache-items class="mx-4" flat hide-no-data hide-details :sugStyle="{zIndex: 1}"></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->

    <!-- 给应用提供合适的间距 -->
    <v-container fluid>

      <!-- 如果使用 vue-router -->
      <router-view></router-view>
      <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true" @moving="syncCenterAndZoom" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom">
        <bm-traffic :predictDate="{weekday: 7, hour: 12}">
        </bm-traffic>
        <v-row style="margin:0">
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="lng" v-model="center.lng"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="lat" v-model="center.lat"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="zoom" v-model="zoom"></v-text-field>
          </v-col>

        </v-row>
        <bm-control :offset="{width: '50px', height: '10px'}">
          <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1}">
            <input type="text" placeholder="请输入搜索关键字" class="searchinput" style="background-color: white; border-style: none;margin-top: 20px;margin-left: 20px;width: 200px;height: 35px;">
          </bm-auto-complete>
        </bm-control>
        <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>

        <bm-marker v-for="(value,k) in values" :key="k" :position="{lat: value.lat,lng: value.lng}">
          <bm-label :content="value.name" :labelStyle="{color: 'red', fontSize : '10px'}" :offset="{width: -35, height: 30}"></bm-label>
        </bm-marker>
        <bm-marker :position="{lat:this.center.lat,lng:this.center.lng}" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>

      </baidu-map>

    </v-container>

    <v-footer app>

    </v-footer>
  </app>
</template>

<script>
import { mdiPlusCircleOutline } from "@mdi/js";
import { mdiTrafficLight } from "@mdi/js";
import { mdiFormatListBulleted } from "@mdi/js";
import { mdiVideo } from "@mdi/js";
import { mdiMapMarkerPlusOutline } from "@mdi/js";
import { mdiCloseCircleOutline } from "@mdi/js";
import * as axios from "axios";

export default {
  name: "Main",

  data() {
    return {
      center: { lng: 116.404, lat: 39.915 },
      zoom: 4,
      centers: { lng: 116.404, lat: 39.915 },
      zooms: 4,
      loading: false,
      aitems: [],
      bitems: [],
      search: null,
      search2: null,
      select: null,
      select2: null,
      keyword: "",
      values: [],
      index: 1,
      idk: 1,
      lng: [],
      lat: [],
      id: [],
      idvalues: [],
      sheet: false,
      placevalues: [],
      namevalues: [],
      lightsmsg: [],
      k: [],
      lightsmsgs: [],
      mdiPlusCircleOutline,
      mdiFormatListBulleted,
      mdiMapMarkerPlusOutline,
      mdiCloseCircleOutline,
      mdiVideo,
      mdiTrafficLight,
      dialog1: false,
      dialog2: false,
      confirm1lng: null,
      confirm1lat: null,
      formData: {
        powerAttrList: [],
      },
      admins: [
        ["Vedio", mdiVideo],
        ["Settings", "mdi-cog-outline"],
      ],

      rules: [
        (value) => !!value || "Required.",
        (value) => (value || "").length <= 20 || "Max 20 characters",
      ],
    };
  },

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
      for (var a = 0; a <= this.values.length; a++) {
        if (val == this.values[a].id) {
          this.center.lat = this.values[a].lat;
          this.center.lng = this.values[a].lng;
        }
      }
    },
    search2(val) {
      val && val !== this.select2 && this.querySelections(val);
    },
  },
  mounted: function () {
    this.onchangContactPersonName();
    //页面加载完成后需要触发的函数
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
    addit(lng, lat, k) {
      var x = lat.toString();
      var y = lng.toString();
      var z = k.toString();
      this.formData.powerAttrList.push({ lat: x, lng: y, id: z });
      this.idk = k + 1;
    },
    deleteit(index) {
      this.formData.powerAttrList.splice(index, 1);
      this.idk = this.idk - 1;
    },
    handlers({ BMap, map }) {
      console.log(BMap, map);
      this.centers.lng = this.center.lng;
      this.centers.lat = this.center.lat;
      this.zooms = 15;
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
    },
    syncCenterAndZooms(e) {
      const { lng, lat } = e.target.getCenter();
      this.centers.lng = lng;
      this.centers.lat = lat;
      this.zooms = e.target.getZoom();
    },

    onchangContactPersonName() {
      axios
        .post("http://localhost:8888/search", {})
        .then((response) => {
          const value = response.data;
          this.values = value;
          for (var i = 0; i < this.values.length; i++) {
            this.idvalues[i] = this.values[i].id;
            this.placevalues[i] = this.values[i].location;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addnewLight() {
      var timestamp = Date.parse(new Date()); //时间戳与现实不对应！！！！！！！！！！！
      axios.post("http://localhost:8888/addnewLight", {
        id: timestamp,
        lat: this.center.lat,
        lng: this.center.lng,
        location: document.getElementById("location")._value,
        lightname: document.getElementById("name")._value,
      });
      axios
        .post("http://localhost:8888/addnewLights", {
          id: timestamp,
          idmsg: JSON.stringify(this.formData.powerAttrList),
        })
        .then(() => {})
        .catch(function (error) {
          console.log(error);
        });
    },
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.aitems = this.idvalues.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.bitems = this.placevalues.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    setlight(k) {
      axios
        .post("http://localhost:8888/searchLights", {
          id: k,
        })
        .then((response) => {
          const lightsmsgs = response.data;
          this.lightsmsg = lightsmsgs;
          this.k = JSON.parse(this.lightsmsg[0].idmsg);
          for (var i = 0; i < this.k.length; i++) {
            this.lng[i] = this.k[i].lng;
            this.lat[i] = this.k[i].lat;
            this.id[i] = this.k[i].id;
          }
          console.log(this.lng);
          // for (var i = 0; i < this.lightsmsg.length; i++) {
          //   this.lightsmsgs[i] = this.lightsmsg[i].idmsg;}
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style >
.bm-view {
  width: 100%;
  height: 650px;
}
.bm-views {
  width: 90%;
  height: 300px;
  margin-left: 20px;
}
</style>
