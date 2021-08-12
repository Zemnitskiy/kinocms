<template>
  <div class="row pt-4 pl-3 pr-3 mr-0 ml-0">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">На главной верх</h3>
          <div class="card-tools">
            <!-- Buttons, labels, and many other things can be placed here! -->
            <div class="form-group mb-0">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customSwitch1"
                />
                <label class="custom-control-label" for="customSwitch1"></label>
              </div>
            </div>
          </div>
          <!-- /.card-tools -->
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <div class="row">
            <div class="col">
              <p>Размер: 1000х190</p>
            </div>
          </div>
          <div class="row" style="flex-direction: row-reverse">
            <div
              class="col-md-2"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <button
                type="button"
                class="btn btn-block btn-default"
                @click="addTopBannerImg"
              >
                Добавить<br />
                фото
              </button>
            </div>
            <div class="col-md-10">
              <div class="row" v-if="topBannerImgs.length">
                <div
                  class="card col-lg-2 col-md-2 col-sm-6 mr-2 ml-2"
                  v-for="topBannerImg in topBannerImgs"
                  :key="topBannerImg.id"
                >
                  <TopBannerImg
                    @remove="deleteTopBannerImg(topBannerImg)"
                    :inputUrl.sync="topBannerImg.inputUrl"
                    :inputText.sync="topBannerImg.inputText"
                    :image.sync="topBannerImg.image"
                  />
                </div>
                <!-- /.card -->
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <div class="row">
            <div
              class="col-md-6"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <div
                class="form-group row mb-0"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                "
              >
                <label for="" class="col-md-4">Скорость вращения</label>
                <select
                  name=""
                  id=""
                  class="form-control col-md-2"
                  v-model="topBannerSpeed"
                >
                  <option value="1" label="1 с"></option>
                  <option value="2" label="2 с"></option>
                  <option value="3" label="3 с"></option>
                  <option value="4" label="4 с"></option>
                  <option value="5" label="5 с"></option>
                </select>
              </div>
            </div>
            <div class="col-md-6" style="display: flex; align-items: center">
              <button
                type="button"
                class="btn btn-default"
                @click="saveTopBanners"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
        <!-- /.card-footer -->
      </div>
      <!-- /.card -->

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Сквозной баннер на заднем фоне</h3>
          <div class="card-tools"></div>
          <!-- /.card-tools -->
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <div class="row">
            <div class="col">
              <p>Размер: 2000х3000</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="radio1"
                    v-model="backgroundBanner.bannerMode"
                    @change="changeBannerMode"
                    value="Фото на фоне"
                    checked
                  />
                  <label class="form-check-label">Фото на фоне</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="radio2"
                    value="Просто фон"
                    v-model="backgroundBanner.bannerMode"
                    @change="changeBannerMode"
                  />
                  <label class="form-check-label">Просто фон</label>
                </div>
              </div>
            </div>
            <div class="col-md-9" style="display: flex; flex-direction: row">
              <img
                :src="backgroundBanner.image"
                style="width: 30%; height: 100%"
                class="mb-2 mr-4"
                alt=""
              />
              <input
                type="file"
                id="backgroundbanner"
                accept="image/*"
                @input="uploadBckgBanner"
                style="display: none"
              />
              <label
                for="backgroundbanner"
                class="
                  btn btn-default
                  mr-4
                  mb-0
                  h50
                  d-flex
                  align-items-center
                  font-weight-normal
                "
              >
                <span>Добавить</span>
              </label>
              <button
                type="button"
                class="btn btn-default mr-4"
                @click="deleteBackgroundBanner()"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer"></div>
        <!-- /.card-footer -->
      </div>
      <!-- /.card -->

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">На главной Новости Акции</h3>
          <div class="card-tools">
            <!-- Buttons, labels, and many other things can be placed here! -->
            <div class="form-group mb-0">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customSwitch1"
                />
                <label class="custom-control-label" for="customSwitch1"></label>
              </div>
            </div>
          </div>
          <!-- /.card-tools -->
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <div class="row">
            <div class="col">
              <p>Размер: 1000х190</p>
            </div>
          </div>
          <div class="row" style="flex-direction: row-reverse">
            <div
              class="col-md-2"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <button
                type="button"
                class="btn btn-block btn-default"
                v-on:click="addNewsAndPromoImg"
              >
                Добавить<br />
                фото
              </button>
            </div>
            <div class="col-md-10">
              <div class="row" v-if="newsAndPromoImgs.length">
                <div
                  class="card col-lg-2 col-md-2 col-sm-6 mr-2 ml-2"
                  v-for="newsAndPromoImg in newsAndPromoImgs"
                  :key="newsAndPromoImg.id"
                >
                  <NewsAndPromoImg
                    @remove="deleteNewsAndPromoImg(newsAndPromoImg)"
                    :inputUrl.sync="newsAndPromoImg.inputUrl"
                    :image.sync="newsAndPromoImg.image"
                  />
                </div>
                <!-- /.card -->
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <div class="row">
            <div
              class="col-md-6"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <div
                class="form-group row mb-0"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                "
              >
                <label for="" class="col-md-4">Скорость вращения</label>
                <select
                  name=""
                  id=""
                  class="form-control col-md-2"
                  v-model="newsAndPromoSpeed"
                >
                  <option value="1" label="1 с"></option>
                  <option value="2" label="2 с"></option>
                  <option value="3" label="3 с"></option>
                  <option value="4" label="4 с"></option>
                  <option value="5" label="5 с"></option>
                </select>
              </div>
            </div>
            <div class="col-md-6" style="display: flex; align-items: center">
              <button
                type="button"
                class="btn btn-default"
                @click="saveNewsAndPromo"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
        <!-- /.card-footer -->
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
import TopBannerImg from "../TopBannerImg";
import NewsAndPromoImg from "../NewsAndPromoImg";
import firebase from "firebase";

const database = firebase.database();

export default {
  components: {
    TopBannerImg,
    NewsAndPromoImg,
  },
  name: "PageBanners",

  data() {
    return {
      topBannerImgs: [],
      newsAndPromoImgs: [],
      topBannerSpeed: "3",
      newsAndPromoSpeed: "2",
      backgroundBanner: {
        image: require("../../assets/img/noimage.png"),
        bannerMode: "Фото на фоне",
      },
    };
  },
  methods: {
    addTopBannerImg() {
      const currenttopBannerImg = {
        id: String(Date.now() * Math.random()),
        inputUrl: null,
        inputText: null,
        image: require("../../assets/img/noimage.png"),
      };
      if (this.topBannerImgs.length < 5) {
        this.topBannerImgs.push(currenttopBannerImg);
      } else {
        alert(`Добавлено максимальное количество баннеров!`);
      }
    },
    addNewsAndPromoImg() {
      const currentNewsAndPromoImg = {
        id: String(Date.now() * Math.random()),
        inputUrl: null,
        image: require("@/assets/img/noimage.png"),
      };
      if (this.newsAndPromoImgs.length < 5) {
        this.newsAndPromoImgs.push(currentNewsAndPromoImg);
      } else {
        alert(`Добавлено максимальное количество баннеров!`);
      }
    },
    deleteNewsAndPromoImg(newsAndPromoImg) {
      this.newsAndPromoImgs = this.newsAndPromoImgs.filter(
        (banner) => banner.id !== newsAndPromoImg.id
      );
    },
    deleteTopBannerImg(topBannerImg) {
      this.topBannerImgs = this.topBannerImgs.filter(
        (banner) => banner.id !== topBannerImg.id
      );
    },
    deleteBackgroundBanner() {
      const storageRef = firebase.storage();
      let desertRef = storageRef.refFromURL(this.backgroundBanner.image);
      desertRef.delete();

      this.backgroundBanner.image = require("../../assets/img/noimage.png");

      database.ref("banners/backgroundbanner").set(this.backgroundBanner);
    },
    saveTopBanners: function () {
      database.ref("banners/topbannerimgs").set(this.topBannerImgs);
      database.ref("banners/topbannerspeed").set(this.topBannerSpeed);
    },
    saveNewsAndPromo: function () {
      database.ref("banners/newsandpromoimgs").set(this.newsAndPromoImgs);
      database.ref("banners/newsandpromospeed").set(this.newsAndPromoSpeed);
    },
    uploadBckgBanner: async function (event) {
      const file = event.target.files[0];

      this.backgroundBanner.image = URL.createObjectURL(file);

      const storageRef = firebase
        .storage()
        .ref(`images/${Date.now()}${file.name}`);
      this.backgroundBanner.image = await storageRef
        .put(file)
        .then(async function (snapshot) {
          return await snapshot.ref.getDownloadURL();
        });

      database.ref("banners/backgroundbanner").set(this.backgroundBanner);
    },
    changeBannerMode: function () {
      database.ref("banners/backgroundbanner").set(this.backgroundBanner);
    },
  },
  mounted() {
    database.ref("banners/topbannerimgs").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.topBannerImgs = snapshot.val();
      } else {
        this.topBannerImgs = [];
      }
    });
    database.ref("banners/topbannerspeed").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.topBannerSpeed = snapshot.val();
      } else {
        this.topBannerSpeed = "3";
      }
    });

    database.ref("banners/newsandpromoimgs").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.newsAndPromoImgs = snapshot.val();
      } else {
        this.newsAndPromoImgs = [];
      }
    });
    database.ref("banners/newsandpromospeed").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.newsAndPromoSpeed = snapshot.val();
      } else {
        this.newsAndPromoSpeed = "3";
      }
    });

    database.ref("banners/backgroundbanner").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.backgroundBanner = snapshot.val();
      } else {
        this.backgroundBanner = {
          image: require("../../assets/img/noimage.png"),
          bannerMode: "Фото на фоне",
        };
      }
    });
  },
};
</script>
