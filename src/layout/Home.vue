<template>
  <div class="page-tab">
    <router-view />
  </div>
  <van-tabbar
    v-model="active"
    class="tabar"
    id="tabar"
    inactive-color="rgb(153, 153, 153)"
  >
    <van-tabbar-item
      replace
      :to="route.path"
      v-for="(route, index) in homeRoute"
      :key="index"
      class="tabTitle"
    >
      {{ t(route.meta.title) }}
      <template #icon>
        <img
          v-if="active == index"
          :src="route.meta.icon_select"
          alt="footer icon"
        />
        <img :src="route.meta.icon" alt="footer icon" v-else />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { homeRouters } from "../router/modules/home";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    // const active = ref(0);
    const homeRoute = homeRouters;
    const activeRoute = computed(() => {
      return router.currentRoute.value.path;
    });

    const active = computed({
      get() {
        return homeRoute.findIndex((item) => item.path === activeRoute.value);
      },
      set() {},
    });

    onMounted(() => {
      let tab = document.getElementById("tabar");
    });
    return {
      homeRoute,
      activeRoute,
      active,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.page-tab {
  position: relative;
  padding-top: var(--van-nav-bar-height);
}

.tabar {
  background: #fff;
  --van-tabbar-item-active-background-color: transparent;
  --van-tabbar-item-active-color: #000;
  box-sizing: boder-box;
  font-family: SF Pro;
  padding-top: px2rem(22);
  overflow: hidden;

  .van-tabbar-item--active {
    position: relative;
  }
  .shape {
    position: absolute;
    top: 0%;
    left: 50%;
    width: px2rem(144);
    height: px2rem(33);
    transform: translateX(-50%) translateY(calc(-100% + px2rem(-9)));
    margin-bottom: px2rem(65);
    -webkit-filter: drop-shadow(
      px2rem(0) px2rem(16) px2rem(48) rgba(255, 130, 12, 0.5)
    );
    filter: drop-shadow(0px px2rem(16) px2rem(48) rgba(255, 130, 12, 0.5));
  }
  .shape_dark {
    -webkit-filter: drop-shadow(
      px2rem(0) px2rem(16) px2rem(52) rgba(255, 255, 255, 0.5)
    );
    filter: drop-shadow(0px px2rem(16) px2rem(52) rgba(255, 255, 255, 0.5));
  }
  .tabTitle {
    color: rgba(66, 66, 66, 1);
    font-family: SF Pro;
    font-size: px2rem(24);
    text-align: center;
  }
}

.tabbarItem {
  letter-spacing: px2rem(1);
}
.light_lottery {
  background: rgba(251, 236, 207, 1);
  --van-tabbar-item-active-color: rgba(66, 66, 66, 1);
}
</style>
