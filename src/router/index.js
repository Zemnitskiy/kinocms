import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "PageStats",
    component: () => import("@/components/pages/PageStats.vue"),
  },
  {
    path: "/pagebanners",
    name: "Pagebanners",
    component: () => import("@/components/pages/pagebanners/PageBanners.vue"),
  },
  {
    path: "/pagecinemas",
    name: "Pageinemas",
    component: () => import("@/components/pages/PageCinemas.vue"),
  },
  {
    path: "/pagefilms",
    name: "Pagefilms",
    component: () => import("@/components/pages/pagefilms/PageFilms.vue"),
  },
  {
    path: "/pagenews",
    name: "Pagenews",
    component: () => import("@/components/pages/PageNews.vue"),
  },
  {
    path: "/pagenewsletter",
    name: "Pagenewsletter",
    component: () => import("@/components/pages/PageNewsletter.vue"),
  },
  {
    path: "/pagepages",
    name: "Pagepages",
    component: () => import("@/components/pages/PagePages.vue"),
  },
  {
    path: "/pagepromo",
    name: "Pagepromo",
    component: () => import("@/components/pages/PagePromo.vue"),
  },
  {
    path: "/pageusers",
    name: "PageUsers",
    component: () => import("@/components/pages/PageUsers.vue"),
  },
  {
    path: "/addfilm",
    name: "AddFilm",
    component: () => import("@/components/pages/pagefilms/AddFilm.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
