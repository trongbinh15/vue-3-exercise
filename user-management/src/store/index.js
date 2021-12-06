import { createStore } from "vuex";
import userModule from "./user.module";
import baseModule from "./base.module";

export const store = createStore({
  modules: {
    users: userModule,
    base: baseModule,
  },
});
