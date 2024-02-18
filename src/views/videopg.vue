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

          <v-divider></v-divider>

          <v-list nav dense>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>{{mdiVideoWireless}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Video-Wireless</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>{{mdiCastVariant}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Projection screen</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>{{mdiAccountCircleOutline}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Manual Control</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>{{mdiHistory}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>History</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </template>
      <div id="app" style="margin-top:85px">
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-3" text icon color="dark" v-bind="attrs" v-on="on">
                <v-icon x-large>{{mdiPlusCircleOutline}}</v-icon>
              </v-btn>
            </template>
            <v-card style="height:600px">
              <v-card-title>
                <span class="text-h5">添加新的智能信号灯：</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="name of the light*" id="name" required :rules="rules"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="location of the light*" id="location" required :rules="rules"></v-text-field>
                    </v-col>
                    <div style="height:80px"></div>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>lightLat(该信号灯的lat值):</v-list-item-title>
                        <v-list-item-subtitle>{{center.lat}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>lightLng(该信号灯的lng值):</v-list-item-title>
                        <v-list-item-subtitle>{{center.lng}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-row>
                </v-container>
                <div style="height:20px"></div>
                <div style="margin-left:20px"><small>*indicates required field</small></div>
                <div style="height:80px"></div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="addnewLight(),dialog = false">
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

    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->

    <!-- 给应用提供合适的间距 -->
    <v-container fluid>

      <!-- 如果使用 vue-router -->
      <router-view></router-view>

      {{this.$route.query}}
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
      mdiPlusCircleOutline,
      mdiAccountCircleOutline,
      mdiFormatListBulleted,
      mdiCastVariant,
      mdiVideo,
      mdiTrafficLight,
      dialog: false,
      admins: [
        ["Vedio", mdiVideo],
        ["Settings", "mdi-cog-outline"],
      ],

      rules: [
        (value) => !!value || "Required.",
        (value) => (value || "").length <= 20 || "Max 20 characters",
      ],
      ops: {
        vuescroll: {},
        scrollPanel: {},
        scrollingX: true,
        scrollingY: true,
        rail: {
          keepShow: true,
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: "#F5F5F5", //滚动条颜色
          opacity: 0.5, //滚动条透明度
          "overflow-x": "hidden",
        },
        videoData: [],
      },
    };
  },

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
    search2(val) {
      val && val !== this.select2 && this.querySelections(val);
    },
  },
  mounted: function () {
    this.onchangContactPersonName(); //页面加载完成后需要触发的函数
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },

    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
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
    addnewLight() {
      var timestamp = Date.parse(new Date()); //时间戳与现实不对应！！！！！！！！！！！
      axios
        .post("http://localhost:8888/addnewLight", {
          id: timestamp,
          lat: this.center.lat,
          lng: this.center.lng,
          location: document.getElementById("location"),
          lightname: document.getElementById("name"),
        })
        .then(() => {
          console.log(document.getElementById("location"));
        })
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
  },
};
</script>
<style >
.bm-view {
  width: 100%;
  height: 650px;
}
</style>

