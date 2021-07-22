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
                <select name="" id="" class="form-control col-md-2">
                  <option value="">1с</option>
                  <option value="">2с</option>
                  <option value="">3с</option>
                  <option value="">4с</option>
                  <option value="">5с</option>
                </select>
              </div>
            </div>
            <div class="col-md-6" style="display: flex; align-items: center">
              <button type="button" class="btn btn-default">Сохранить</button>
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
                  <input class="form-check-input" type="radio" name="radio1" />
                  <label class="form-check-label">Фото на фоне</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="radio1"
                    checked
                  />
                  <label class="form-check-label">Просто фон</label>
                </div>
              </div>
            </div>
            <div class="col-md-9" style="display: flex; flex-direction: row">
              <div
                class="mr-4"
                style="height: 100px; width: 150px; border: 1px solid #ced4da"
              ></div>
              <button type="button" class="btn btn-default mr-4 h50">
                Добавить
              </button>
              <button type="button" class="btn btn-default mr-4">
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
                <select name="" id="" class="form-control col-md-2">
                  <option value="">1с</option>
                  <option value="">2с</option>
                  <option value="">3с</option>
                  <option value="">4с</option>
                  <option value="">5с</option>
                </select>
              </div>
            </div>
            <div class="col-md-6" style="display: flex; align-items: center">
              <button type="button" class="btn btn-default">Сохранить</button>
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
    };
  },
  methods: {
    addTopBannerImg() {
      const currenttopBannerImg = {
        id: Math.random().toString(),
        inputUrl: null,
        inputText: null,
      };
      if (this.topBannerImgs.length < 5) {
        this.topBannerImgs.push(currenttopBannerImg);
      } else {
        alert(`Добавлено максимальное количество баннеров!`);
      }
    },
    addNewsAndPromoImg() {
      const currentNewsAndPromoImg = {
        id: Math.random().toString(),
        inputUrl: null,
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
  },
};
</script>
