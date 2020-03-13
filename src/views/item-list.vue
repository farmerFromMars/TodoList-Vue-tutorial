<template>
  <div>
    <item v-for="item in renderList" :key="item.id" :id="item.id" :title="item.title" :status="item.status"></item>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import item from '@/components/item.vue';
import {mapGetters} from 'vuex';

@Component({
  components: {
    item,
  },
  // vuex에서 제공하는 mapGetters 같은 경우에는 런타임에 getter를 맵핑하여 불러와서 쓴다.
  // 따라서 , 오픈소스인 vue-module-decorators 를 이용하면 훨씬 깔끔해진다.
  computed: {
    ...mapGetters([
      'allTodoList',
      'activeTodoList',
      'clearTodoList',
    ]),
  },
})
export default class ItemList extends Vue {

  renderList: any[] = [];
  allTodoList!: any[];
  activeTodoList!: any[];
  clearTodoList!: any[];

  created() {
    // this.initRenderList(this.$route.params.status);
    // $store.state.todoList init
    this.$store.dispatch('initData');
  }

  initRenderList(status: string) {
    if (!status) {
      this.renderList = this.allTodoList;
    } else if (status === 'active') {
      this.renderList = this.activeTodoList;
    } else if (status === 'clear') {
      this.renderList = this.clearTodoList;
    }

  }

  @Watch('$route.params.status')
  routeUpdate(newValue: 'active' | 'clear') {
    this.initRenderList(newValue);
  }

  // $store.dispatch('initData') 실행시 state에 저장된 todoList에 변경이 일어난다.
  @Watch('$store.state.todoList', {deep: true})
  stateUpdate() {
    this.initRenderList(this.$route.params.status);
  }
}
</script>