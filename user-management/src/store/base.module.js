import {
  LOG_IN,
  LOG_OUT,
  SET_COMPLETE,
  SET_CURRENT_USER,
  SET_ERROR,
  SET_LOADING,
} from "./actions.type";
import userService from "../services/user.service";
import { useToast } from "vue-toastification";

const toast = useToast();

const state = {
  currentUser: null,
  loading: false,
  error: "",
};

const actions = {
  async [LOG_IN]({ commit }, email) {
    try {
      const res = await userService.getUserByEmail(email);
      toast("Login successfully");
      localStorage.setItem("token", res.id);
      commit(SET_CURRENT_USER, res);
      return res;
    } catch (error) {
      commit(SET_ERROR, error.toString())
    }
  },
  async [LOG_OUT]({ commit }) {
    localStorage.removeItem("token");
    commit(SET_CURRENT_USER, null);
    return res;
  },
};

const getters = {
  currentUser(state) {
    return state.currentUser;
  },
};

const mutations = {
  [SET_LOADING](state) {
    state.loading = true;
    state.error = "";
  },
  [SET_COMPLETE](state) {
    state.loading = false;
    state.error = "";
  },
  [SET_ERROR](state, error) {
    state.loading = false;
    state.error = error;
    toast(error.toString(), { type: "error" });
  },
  [SET_CURRENT_USER](state, user) {
    state.currentUser = user;
  },
};

export default {
  state: () => state,
  actions,
  getters,
  mutations,
};
