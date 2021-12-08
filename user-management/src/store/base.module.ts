import {
  LOG_IN,
  LOG_OUT,
  SET_COMPLETE,
  SET_CURRENT_USER,
  SET_ERROR,
  SET_LOADING,
} from "./actions.type";
import userService from "../services/user.service";
import { useToast, TYPE } from "vue-toastification";
import { ActionTree, GetterTree, MutationTree, Store } from 'vuex';
import { User } from "../models/user.model";
import { InjectionKey } from "vue";

const toast = useToast();

type BaseState = {
  loading: boolean;
  error: string;
  currentUser: User | null;
}

const state: BaseState = {
  currentUser: null,
  loading: false,
  error: "",
};

// define injection key
export const key: InjectionKey<Store<BaseState>> = Symbol()

const actions: ActionTree<BaseState, any> = {
  async [LOG_IN]({ commit }, email) {
    try {
      const res = await userService.getUserByEmail(email);
      toast("Login successfully");
      localStorage.setItem("token", res.id);
      commit(SET_CURRENT_USER, res);
      return res;
    } catch (error: any) {
      commit(SET_ERROR, error.toString())
    }
  },
  async [LOG_OUT]({ commit }) {
    localStorage.removeItem("token");
    commit(SET_CURRENT_USER, null);
    return null;
  },
};

const getters: GetterTree<BaseState, any> = {
  currentUser(state) {
    return state.currentUser;
  },
};

const mutations: MutationTree<BaseState> = {
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
    toast(error.toString(), { type: TYPE.ERROR });
  },
  [SET_CURRENT_USER](state, user) {
    state.currentUser = user;
  },
};

export default {
  namespaced: true,
  state: () => state,
  actions,
  getters,
  mutations,
};
