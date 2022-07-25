//导入vue
import Vue from "vue";
//导入路由
import VueRouter from "vue-router";
//调用路由
Vue.use(VueRouter);

//导入子页面
import Layout from "@/views/layout";
import Home from "@/views/home";
import Search from "@/views/search";
import Play from "@/views/Play";





const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this,to).catch(err=>err)
}


//创建规则
const routes = [
  {
    path: "/",
    redirect: "/layout",
  },
  {
    path: "/layout",
    component: Layout,
    redirect: "/layout/home",
    children: [
      {
        path: "home",
        component: Home,
        meta: { title: "首页" },
      },
      {
        path: "search",
        component: Search,
        meta: { title: "搜索" },
      },
    ],
  },
  {
    path: "/play",
    component: Play,
  },
];
//传入规则
const router = new VueRouter({
  routes,
});
export default router;
