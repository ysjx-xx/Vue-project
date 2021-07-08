import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("views/home/Home");
const Category = () => import("views/category/Category");
const Shopcart = () => import("views/shopcart/Shopcart");
const Profile = () => import("views/profile/Profile");
const Detail = () => import("views/detail/Detail");

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    meta:{
      title:"首页"
    }
  },
  {
    path: "/category",
    component: Category,
    meta:{
      title:"分类"
    }
  },
  {
    path: "/shopcart",
    component: Shopcart,
    meta:{
      title:"购物车"
    }
  },
  {
    path: "/profile",
    component: Profile,
    meta:{
      title:"我的"
    }
  },
  {
    path: "/detail",
    component: Detail,
    meta:{
      title:"详情"
    }
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to,from,next)=>{
  document.title=to.meta.title
  next()
})
export default router;
