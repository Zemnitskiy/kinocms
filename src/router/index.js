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
    name: "Pagecinemas",
    component: () => import("@/components/pages/pagecinemas/PageCinemas.vue"),
  },
  {
    path: "/addcinema/:id",
    name: "AddCinema",
    component: () => import("@/components/pages/pagecinemas/AddCinema.vue"),
    props: true,
  },
  {
    path: "/editcinema/:id",
    name: "EditCinema",
    component: () => import("@/components/pages/pagecinemas/EditCinema.vue"),
    props: true,
  },
  {
    path: "/addhall/:id",
    name: "AddHall",
    component: () => import("@/components/pages/pagecinemas/AddHall.vue"),
    props: true,
  },
  {
    path: "/edithall/:id",
    name: "EditHall",
    component: () => import("@/components/pages/pagecinemas/EditHall.vue"),
    props: true,
  },
  {
    path: "/pagefilms",
    name: "Pagefilms",
    component: () => import("@/components/pages/pagefilms/PageFilms.vue"),
  },
  {
    path: "/pagenews",
    name: "Pagenews",
    component: () => import("@/components/pages/pagenews/PageNews.vue"),
  },
  {
    path: "/addnews/:id",
    name: "AddNews",
    component: () => import("@/components/pages/pagenews/AddNews.vue"),
    props: true,
  },
  {
    path: "/editnews/:id",
    name: "EditNews",
    component: () => import("@/components/pages/pagenews/EditNews.vue"),
    props: true,
  },
  {
    path: "/pagenewsletter",
    name: "PageNewsletter",
    component: () =>
      import("@/components/pages/pagenewsletter/PageNewsletter.vue"),
  },
  {
    path: "/chooseusers",
    name: "ChooseUsers",
    component: () =>
      import("@/components/pages/pagenewsletter/ChooseUsers.vue"),
    props: true,
  },
  {
    path: "/pagepages",
    name: "Pagepages",
    component: () => import("@/components/pages/pagepages/PagePages.vue"),
  },
  {
    path: "/addpage/:id",
    name: "AddPage",
    component: () => import("@/components/pages/pagepages/AddPage.vue"),
    props: true,
  },
  {
    path: "/editpage/:id",
    name: "EditPage",
    component: () => import("@/components/pages/pagepages/EditPage.vue"),
    props: true,
  },
  {
    path: "/pagepromo",
    name: "Pagepromo",
    component: () => import("@/components/pages/pagepromo/PagePromo.vue"),
  },
  {
    path: "/addpromo/:id",
    name: "AddPromo",
    component: () => import("@/components/pages/pagepromo/AddPromo.vue"),
    props: true,
  },
  {
    path: "/editpromo/:id",
    name: "EditPromo",
    component: () => import("@/components/pages/pagepromo/EditPromo.vue"),
    props: true,
  },
  {
    path: "/pageusers",
    name: "PageUsers",
    component: () => import("@/components/pages/pageusers/PageUsers.vue"),
  },
  {
    path: "/edituser/:id",
    name: "EditUser",
    component: () => import("@/components/pages/pageusers/EditUser.vue"),
    props: true,
  },
  {
    path: "/addfilm/:id",
    name: "AddFilm",
    component: () => import("@/components/pages/pagefilms/AddFilm.vue"),
    props: true,
  },
  {
    path: "/editfilm/:id",
    name: "EditFilm",
    component: () => import("@/components/pages/pagefilms/EditFilm.vue"),
    props: true,
  },
  {
    path: "/addfilmfuture/:id",
    name: "AddFilmFuture",
    component: () => import("@/components/pages/pagefilms/AddFilmFuture.vue"),
    props: true,
  },
  {
    path: "/editfilmfuture/:id",
    name: "EditFilmFuture",
    component: () => import("@/components/pages/pagefilms/EditFilmFuture.vue"),
    props: true,
  },
  {
    path: "/pageschedule",
    name: "Pageschedule",
    component: () => import("@/components/pages/pageschedule/PageSchedule.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
