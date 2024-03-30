<template>
  <q-page class="row items-center justify-evenly">
    <p>Counter: {{ store.counter }}</p>
    <q-btn @click="openElectronFileDialog">Open Electron File Dialog</q-btn>
    <q-btn @click="portOpen">Open Port</q-btn>
    <q-btn @click="getPortList">getPostLists</q-btn>
    <q-select v-model="portModel" :options="portLists" style="width: 100px" />
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from 'vue';
import { useCounterStore } from '../stores/counter';
import { electronApi } from '../api/electron-api';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  setup() {
    const store = useCounterStore();
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
    ]);

    const meta = ref<Meta>({
      totalCount: 1200,
    });

    //const portLists = ref(['string']);
    const portLists = ref(['']);
    const portModel = ref(null);

    const openElectronFileDialog = async () => {
      return electronApi.openFileDialog('AHA', 'folder', {
        name: 'images',
        extensions: ['jpg'],
      });
    };
    const portOpen = async() =>{
      electronApi.send('open-serial-port', 'COM3'); // Repla
    }
    const getPortList = async () => {
      const data = await electronApi.getPortList();
      if (data === undefined) {
        console.log('Got null', data);
        return;
      }
      // const propertiesToKeep: (keyof Person)[] = ['path'];
      // const filteredArray = filterProperties(ports, propertiesToKeep);
      // portLists.value = filteredArray;

      // const ports = data.map((m) => {
      //   if (m.path !== undefined) {
      //     return m.path;
      //   }
      // });
      console.log('Got port list=', data);
      portLists.value = data;
    };
    // function filterProperties<T extends Record<string, any>>(
    //   array: T[],
    //   propertiesToKeep: (keyof T)[]
    // ): Partial<T>[] {
    //   return array.map((obj) =>
    //     propertiesToKeep.reduce((acc, prop) => {
    //       if (obj.hasOwnProperty(prop)) {
    //         acc[prop] = obj[prop];
    //       }
    //       return acc;
    //     }, {} as Partial<T>)
    //   );
    // }

    return {
      todos,
      meta,
      store,
      openElectronFileDialog,
      getPortList,
      portLists,
      portModel,
    };
  },
});
</script>
