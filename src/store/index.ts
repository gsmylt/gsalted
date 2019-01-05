import Vue from 'vue';
import Vuex from 'vuex';
import { RootState, MessageType } from './types';
import { v4 as uuid } from 'uuid';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    toasts: [],
  },

  mutations: {
    toast(state, payload: { message: string, type: MessageType }) {
      const id = uuid();
      state.toasts.unshift({
        id,
        message: payload.message,
        type: payload.type,
      });

      setTimeout(() => {
        const index = state.toasts.findIndex((toast) => toast.id === id);
        state.toasts.splice(index, 1);
      }, 2000);
    },
  },
});
