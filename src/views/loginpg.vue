<template>
  <v-app>
    <v-container>

      <div style="position:absolute;top:0;bottom:0;right:0;left:0;" :style="background">
        <v-main>
          <div style=" position: absolute;
                top: 50px;
                left: 5%;">
            <span style="
            display: inline-block;
            position: absolute;
            height: 38px;
            line-height: 38px;
            top: 15px;
            margin-left: 15px;
            padding-left: 15px;
            color: #fff;
            font-size: 30px;
            width: 600px;">智能信号灯 | 交通流疏导控制系统</span>
          </div>
          <div style="width: 600px;
                height: 100vh;
                background: rgba(0,0,0,0.3);
                position: absolute;
                top: 0;
                right: 0;">
            <v-card class="mx-auto" style="height: 500px;
                max-width: 400px;
                top: 175px;" color="rgb(255, 255, 255)">
              <div style="height:50px;
              max-width:450px">
                <span style="display: block;
                      width: 185px;
                      float: left;
                      position: relative;
                      font-size: 20px;
                      text-align: center;
                      padding: 8px 0;
                      margin-top: 8px ;
                      margin-left:15px;
                      color: #2B6CDB;
                      border-bottom: 1.5px solid #2B6CDB;">账号登录</span>
                <span style="display: block;
                      width: 185px;
                      float: right;
                      position: relative;
                      font-size: 20px;
                      text-align: center;
                      padding: 8px 0;
                      margin-top: 8px;
                      margin-right:15px;
                      border-bottom: 1.5px solid rgb(0 0 0 / 12%);">验证码登录</span>
              </div>
              <div style="border-width: 1px;
                    border-style: solid;
                    border-color: rgb(232, 232, 232);
                    border-radius: 4px;
                    height: 55px;
                    margin-top: 40px;
                    width: 350px;
                    margin-left: 25px;">
                <span style="position: absolute;
                                  top: 97px;
                                  left: 25px;">
                  <img src="../assets/user1.png">
                </span>
                <input id="username" name="username" type="text" placeholder="请输入用户名" title="请输入用户名" v-model="username" style="width: 70%;
                                  border: none;
                                  height: 55px;
                                  margin-left: 55px;
                                  outline: none;">
              </div>
              <div style="border-width: 1px;
                    border-style: solid;
                    border-color: rgb(232, 232, 232);
                    border-radius: 4px;
                    height: 55px;
                    margin-top: 25px;
                    width: 350px;
                    margin-left: 25px;">
                <span style="position: absolute;
                                  top: 177px;
                                  left: 25px;">
                  <img src="../assets/pass1.png">
                </span>
                <input id="password" name="passwordText" type="password" placeholder="请输入密码" title="请输入密码" v-model="password" style="width: 70%;
                                  border: none;
                                  height: 55px;
                                  margin-left: 55px;
                                  outline: none;">

              </div>
              <div style="width:70%;
                                margin-left:55px">
                <v-btn color="primary" elevation="12" x-large block style="
                    top:30px" id="login_submit" @click="loginit()">
                  登录</v-btn>
              </div>
              <div style="width:64%;
                              margin-left:67px;
                              margin-top:20px">
                <template>
                  <v-row justify="center">
                    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn text color="primary" elevation="12" x-large block v-bind="attrs" v-on="on" style="
                    top:30px">
                          注册账户</v-btn>
                      </template>
                      <v-card>
                        <v-toolbar dark color="primary">
                          <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                          <v-toolbar-title>注册账户</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-toolbar-items>
                            <v-btn dark text @click="dialog = false,zhuce()">
                              注册
                            </v-btn>
                          </v-toolbar-items>
                        </v-toolbar>
                        <v-list three-line subheader>
                          <v-subheader style="font-size:20px">交通流疏导控制系统使用说明</v-subheader>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-subtitle style="max-width:800px">注册完成后，系统用户可以进行登录。</v-list-item-subtitle>
                            <v-list-item-subtitle style="max-width:800px">进入智能交通疏导系统后可以通过红绿灯组的id、红绿灯所在的区域对已存在的红绿灯组进行索引。并通过已存在的红绿灯组视图层对实时的红绿灯路况进行监控：①可以了解实时的红绿灯情况②可以实时调用路面的监
                            控视图③可以实时了解交通流拥堵的情</v-list-item-subtitle>
                            <v-list-item-subtitle style="max-width:800px">况。系统用户可以通过lng，lat定位对红绿灯组所在的红绿灯组进行红绿灯的增删改查功能。系统用户可以手自动切换，实时调控红绿灯的运行情况。</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <img src="../assets/introduce.png" style="width:600px">
                        </v-list>
                        <v-divider></v-divider>
                        <v-list three-line subheader>
                          <v-subheader style="font-size:20px">注册新用户</v-subheader>
                          <v-list-item>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field label="请输入您的用户名" id="user_name" required :rules="rules" style="width:250px;margin-left:10px"></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field label="请输入您的密码" id="user_password" required :rules="rules" type="password" style="width:250px;margin-left:10px"></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field label="请输入您的测试邀请码" id="test_password" required :rules="rules" type="password" style="width:250px;margin-left:10px"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </template>

              </div>
              <div style="height: 81px;
                        background: #1976d261;
                        margin-top: 94px;">
              </div>
            </v-card>
          </div>

        </v-main>
      </div>
    </v-container>

  </v-app>
</template>

<script>
import * as axios from "axios";
export default {
  name: "Loginpg",
  data: () => ({
    background: {
      backgroundImage: "url(" + require("@/assets/background.jpg") + ")",
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
    username: null,
    password: null,
    result: [],
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    user_name: null,
    user_password: null,
    test_password: null,

  }),
  methods: {
    loginit() {
      axios
        .post("http://47.110.157.141:8090/login", {
          username: document.getElementById("username")._value,
          password: document.getElementById("password")._value,
        })
        .then((response) => {
          console.log(response);
          this.result = response.data;
          if (this.result.code == "01") {
            this.$router.push("/main");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    zhuce() {
      var timestamp = Date.parse(new Date());
      axios
        .post("http://localhost:8888/zhuce", {
          user_name: document.getElementById("user_name")._value,
          user_password: document.getElementById("user_password")._value,
          test_password: document.getElementById("test_password")._value,
          timestamp : timestamp,
        })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>