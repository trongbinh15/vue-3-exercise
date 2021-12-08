import { useToast } from "vue-toastification";
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { User } from "../models/user.model";
import userService from "../services/user.service";
import {
  ADD_NEW_USER, DELETE_USER, LOAD_USER_LIST,
  SET_ADDED_USER, SET_DELETED_USER, SET_UPDATED_USER,
  SET_USER_LIST,
  UPDATE_USER
} from "./actions.type";

const toast = useToast();

type UserState = {
  userList: User[];
}

const state: UserState = {
  userList: [],
};

const actions: ActionTree<UserState, any> = {
  async [LOAD_USER_LIST]({ commit }) {
    const res = await userService.getAll();
    commit(SET_USER_LIST, res.data);
    return res;
  },
  async [ADD_NEW_USER]({ commit }, user) {
    const res = await userService.addOne(user);
    toast("Add new user successfully!");
    commit(SET_ADDED_USER, res.data);
    return res;
  },
  async [UPDATE_USER]({ commit }, user) {
    const res = await userService.updateOne(user);
    const updatedUser = res.data;
    toast("Update user successfully!");
    commit(SET_UPDATED_USER, updatedUser);
    return res;
  },
  async [DELETE_USER]({ commit }, id) {
    const res = await userService.deleteOne(id);
    toast("Delete user successfully!");
    commit(SET_DELETED_USER, id);
    return res;
  },
};

const getters: GetterTree<UserState, any> = {
  users(state) {
    return state.userList;
  },
  userById(state) {
    return (id: string) => {
      return state.userList.find((user) => user.id === id);
    };
  },
};

const mutations: MutationTree<UserState > = {
  [SET_USER_LIST](state, userList) {
    state.userList = userList;
  },
  [SET_ADDED_USER](state, user: User) {
    state.userList.push(user);
  },
  [SET_UPDATED_USER](state, user: User) {
    const index = state.userList.findIndex((u) => u.id === user.id);
    state.userList[index] = user;
  },
  [SET_DELETED_USER](state, id: string) {
    const index = state.userList.findIndex((u) => u.id === id);
    state.userList.splice(index, 1);
  },
};

export default {
  namespaced: true,
  state: () => state,
  actions,
  getters,
  mutations,
};
