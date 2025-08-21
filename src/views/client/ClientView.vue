<script setup lang="ts">
import ClientSideBar from "@/components/Clients/SideBar.vue";
import {useTagsStore} from "@/stores/tags";

const tags = useTagsStore();
</script>

<template>
  <div>
    <h1 style="margin-left: 2%;margin-top: 20px">客户端</h1>
    <ClientSideBar></ClientSideBar>
    <div class="content-box" :class="{ 'content-collapse': ClientSideBar.collapse }">
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

<style scoped>

</style>