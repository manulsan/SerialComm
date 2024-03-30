<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          {{ productName }}
          <!-- :label="'v ' + $q.version" -->
          <q-badge
            color="orange"
            text-color="black"
            :label="'v ' + version"
            align="top"
        /></q-toolbar-title>
        <div v-if="isElectron" class="q-gutter-x-sm">
          <q-btn flat dense :icon="mdiWindowMinimize" @click="minimize" />
          <q-btn flat dense :icon="mdiWindowMaximize" @click="toggleMaximize" />
          <q-btn flat dense :icon="mdiWindowClose" @click="close" />
          <!-- <q-icon :name="mdiWindowClose" size="lg" color="red" /> -->
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <!-- <q-item-label header> Essential Links </q-item-label> -->
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { version, productName } from '../../package.json';
import {
  mdiWindowClose,
  mdiWindowMaximize,
  mdiWindowMinimize,
} from '@quasar/extras/mdi-v5';
defineOptions({
  name: 'MainLayout',
});
import { electronApi } from '../api/electron-api';
const isElectron = process.env.MODE === 'electron';
const close = () => void electronApi.close();
const minimize = () => void electronApi.minimize();
const toggleMaximize = () => void electronApi.toggleMaximize();

// const getSerialPorts = () => {
//   return electronApi.openFileDialog('AHA', 'folder', {
//     name: 'images',
//     extensions: ['jpg'],
//   });
// };

const linksList: EssentialLinkProps[] = [
  {
    title: 'Load',
    caption: 'load workbench profile',
    icon: 'folder',
    link: '/',
  },
  {
    title: 'to error',
    caption: 'close workbench',
    icon: 'close',
    link: '/error',
  },
  // {
  //   title: 'Github',
  //   caption: 'github.com/quasarframework',
  //   icon: 'code',
  //   link: '/',
  // },
];
// link: 'https://quasar.dev',
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
