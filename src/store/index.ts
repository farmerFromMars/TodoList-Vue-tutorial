import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {State, Item} from '@/store/sotre.interface.ts';
Vue.use(Vuex);

const store: StoreOptions<State> = {
  state: {
    todoList: [
      {id: 0, title: 'test0', status: 'active'},
      {id: 1, title: 'test1', status: 'active'},
      {id: 2, title: 'test2', status: 'active'},
      {id: 3, title: 'test3', status: 'clear'},
    ],
  },
  mutations: {
    // TODO add
    addItem(state, item: Item) {
      state.todoList.push(item);
    },
    // TODO change status
    changeStatus(state, {id, status}: {id: number, status: 'active' | 'clear'}) {
      state.todoList[id].status = status;
    },
    // TODO Remove
    removeItem(state, id: number) {
      state.todoList.splice(id, 1);
    },
  },
  actions: {
    // 서버와의 통신 및 비지니스 로직이 실행되는 부분
  },
  getters: {
    allTodoList: (state) => state.todoList,
    activeTodoList: (state) => {
      return state.todoList.filter((item: Item) => item.status === 'active');
    },
    clearTodoList: (state) => {
      return state.todoList.filter((item: Item) => item.status === 'clear');
    },
  },
};

export default new Vuex.Store(store);
