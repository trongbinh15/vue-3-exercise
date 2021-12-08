import UserList from "../components/UserList.vue";
import UserInfo from "../components/UserInfo.vue";
import NotFound from "../components/NotFound.vue";
import Login from "../components/Login.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const authentication = (to: any, from: any, next: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    next();
  } else {
    next({ name: "login" });
  }
};

const routes = [
  { path: "/", component: UserList, beforeEnter: authentication },
  {
    path: "/users/:id",
    name: "users",
    component: UserInfo,
    beforeEnter: authentication,
  },
  { path: "/login", name: "login", component: Login },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
