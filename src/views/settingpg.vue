<template >
  <app>
    <v-navigation-drawer app>
      <template>
        <v-card height="600px" elevation="0">
          <v-list>
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
          </v-list>

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
                        <v-list-item-title v-bind="attrs" v-on="on">Settings</v-list-item-title>
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

        </v-card>
      </template>

    </v-navigation-drawer>
    <v-app-bar app>
      <span style="font-size:25px">
        <router-link to="./mainpg.vue"></router-link>智能信号灯-交通流疏导控制系统【融创软通】
      </span>
     <div style="margin-left:150px"> {{this.name[0].name}}</div>
     <div style="margin-left:50px">id:{{this.name[0].id}}</div>

    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->

    <!-- 给应用提供合适的间距 -->
    <v-container fluid>

      <!-- 如果使用 vue-router -->
      <router-view></router-view>

      <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true" @moving="syncCenterAndZoom" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom">
        <bm-traffic :predictDate="{weekday: 7, hour: 12}">
        </bm-traffic>
        <bm-marker v-for="(value,k) in values" :key="k" :position="{lat: value.lat,lng: value.lng}">
          <bm-label :content="value.name" :labelStyle="{color: 'red', fontSize : '10px'}" :offset="{width: -35, height: 30}"></bm-label>
        </bm-marker>
        <bm-marker v-for="(value,k) in formData.powerAttrList" :key="k" :position="{lat: value.lat,lng:value.lng}">
          <bm-label :content="value.id" :labelStyle="{color: 'red', fontSize : '10px'}" :offset="{width: 0, height: 30}"></bm-label>
        </bm-marker>
        <bm-marker :position="{lat:this.center.lat,lng:this.center.lng}" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>

      </baidu-map>

      <v-card style="margin-top:20px;margin-left:30px" elevation="0">
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
        <v-btn @click="changeset()" color="primary" style="margin-left:700px">保存</v-btn>
        <v-btn @click="addit(center.lng,center.lat)" color="primary" style="margin-left:30px">添加</v-btn>
      </v-card>

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
import * as axios from "axios";
import { mdiVideoWireless } from "@mdi/js";
import { mdiCastVariant } from "@mdi/js";
import { mdiAccountCircleOutline } from "@mdi/js";
import { mdiHistory } from "@mdi/js";
import { mdiCloseCircleOutline } from "@mdi/js";

export default {
  name: "Main",

  data() {
    return {
      center: { lng: 116.404, lat: 39.915 },
      zoom: 4,
      mdiVideoWireless,
      loading: false,
      aitems: [],
      mdiHistory,
      bitems: [],
      search: null,
      search2: null,
      select: null,
      select2: null,
      keyword: "",
      values: [],
      idvalues: [],
      placevalues: [],
      lightsmsg: [],
      lat: [],
      lng: [],
      id: [],
      k: [],
      a: 1,
      idk: 1,
      absolute: true,
      opacity: 1,
      overlay: false,
      mdiCloseCircleOutline,
      mdiPlusCircleOutline,
      mdiAccountCircleOutline,
      mdiFormatListBulleted,
      mdiCastVariant,
      mdiVideo,
      mdiTrafficLight,
      name:[],
      dialog: false,
      formData: {
        powerAttrList: [],
      },
      admins: [
        ["Vedio", mdiVideo],
        ["Settings", "mdi-cog-outline"],
      ],
    };
  },

  mounted: function () {
    this.onchangContactPersonName();
    this.setlight(this.$route.query.idvalues); 
    this.searchlight(this.$route.query.idvalues)//页面加载完成后需要触发的函数
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = this.name[0].lng;
      this.center.lat = this.name[0].lat;
      this.zoom = 15;
    },
    addit(lng, lat) {
      var x = lat.toString();
      var y = lng.toString();
      var z = (this.formData.powerAttrList.length + 1).toString();
      this.formData.powerAttrList.push({ lat: x, lng: y, id: z });
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
    },
    deleteit(index) {
      this.formData.powerAttrList.splice(index, 1);
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
          console.log(this.$route.query);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
searchlight(i) {
      axios
        .post("http://localhost:8888/searchid", {
          id: i,
        })
        .then((response) => {
          this.name=response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setlight(i) {
      axios
        .post("http://localhost:8888/searchLights", {
          id: i,
        })
        .then((response) => {
          const lightsmsgs = response.data;
          this.lightsmsg = lightsmsgs;
          this.formData.powerAttrList = JSON.parse(this.lightsmsg[0].idmsg);
          console.log(this.formData.powerAttrList);
          for (var i = 0; i < this.formData.powerAttrList.length; i++) {
            this.lng[i] = this.formData.powerAttrList[i].lng;
            this.lat[i] = this.formData.powerAttrList[i].lat;
            this.id[i] = this.formData.powerAttrList[i].id;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changeset() {
      axios
        .post("http://localhost:8888/changeLights", {
          id: this.$route.query.idvalues,
          idmsg: JSON.stringify(this.formData.powerAttrList),
        })
        .then(() => {})
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
</style>