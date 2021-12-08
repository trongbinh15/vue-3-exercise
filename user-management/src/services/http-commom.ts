import axios from "axios";
import { combineString } from "../helpers";
import { store } from "../store";
import { SET_COMPLETE, SET_ERROR, SET_LOADING } from "../store/actions.type";

const instance = axios.create({
  baseURL: "http://localhost:3004/",
  headers: {
    "Content-type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    store.commit(combineString('base', SET_LOADING));
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    store.commit(combineString('base', SET_ERROR), error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    store.commit(combineString('base', SET_COMPLETE));
    return response;
  },
  function (error) {
    // Do something with response error
    store.commit(combineString('base', SET_ERROR), error);
    return Promise.reject(error);
  }
);

export default instance;
