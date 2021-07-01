import Vue from "vue";
import VueRouter from "vue-router";
import PageStats from "@/components/pages/PageStats.vue";
import PageBanners from "@/components/pages/PageBanners.vue";
import PageCinemas from "@/components/pages/PageCinemas.vue";
import PageFilms from "@/components/pages/PageFilms.vue";
import PageNews from "@/components/pages/PageNews.vue";
import PageNewsletter from "@/components/pages/PageNewsletter.vue";
import PagePages from "@/components/pages/PagePages.vue";
import PagePromo from "@/components/pages/PagePromo.vue";
import PageUsers from "@/components/pages/PageUsers.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "PageStats",
    component: PageStats,
  },
  {
    path: "/pagebanners",
    name: "Pagebanners",
    component: PageBanners,
  },
  {
    path: "/pagecinemas",
    name: "Pageinemas",
    component: PageCinemas,
  },
  {
    path: "/pagefilms",
    name: "Pagefilms",
    component: PageFilms,
  },
  {
    path: "/pagenews",
    name: "Pagenews",
    component: PageNews,
  },
  {
    path: "/pagenewsletter",
    name: "Pagenewsletter",
    component: PageNewsletter,
  },
  {
    path: "/pagepages",
    name: "Pagepages",
    component: PagePages,
  },
  {
    path: "/pagepromo",
    name: "Pagepromo",
    component: PagePromo,
  },
  {
    path: "/pageusers",
    name: "PageUsers",
    component: PageUsers,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
