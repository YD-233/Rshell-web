<script setup lang="ts">
import Header from "@/components/HeaDer.vue";
import SideBar from "@/components/SideBar.vue";
import TagsView from "@/components/TagsView.vue";

import {useTagsStore} from "@/stores/tags";

const tags = useTagsStore();
</script>
<template>
  <div>
    <Header></Header>
    <SideBar></SideBar>
    <div class="content-box" :class="{ 'content-collapse': SideBar.collapse }">
<!--      <TagsView></TagsView>-->
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tags.nameList">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style>

</style>
